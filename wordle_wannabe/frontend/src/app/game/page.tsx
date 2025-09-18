import React from 'react'
import Navbar from '@/app/game/navbar/navbar'
import WordleGame from '@/app/game/game'

const PlayGame = async () => {
  interface LetterType {
    letter: string;
    color: string;
  }

  let letterList: LetterType[] = []

  const apiBase = process.env.NEXT_PUBLIC_API_BASE 
  let random_word: string = 'DOESNTWORK';
  try {
    const res = await fetch(`${apiBase}/random_word?length=5`, { cache: 'no-store' })
    if (!res.ok) {
      console.error('Failed to fetch word:', res.status, await res.text())
    } else {
      const data = await res.json()
      if (data?.word) random_word = data.word
    }
  } catch (e) {
    console.error('Error fetching word', e)
  }
  for (let i = 0; i < 30; i++) {
    letterList.push({
      letter: '',
      color: ''
    })
  }
  return (
    <div>
      <Navbar />
      <div className='sm:py-0 py-8'>
        <WordleGame letterList={letterList} random_word={random_word}  />
      </div>
    </div>
  )
}

export default PlayGame
