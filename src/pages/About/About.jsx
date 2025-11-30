import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./about.css"
import Navbar from '../Navbar/Navbar'

const About = () => {
  const navigate = useNavigate();
  
  const handleLoginClick = () => {
    navigate('/login');
  }

  return (
    <section className="about-section" id="about">
      <Navbar />
      <div className="about-container">
        <div className="about-content">
          
          <div className="about-text">
            <div className="section-header">
              <h1 className="about-title">About Me</h1>
              <div className="title-underline"></div>
            </div>
            
            <div className="about-description">
              <p className="intro-text">
                <span className="highlight">Hello! I'm Aakash Kumar Sahu</span>, a passionate Computer Science student and aspiring software developer dedicated to creating innovative solutions and pushing the boundaries of technology.
              </p>
              
              <div className="mission-card">
                <h3>My Journey</h3>
                <p>Currently pursuing B.Tech in Computer Science & Engineering, I combine academic excellence with practical experience to build impactful projects that solve real-world problems.</p>
              </div>
              
              <div className="education-section">
                <h3>🎓 Education</h3>
                <div className="edu-item">
                  <h4>Bachelor of Technology (B.Tech)</h4>
                  <p className="course">Computer Science & Engineering</p>
                  <p className="college">Rungta Shri Ramswaroop Ram College of Engineering & Technology (RSRRCET), Bhilai</p>
                </div>
              </div>

              <div className="experience-section">
                <h3>💼 Professional Experience</h3>
                <div className="exp-item">
                  <h4>Technical Intern</h4>
                  <p className="organization">Indian Institute of Technology (IIT) Bhubaneswar</p>
                  <p className="exp-desc">Gained hands-on experience in cutting-edge technologies and collaborated with renowned researchers on innovative projects.</p>
                </div>
              </div>
              
              <div className="values-grid">
                <div className="value-item">
                  <div className="value-icon">💻</div>
                  <h4>Full Stack Development</h4>
                  <p>MERN Stack & Modern Web Technologies</p>
                </div>
                <div className="value-item">
                  <div className="value-icon">🚀</div>
                  <h4>Problem Solving</h4>
                  <p>Data Structures & Algorithms</p>
                </div>
                <div className="value-item">
                  <div className="value-icon">🎯</div>
                  <h4>Continuous Learning</h4>
                  <p>Always exploring new technologies</p>
                </div>
              </div>
              
              <p>My journey in technology began with a curiosity to understand how things work and has evolved into a passion for building solutions that make a difference. From web applications to complex algorithms, I thrive on challenges that push my boundaries and expand my skill set.</p>
              
              <p>Beyond coding, I believe in the power of collaboration, continuous learning, and giving back to the community. My experience at IIT Bhubaneswar has shaped my approach to problem-solving and reinforced my commitment to excellence in everything I do.</p>
              
              <div className="cta-section">
                <p className="cta-text">Want to know more about my work?</p>
                <button onClick={handleLoginClick} className="cta-button">
                  View My Projects
                </button>
              </div>
            </div>
            
            <div className="tech-stack-section">
              <h3>🛠️ Technical Skills</h3>
              <div className="tech-grid">
                <span className="tech-badge">React.js</span>
                <span className="tech-badge">Node.js</span>
                <span className="tech-badge">MongoDB</span>
                <span className="tech-badge">Express.js</span>
                <span className="tech-badge">JavaScript</span>
                <span className="tech-badge">Python</span>
                <span className="tech-badge">Git</span>
                <span className="tech-badge">REST APIs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About