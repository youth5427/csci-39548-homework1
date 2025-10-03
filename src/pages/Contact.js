import "./Contact.css";

function Contact() {
  return (
    <div className="contact-page">
      <h1>Contact with Grilld!</h1>
      <div className="contact-section">
        <div className="profile-section">
          <img className="contact-logo" src="/icon.png"></img>
          <h1>Grilld</h1>
          <p className="contact-info">
            695 Park Ave, New York, NY 10065<br></br>
            Phone: (332)258-1234<br></br>
            Email: SUHYEON.YOO33@myhunter.cuny.edu<br></br>
          </p>
        </div>
        <div className="right-section">
          <p className="contact-history">
            We’d love to hear from you!<br></br>
            Whether you have a question, feedback, or just want to say hello,
            our team is here to help. <br></br>
            <br></br>
            📍 Visit us at one of our locations, <br></br>📞 Call us directly,
            or <br></br>
            ✉️ Fill out the form below and we’ll get back to you as soon as
            possible. <br></br>
            <br></br>At Grilld, your voice matters—because great food starts
            with happy customers.
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
