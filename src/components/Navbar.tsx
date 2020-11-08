import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context'
import NavbarSignButtons from './NavbarSignButtons'
import NavbarUsermenu from './NavbarUsermenu'

function Navbar() {
  const { user } = useContext(AppContext)

  return (
    <nav className="navbar is-light" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <button className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
      <div id="navbar" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Neinstagram
          </Link>
        </div>
        <div className="navbar-end">
        {
          user.email.length > 0 &&
          <NavbarUsermenu />
        }
        {
          user.email === '' &&
          <NavbarSignButtons />
        }
        </div>
      </div>
    </nav>
  )
}

export default Navbar
