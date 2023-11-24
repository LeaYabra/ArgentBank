import React, { useState } from "react"
import Header from "../features/header/Header"
import Footer from "../components/footer/Footer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserCircle } from "@fortawesome/free-regular-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../features/userLogin/userActions"
import { AppDispatch, RootState } from "../app/store"
import { useNavigate } from "react-router-dom"

function SignIn() {
  const navigationHelper = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  // Redux state to get the login error
  const loginError = useSelector((state: RootState) => state.user.error)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(loginUser(email, password, navigationHelper))
  }

  return (
    <div>
      <Header />
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
      <Footer />
    </div>
  )
}

export default SignIn
