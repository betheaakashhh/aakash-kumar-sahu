import React, { useState, useEffect } from "react";
import "./ModernHeroSection.css";

const ModernHeroSection = () => {
  const [activeSection, setActiveSection] = useState("vision");
  const [currentCareerSlide, setCurrentCareerSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuOptions = ["vision", "Skills & Technologies", "career", "donation", "social"];

  // Check screen size for mobile responsiveness
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const leadershipProfiles = [
    { id: 1, name: "JavaScript", role: "Frontend & Backend", experience: "ES6+, Async Programming" },
    { id: 2, name: "ReactJS", role: "Frontend", experience: "Hooks, Context API, Component Architecture" },
{ id: 3, name: "HTML5", role: "Frontend", experience: "Semantic Markup, Accessibility" },
{ id: 4, name: "CSS3", role: "Frontend", experience: "Flexbox, Grid, Animations, Responsive Design" },
{ id: 5, name: "Node.js", role: "Backend", experience: "Express.js, RESTful APIs" },
{ id: 6, name: "MongoDB", role: "Database", experience: "NoSQL, Mongoose ODM, Aggregation" },
{ id: 11, name: "Next.js", role: "Full-Stack", experience: "SSR, SSG, API Routes" },
{ id: 12, name: "Redux", role: "Frontend", experience: "State Management, Redux Toolkit" },
{ id: 8, name: "Git", role: "Version Control", experience: "Branching, Merging, Collaboration" },
{ id: 19, name: "Postman", role: "Testing", experience: "API Testing, Documentation" },
  ];

  const careerSlides = [
    {
      title: "Frontend Developer",
      description: "Build amazing user interfaces with modern technologies like React, Vue, and Angular.",
      requirements: ["1+ years React", "ReactJS", "CSS3", "Responsive Design"],
      location: "flexible / Remote",
      type: "Full-time"
    },
    {
      title: "Backend Engineer",
      description: "Develop scalable server-side applications and APIs using Node.js and cloud technologies.",
      requirements: ["Node.js", "SQL/MongoDB", "Database design"],
      location: "Flexible / Remote",
      type: "Actively developing"
    },
    {
      title: "UX Designer",
      description: "Create intuitive and beautiful user experiences for our digital products.",
      requirements: ["Figma", "User research", "Prototyping"],
      location: "Flexible / Remote",
      type: "Full-time"
    },
    {
      title: "Software Development Engineer",
      description: "Design and develop robust, scalable software solutions across the full development lifecycle.",
      requirements: ["DSA", "System Design", "Problem Solving", "Full-Stack Development"],
      location: "Open to Opportunities",
      type: "Actively Developing"
    }
  ];

  const socialCards = [
    {
      platform: "LinkedIn",
      handle: "@aakashkumarsahu",
      type: "Professional",
      description: "Connect with me for professional networking and career opportunities.",
      followers: "500+",
      link: "https://linkedin.com/in/aakashkumarsahu"
    },
    {
      platform: "GitHub",
      handle: "@betheaakashhh",
      type: "Public Repos",
      description: "Check out my code, projects, and contributions to open source.",
      followers: "3",
      link: "https://github.com/betheaakashhh"
    },
    {
      platform: "Twitter/X",
      handle: "@aakashcodes",
      type: "Tech & Updates",
      description: "Follow for tech insights, learning journey, and industry updates.",
      followers: "200+",
      link: "https://twitter.com"
    },
    {
      platform: "Instagram",
      handle: "@betheaakashhh",
      type: "Private",
      description: "Personal updates, coding snippets, and behind-the-scenes content.",
      followers: "300+",
      link: "https://instagram.com/betheaakashhh"
    }
  ];

  const nextCareerSlide = () => {
    setCurrentCareerSlide((prev) => (prev + 1) % careerSlides.length);
  };

  const prevCareerSlide = () => {
    setCurrentCareerSlide((prev) => (prev - 1 + careerSlides.length) % careerSlides.length);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (isMobile) {
      setMenuOpen(false);
    }
  };

  const handleDonate = (amount = null) => {
    if (amount) {
      alert(`Thank you for your donation of $${amount}!`);
    } else {
      alert("Redirecting to donation page...");
    }
  };

  const handleReferFriend = (personName) => {
    alert(`Referral initiated for ${personName}! Share this amazing opportunity with your friends.`);
  };

  const handleHireNow = (position) => {
    alert(`You're Hiring for: ${position}\n Thank you for your interest! i will get back to you soon.`);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const getMenuIcon = (option) => {
    switch (option) {
      case 'vision': return '🔮';
      case 'Skills & Technologies': return '👑';
      case 'career': return '💼';
      case 'donation': return '❤️';
      case 'social': return '👥';
      default: return '⭐';
    }
  };

  return (
    <div className="modern-hero-section">
      {/* Animated Background */}
      <div className="modern-hero-background">
        <div className="modern-floating-orb modern-orb-1"></div>
        <div className="modern-floating-orb modern-orb-2"></div>
        <div className="modern-floating-orb modern-orb-3"></div>
        <div className="modern-grid-lines"></div>
      </div>

      <div className="modern-hero-container">
        {/* Left Menu Section - Hidden on mobile */}
        {!isMobile && (
          <div className="modern-menu-section">
            <div className="modern-menu-container">
              <h2 className="modern-menu-title">Explore Our World</h2>
              <div className="modern-menu-options">
                {menuOptions.map((option) => (
                  <button
                    key={option}
                    className={`modern-menu-option ${activeSection === option ? 'active' : ''}`}
                    onClick={() => handleSectionChange(option)}
                  >
                    <span className="modern-menu-icon">
                      {getMenuIcon(option)}
                    </span>
                    <span className="modern-menu-text">
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </span>
                    <span className="modern-menu-arrow">→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Right Content Section */}
        <div className="modern-content-section">
          <div className="modern-content-container">
            
            {/* Vision Section */}
            {activeSection === "vision" && (
              <div className="modern-content-slide">
                <div className="modern-glassy-card vision-card">
                  <h2 className="modern-content-title">
                    My <span className="modern-gradient-text">Vision</span>
                  </h2>
                  <div className="modern-content-grid">
                    <div className="modern-grid-item">
                      
                      <h3>Innovate Continuously</h3>
                      <p>I believe in pushing technological boundaries through continuous learning and experimentation. By staying ahead of industry trends and embracing emerging technologies, I aim to craft solutions that not only solve today's challenges but anticipate tomorrow's needs.</p>
                    </div>
                    <div className="modern-grid-item">
                      
                      <h3>Build With Purpose</h3>
                      <p>Every line of code serves a purpose. I am committed to developing software that delivers tangible value, prioritizing clean architecture, scalability, and user-centric design. My goal is to create digital solutions that make a meaningful impact on businesses and end-users alike</p>
                    </div>
                    <div className="modern-grid-item">
                     
                      <h3>Master The Craft</h3>
                      <p>Software development is both science and art. I dedicate myself to mastering core engineering principles, design patterns, and best practices while refining my technical skills across the full development stack. Excellence is not a destination—it's a continuous journey of growth and improvement.</p>
                    </div>
                    <div className="modern-grid-item">
                     
                      <h3>Collaborate & Deliver</h3>
                      <p>Great software is built by great teams. I value collaborative problem-solving, knowledge sharing, and delivering results that exceed expectations. By combining technical expertise with effective communication, I strive to contribute meaningfully to every project and drive collective success.</p>
                    </div>
                  </div>
                  <div className="modern-vision-actions">
                    <button className="modern-action-btn primary" onClick={() => handleSectionChange('career')}>
                     Career Opportunities
                    </button>
                    <button className="modern-action-btn secondary" onClick={() => handleSectionChange('Skills & Technologies')}>
                      Skills & Technologies
                    </button>
                  </div>
                </div>
              </div>
            )}
            

            {/* Leadership Section */}
            {activeSection === "Skills & Technologies" && (
              <div className="modern-content-slide">
                <div className="modern-glassy-card leadership-card">
                  <h2 className="modern-content-title">
                    <span className="modern-gradient-text">Skills & Technologies</span>
                  </h2>
                  <p className="modern-section-subtitle">
                    Experienced professionals guiding our journey towards innovation and excellence
                  </p>
                  <div className="modern-leadership-grid">
                    {leadershipProfiles.map((profile) => (
                      <div key={profile.id} className="modern-profile-card">
                        <div className="modern-profile-image">
                          <div className="modern-profile-overlay"></div>
                          <div className="modern-profile-initial">
                            {profile.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        </div>
                        <div className="modern-profile-info">
                          <h3>{profile.name}</h3>
                          <p className="modern-profile-role">{profile.role}</p>
                          <p className="modern-profile-exp">{profile.experience}</p>
                        </div>
                        
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Career Section */}
            {activeSection === "career" && (
              <div className="modern-content-slide">
                <div className="modern-glassy-card career-card">
                  <h2 className="modern-content-title">
                   <span className="modern-gradient-text">Career</span> Direction
                  </h2>
                  <p className="modern-section-subtitle">
                    Join our team and work on cutting-edge projects that make a difference
                  </p>
                  <div className="modern-career-slider">
                    <div className="modern-slide-container">
                      <div className="modern-slide-content">
                        <div className="modern-job-badge">
                          {careerSlides[currentCareerSlide].type}
                        </div>
                        <h3>{careerSlides[currentCareerSlide].title}</h3>
                        <p>{careerSlides[currentCareerSlide].description}</p>
                        <div className="modern-requirements">
                          {careerSlides[currentCareerSlide].requirements.map((req, index) => (
                            <span key={index} className="modern-req-tag">{req}</span>
                          ))}
                        </div>
                        <div className="modern-job-meta">
                          <span className="modern-location">
                            📍 {careerSlides[currentCareerSlide].location}
                          </span>
                          <span className="modern-slide-count">
                            {currentCareerSlide + 1} / {careerSlides.length}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="modern-slider-controls">
                      <button className="modern-slider-btn" onClick={prevCareerSlide}>
                        ← Previous
                      </button>
                      <div className="modern-slider-dots">
                        {careerSlides.map((_, index) => (
                          <span
                            key={index}
                            className={`modern-dot ${index === currentCareerSlide ? 'active' : ''}`}
                            onClick={() => setCurrentCareerSlide(index)}
                          ></span>
                        ))}
                      </div>
                      <button className="modern-slider-btn" onClick={nextCareerSlide}>
                        Next →
                      </button>
                    </div>
                    <button 
                      className="modern-apply-btn"
                      onClick={() => handleHireNow(careerSlides[currentCareerSlide].title)}
                    >
                      Hire Now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Donation Section */}
            {activeSection === "donation" && (
              <div className="modern-content-slide">
                <div className="modern-glassy-card donation-card">
                  <h2 className="modern-content-title">
                    Make a <span className="modern-gradient-text">Difference</span>
                  </h2>
                  <p className="modern-section-subtitle">
                    Your support fuels innovation and creates lasting impact in communities worldwide
                  </p>
                  <div className="modern-donation-content">
                    <div className="modern-donation-text">
                      <p>Every contribution helps us push the boundaries of what's possible and create solutions that matter.</p>
                      <div className="modern-impact-stats">
                        <div className="modern-stat">
                          <span className="modern-stat-number">50K+</span>
                          <span className="modern-stat-label">Lives Impacted</span>
                        </div>
                        <div className="modern-stat">
                          <span className="modern-stat-number">100+</span>
                          <span className="modern-stat-label">Projects Funded</span>
                        </div>
                        <div className="modern-stat">
                          <span className="modern-stat-number">25+</span>
                          <span className="modern-stat-label">Countries Reached</span>
                        </div>
                      </div>
                      
                      <div className="modern-quick-donate">
                        <h4>Quick Donate</h4>
                        <div className="modern-donate-amounts">
                          {[25, 50, 100, 250].map(amount => (
                            <button
                              key={amount}
                              className="modern-donate-amount-btn"
                              onClick={() => handleDonate(amount)}
                            >
                              ${amount}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="modern-donation-actions">
                      <button 
                        className="modern-donate-btn modern-donate-primary"
                        onClick={() => handleDonate()}
                      >
                        💝 Donate Now
                      </button>
                      <button 
                        className="modern-donate-btn modern-donate-secondary"
                        onClick={() => handleSectionChange('vision')}
                      >
                        Learn About Impact
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* People Section */}
           {activeSection === "social" && (
  <div className="modern-content-slide">
    <div className="modern-glassy-card people-card">
      <h2 className="modern-content-title">
        Let's <span className="modern-gradient-text">Connect</span>
      </h2>
      <p className="modern-section-subtitle">
        Follow me across platforms to stay updated with my journey and projects
      </p>
      <div className="modern-people-grid">
        {socialCards.map((social, index) => (
          <div key={index} className="modern-person-card">
            <div className="modern-person-header">
              <div className="modern-person-avatar">
                {social.platform.substring(0, 2).toUpperCase()}
              </div>
              <div className="modern-person-info">
                <h3>{social.platform}</h3>
                <p>{social.handle}</p>
                <div className="modern-person-meta">
                  <span className="modern-person-dept">{social.type}</span>
                  <span className="modern-person-joined">{social.followers} followers</span>
                </div>
              </div>
            </div>
            <p className="modern-person-quote">"{social.description}"</p>
            <div className="modern-person-actions">
              <button 
                className="modern-refer-btn"
                onClick={() => window.open(social.link, '_blank')}
              >
                🔗 Visit Profile
              </button>
              <button 
                className="modern-connect-btn"
                onClick={() => {
                  navigator.clipboard.writeText(social.link);
                  alert(`Link copied: ${social.link}`);
                }}
              >
                📋 Copy Link
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="modern-mobile-nav">
          <div className={`modern-nav-container ${menuOpen ? 'menu-open' : ''}`}>
            {/* Main Menu Button */}
            <button className="modern-nav-toggle" onClick={toggleMenu}>
              <span className="modern-nav-icon">
                {menuOpen ? '✕' : '☰'}
              </span>
              <span className="modern-nav-label">
                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
              </span>
            </button>

            {/* Navigation Options */}
            <div className="modern-nav-options">
              {menuOptions.map((option) => (
                <button
                  key={option}
                  className={`modern-nav-option ${activeSection === option ? 'active' : ''}`}
                  onClick={() => handleSectionChange(option)}
                >
                  <span className="modern-nav-option-icon">
                    {getMenuIcon(option)}
                  </span>
                  <span className="modern-nav-option-text">
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ModernHeroSection;