'use client'
import React from 'react';

let keys = [
  [{ letter: 'Q', color: '' }, { letter: 'W', color: '' }, { letter: 'E', color: '' }, { letter: 'R', color: '' }, { letter: 'T', color: '' }, { letter: 'Y', color: '' }, { letter: 'U', color: '' }, { letter: 'I', color: '' }, { letter: 'O', color: '' }, { letter: 'P', color: '' }],
  [{ letter: 'A', color: '' }, { letter: 'S', color: '' }, { letter: 'D', color: '' }, { letter: 'F', color: '' }, { letter: 'G', color: '' }, { letter: 'H', color: '' }, { letter: 'J', color: '' }, { letter: 'K', color: '' }, { letter: 'L', color: '' }],
  [{ letter: '↪', color: '' }, { letter: 'Z', color: '' }, { letter: 'X', color: '' }, { letter: 'C', color: '' }, { letter: 'V', color: '' }, { letter: 'B', color: '' }, { letter: 'N', color: '' }, { letter: 'M', color: '' }, { letter: '⌫', color: '' }]
];

const Keyboard = ({ onKeyPress, letterList }: any) => {
  const handleKeyPress = (key: string) => {
    if (onKeyPress) {
      onKeyPress(key);
    }
  };

  for (let i = 0; i < 30; i++) {
    if (letterList[i].color === "" || letterList[i].color === undefined) {
        continue;
    }

    if (letterList[i].letter !== undefined && 'QWERTYUIOP'.includes(letterList[i].letter)) {
        for (let j = 0; j < 10; j++) {
            if (letterList[i].letter === keys[0][j].letter) {
                if(keys[0][j].color == '' || keys[0][j].color == 'outline'){
                    keys[0][j].color = letterList[i].color;
                    if(keys[0][j].color === 'gray')
                        keys[0][j].color = 'black'
                }else if(keys[0][j].color === 'yellow' && letterList[i].color==='green'){
                    keys[0][j].color = letterList[i].color;
                }
            }
        }
    }

    if (letterList[i].letter !== undefined && 'ASDFGHJKL'.includes(letterList[i].letter)) {
        for (let j = 0; j < 9; j++) {
            if (letterList[i].letter === keys[1][j].letter) {
                if(keys[1][j].color == '' || keys[1][j].color == 'outline'){
                    keys[1][j].color = letterList[i].color;
                    if(keys[1][j].color === 'gray')
                        keys[1][j].color = 'black'
                }else if(keys[1][j].color === 'yellow' && letterList[i].color==='green'){
                    keys[1][j].color = letterList[i].color;
                }
            }
        }
    }
    if (letterList[i].letter !== undefined && 'ZXCVBNM'.includes(letterList[i].letter)) {
        for (let j = 1; j < 8; j++) {
            if (letterList[i].letter === keys[2][j].letter) {
                if(keys[2][j].color == '' || keys[2][j].color == 'outline'){
                    keys[2][j].color = letterList[i].color;
                    if(keys[2][j].color === 'gray')
                        keys[2][j].color = 'black'
                }else if(keys[2][j].color === 'yellow' && letterList[i].color==='green'){
                    keys[2][j].color = letterList[i].color;
                }
            }
        }
    }
  }

  const getColorClass = (color: string) => {
    switch (color) {
        case 'green':
            return 'bg-lime-500 hover:bg-lime-600 text-white';
        case 'yellow':
            return 'bg-yellow-500 hover:bg-yellow-600 text-white';
        case 'black':
            return 'bg-gray-600 hover:bg-black-700 text-white';
        case 'gray':
            default:
        return 'bg-gray-200 hover:bg-gray-300 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2 mt-10">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex space-x-2">
          {row.map((keyObj) => (
            <button
              key={keyObj.letter}
              onClick={() => handleKeyPress(keyObj.letter)}
              className={`font-semibold py-2 px-4 rounded shadow ${getColorClass(keyObj.color)}`}
            >
              {keyObj.letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
