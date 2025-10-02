import { NavLink } from "react-router-dom";
import "./Home.css";
import { useState, useEffect } from "react";

function Home() {
  const slides = ["/hero-burger.png", "/hero-pizza.png"];
  const [current, setCurrent] = useState(0);

  return (
    <div
      className="hero"
      style={{ backgroundImage: `url(${slides[current]})` }}
    >
      <div className="hero-inner">
        <div className="hero-intro">
          <h1>Fast Food Restaurant</h1>
          <p>
            Doloremque, itaque aperiam facilis rerum, commodi, temporibus
            sapiente ad mollitia laborum quam quisquam esse error unde. Tempora
            ex doloremque, labore, sunt repellat dolore, iste magni quos nihil
            ducimus libero ipsam.
          </p>
          <NavLink to="/" className="hero-order">
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
