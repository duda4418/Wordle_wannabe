import React from 'react'

const LetterBox = ({letter, color}:any) => {
  return (
    <>
      {color == '' &&(
        <div className="card bg-gray-200 w-16 h-16 flex items-center justify-center">
            <div className="card-body flex items-center justify-center">
                <h1 className='text-4xl font-extrabold'>{letter}</h1>
            </div>
        </div>
      )}
      {color == 'gray' &&(
        <div className="card bg-gray-200 w-16 h-16 flex items-center justify-center">
            <div className="card-body flex items-center justify-center">
                <h1 className='text-4xl font-extrabold'>{letter}</h1>
            </div>
        </div>
      )}
      {color == 'yellow' &&(
        <div className="card bg-yellow-400 w-16 h-16 flex items-center justify-center">
            <div className="card-body flex items-center justify-center">
                <h1 className='text-4xl font-extrabold'>{letter}</h1>
            </div>
        </div>
      )}
      {color == 'green' &&(
        <div className="card bg-lime-400 w-16 h-16 flex items-center justify-center">
            <div className="card-body flex items-center justify-center">
                <h1 className='text-4xl font-extrabold'>{letter}</h1>
            </div>
        </div>
      )}
      {color == 'outline' &&(
        <div className="card card-bordered border-black border-4 bg-stone-300 w-16 h-16 flex items-center justify-center ">
            <div className="card-body flex items-center justify-center">
                <h1 className='text-4xl font-extrabold'>{letter}</h1>
            </div>
        </div>
      )}
    </>
  )
}

export default LetterBox