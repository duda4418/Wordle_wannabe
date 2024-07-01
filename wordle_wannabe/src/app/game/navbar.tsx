import React from 'react'
import InfoIcon from './infoIcon';
import Stats from './stats';
import Settings from './settings';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 border">
      <div className="navbar-start mx-2">
        <InfoIcon />
      </div>
      <div className="navbar-center">
        <span className="font-bold text-4xl font-serif">WORDLE</span>
      </div>
      <div className="navbar-end">
        <div className='mx-3 p-4'>
          <Stats />
        </div>
        <div className='mx-3'>
          <Settings />
        </div>
      </div>
    </div>
  )
}

export default Navbar