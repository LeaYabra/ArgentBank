import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faEnvelopeOpen,
  faUserCircle,
} from "@fortawesome/free-regular-svg-icons"
import { useAuth } from "./action"
import logo from "../../designs/img/argentBankLogo.png"

function Header() {
  const { isAuthenticated, handleLogout, firstName } = useAuth()
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to={"/"}>
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className="headerAction">
        {isAuthenticated ? (
          <>
            <Link className="main-nav-item" to={"/user"}>
              <FontAwesomeIcon icon={faUserCircle} />
              {firstName}
            </Link>
            <Link className="main-nav-item" to={"/"} onClick={handleLogout}>
              <FontAwesomeIcon icon={faEnvelopeOpen} />
              Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to={"/sign-in"}>
            <FontAwesomeIcon icon={faUserCircle} />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Header
