import React from "react";

const Contact: React.FC = () => {
  return (
    <div className="contact-page">
        <h1>Contact Us</h1>
        <p className="contact-page__description">
        Please fill out the form below to get in touch with us. We will respond
        to your message as soon as possible.
        </p>
        <form className="contact-page__form">
        <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" className="form-input" />
        </div>
        <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" className="form-input" />
        </div>
        <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows={5} className="form-input" />
        </div>
        <button type="submit" className="submit-button">Submit</button>
        </form>
    </div>
  );
};

export default Contact;