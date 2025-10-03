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
      {/* --- Contact Form  --- */}
      <h1 style={{ marginTop: 20 }}>Contact Form</h1>
      <form className="contact-form">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(000)123-4567"
            pattern="[0-9+\-() ]+"
          />
        </div>

        <div className="field message-field">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            placeholder="Send message"
            required
          />
        </div>
        <button type="submit" className="btn-primary">
          Send Message
        </button>
      </form>

      {/* --- /Contact Form --- */}
    </div>
  );
}

export default Contact;
