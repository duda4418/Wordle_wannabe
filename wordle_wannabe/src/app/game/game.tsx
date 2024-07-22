'use client'
import React, { useEffect, useState } from 'react';
import LetterBox from './boxLetter';
import Keyboard from './keyboard';
import {toast} from "sonner"

const WordleGame = ({ letterList, random_word }: any) => {
    console.log(random_word.word)

    const searchedWordList = random_word.word.split('');
    const [input, setInput] = useState<string>('');
    const [winning, setWinning] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    async function fetchWord(input: any) {
        try {
            const aux_word = input.toLowerCase();
            const response = await fetch(`/api/checkword/${aux_word}`);
            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const { key } = event;

            if (key === 'Enter' || key==='↪') {
                if (input.length === 5) {
                    fetchWord(input).then(result => {
                        if (result === true) {
                            let letters: string[] = input.split('');
                            const auxList = [...searchedWordList];
                            const auxLetters = [...letters];
                            let lastRow = 0;
                            let found = 0;
                            for (let i = 0; i < 30; i++) {
                                if (letterList[i].letter === '' || letterList[i].letter === undefined) {
                                    letterList[i - 5].letter = letters[0];
                                    if (auxList[i % 5] === letters[0]) {
                                        letterList[i - 5].color = 'green';
                                        auxList[i % 5] = '-';
                                        auxLetters[i % 5] = '-';
                                    }
                                    if (found == 0) {
                                        found = 1;
                                        lastRow = i;
                                    }
                                    letters.shift();
                                } else if (i > 24) {
                                    if (found == 0) {
                                        lastRow = 30;
                                    }
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
                            if (letterList.slice(lastRow - 5, lastRow).every((item: { color: string; }) => item.color === 'green')) {
                                setTimeout(() => {
                                    setWinning(true);
                                    setModalOpen(true);
                                }, 800);
                            } else if (letterList.slice(25, 30).every((item: { color: string; }) => item.color != '')) {
                                setTimeout(() => {
                                    setWinning(false);
                                    setModalOpen(true);
                                }, 800);
                            }
                            setInput('');
                        }else {
                            toast(<div className='font-bold text-base'>Your word is not in the word list</div>)
                        }
                    })
                }
            } else if (key === 'Backspace' || key === '⌫') {
                if (input) {
                    for (let i = 0; i < 30; i++) {
                        if (letterList[i].letter === '' || letterList[i].letter === undefined) {
                            letterList[i - 1].letter = '';
                            letterList[i - 1].color = 'gray';
                            break;
                        } else if (i == 29) {
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
    }, [input, letterList, searchedWordList]);

    const PlayAgain = () => {
        window.location.reload();
    }

    const handleKeyPress = (key: any) => {
        const event = new KeyboardEvent('keydown', { key });
        window.dispatchEvent(event);
    };

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
                            <button className="btn bg-black text-[#e3e3e1] hover:[#e3e3e1] hover:text-black hover:border-black
                                m-7 px-16 rounded-full text-base" onClick={PlayAgain}>
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
                            <button className="btn bg-black text-[#e3e3e1] hover:[#e3e3e1] hover:text-black hover:border-black
                                m-7 px-16 rounded-full text-base" onClick={PlayAgain}>
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
    );
}

export default WordleGame;
