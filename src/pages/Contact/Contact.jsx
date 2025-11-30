// Contact.jsx
import React, { useRef, useState } from "react";
import "./contact.css";


import emailjs from "@emailjs/browser";
import Navbar from "../Navbar/Navbar";


const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const result = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log(result.text);
      setStatus("success");
      e.target.reset();

      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error(error.text);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const getButtonText = () => {
    switch (status) {
      case "sending":
        return "Sending...";
      case "success":
        return "✅ Message Sent!";
      case "error":
        return "❌ Failed! Try Again";
      default:
        return "Send Message";
    }
  };

  return (
    <section className="contact-section">
     <Navbar />
      
      <div className="contact-container">
        <div className="contact-info">
          <h2 className="contact-heading">
            Contact Us 
          </h2>
          <p className="contact-description">
            We'd love to hear from you! Whether you have questions, feedback,
            or just want to say hello, feel free to reach out to us at
          </p>
          <ul className="contact-details">
            <li>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              sahu.aakash1008@gmail.com
            </li>
            <li>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92V19.92C22 20.52 21.53 21.02 20.94 21.07C20.48 21.11 20.02 21.14 19.56 21.16C17.18 21.3 14.82 20.91 12.66 19.99C10.53 19.08 8.58 17.67 6.99 15.86C5.44 14.08 4.26 11.93 3.57 9.59C3.04 7.77 2.88 5.87 3.1 3.99C3.16 3.44 3.66 3 4.22 3H7.22C7.7 3 8.12 3.34 8.22 3.81C8.41 4.77 8.74 5.7 9.19 6.57C9.36 6.93 9.29 7.36 9.02 7.66L7.99 8.79C9.25 11.12 11.37 12.99 13.91 14.01L15.03 13.04C15.33 12.78 15.76 12.71 16.12 12.87C17.01 13.3 17.95 13.62 18.92 13.8C19.41 13.9 19.76 14.32 19.76 14.81V17.81C19.76 18.19 19.51 18.53 19.14 18.62C18.77 18.71 18.38 18.54 18.18 18.22C17.98 17.9 17.74 17.6 17.47 17.32C17.19 17.04 16.89 16.8 16.57 16.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              +91-7489701783
            </li>
            <li>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Kohka, Bhilai Durg (C.G.)
            </li>
          </ul>
        </div>

        <div className="contact-form-container">
          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input 
                type="text" 
                id="name"
                name="name" 
                placeholder="Enter Your Name" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email"
                name="email" 
                placeholder="Enter your email" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Write Your Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Send us your message..."
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              className={`submit-btn ${status}`}
              disabled={status === "sending"}
            >
              {getButtonText()}
            </button>
          </form>
        </div>
      </div>
    
    </section>
  );
};

export default Contact;