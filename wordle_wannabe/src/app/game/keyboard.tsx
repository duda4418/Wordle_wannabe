'use client'
import React from 'react';

const keys = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

const Keyboard = ({ onKeyPress}:any) => {
  const handleKeyPress = (key:any) => {
    if (onKeyPress) {
      onKeyPress(key);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2 mt-10">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex space-x-2">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyPress(key)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded shadow"
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;