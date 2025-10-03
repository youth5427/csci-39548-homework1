import { NavLink } from "react-router-dom";
import "./Home.css";
import { useState, useEffect } from "react";

function Home() {
  const slides = ["/hero-burger.png", "/hero-pizza.png", "hero-chicken.png"];
  const [current, setCurrent] = useState(0);

  return (
    <div
      className="hero"
      style={{ backgroundImage: `url(${slides[current]})` }}
    >
      <div className="hero-inner">
        <div className="hero-intro">
          <h1>Welcome to Grilld</h1>
          <p className="hero-text">
            Freshly grilled, boldly flavored, and served fast—this is what we
            stand for. At Grilld, every bite is made with care, from our smoky
            burgers to our crispy sides. Whether you’re here for a quick meal or
            a flavor-packed experience, you’ve come to the right place. Sit
            back, enjoy, and let Grilld fire up your taste buds.
          </p>
          <NavLink to="/OrderOnline" className="hero-order">
            Order Now
          </NavLink>
          <div className="dots" role="tablist" aria-label="slides">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`dot ${current === index ? "active" : ""}`}
                onClick={() => setCurrent(index)}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
