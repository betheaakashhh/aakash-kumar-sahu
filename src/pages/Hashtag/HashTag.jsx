import React, { useState, useEffect, useRef } from "react";
import "./hashtag.css";

const HashTag = () => {
  const [showAllRows, setShowAllRows] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const rowRefs = useRef([]);

  const hashtags = [
    "#Innovation", "#Technology", "#Future", "#Digital", "#AI", "#MachineLearning", "#Blockchain",
    "#Cloud", "#DevOps", "#Cybersecurity", "#Web3", "#Metaverse", "#AR", "#VR", "#IoT",
    "#BigData", "#Analytics", "#Automation", "#Robotics", "#SaaS", "#Startup", "#Entrepreneurship",
    "#Leadership", "#Management", "#Strategy", "#Growth", "#Marketing", "#Branding", "#Content",
    "#SocialMedia", "#SEO", "#UX", "#UI", "#Design", "#Creative", "#Art", "#Photography",
    "#Video", "#Animation", "#Music", "#Gaming", "#Esports", "#Streaming", "#Community",
    "#Networking", "#Collaboration", "#Teamwork", "#RemoteWork", "#Productivity", "#Wellness",
    "#Mindfulness", "#Fitness", "#Health", "#Nutrition", "#Sustainability", "#EcoFriendly",
    "#GreenTech", "#Climate", "#Environment", "#Renewable", "#Solar", "#Wind", "#EV",
    "#Mobility", "#SmartCities", "#UrbanPlanning", "#Architecture", "#RealEstate", "#Finance",
    "#Crypto", "#DeFi", "#NFT", "#Investing", "#Trading", "#Stocks", "#Wealth",
    "#Education", "#Learning", "#EdTech", "#OnlineCourses", "#Skills", "#Career", "#Jobs",
    "#Recruitment", "#Talent", "#Diversity", "#Inclusion", "#Equality", "#SocialImpact",
    "#Philanthropy", "#Nonprofit", "#Volunteering", "#Charity", "#Fundraising", "#Events",
    "#Conference", "#Workshop", "#Webinar", "#Meetup", "#Travel", "#Adventure", "#Explore"
  ];

  // Generate random widths for hashtags
  const getRandomWidth = () => {
    const widths = [80, 100, 120, 140, 160, 180, 200, 220, 240];
    return widths[Math.floor(Math.random() * widths.length)];
  };

  // Generate random opacity for visual variety
  const getRandomOpacity = () => {
    return Math.random() * 0.4 + 0.3; // Between 0.3 and 0.7
  };

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Create 10 rows with hashtags
  const rows = [];
  for (let i = 0; i < 10; i++) {
    const rowHashtags = [];
    const itemsPerRow = isMobile ? 12 : 20;
    
    for (let j = 0; j < itemsPerRow; j++) {
      const hashtagIndex = (i * itemsPerRow + j) % hashtags.length;
      rowHashtags.push({
        text: hashtags[hashtagIndex],
        width: getRandomWidth(),
        opacity: getRandomOpacity()
      });
    }
    rows.push(rowHashtags);
  }

  const visibleRows = isMobile && !showAllRows ? rows.slice(0, 3) : rows;

  // Set up horizontal scrolling animations
  useEffect(() => {
    const observers = [];
    
    visibleRows.forEach((_, index) => {
      const row = rowRefs.current[index];
      if (!row) return;

      const duration = 40 + (index % 5) * 10; // Vary duration for visual interest
      const direction = index % 2 === 0 ? 'reverse' : 'normal';
      
      row.style.setProperty('--scroll-duration', `${duration}s`);
      row.style.animationDirection = direction;
      
      // Add intersection observer to pause animation when not visible
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.style.animationPlayState = 'running';
            } else {
              entry.target.style.animationPlayState = 'paused';
            }
          });
        },
        { threshold: 0.1 }
      );
      
      observer.observe(row);
      observers.push(observer);
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [visibleRows, isMobile]);

  return (
    <div className="hashtag-grid-section">
      {/* Animated Background */}
      <div className="hashtag-grid-background">
        <div className="hashtag-floating-orb hashtag-orb-1"></div>
        <div className="hashtag-floating-orb hashtag-orb-2"></div>
        <div className="hashtag-floating-orb hashtag-orb-3"></div>
        <div className="hashtag-grid-lines"></div>
      </div>

      <div className="hashtag-grid-container">
        {/* Header */}
        <div className="hashtag-header">
          <h2 className="hashtag-title">
            Trending <span className="hashtag-gradient">Topics</span>
          </h2>
          <p className="hashtag-subtitle">
            Explore the conversations shaping our digital future
          </p>
        </div>

        {/* Hashtag Grid with Horizontal Scrolling */}
        <div className="hashtag-grid-horizontal">
          {visibleRows.map((row, rowIndex) => (
            <div 
              key={rowIndex}
              ref={el => rowRefs.current[rowIndex] = el}
              className={`hashtag-row-scroll ${
                rowIndex % 2 === 0 ? 'scroll-right' : 'scroll-left'
              }`}
            >
              {/* Double the content for seamless looping */}
              {[...row, ...row].map((hashtag, hashtagIndex) => (
                <div
                  key={hashtagIndex}
                  className="hashtag-item-scroll"
                  style={{
                    width: `${hashtag.width}px`,
                    opacity: hashtag.opacity
                  }}
                >
                  <span className="hashtag-text">{hashtag.text}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Show More Button for Mobile/Tablet */}
        {isMobile && !showAllRows && (
          <div className="hashtag-reveal-section">
            <div className="hashtag-reveal-overlay"></div>
            <button 
              className="hashtag-reveal-btn"
              onClick={() => setShowAllRows(true)}
            >
              <span className="hashtag-reveal-icon">⌄</span>
              <span className="hashtag-reveal-text">Explore More Topics</span>
              <span className="hashtag-reveal-count">+{rows.length - 3} rows</span>
            </button>
          </div>
        )}

        {/* Show Less Button when expanded */}
        {isMobile && showAllRows && (
          <div className="hashtag-collapse-section">
            <button 
              className="hashtag-collapse-btn"
              onClick={() => setShowAllRows(false)}
            >
              <span className="hashtag-collapse-icon">⌃</span>
              <span className="hashtag-collapse-text">Show Less</span>
            </button>
          </div>
        )}

        {/* Stats Footer */}
        <div className="hashtag-stats">
          <div className="hashtag-stat">
            <span className="hashtag-stat-number">200+</span>
            <span className="hashtag-stat-label">Topics</span>
          </div>
          <div className="hashtag-stat">
            <span className="hashtag-stat-number">10K+</span>
            <span className="hashtag-stat-label">Conversations</span>
          </div>
          <div className="hashtag-stat">
            <span className="hashtag-stat-number">24/7</span>
            <span className="hashtag-stat-label">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HashTag;