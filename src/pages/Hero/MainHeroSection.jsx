import React, { useState, useEffect } from "react";
import "./HeroSection.css";
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
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleExploreWork = () => {
    console.log("Explore My Work clicked");
  };

  const handleLogin = () => {
    console.log("Login clicked");
    navigate("/login");
  };

  const handleSignup = () => {
    console.log("Sign up clicked");
    navigate("/signup");
  };

  return (
    <div className="hero-section">
      {/* Animated Background */}
      <div className="hero-background">
        <div className="gradient-sphere sphere-1"></div>
        <div className="gradient-sphere sphere-2"></div>
        <div className="gradient-sphere sphere-3"></div>
        <div className="floating-particles">
          {[...Array(200)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}></div>
          ))}
        </div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          {/* Left Section */}
          <div className="hero-left">
            <div className="content-wrapper">
              <div className="slide-content" key={currentSlide}>
                <h1 className="hero-title">
                  {slides[currentSlide].title}
                </h1>
                <p className="hero-subtitle">
                  {slides[currentSlide].subtitle}
                </p>
              </div>

              <button className="cta-button" onClick={handleExploreWork}>
                <span className="button-content">
                  <span className="button-text">Explore My Work</span>
                  <svg className="button-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>

              {/* Features */}
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M16 18L22 12L16 6M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Full-Stack Development</span>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Clean Code & Best Practices</span>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13M16 8L12 4M12 4L8 8M12 4V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Open to Opportunities</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="hero-right">
            <div className="auth-card">
              <div className="card-glow"></div>
              <h3 className="auth-title">Access Exclusive Content</h3>
              <p className="auth-description">
                Login to view my detailed resume, certifications, and connect with me directly
              </p>

              <div className="auth-buttons">
                <button className="auth-btn login-btn" onClick={handleLogin}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 11C12.2091 11 14 9.20914 14 7C14 4.79086 12.2091 3 10 3C7.79086 3 6 4.79086 6 7C6 9.20914 7.79086 11 10 11Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M3 17C3 14.2386 5.23858 12 8 12H12C14.7614 12 17 14.2386 17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Login to View More
                </button>

                <button className="auth-btn signup-btn" onClick={handleSignup}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 5V15M5 10H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Create Account
                </button>
              </div>

              <div className="divider">
                <span></span>
              </div>

              <div className="security-badge">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L3 3V7C3 10.5 5.5 13.5 8 15C10.5 13.5 13 10.5 13 7V3L8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 8L7.5 9.5L10.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Secure authentication & data privacy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="slide-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainHeroSection;