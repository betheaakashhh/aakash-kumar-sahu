import React, { useState, useEffect } from "react";
import "./mainherosection.css";
import { useNavigate } from "react-router-dom";

const MainHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      title: "Aakash Kumar Sahu",
      subtitle: "Computer Science Engineer | Aspiring Software Development Engineer"
    },
    {
      title: "Full-Stack Web Developer",
      subtitle: "Building scalable solutions with modern frameworks and clean code"
    },
    {
      title: "Problem Solver & Innovator",
      subtitle: "Transforming complex challenges into elegant technical solutions"
    },
    {
      title: "Continuous Learner",
      subtitle: "Mastering new technologies and best practices every day"
    },
    {
      title: "Building the Future",
      subtitle: "One line of code at a time, creating impactful digital experiences"
    },
    {
      title: "Tech Enthusiast",
      subtitle: "Passionate about web development, algorithms, and system design"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleGetStarted = () => {
    // Scroll to projects section or navigate to projects page
    navigate("/projects");
    console.log("Explore Projects clicked");
  };

  const handleLogin = () => {
   navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="main-hero-section">
      {/* Animated Background Elements */}
      <div className="main-hero-background">
        
        <div className="main-grid-lines"></div>
      </div>

      <div className="main-hero-container">
        {/* Main Content Sections */}
        <div className="main-hero-content">
          {/* Left Section - 60% width */}
          <div className="main-left-section">
            <div className="main-text-slider">
              <div className="main-slide-content" key={currentSlide}>
                <h1 className="main-hero-title">
                  <span className="main-title-gradient">{slides[currentSlide].title}</span>
                </h1>
                <p className="main-hero-subtitle">{slides[currentSlide].subtitle}</p>
              </div>
              
              {/* Modern Button */}
              <button className="main-main-modern-btn" onClick={handleGetStarted}>
                <span className="main-btn-glow"></span>
                <span className="main-btn-text">Explore My Work</span>
                <span className="main-btn-arrow">→</span>
              </button>

              {/* Features List */}
              <div className="main-features-list">
                <div className="main-feature-item">
               
                  <span>Full-Stack Development</span>
                </div>
                <div className="main-feature-item">
                  
                  <span>Clean Code & Best Practices</span>
                </div>
                <div className="main-feature-item">
                  
                  <span>Open to Opportunities</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - 40% width */}
          <div className="main-right-section">
            <div className="main-auth-container">
              <h3 className="main-join-text">Access Exclusive Content</h3>
              <p className="main-auth-description">
                Login to view my detailed resume, certifications, and connect with me directly
              </p>
              
              <button className="main-auth-btn main-login-btn" onClick={handleLogin}>
                Login to View More
              </button>
              
              <button className="main-auth-btn main-signup-btn" onClick={handleSignup}>
                Create Account
              </button>

              <div className="main-social-divider">
                <span className="main-divider-line"></span>
                <span className="main-divider-text"></span>
                
                <span className="main-divider-line"></span>
              </div>

              
             
              <div className="main-security-note">
                <span className="main-security-icon">🛡️</span>
                Secure authentication & data privacy
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Image Section */}
        
      </div>
    </div>
  );
};

export default MainHeroSection;