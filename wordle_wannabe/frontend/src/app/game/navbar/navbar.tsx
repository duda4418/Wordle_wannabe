import React from 'react'
import InfoIcon from '@/app/game/navbar/infoIcon'
import Stats from '@/app/game/navbar/stats'
import Settings from '@/app/game/navbar/settings'

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 border">
      <div className="navbar-start mx-2">
        <InfoIcon />
      </div>
      <div className="navbar-center">
        <span className="font-bold text-4xl font-serif">Wordle</span>
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
