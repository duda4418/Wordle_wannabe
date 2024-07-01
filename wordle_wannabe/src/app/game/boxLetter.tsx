import React from 'react'

const LetterBox = ({letter, color}:any) => {
  return (
    <>
      {color == '' &&(
        <div className="card bg-stone-300 w-20 h-20 flex items-center justify-center">
            <div className="card-body flex items-center justify-center">
                <h1 className='text-5xl font-extrabold'>{letter}</h1>
            </div>
        </div>
      )}
      {color == 'gray' &&(
        <div className="card bg-stone-300 w-20 h-20 flex items-center justify-center">
            <div className="card-body flex items-center justify-center">
                <h1 className='text-5xl font-extrabold'>{letter}</h1>
            </div>
        </div>
      )}
      {color == 'yellow' &&(
        <div className="card bg-yellow-300 w-20 h-20 flex items-center justify-center">
            <div className="card-body flex items-center justify-center">
                <h1 className='text-5xl font-extrabold'>{letter}</h1>
            </div>
        </div>
      )}
      {color == 'green' &&(
        <div className="card bg-lime-200 w-20 h-20 flex items-center justify-center">
            <div className="card-body flex items-center justify-center">
                <h1 className='text-5xl font-extrabold'>{letter}</h1>
            </div>
        </div>
      )}
    </>
  )
}

export default LetterBox