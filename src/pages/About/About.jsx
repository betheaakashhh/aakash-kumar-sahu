import React, { useEffect, useRef, useState } from 'react';
import {useNavigate} from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Zap, Target, Sparkles, Download, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import Timeline from './Timeline'; // Import your Timeline component
import './about.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const descriptorRef = useRef(null);
  const summaryRef = useRef(null);
  const strengthsRef = useRef(null);
  const techStackRef = useRef(null);
  const philosophyRef = useRef(null);
  const ctaRef = useRef(null);
  const navigate = useNavigate();
  
  const [currentDescriptor, setCurrentDescriptor] = useState(0);
  const descriptors = [
    "Full-Stack Developer",
    "Problem Solver",
    "Code Enthusiast",
    "Tech Explorer"
  ];

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // Rotating descriptors
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDescriptor((prev) => (prev + 1) % descriptors.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      gsap.from(nameRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power4.out'
      });

      gsap.from(descriptorRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
      });

      // Parallax effect on scroll
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        y: 200,
        opacity: 0.5
      });

      // Summary animation
      gsap.from(summaryRef.current?.querySelectorAll('.as-abt-summary-text'), {
        scrollTrigger: {
          trigger: summaryRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Strengths cards animation
     

     

      

    });

    return () => ctx.revert();
  }, []);

  const strengthsData = [
    {
      icon: <Code size={32} />,
      title: "Full-Stack Development",
      description: "MERN Stack & Modern Web Technologies"
    },

    {
      icon: <Zap size={32} />,
      title: "Performance Optimization",
      description: "Clean, efficient, and scalable code"
    },
    {
      icon: <Target size={32} />,
      title: "Problem Solving",
      description: "Data Structures & Algorithms"
    },
    {
      icon: <Sparkles size={32} />,
      title: "Continuous Learning",
      description: "Always exploring new technologies"
    }
  ];

  const techStack = {
    frontend: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
    backend: ['Node.js', 'Express.js', 'REST APIs'],
    database: ['MongoDB', 'MySQL'],
    tools: ['Git', 'GitHub', 'Docker', 'VS Code', 'Postman']
  };

  const philosophy = [
    { emoji: '🎯', text: 'Clean, maintainable code' },
    { emoji: '🚀', text: 'Learning by building' },
    { emoji: '🤝', text: 'Collaboration over ego' },
    { emoji: '⚡', text: 'Consistency over hype' }
  ];

  const handleDownload = () =>{
    navigate("/resume");
  }

  return (
    <div className="as-abt-container">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="as-abt-hero"
        style={{ opacity, scale }}
      >
        <div className="as-abt-hero-content">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="as-abt-hero-decoration"
          >
            <div className="as-abt-circle-1"></div>
            <div className="as-abt-circle-2"></div>
            <div className="as-abt-circle-3"></div>
          </motion.div>

          <h1 ref={nameRef} className="as-abt-name">
            Aakash Kumar Sahu
          </h1>
          
          <div ref={descriptorRef} className="as-abt-descriptor-container">
            <motion.p
              key={currentDescriptor}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="as-abt-descriptor"
            >
              {descriptors[currentDescriptor]}
            </motion.p>
          </div>

          <p className="as-abt-tagline">
            I build scalable web applications and solve real-world problems.
          </p>

          <motion.div 
            className="as-abt-hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <button className="as-abt-btn-primary">
              <Mail size={20} />
              Get In Touch
            </button>
            <button className="as-abt-btn-secondary" onClick={handleDownload}>
              <Download size={20} />
              Download Resume
            </button>
          </motion.div>

          <motion.div 
            className="as-abt-social-links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <a href="#" className="as-abt-social-link"><Github size={24} /></a>
            <a href="#" className="as-abt-social-link"><Linkedin size={24} /></a>
            <a href="#" className="as-abt-social-link"><Twitter size={24} /></a>
          </motion.div>
        </div>

        <div className="as-abt-scroll-indicator">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="as-abt-scroll-arrow"
          >
            ↓
          </motion.div>
        </div>
      </motion.section>

      {/* Professional Summary */}
      <section ref={summaryRef} className="as-abt-section as-abt-summary">
        <div className="as-abt-section-content">
          <motion.h2 
            className="as-abt-section-title"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Professional Summary
          </motion.h2>
          <div className="as-abt-summary-content">
            <p className="as-abt-summary-text">
              I'm a Computer Science student with hands-on experience in full-stack development and research-based projects. I specialize in building clean, performant MERN applications and enjoy working on systems that require both logical thinking and creativity.
            </p>
            <p className="as-abt-summary-text">
              With practical experience from my internship at IIT Bhubaneswar and multiple personal projects, I've developed a strong foundation in creating scalable web solutions. I approach every challenge with curiosity and a commitment to writing maintainable code.
            </p>
          </div>
        </div>
      </section>

      {/* Core Strengths */}
      <section ref={strengthsRef} className="as-abt-section as-abt-strengths">
        <div className="as-abt-section-content">
          <motion.h2 
            className="as-abt-section-title"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What I'm Good At
          </motion.h2>
          <div className="as-abt-strengths-grid">
            {strengthsData.map((strength, index) => (
              <motion.div
                key={index}
                className="as-abt-strength-card"
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="as-abt-strength-icon">
                  {strength.icon}
                </div>
                <h3 className="as-abt-strength-title">{strength.title}</h3>
                <p className="as-abt-strength-desc">{strength.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section - Your Component */}
      <section className="as-abt-section as-abt-timeline-wrapper">
        <div className="as-abt-section-content">
          <motion.h2 
            className="as-abt-section-title"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            My Journey
          </motion.h2>
          <Timeline />
        </div>
      </section>

      {/* Tech Stack */}
      <section ref={techStackRef} className="as-abt-section as-abt-tech-stack">
        <div className="as-abt-section-content">
          <motion.h2 
            className="as-abt-section-title"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Tech Stack & Tools
          </motion.h2>
          <div className="as-abt-tech-grid">
            {Object.entries(techStack).map(([category, items]) => (
              <div key={category} className="as-abt-tech-category">
                <h3 className="as-abt-tech-category-title">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h3>
                <div className="as-abt-tech-items">
                  {items.map((tech, idx) => (
                    <motion.span
                      key={idx}
                      className="as-abt-tech-item"
                      whileHover={{ scale: 1.1, y: -5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Focus */}
      <section className="as-abt-section as-abt-focus">
        <div className="as-abt-section-content">
          <motion.div
            className="as-abt-focus-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="as-abt-focus-icon">🎯</div>
            <h2 className="as-abt-focus-title">Currently Focused On</h2>
            <p className="as-abt-focus-text">
              Exploring advanced backend architecture, system design, and scalable application development. Currently diving deep into microservices patterns and cloud-native technologies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Work Philosophy */}
      <section ref={philosophyRef} className="as-abt-section as-abt-philosophy">
        <div className="as-abt-section-content">
          <motion.h2 
            className="as-abt-section-title"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Work Philosophy
          </motion.h2>
          <div className="as-abt-philosophy-grid">
            {philosophy.map((item, index) => (
              <motion.div
                key={index}
                className="as-abt-philosophy-item"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="as-abt-philosophy-emoji">{item.emoji}</span>
                <span className="as-abt-philosophy-text">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section ref={ctaRef} className="as-abt-section as-abt-final-cta">
        <motion.div
          className="as-abt-cta-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="as-abt-cta-title">Let's Build Something Amazing</h2>
          <p className="as-abt-cta-subtitle">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <motion.div 
            className="as-abt-cta-buttons"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <button className="as-abt-btn-primary as-abt-btn-large">
              View My Projects
            </button>
            <button className="as-abt-btn-secondary as-abt-btn-large">
              Download Resume
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Background Elements */}
      <div className="as-abt-bg-gradient-1"></div>
      <div className="as-abt-bg-gradient-2"></div>
    </div>
  );
};

export default About;