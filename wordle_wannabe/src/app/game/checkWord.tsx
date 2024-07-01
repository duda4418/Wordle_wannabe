'use client'
import { useEffect } from "react"
import React from 'react'

const CheckWord = ({word, letterList}:any) => {

    let letters: string[] = word.split('');
    console.log("lista litere", letterList)
    for(let i = 0; i < 30; i++){
        console.log(letters);   
        if(letterList[i].letter === ''){
            letterList[i].letter = letters[0];
            letters.shift();
        }
    }
  return (
    <div>
        <p>CHECKGAME</p>
        <p>{word}</p>
        {/* <p>{letterList}</p> */}
    </div>
  )
}

export default CheckWord