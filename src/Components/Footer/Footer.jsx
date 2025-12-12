import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <nav className="footer-nav">
        <Link to="/" className="footer-link">Home</Link>
        <Link to="/contact" className="footer-link">Contact</Link>
        <Link to="/public-blog" className="footer-link">Blog</Link>
        <Link to="/resume" className="footer-link">Resume</Link>
        <Link to="/about" className="footer-link">About</Link>
      </nav>

      <p className="footer-copy">
        © {new Date().getFullYear()} | Aakash Kumar Sahu | Portfolio
      </p>
    </footer>
  );
};

export default Footer;
