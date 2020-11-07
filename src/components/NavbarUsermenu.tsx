import React, { useContext } from 'react'
import { AppContext } from '../context'

function NavbarUsermenu() {
  const { user, logout } = useContext(AppContext)

  return (
    <div className="navbar-item has-dropdown is-hoverable">
      <a className="navbar-link">
        {
          user.photo.length > 0 &&
            <figure className="image is-32x32 mr-4">
              <img className="is-rounded" src={user.photo} alt="img" />
            </figure>
        }
        <span>{user.email}</span>
      </a>
      <div className="navbar-dropdown">
        <a className="navbar-item" onClick={() => logout()}>
          Logout
        </a>
      </div>
    </div>
  )
}

export default NavbarUsermenu
