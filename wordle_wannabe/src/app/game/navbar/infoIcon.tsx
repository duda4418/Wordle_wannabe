'use client'
import React from 'react'
import { Info } from 'lucide-react';
import Card from './infoCard';

const InfoIcon = () => {
  
  const words_sample = [['U', 'G', 'A', 'R'], ['S', 'W', 'I', 'F',], ['W', 'A', 'T', 'C', 'H']]

  const handleClick = () => {
    const dialogElement = document.getElementById('my_modal_3') as HTMLDialogElement;
    if (dialogElement) {
      dialogElement.showModal();
    } else {
      console.error('Dialog element not found');
    }
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-3xl my-3">How to play</h3>
          <p>• You have 6 tries.</p>
          <p>• Each word has 5 letters.</p>
          <p>• The color changes to show how close you are to guess the word.</p>
          <h4 className='font-bold'>Examples:</h4>
          <div className="container flex flex-row">
            <div className="card bg-lime-400 rounded-lg w-10 h-10 m-1 flex items-center justify-center text-xl font-bold">
              S
            </div>
            {words_sample[0].map((letter, index) => (
              <Card key={index} letter={letter}/>
            ))}
          </div>
          <p><strong>S</strong> is in the word and in the correct spot.</p>
          <div className="container flex flex-row">
            {words_sample[1].map((letter, index) => (
              <Card key={index} letter={letter}/>
            ))}
            <div className="card bg-yellow-400 rounded-lg w-10 h-10 m-1 flex items-center justify-center text-xl font-bold">
              T
            </div>
          </div>
          <p><strong>T</strong> is in the word but in the wrong spot.</p>
          <div className="container flex flex-row">
            {words_sample[2].map((letter, index) => (
              <Card key={index} letter={letter}/>
            ))}
          </div>
          <p>Every letter is in the wrong spot.</p>
        </div>
      </dialog>
      <Info onClick={handleClick} />
    </div>
  );
}

export default InfoIcon;
