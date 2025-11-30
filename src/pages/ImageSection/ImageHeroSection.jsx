import React from "react";
import "./ImageHeroSection.css";


const ImageHeroSection = () => {
  return (
    <div className="modern-dark-section">
      {/* Animated Background */}
      <div className="modern-dark-background">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
       
      </div>

      {/* Content Container */}
      <div className="content-container">
        {/* Animated Heading */}
        <div className="text-animation-container">
          <h2 className="animated-heading">
            <span className="title-gradient">Aakash Kumar Sahu</span>
          </h2>
          <p className="animated-subtitle">
            Computer Science Engineer | Aspiring Software Development Engineer | Web Development Specialist
          </p>
          <p className="animated-description">
            Committed to Technical Excellence and Continuous Growth. Specializing in full-stack web development 
            with expertise in modern technologies. Driven by innovation, problem-solving, and the goal of becoming 
            a world-class engineer who delivers scalable, maintainable software solutions.
          </p>
        </div>

        {/* Floating Images Container */}
        <div className="images-container">
          {/* Image 1 */}
          <div className="image-wrapper image-1">
            <div className="glassy-image">
              <div className="image-content">
                <div className="image-overlay"></div>
                <div className="image-text">
                  <h3>Full-Stack Development</h3>
                  <p>Building end-to-end solutions with modern frameworks</p>
                </div>
              </div>
            </div>
            <div className="floating-dots"></div>
          </div>

          {/* Image 2 */}
          <div className="image-wrapper image-2">
            <div className="glassy-image">
              <div className="image-content">
                <div className="image-overlay"></div>
                <div className="image-text">
                  <h3>Clean Code Advocate</h3>
                  <p>Writing maintainable, scalable, and efficient code</p>
                </div>
              </div>
            </div>
            <div className="floating-dots"></div>
          </div>

          {/* Image 3 */}
          <div className="image-wrapper image-3">
            <div className="glassy-image">
              <div className="image-content">
                <div className="image-overlay"></div>
                <div className="image-text">
                  <h3>Continuous Learner</h3>
                  <p>Staying current with industry best practices</p>
                </div>
              </div>
            </div>
            <div className="floating-dots"></div>
          </div>
        </div>

        {/* Floating Text Elements */}
        <div className="floating-text-elements">
          <div className="floating-text text-1">Innovate</div>
          <div className="floating-text text-2">Engineer</div>
          <div className="floating-text text-3">Build</div>
          <div className="floating-text text-4">Excel</div>
        </div>
          
      </div>
      
    </div>
    
  );
};

export default ImageHeroSection;