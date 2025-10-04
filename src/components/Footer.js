// Footer.js
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* 소셜 미디어 링크 */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>{" "}
          |{" "}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>{" "}
          |{" "}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </div>

        <div className="footer-hours">
          <h3>Business Hours</h3>
          <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
          <p>Sat: 10:00 AM - 4:00 PM</p>
          <p>Sun: Closed</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; 2025 Grilld. All rights reserved. This is a fictional
          restaurant.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
