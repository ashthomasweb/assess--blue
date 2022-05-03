import React from 'react'
import { Link } from 'react-router-dom'

function NavHeader() {
  return (
    <div className='container'>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <Link to='/' className='navbar-brand'>MERN-Stack User Saver and API</Link>
       
      </nav>
      <br />
    </div>
  )
}

export default NavHeader

// END of document
