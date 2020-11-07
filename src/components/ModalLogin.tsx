import React, { useContext, useState } from 'react'
import { AppContext } from '../context'
import { UserData } from '../types'

function ModalLogin () {
  const { modal, setModal, clearModal, login, user } = useContext(AppContext)
  const [userData, setUserData] = useState<UserData>({
    email: '',
    password: ''
  })

  const updateUserData = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value
    })
  }

  const isActive: String = modal === 'login' ? 'is-active' : ''

  return (
    <div className={`modal ${isActive}`}>
      <div className="modal-background" />
      <div className="modal-content">
        <div className="box">
          <div className="title">Login</div>
          <div className="field">
            <div className="control is-pulled-right is-clearfix">
              <label className="checkbox">
                Switch to <a onClick={() => setModal('signup')}>signup</a>
              </label>
            </div>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="email"
                name="email"
                placeholder="Email"
                onChange={updateUserData}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
            </p>
            {
              (user.errors || {}).email && (
                <p className="help is-danger">{user.errors.email}</p>
              )
            }
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                name="password"
                type="password"
                placeholder="Password"
                onChange={updateUserData}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
            </p>
          </div>
          <div className="field  is-grouped is-grouped-right">
            <p className="control">
              <button
                className="button is-link"
                onClick={() => login(userData)}
              >
                Login
              </button>
            </p>
            <p className="control">
              <button
                className="button"
                onClick={() => clearModal()}
              >
                Cancel
              </button>
            </p>
          </div>
        </div>
      </div>
      <button
        className="modal-close is-large" aria-label="close"
        onClick={() => clearModal()}
      />
    </div>
  )
}

export default ModalLogin
