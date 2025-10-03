import "./Contact.css";

function Contact() {
  return (
    <div className="contact-page">
      <h1>Contact with us!</h1>
      <div className="contact-section">
        <div className="profile-section">
          <img className="contact-logo" src="/icon.png"></img>
          <h1>Grilld</h1>
          <p className="contact-info">
            Phone: (332)258-1234<br></br>
            Email: SUHYEON.YOO33@myhunter.cuny.edu<br></br>
          </p>
        </div>
        <div className="right-section">
          <h3>HISTORY</h3>
          <p>
            Grilld was founded in 1998 by two college friends with a passion for
            bold flavors. The first small-town shop quickly became popular for
            its smoky grilled burgers. By 2005, Grilld expanded to several
            cities and introduced convenient drive-thru service. In the 2010s,
            the brand shifted toward eco-friendly packaging and healthier menu
            choices. Today, Grilld is an international chain celebrated for its
            fresh taste and fast service.
          </p>
          <h3>Location</h3>
          <div
            style={{
              width: "100%",
              height: "300px",
              marginTop: "10px",
            }}
          >
            <iframe
              title="google-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6043.761245690485!2d-73.97137564787904!3d40.76465028127179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258eb899f0889%3A0xb5e90aa7d877ee1f!2z7ZeM7YSwIOuMgO2VmQ!5e0!3m2!1sko!2sus!4v1759451489425!5m2!1sko!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
