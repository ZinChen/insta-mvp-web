import React, { useContext } from 'react'
import { AppContext } from '../context'

function NavbarSignButtons() {
  const { setModal } = useContext(AppContext)

  return (
    <div className="navbar-item">
      <div className="buttons">
        <button
          className="button is-light"
          onClick={() => setModal('signup')}
        >
          Sign up
        </button>
        <button
          className="button is-link"
          onClick={() => setModal('login')}
        >
          <strong>Log in</strong>
        </button>
      </div>
    </div>
  )
}

export default NavbarSignButtons
