import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserCircle } from "@fortawesome/free-regular-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "./actions"
import { AppDispatch } from "../../app/store"
import { useNavigate } from "react-router-dom"
import { selectLoginError } from "./selectors"

function SignIn() {
  const navigationHelper = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const loginError = useSelector(selectLoginError)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(loginUser(email, password, navigationHelper))
  }

  return (
    <div>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <FontAwesomeIcon icon={faUserCircle} />
          <h1>Sign In</h1>
          {loginError && <div className="error-message">{loginError}</div>}
          <form onSubmit={handleSignIn}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}

export default SignIn
