import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { FiUser, FiShoppingCart, FiSearch, FiMenu, FiX } from "react-icons/fi";

import "./Header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 1024 });
  return (
    <header className="header">
      <div className="header-inner">
        <div className="left">
          <NavLink to="/">
            <div
              alt="Logo"
              className="logo"
              style={{ backgroundImage: "url(/icon.png)" }}
            ></div>
          </NavLink>
          {/* Hambergur for mobile */}
          <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        <nav className={`mid ${isOpen ? "open" : ""}`}>
          <ul>
            <li>
              <NavLink to="/">HOME</NavLink>
            </li>
            <li>
              <NavLink to="/Menu">MENU</NavLink>
            </li>
            <li>
              <NavLink to="/About">ABOUT</NavLink>
            </li>
            <li>
              <NavLink to="/Contact">CONTACT</NavLink>
            </li>
          </ul>
        </nav>
        <div className="right">
          <NavLink to="/MyProfile" className="icon-btn">
            <FiUser />
          </NavLink>
          <NavLink to="/MyProfile" className="icon-btn">
            <FiShoppingCart />
          </NavLink>
          <NavLink to="/Search" className="icon-btn">
            <FiSearch />
          </NavLink>
          <NavLink to="/OrderOnline" className="order">
            {isMobile ? "Order" : "Order Online"}
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
