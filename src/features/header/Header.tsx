import logo from "../../designs/img/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import SignPage from '../../pages/SignPage';

function Header() {
  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="./index.html">
        <img 
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <a className="main-nav-item" href="#">
          <FontAwesomeIcon icon={faUserCircle}/>  
          Sign In
        </a>
        <SignPage />
      </div>
    </nav>
  )
}
export default Header
