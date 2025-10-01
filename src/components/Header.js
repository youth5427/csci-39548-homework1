import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Menu">MENU</Link>
        </li>
        <li>
          <Link to="/About">ABOUT</Link>
        </li>
        <li>
          <Link to="/BookTable">BOOKTABLE</Link>
        </li>
      </nav>
    </header>
  );
}

export default Header;
