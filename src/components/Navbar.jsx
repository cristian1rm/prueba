import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.svg";
import "./NavbarStyles.css";

function Navbar() {
  return (
    <nav className="nav-wrapper">
      <div className="nav-content">
        <ul className="link-styled">
          <li>
            <img src={Logo} alt="Logo" />
          </li>
          <li>
        <NavLink to='/Circle'>Circle</NavLink>
        </li>
        <li>
        <NavLink to='/Home'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/AboutPage'>About</NavLink>
        </li>
        <li>
          <NavLink to='/CreatePost'>CreatePost</NavLink>
        </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
