import { NavLink } from "react-router-dom";
import { FiUser, FiShoppingCart, FiSearch } from "react-icons/fi";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <p className="left">Icon</p>
        <nav className="mid">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/Menu">MENU</NavLink>
            </li>
            <li>
              <NavLink to="/About">ABOUT</NavLink>
            </li>
            <li>
              <NavLink to="/BookTable">BOOKTABLE</NavLink>
            </li>
          </ul>
        </nav>
        <div className="right">
          <button className="icon-btn">
            <FiUser />
          </button>
          <button className="icon-btn">
            <FiShoppingCart />
          </button>
          <button className="icon-btn">
            <FiSearch />
          </button>
          <NavLink to="/" className="order">
            Order Online
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
