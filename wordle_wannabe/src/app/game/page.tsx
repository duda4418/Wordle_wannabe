import React from 'react'
import Navbar from './navbar'
import WordleGame from './game'

const PlayGame = async () => {
  interface LetterType {
    letter: string;
    color: string;
}

let letterList: LetterType[] = [];

const res = await fetch('http://localhost:3000/api/', {cache: 'no-store'});
const random_word = await res.json();
for(let i = 0; i < 30; i++){
    letterList.push({
        letter: '',
        color: ''
    });
}
  return (
    <div>
        <Navbar/>
        <WordleGame letterList={letterList} random_word={random_word}/>
    </div>
  )
}

export default PlayGame