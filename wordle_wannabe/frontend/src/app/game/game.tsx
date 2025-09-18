"use client"
import React, { useEffect, useMemo, useState } from 'react'
import LetterBox from '@/app/game/boxLetter'
import Keyboard from '@/app/game/keyboard'
import { toast } from 'sonner'

interface LetterCell { letter: string; color: string }

const WORD_LENGTH = 5
const MAX_ROWS = 6
const TOTAL_CELLS = WORD_LENGTH * MAX_ROWS

const WordleGame = ({ letterList, random_word }: any) => {
  console.log(random_word)
  const answer = (typeof random_word === 'string' ? random_word : random_word?.word || '').toUpperCase()

  const initialBoard = useMemo<LetterCell[]>(() => {
    if (Array.isArray(letterList) && letterList.length === TOTAL_CELLS) {
      return letterList.map((c: any) => ({ letter: c.letter || '', color: c.color || '' }))
    }
    return Array.from({ length: TOTAL_CELLS }, () => ({ letter: '', color: '' }))
  }, [letterList])

  const [board, setBoard] = useState<LetterCell[]>(initialBoard)
  const [input, setInput] = useState('')
  const [row, setRow] = useState(0)
  const [winning, setWinning] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  // (Optional) dictionary validation placeholder – currently treat any 5-letter input as valid
  async function validateWord(word: string): Promise<boolean> {
    // If you reintroduce /check_word, do fetch here; otherwise always true
    return true
  }

  function applyGuess(guess: string) {
    const upperGuess = guess.toUpperCase()
    const next = [...board]
    const rowStart = row * WORD_LENGTH

    // Place letters (ensure we overwrite row with this guess)
    for (let i = 0; i < WORD_LENGTH; i++) {
      next[rowStart + i] = { letter: upperGuess[i], color: '' }
    }

    // Prepare arrays for two-pass evaluation
    const answerArr = answer.split('')
    const guessArr = upperGuess.split('')

    // First pass: greens
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (guessArr[i] === answerArr[i]) {
        next[rowStart + i].color = 'green'
        answerArr[i] = '*' // consume
        guessArr[i] = '_'  // mark processed
      }
    }
    // Second pass: yellows & grays
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (next[rowStart + i].color === 'green') continue
      const idx = answerArr.indexOf(guessArr[i])
      if (idx !== -1) {
        next[rowStart + i].color = 'yellow'
        answerArr[idx] = '*' // consume one occurrence
      } else {
        next[rowStart + i].color = 'gray'
      }
    }

    setBoard(next)

    const isRowWin = next.slice(rowStart, rowStart + WORD_LENGTH).every(c => c.color === 'green')
    if (isRowWin) {
      setTimeout(() => { setWinning(true); setModalOpen(true) }, 400)
      return
    }
    if (row + 1 >= MAX_ROWS) {
      setTimeout(() => { setWinning(false); setModalOpen(true) }, 400)
    } else {
      setRow(r => r + 1)
    }
  }

  function handleEnter() {
    if (input.length !== WORD_LENGTH || modalOpen) return
    validateWord(input).then(valid => {
      if (!valid) {
        toast(<div className='font-bold text-base'>Word not in list</div>)
        return
      }
      applyGuess(input)
      setInput('')
    })
  }

  function handleBackspace() {
    if (modalOpen) return
    if (!input) return
    const next = [...board]
    const posInRow = input.length - 1
    const cellIndex = row * WORD_LENGTH + posInRow
    next[cellIndex] = { letter: '', color: '' }
    setBoard(next)
    setInput(prev => prev.slice(0, -1))
  }

  function handleLetter(ch: string) {
    if (modalOpen) return
    if (input.length >= WORD_LENGTH) return
    const next = [...board]
    const cellIndex = row * WORD_LENGTH + input.length
    next[cellIndex] = { letter: ch, color: 'outline' }
    setBoard(next)
    setInput(prev => prev + ch)
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      const key = e.key
      if (key === 'Enter') return handleEnter()
      if (key === 'Backspace') return handleBackspace()
      const up = key.toUpperCase()
      if (/^[A-Z]$/.test(up)) handleLetter(up)
    }
    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [input, board, row, modalOpen])

  const PlayAgain = () => { window.location.reload() }

  const handleKeyPress = (key: string) => {
    if (key === 'ENTER') return handleEnter()
    if (key === 'BACKSPACE') return handleBackspace()
    if (/^[A-Z]$/.test(key)) handleLetter(key)
  }

   return (
    <div>
      {modalOpen && winning && (
        <>
          <dialog id="my_modal_4" className="modal modal-open ">
            <div className="modal-box flex flex-col items-center">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setModalOpen(false)}>✕</button>
              </form>
              <h3 className="font-bold text-lg">YOU WON!</h3>
              <button className="btn bg-black text-[#e3e3e1] hover:[#e3e3e1] hover:text-black hover:border-black m-7 px-16 rounded-full text-base" onClick={PlayAgain}>
                Play again
              </button>
            </div>
          </dialog>
        </>
      )}
      {modalOpen && !winning && (
        <>
          <dialog id="my_modal_4" className="modal modal-open">
            <div className="modal-box flex flex-col items-center">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setModalOpen(false)}>✕</button>
              </form>
              <h3 className="font-bold text-lg">YOU LOST!</h3>
              <p>The word was {answer}</p>
              <button className="btn bg-black text-[#e3e3e1] hover:[#e3e3e1] hover:text-black hover:border-black m-7 px-16 rounded-full text-base" onClick={PlayAgain}>
                Play again
              </button>
            </div>
          </dialog>
        </>
      )}
      <div className='flex flex-col items-center justify-center'>
        {[...Array(6)].map((_, i) => (
          <div className='flex flex-row' key={i}>
            {[...Array(5)].map((_, index) => (
              <div className='m-1' key={index}>
                <LetterBox
                  letter={board[index + i * 5]?.letter || ''}
                  color={board[index + i * 5]?.color || ''}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className='pt-36 sm:pt-0 '>
  <Keyboard onKeyPress={handleKeyPress} letterList={board} />
      </div>
    </div>
   )
}

export default WordleGame
