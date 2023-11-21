import React, { useState } from "react"
import Header from "../features/header/Header"
import Footer from "../compoments/footer/Footer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserCircle } from "@fortawesome/free-regular-svg-icons"
import { useDispatch } from "react-redux"
import { loginUser } from "../features/userLogin/userActions"
import { AppDispatch } from "../app/store"

function SignIn() {
  // Utilisation du hook useDispatch pour obtenir la fonction de dispatch Redux
  const dispatch: AppDispatch = useDispatch()

  // États locaux pour stocker les données du formulaire
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  // Fonction pour gérer la soumission du formulaire
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    // Dispatch de l'action d'authentification avec les données du formulaire
    dispatch(loginUser(username, password))
  }

  return (
    <div>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <FontAwesomeIcon icon={faUserCircle} />
          <h1>Sign In</h1>
          <form onSubmit={handleSignIn}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
