import React from 'react'
import Navbar from './navbar'
import WordleGame from './game'

const PlayGame = () => {
  interface LetterType {
    letter: string;
    color: string;
}

let letterList: LetterType[] = [];

for(let i = 0; i < 30; i++){
    letterList.push({
        letter: '',
        color: ''
    });
}
  return (
    <div>
        <Navbar/>
        <WordleGame letterList={letterList}/>
    </div>
  )
}

export default PlayGame