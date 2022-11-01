import Instagramlogo from '../assets/IgLogo.png'
import React from 'react'

const Nav = () => {
  return (
    <nav>
        <button className='logo'>
            <img src={Instagramlogo} alt="logo" />
        </button>
        <div className='search'>
        <input type="text" placeholder='Search...'/>
        <i className='fas fa-search' />
        </div>
        <span className='nav-links'>
                <button>
                    <i className='fas fa-home'></i>
                </button>
                <button>
                    <i className='fas fa-comment-alt'></i>
                </button>
                <button>
                    <i className='fas fa-compass'></i>
                </button>
                <button>
                    <i className='fas fa-heart'></i>
                </button>
            
        </span>
    </nav>
  )
}

export default Nav
