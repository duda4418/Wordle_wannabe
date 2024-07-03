'use client'
import React, { useEffect, useState } from 'react';
import LetterBox from './boxLetter';

const WordleGame = ({ letterList }: any) => {
    const searchedWordList = ['C', 'A', 'A', 'O', 'E'];
    const [input, setInput] = useState<string>('');
    const [winning, setWinning] = useState(false);
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const { key } = event;

            if (key === 'Enter') {
                if (input.length === 5) {
                    let letters: string[] = input.split('');
                    const auxList = [...searchedWordList];
                    const auxLetters = [...letters];
                    for (let i = 0; i < 30; i++) {
                        if (letterList[i].letter === '' || letterList[i].letter === undefined) {
                            letterList[i - 5].letter = letters[0];
                            if (auxList[i % 5] === letters[0]) {
                                letterList[i - 5].color = 'green';
                                auxList[i % 5] = '-';
                                auxLetters[i % 5] = '-';
                            }
                            letters.shift();
                        } else if (i > 24) {
                            letterList[i].letter = letters[0];
                            if (auxList[i % 5] === letters[0]) {
                                letterList[i].color = 'green';
                                auxList[i % 5] = '-';
                                auxLetters[i % 5] = '-';
                            }
                            letters.shift();
                        }
                    }

                    for (let i = 0; i < 30; i++) {
                        if (letterList[i].letter === '' || letterList[i].letter === undefined) {
                            if (auxLetters[0] !== '-') {
                                if (auxList.includes(auxLetters[0])) {
                                    letterList[i - 5].letter = auxLetters[0];
                                    letterList[i - 5].color = 'yellow';
                                    const index = auxList.indexOf(auxLetters[0]);
                                    auxList[index] = '-';
                                } else {
                                    letterList[i - 5].color = 'gray';
                                }
                            }
                            auxLetters.shift();
                        } else if (i > 24) {
                            if (auxLetters[0] !== '-') {
                                if (auxList.includes(auxLetters[0])) {
                                    letterList[i].letter = auxLetters[0];
                                    letterList[i].color = 'yellow';
                                    const index = auxList.indexOf(auxLetters[0]);
                                    auxList[index] = '-';
                                } else {
                                    letterList[i].color = 'gray';
                                }
                            }
                            auxLetters.shift();
                        }
                    }
                    if (letterList.slice(25, 30).every((item: { color: string; }) => item.color === 'green')) {
                        setWinning(true);
                        setModalOpen(true);
                    }else if(letterList.slice(25, 30).every((item: { color: string; }) => item.color != '')){
                        setWinning(false);
                        setModalOpen(true)
                    }
                    setInput('');
                }
            } else if (key === 'Backspace') {
                if (input) {
                    for (let i = 0; i < 30; i++) {
                        if (letterList[i].letter === '' || letterList[i].letter === undefined) {
                            letterList[i - 1].letter = '';
                            letterList[i - 1].color = 'gray';
                            break;
                        }else if(i==29){
                            letterList[i].letter = '';
                            letterList[i].color = 'gray';
                            break;
                        }
                    }
                }
                setInput((prevInput) => prevInput.slice(0, -1));
            } else {
                if (input.length < 5) {
                    const uppercaseKey = key.toUpperCase();
                    if (/^[A-Z]$/.test(uppercaseKey)) {
                        for (let i = 0; i < 30; i++) {
                            if (letterList[i].letter === '' || letterList[i].letter === undefined) {
                                letterList[i].letter = uppercaseKey;
                                letterList[i].color = 'outline';
                                break;
                            }
                        }
                        setInput((prevInput) => prevInput + uppercaseKey);
                    }
                }
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [input]);

    return (
        <div>
            {modalOpen && winning &&(
                <>
                    <dialog id="my_modal_4" className="modal modal-open">
                        <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>setModalOpen(false)}>✕</button>
                            </form>
                            <h3 className="font-bold text-lg">YOU WON!</h3>
                            <p className="py-4">Press ESC key or click on ✕ button to close</p>
                        </div>
                    </dialog>
                </>
            )}
            {modalOpen && !winning &&(
                <>
                    <dialog id="my_modal_4" className="modal modal-open">
                        <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>setModalOpen(false)}>✕</button>
                            </form>
                            <h3 className="font-bold text-lg">YOU LOST!</h3>
                            <p className="py-4">Press ESC key or click on ✕ button to close</p>
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
        </div>
    );
}

export default WordleGame;
