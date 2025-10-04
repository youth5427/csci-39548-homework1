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
              onClick={() => setIsOpen(false)}
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
              <NavLink to="/" onClick={() => setIsOpen(false)}>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to="/Menu" onClick={() => setIsOpen(false)}>
                MENU
              </NavLink>
            </li>
            <li>
              <NavLink to="/About" onClick={() => setIsOpen(false)}>
                ABOUT
              </NavLink>
            </li>
            <li>
              <NavLink to="/Contact" onClick={() => setIsOpen(false)}>
                CONTACT
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="right">
          <NavLink
            to="/MyProfile"
            className="icon-btn"
            onClick={() => setIsOpen(false)}
          >
            <FiUser />
          </NavLink>
          <NavLink
            to="/Mycart"
            className="icon-btn"
            onClick={() => setIsOpen(false)}
          >
            <FiShoppingCart />
          </NavLink>
          <NavLink
            to="/Search"
            className="icon-btn"
            onClick={() => setIsOpen(false)}
          >
            <FiSearch />
          </NavLink>
          <NavLink
            to="/OrderOnline"
            className="order"
            onClick={() => setIsOpen(false)}
          >
            {isMobile ? "Order" : "Order Online"}
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
