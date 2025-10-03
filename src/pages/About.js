import "./About.css";
import Profile from "../components/Profile";

function About() {
  return (
    <div className="about-page">
      <h1>History of Grilld</h1>
      <div className="about-section">
        <Profile></Profile>
        <div className="right-section">
          <p className="about-history">
            Grilld was founded in 1998 by two college friends with a passion for
            bold flavors. The first small-town shop quickly became popular for
            its smoky grilled burgers. <br></br>
            <br></br>By 2005, Grilld expanded to several cities and introduced
            convenient drive-thru service. In the 2010s, the brand shifted
            toward eco-friendly packaging and healthier menu choices. Today,
            Grilld is an international chain celebrated for its fresh taste and
            fast service.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
