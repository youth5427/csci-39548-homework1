import "./Profile.css";

function Header() {
  return (
    <div className="profile-section">
      <img className="about-logo" src="/icon.png" alt="Grilld_icon"></img>
      <h1>Grilld</h1>
      <p className="about-info">
        89 E 42nd St, New York, NY 10017<br></br>
        Phone: (929)123-4567<br></br>
        Email: address@example.com<br></br>
      </p>
    </div>
  );
}

export default Header;
