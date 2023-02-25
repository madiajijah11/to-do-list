import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
      <div data-cy='header-background' className='container'>
        <h2 data-cy='header-title' className='dashboard-title'>
          TO DO LIST APP
        </h2>
      </div>
    </div>
  )
}

export default Header
