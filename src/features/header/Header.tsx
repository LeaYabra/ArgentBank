import logo from "../../designs/img/argentBankLogo.png"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faEnvelopeOpen,
  faUserCircle,
} from "@fortawesome/free-regular-svg-icons"
import { RootState } from "../../app/store"
import { useDispatch } from "react-redux"

function Header() {
  const isAuthenticated = useSelector((state: RootState) => state.user.success)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
  }

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
      <div className="icon">
        {isAuthenticated ? (
          <Link className="main-nav-item" to={"/"} onClick={handleLogout}>
            <FontAwesomeIcon icon={faEnvelopeOpen} />
            Sign Out
          </Link>
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
