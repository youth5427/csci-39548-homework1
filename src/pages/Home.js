import { NavLink } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="hero" style={{ backgroundImage: "url(/HeroBurger.png)" }}>
      <div className="hero-inner">
        <div className="hero-intro">
          <h1>Fast Food Restaurant</h1>
          <p>
            Doloremque, itaque aperiam facilis rerum, commodi, temporibus
            sapiente ad mollitia laborum quam quisquam esse error unde. Tempora
            ex doloremque, labore, sunt repellat dolore, iste magni quos nihil
            ducimus libero ipsam.
          </p>
          <NavLink to="/" className="order">
            Order Now
          </NavLink>
          <div className="dots" role="tablist" aria-label="slides">
            <button className="dot active" aria-label="slide 1"></button>
            <button className="dot" aria-label="slide 2"></button>
            <button className="dot" aria-label="slide 3"></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
