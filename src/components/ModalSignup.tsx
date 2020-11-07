import React, { useContext, useState } from 'react'
import { AppContext } from '../context'
import { UserData } from '../types'

function ModalSignup () {
  const { modal, setModal, clearModal, signup, user } = useContext(AppContext)
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    password: ''
  })
  const isActive: String = modal === 'signup' ? 'is-active' : ''

  const updateUserData = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value
    })
  }

  return (
    <div className={`modal ${isActive}`}>
      <div className="modal-background" />
      <div className="modal-content">
        <div className="box">
          <div className="title">Sign Up</div>
          <div className="field">
            <div className="control is-pulled-right is-clearfix">
              <label className="checkbox">
                Switch to <a onClick={() => setModal('login')}>login</a>
              </label>
            </div>
          </div>
          <div className="field">
            <p className="control">
              <input
                className="input"
                name="name"
                type="text"
                placeholder="Name"
                onChange={updateUserData}
              />
            </p>
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
                onClick={() => signup(userData)}
              >
                Sign up
              </button>
            </p>
            <p className="control">
              <button className="button" onClick={() => clearModal()}>
                Cancel
              </button>
            </p>
          </div>
        </div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={() => clearModal()}
      />
    </div>
  );
}

export default ModalSignup
