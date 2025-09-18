'use client'
import React, { useEffect, useState } from 'react'
import LetterBox from '@/app/game/boxLetter'
import Keyboard from '@/app/game/keyboard'
import { toast } from 'sonner'

const WordleGame = ({ letterList, random_word }: any) => {
  console.log(random_word)

  const searchedWordList = random_word.split('')
  const [input, setInput] = useState<string>('')
  const [winning, setWinning] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  async function fetchWord(input: any) {
    try {
      const aux_word = input.toLowerCase()
      const apiBase = process.env.NEXT_PUBLIC_API_BASE
      const response = await fetch(`${apiBase}/check_word/${aux_word}`)
      if (!response.ok) {
        console.error('Checkword fetch failed', response.status)
        return false
      }
      const data = await response.json()
      console.log(data)
      if (typeof data.valid === 'boolean') return data.valid
      return false
    } catch (error) {
      console.error('Error fetching data:', error)
      return false
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event

      if (key === 'Enter' || key === '↪') {
        if (input.length === 5) {
          fetchWord(input).then(result => {
            if (result === true) {
              // Determine current row (0..5) by counting filled cells
              const filled = letterList.filter((c: { letter: string }) => c.letter !== '' && c.letter !== undefined).length
              // When exactly 5,10,15.. letters are filled we've just finished that row; subtract 1 before dividing
              const currentRow = filled === 0 ? 0 : Math.floor((filled - 1) / 5)
              const rowStart = currentRow * 5
              const rowEnd = rowStart + 5

              const guess = input.toUpperCase()
              const answer = searchedWordList.map((c: string) => c.toUpperCase())

              // Place guess letters into current row only
              for (let i = 0; i < 5; i++) {
                letterList[rowStart + i].letter = guess[i]
                letterList[rowStart + i].color = ''
              }

              // First pass: greens
              const answerScratch = [...answer]
              const guessScratch = guess.split('')
              for (let i = 0; i < 5; i++) {
                if (guessScratch[i] === answerScratch[i]) {
                  letterList[rowStart + i].color = 'green'
                  answerScratch[i] = '*'
                  guessScratch[i] = '_'
                }
              }

              // Second pass: yellows / grays
              for (let i = 0; i < 5; i++) {
                if (letterList[rowStart + i].color === 'green') continue
                const idx = answerScratch.indexOf(guessScratch[i])
                if (idx !== -1) {
                  letterList[rowStart + i].color = 'yellow'
                  answerScratch[idx] = '*'
                } else {
                  letterList[rowStart + i].color = 'gray'
                }
              }

              // Win / lose detection using this row
              if (letterList.slice(rowStart, rowEnd).every((item: { color: string }) => item.color === 'green')) {
                setTimeout(() => {
                  setWinning(true)
                  setModalOpen(true)
                }, 800)
              } else if (currentRow === 5 && letterList.slice(25, 30).every((item: { color: string }) => item.color !== '')) {
                setTimeout(() => {
                  setWinning(false)
                  setModalOpen(true)
                }, 800)
              }
              setInput('')
            } else {
              toast(<div className='font-bold text-base'>Your word is not in the word list</div>)
            }
          })
        }
      } else if (key === 'Backspace' || key === '⌫') {
        if (input) {
          for (let i = 0; i < 30; i++) {
            if (letterList[i].letter === '' || letterList[i].letter === undefined) {
              if (i > 0) {
                letterList[i - 1].letter = ''
                letterList[i - 1].color = ''
              }
              break
            } else if (i == 29) {
              letterList[i].letter = ''
              letterList[i].color = ''
              break
            }
          }
        }
        setInput((prevInput) => prevInput.slice(0, -1))
      } else {
        if (input.length < 5) {
          const uppercaseKey = key.toUpperCase()
          if (/^[A-Z]$/.test(uppercaseKey)) {
            for (let i = 0; i < 30; i++) {
              if (letterList[i].letter === '' || letterList[i].letter === undefined) {
                letterList[i].letter = uppercaseKey
                letterList[i].color = 'outline'
                break
              }
            }
            setInput((prevInput) => prevInput + uppercaseKey)
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [input, letterList, searchedWordList])

  const PlayAgain = () => {
    window.location.reload()
  }

  const handleKeyPress = (key: any) => {
    const event = new KeyboardEvent('keydown', { key })
    window.dispatchEvent(event)
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
              <p>The word was {random_word.word}</p>
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
                  letter={letterList[index + i * 5] ? letterList[index + i * 5].letter : ''}
                  color={letterList[index + i * 5] ? letterList[index + i * 5].color : ''}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className='pt-36 sm:pt-0 '>
        <Keyboard onKeyPress={handleKeyPress} letterList={letterList} />
      </div>
    </div>
   )
}

export default WordleGame
