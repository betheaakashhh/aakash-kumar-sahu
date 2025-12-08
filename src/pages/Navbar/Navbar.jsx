import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menu, setMenu] = useState("Home");
  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [logoText, setLogoText] = useState("Portfolio");
  const [isScrolling, setIsScrolling] = useState(false);
  
  // greeeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    if (hour < 20) return "Good Evening";
    return "Good Night";
  };
  const [greeting, setGreeting] = useState(getGreeting());

  // Update greeting every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Logo transformation texts
  const logoTransformations = [
    "Welcome",
    "Meet Me",
    "Explore Projects ",
    "View Skills",
    "Download Resume",
    "Get in Touch",
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setSticky(true);
        setIsScrolling(true);
      } else {
        setSticky(false);
        setIsScrolling(false);
      }
    };

    // Logo text transformation interval
    const logoInterval = setInterval(() => {
      if (!isScrolling) {
        const currentIndex = logoTransformations.indexOf(logoText);
        const nextIndex = (currentIndex + 1) % logoTransformations.length;
        setLogoText(logoTransformations[nextIndex]);
      }
    }, 3000);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(logoInterval);
    };
  }, [logoText, isScrolling]);

  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
    // Prevent body scroll when mobile menu is open
    if (!mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  const handleNavClick = (menuItem) => {
    setMenu(menuItem);
    setMobileMenu(false);
    document.body.style.overflow = "unset"; // Restore scroll when menu item is clicked
  };

  // Close mobile menu when clicking on overlay background
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("mobile-nav-overlay")) {
      setMobileMenu(false);
      document.body.style.overflow = "unset";
    }
  };

  return (
    <nav
      className={`divine-navbar ${sticky ? "sticky" : ""} ${
        mobileMenu ? "mobile-open" : ""
      }`}
    >
      {/* Heavenly Background Glow */}
      <div className="nav-heavenly-glow"></div>

      <div className="nav-container">
        {/* Animated Logo */}
        <div className="logo-container">
          <h1 className={`divine-logo ${sticky ? "scrolled" : ""}`}>
            <span className="logo-text">{logoText}</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <ul className="nav-links">
          <li className={menu === "Home" ? "active" : ""}>
            <Link to="/" onClick={() => handleNavClick("Home")}>
              Home
              <div className="nav-glow"></div>
            </Link>
          </li>
          <li className={menu === "About" ? "active" : ""}>
            <Link to="/about" onClick={() => handleNavClick("About")}>
              About
              <div className="nav-glow"></div>
            </Link>
          </li>
          <li className={menu === "Resume" ? "active" : ""}>
            <Link to="/resume" onClick={() => handleNavClick("Resume")}>
              Resume
              <div className="nav-glow"></div>
            </Link>
          </li>
          <li className={menu === "Contact" ? "active" : ""}>
            <Link to="/contact" onClick={() => handleNavClick("Contact")}>
              Contact
              <div className="nav-glow"></div>
            </Link>
          </li>
          <li className={menu === "Blog" ? "active" : ""}>
            <Link to="/public-blog" onClick={() => handleNavClick("Blog")}>
              Blog
              <div className="nav-glow"></div>
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div className={`menu-icon ${mobileMenu ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {/* Mobile Navigation Overlay - Fixed Position */}
      <div
        className={`mobile-nav-overlay ${mobileMenu ? "active" : ""}`}
        onClick={handleOverlayClick}
      >
        <div className="mobile-nav-content">
          {/* Close Button at Top */}
          <div className="mobile-nav-header">
            <div className="mobile-header-top">
              <h2 className="mobile-logo">PortFolio</h2>
              <button
                className="mobile-close-btn"
                onClick={toggleMenu}
                aria-label="Close menu"
              >
                <div className="close-icon">✕</div>
              </button>
            </div>
            <div className="mobile-nav-glow"></div>
            <p className="mobile-welcome-text">{greeting}</p>
          </div>

          {/* Navigation Links - Centered */}
          <div className="mobile-nav-center">
            <ul className="mobile-nav-links">
              <li className={menu === "Home" ? "active" : ""}>
                <Link to="/" onClick={() => handleNavClick("Home")}>
                  <span className="nav-text">Home</span>
                  <div className="mobile-glow"></div>
                </Link>
              </li>
              <li className={menu === "About" ? "active" : ""}>
                <Link to="/about" onClick={() => handleNavClick("About")}>
                  <span className="nav-text">About</span>
                  <div className="mobile-glow"></div>
                </Link>
              </li>
              <li className={menu === "Resume" ? "active" : ""}>
                <Link to="/resume" onClick={() => handleNavClick("Resume")}>
                  <span className="nav-text">Resume</span>
                  <div className="mobile-glow"></div>
                </Link>
              </li>
              <li className={menu === "Contact" ? "active" : ""}>
                <Link to="/contact" onClick={() => handleNavClick("Contact")}>
                  <span className="nav-text">Contact</span>
                  <div className="mobile-glow"></div>
                </Link>
              </li>
              <li className={menu === "Blog" ? "active" : ""}>
                <Link to="/public-blog" onClick={() => handleNavClick("Blog")}>
                  <span className="nav-text">Blog</span>
                  <div className="mobile-glow"></div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile Nav Footer */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
