import React, { useCallback, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AppContext } from '../context'

function NavbarUsermenu() {
  const { user, logout, setModal } = useContext(AppContext)
  // Redirect to '/' on logout
  const history = useHistory()
  const onLogout = useCallback(() => {
    logout()
    history.push('/')
  }, [history, logout])

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
        <a className="navbar-item" onClick={() => setModal('createPost')}>
          Create post
        </a>
        <a className="navbar-item" onClick={() => onLogout()}>
          Logout
        </a>
      </div>
    </div>
  )
}

export default NavbarUsermenu
