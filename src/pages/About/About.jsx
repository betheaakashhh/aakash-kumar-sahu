import React, { useEffect, useRef, useState } from 'react';
import {useNavigate} from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Zap, Target, Sparkles, Download, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Award, Calendar, Building, BookOpen, GraduationCap, LinkIcon } from 'lucide-react';
import { Assets, CertificatePreview } from './Assets.jsx';
import Navbar from "../Navbar/Navbar";

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
  
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [selectedItem, setSelectedItem] = useState(null);
    const [detailType, setDetailType] = useState(null);
    const [previewCert, setPreviewCert] = useState(null);
    const contentRef = useRef(null);
  
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
  const handleGetInTouch = () =>{
    navigate("/contact");
  }

 {/* TImeline */}
 const hackingSequence = [
     '> Initializing system...',
     '> Loading credentials...',
     '> Accessing developer profile...',
     '> Decrypting journey data...',
     '> SUCCESS: Welcome to my story'
   ];
 
   const timelineData = [
     { 
       year: '2024', 
       title: 'Technical Intern', 
       certId: 'iit-bhubaneswar-2024',
       org: 'IIT Bhubaneswar', 
       desc: 'Advanced research in cutting-edge technologies',
       type: 'internship',
       details: {
         internshipName: 'Technical Research Intern',
         organization: 'Indian Institute of Technology (IIT) Bhubaneswar',
         duration: 'May 2024 - August 2024',
         topic: 'Machine Learning & Web Development',
         description: 'Worked on cutting-edge machine learning projects focused on natural language processing and computer vision. Collaborated with PhD researchers to develop scalable web applications for data visualization. Implemented RESTful APIs and optimized database queries resulting in 40% performance improvement.',
         certificate: 'https://example.com/certificates/iit-bhubaneswar-2024.pdf',
         linkedin: 'https://www.linkedin.com/in/yourprofile',
         github: 'https://github.com/yourusername/iit-research-project',
         preview: 'https://iit-project-demo.vercel.app',
         skills: ['Python', 'TensorFlow', 'React.js', 'Node.js', 'MongoDB'],
         achievements: [
           'Published research paper on ML optimization',
           'Developed real-time data visualization dashboard',
           'Mentored 3 junior interns'
         ]
       }
     },
     { 
       year: '2023', 
       title: 'Full Stack Developer', 
       org: 'Personal Projects', 
       desc: 'Built multiple MERN stack applications',
       type: 'internship',
       details: {
         internshipName: 'Freelance Full Stack Developer',
         organization: 'Self-Employed / Freelance',
         duration: 'January 2023 - December 2023',
         topic: 'MERN Stack Development & Cloud Deployment',
         description: 'Developed and deployed 5+ full-stack web applications using MERN stack. Specialized in creating responsive, user-friendly interfaces with React and implementing robust backend solutions with Node.js and Express. Integrated third-party APIs and payment gateways for e-commerce solutions.',
         certificate: 'https://example.com/certificates/freelance-portfolio.pdf',
         linkedin: 'https://www.linkedin.com/in/yourprofile',
         github: 'https://github.com/yourusername/portfolio-projects',
         preview: 'https://portfolio-showcase.vercel.app',
         skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'AWS', 'Docker'],
         achievements: [
           'Built e-commerce platform with 1000+ daily users',
           'Implemented JWT authentication system',
           'Optimized app performance by 60%'
         ]
       }
     },
     { 
       year: '2023', 
       title: 'Started B.Tech', 
       org: 'RSRRCET, Bhilai', 
       desc: 'Computer Science & Engineering journey began',
       type: 'education',
       details: {
         collegeName: 'RSR Rungta College of Engineering & Technology',
         degree: 'Bachelor of Technology (B.Tech)',
         branch: 'Computer Science & Engineering',
         currentSemester: '5th Semester',
         cgpa: '8.5/10',
         startYear: '2023',
         expectedGraduation: '2027',
         collegeWebsite: 'http://rsrrcet.com/rsrrcet.php',
         location: 'Bhilai, Chhattisgarh, India',
         coursework: [
           'Data Structures & Algorithms',
           'Database Management Systems',
           'Operating Systems',
           'Computer Networks',
           'Web Technologies',
           'Machine Learning',
           'Software Engineering',
           'Cloud Computing'
         ],
         achievements: [
           'Department Rank 3 in 2nd Year',
           'Won Smart India Hackathon 2023',
          
           
         ],
         activities: [
           'Member of Coding Club',
          
           
         ]
       }
     },
     { 
       year: '2021', 
       title: 'The Spark', 
       org: 'First Line of Code', 
       desc: 'Discovered passion for programming',
       type: 'internship',
       details: {
         internshipName: 'Programming Foundation',
         organization: 'Self-Learning Journey',
         duration: 'June 2021 - December 2021',
         topic: 'Introduction to Programming & Web Development',
         description: 'Started my programming journey with Python and quickly fell in love with problem-solving. Built my first website using HTML, CSS, and JavaScript. Completed multiple online courses and participated in coding challenges on various platforms.',
         certificate: 'https://example.com/certificates/foundation-course.pdf',
         linkedin: 'https://www.linkedin.com/in/yourprofile',
         github: 'https://github.com/yourusername/learning-journey',
         preview: 'https://first-project.vercel.app',
         skills: ['Python', 'HTML', 'CSS', 'JavaScript', 'Git'],
         achievements: [
           'Completed 50+ coding challenges',
           'Built first portfolio website',
           'Learned fundamentals of DSA'
         ]
       }
     }
   ];
 
  
 
   useEffect(() => {
     const handleMouseMove = (e) => {
       setMousePos({ x: e.clientX, y: e.clientY });
     };
     window.addEventListener('mousemove', handleMouseMove);
     return () => window.removeEventListener('mousemove', handleMouseMove);
   }, []);
 
   
 
   const parallaxOffset = (depth) => ({
     x: (mousePos.x - window.innerWidth / 2) * depth * 0.01,
     y: (mousePos.y - window.innerHeight / 2) * depth * 0.01,
   });
 
   const openDetailView = (item, type) => {
     setSelectedItem(item);
     setDetailType(type);
   };
 
   const closeDetailView = () => {
     setSelectedItem(null);
     setDetailType(null);
   };
 

  return (
    <div className="as-abt-container">
        <Navbar />
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
            <button className="as-abt-btn-primary" onClick={handleGetInTouch}>
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
            <div style={{ 
                width: '100%', 
                minHeight: '100vh', 
                background: 'transparent',
                color: '#fff',
                overflow: selectedItem ? 'hidden' : 'auto',
                position: 'relative'
              }}>
               
          
               
          
               
                {/* Main Content Stage */}
                <AnimatePresence>
          
                    <motion.div
                      ref={contentRef}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      style={{
                        width: '100%',
                        minHeight: '100vh',
                        padding: '80px 20px 40px',
                        background: 'transparent'
                      }}
                    >
                      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <motion.div
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          style={{
                            position: 'fixed',
                            top: '20px',
                            left: '20px',
                            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                            fontWeight: 600,
                            color: '#0ff',
                            textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                            zIndex: 100,
                            transform: `translate(${parallaxOffset(0.5).x}px, ${parallaxOffset(0.5).y}px)`
                          }}
                        >
                          Aakash Kumar Sahu
                        </motion.div>
          
                        {/* Journey Timeline */}
                        <motion.div
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          style={{
                            marginBottom: '80px',
                            transform: `translate(${parallaxOffset(1).x}px, ${parallaxOffset(1).y}px)`
                          }}
                        >
                          <h2 style={{
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            marginBottom: '40px',
                            textAlign: 'center',
                            background: 'linear-gradient(90deg, rgba(40, 60, 60, 1), #00ff88)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                          }}>
                            <span style={{ marginRight: '10px' }}></span>
                          </h2>
                          
                          <div style={{ position: 'relative', padding: '20px 0' }}>
                            <div style={{
                              position: 'absolute',
                              left: '50%',
                              top: 0,
                              bottom: 0,
                              width: '2px',
                              background: 'linear-gradient(180deg, #0ff, #00ff88)',
                              transform: 'translateX(-50%)'
                            }}></div>
                            
                            {timelineData.map((item, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 + index * 0.2 }}
                                whileHover={{ scale: 1.05 }}
                                style={{
                                  display: 'flex',
                                  justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
                                  padding: '20px 0',
                                  position: 'relative'
                                }}
                              >
                                <div style={{
                                  position: 'absolute',
                                  left: '50%',
                                  top: '50%',
                                  transform: 'translate(-50%, -50%)',
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '50%',
                                  background: '#0ff',
                                  border: '3px solid #000',
                                  boxShadow: '0 0 20px rgba(0, 255, 255, 0.8)',
                                  zIndex: 2
                                }}></div>
                                
                                <div 
                                  onClick={() => openDetailView(item, item.type)}
                                  style={{
                                    width: '45%',
                                    padding: '20px',
                                    background: 'rgba(0, 255, 255, 0.05)',
                                    border: '1px solid rgba(0, 255, 255, 0.2)',
                                    borderRadius: '12px',
                                    backdropFilter: 'blur(10px)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                  }}
                                >
                                  <span style={{
                                    display: 'inline-block',
                                    padding: '4px 12px',
                                    background: 'rgba(0, 255, 255, 0.2)',
                                    borderRadius: '20px',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    color: '#0ff',
                                    marginBottom: '10px'
                                  }}>{item.year}</span>
                                  <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', color: '#fff' }}>{item.title}</h3>
                                  <p style={{ color: '#0ff', marginBottom: '8px', fontSize: '14px' }}>{item.org}</p>
                                  <p style={{ color: '#999', fontSize: '14px', lineHeight: '1.6', marginBottom: '12px' }}>{item.desc}</p>
                                  <span style={{ color: '#0ff', fontSize: '12px', fontWeight: 600 }}>Click for details →</span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
          
                        {/* Skills Grid */}
                        <motion.div
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 2 }}
                          style={{
                            marginBottom: '80px',
                            transform: `translate(${parallaxOffset(2).x}px, ${parallaxOffset(2).y}px)`
                          }}
                        >
                          <h2 style={{
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            marginBottom: '40px',
                            textAlign: 'center',
                            background: 'linear-gradient(90deg, #0ff, #00ff88)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                          }}>
                            <span style={{ marginRight: '10px' }}>🛠️</span> Technical Arsenal
                          </h2>
                          
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                            gap: '20px',
                            maxWidth: '800px',
                            margin: '0 auto'
                          }}>
                            {['React.js', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript', 'Python', 'Git', 'REST APIs'].map((skill, index) => (
                              <motion.div
                                key={skill}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 2.2 + index * 0.1 }}
                                whileHover={{ 
                                  scale: 1.1,
                                  boxShadow: '0 8px 30px rgba(0, 255, 255, 0.4)'
                                }}
                                style={{
                                  padding: '20px',
                                  background: 'rgba(0, 255, 255, 0.05)',
                                  border: '1px solid rgba(0, 255, 255, 0.3)',
                                  borderRadius: '12px',
                                  textAlign: 'center',
                                  fontSize: '1rem',
                                  fontWeight: 600,
                                  color: '#0ff',
                                  cursor: 'pointer',
                                  transition: 'all 0.3s'
                                }}
                              >
                                {skill}
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
          
                        {/* CTA Section */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 2.8 }}
                          style={{
                            textAlign: 'center',
                            padding: '60px 20px'
                          }}
                        >
                          <h3 style={{ fontSize: '2rem', marginBottom: '30px', color: '#fff' }}>Ready to see what I've built?</h3>
                          <motion.button
                            onClick={() => alert('Navigate to projects!')}
                            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 255, 0.6)' }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                              padding: '18px 40px',
                              fontSize: '1.2rem',
                              fontWeight: 600,
                              background: 'linear-gradient(90deg, #0ff, #00ff88)',
                              border: 'none',
                              borderRadius: '50px',
                              color: '#000',
                              cursor: 'pointer',
                              transition: 'all 0.3s'
                            }}
                          >
                            Explore My Projects →
                          </motion.button>
                        </motion.div>
                      </div>
                    </motion.div>
                  
                </AnimatePresence>
          
                {/* Detail View Modal */}
                <AnimatePresence>
                  {selectedItem && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100vh',
                        background: 'rgba(0, 0, 0, 0.95)',
                        zIndex: 2000,
                        overflow: 'auto',
                        padding: '20px'
                      }}
                      onClick={closeDetailView}
                    >
                      <motion.div
                        initial={{ scale: 0.8, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.8, y: 50 }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          maxWidth: '900px',
                          margin: '90px auto',
                          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
                          border: '2px solid rgba(0, 255, 255, 0.3)',
                          borderRadius: '20px',
                          padding: '40px',
                          position: 'relative',
                          boxShadow: '0 20px 60px rgba(0, 255, 255, 0.2)'
                        }}
                      >
                        <button
                          onClick={closeDetailView}
                          style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: 'rgba(255, 0, 0, 0.2)',
                            border: '1px solid rgba(255, 0, 0, 0.5)',
                            color: '#ff0000',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '20px',
                            transition: 'all 0.3s'
                          }}
                        >
                          ×
                        </button>
          
                        {detailType === 'internship' && selectedItem.details && (
                          <div>
                            <motion.h2
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              style={{
                                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                                marginBottom: '10px',
                                background: 'linear-gradient(90deg, #0ff, #00ff88)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                              }}
                            >
                              {selectedItem.details.internshipName}
                            </motion.h2>
                            
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0ff' }}>
                                <Building size={18} />
                                <span>{selectedItem.details.organization}</span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0ff' }}>
                                <Calendar size={18} />
                                <span>{selectedItem.details.duration}</span>
                              </div>
                            </div>
          
                            <div style={{ marginBottom: '30px' }}>
                              <h3 style={{ fontSize: '1.3rem', color: '#0ff', marginBottom: '10px' }}>Description</h3>
                              <p style={{ color: '#ccc', lineHeight: '1.8' }}>{selectedItem.details.description}</p>
                            </div>
          
                            {selectedItem.details.skills && (
                              <div style={{ marginBottom: '30px' }}>
                                <h3 style={{ fontSize: '1.3rem', color: '#0ff', marginBottom: '15px' }}>Skills & Technologies</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                  {selectedItem.details.skills.map((skill, i) => (
                                    <span key={i} style={{
                                      padding: '8px 16px',
                                      background: 'rgba(0, 255, 255, 0.1)',
                                      border: '1px solid rgba(0, 255, 255, 0.3)',
                                      borderRadius: '20px',
                                      fontSize: '0.9rem',
                                      color: '#0ff'
                                    }}>
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
          
                            {selectedItem.details.achievements && (
                              <div style={{ marginBottom: '30px' }}>
                                <h3 style={{ fontSize: '1.3rem', color: '#0ff', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <Award size={20} /> Key Achievements
                                </h3>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                  {selectedItem.details.achievements.map((achievement, i) => (
                                    <li key={i} style={{
                                      padding: '12px 0',
                                      borderBottom: '1px solid rgba(0, 255, 255, 0.1)',
                                      color: '#ccc',
                                      display: 'flex',
                                      alignItems: 'start',
                                      gap: '10px'
                                    }}>
                                      <span style={{ color: '#0ff', marginTop: '2px' }}>✓</span>
                                      <span>{achievement}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
          
                            <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '1.3rem', color: '#0ff', marginBottom: '15px' }}>
              Certificate
            </h3>
          
            <button
              onClick={() => {
                const cert = Assets.getCertificate(selectedItem.certId);
                setPreviewCert(prev =>
                  prev?.id === cert?.id ? null : cert
                );
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: previewCert
                  ? 'rgba(255,0,0,0.2)'
                  : 'rgba(0,255,255,0.2)',
                border: previewCert
                  ? '1px solid rgba(255,0,0,0.5)'
                  : '1px solid rgba(0,255,255,0.5)',
                borderRadius: '8px',
                color: previewCert ? '#ff0000' : '#0ff',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              {previewCert ? '✕ Hide Certificate' : 'View Certificate'}
            </button>
          
            {/* 👇 Inline Preview */}
            {previewCert && (
              <CertificatePreview
                certificate={previewCert}
                onClose={() => setPreviewCert(null)}
              />
            )}
          </div>
          
                            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                              <a 
                                href={selectedItem.details.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  padding: '12px 24px',
                                  background: 'rgba(0, 119, 181, 0.2)',
                                  border: '1px solid rgba(0, 119, 181, 0.5)',
                                  borderRadius: '8px',
                                  color: '#0077b5',
                                  textDecoration: 'none',
                                  transition: 'all 0.3s'
                                }}
                              >
                                <Linkedin size={18} />
                                LinkedIn
                              </a>
          
                              <a 
                                href={selectedItem.details.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  padding: '12px 24px',
                                  background: 'rgba(255, 255, 255, 0.1)',
                                  border: '1px solid rgba(255, 255, 255, 0.3)',
                                  borderRadius: '8px',
                                  color: '#fff',
                                  textDecoration: 'none',
                                  transition: 'all 0.3s'
                                }}
                              >
                                <Github size={18} />
                                GitHub Repository
                              </a>
          
                              <a 
                                href={selectedItem.details.preview}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  padding: '12px 24px',
                                  background: 'rgba(0, 255, 136, 0.2)',
                                  border: '1px solid rgba(0, 255, 136, 0.5)',
                                  borderRadius: '8px',
                                  color: '#00ff88',
                                  textDecoration: 'none',
                                  transition: 'all 0.3s'
                                }}
                              >
                                <ExternalLink size={18} />
                                Live Preview
                              </a>
                            </div>
                          </div>
                        )}
          
                        {detailType === 'education' && selectedItem.details && (
                          <div>
                            <motion.h2
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              style={{
                                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                                marginBottom: '10px',
                                background: 'linear-gradient(90deg, #0ff, #00ff88)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                              }}
                            >
                              {selectedItem.details.collegeName}
                            </motion.h2>
          
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0ff' }}>
                                <GraduationCap size={18} />
                                <span>{selectedItem.details.degree}</span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0ff' }}>
                                <BookOpen size={18} />
                                <span>{selectedItem.details.branch}</span>
                              </div>
                            </div>
          
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                              <div style={{
                                padding: '20px',
                                background: 'rgba(0, 255, 255, 0.05)',
                                border: '1px solid rgba(0, 255, 255, 0.2)',
                                borderRadius: '12px'
                              }}>
                                <h4 style={{ color: '#0ff', marginBottom: '8px', fontSize: '0.9rem' }}>Current Semester</h4>
                                <p style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff' }}>{selectedItem.details.currentSemester}</p>
                              </div>
          
                              <div style={{
                                padding: '20px',
                                background: 'rgba(0, 255, 255, 0.05)',
                                border: '1px solid rgba(0, 255, 255, 0.2)',
                                borderRadius: '12px'
                              }}>
                                <h4 style={{ color: '#0ff', marginBottom: '8px', fontSize: '0.9rem' }}>CGPA</h4>
                                <p style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff' }}>{selectedItem.details.cgpa}</p>
                              </div>
          
                              <div style={{
                                padding: '20px',
                                background: 'rgba(0, 255, 255, 0.05)',
                                border: '1px solid rgba(0, 255, 255, 0.2)',
                                borderRadius: '12px'
                              }}>
                                <h4 style={{ color: '#0ff', marginBottom: '8px', fontSize: '0.9rem' }}>Duration</h4>
                                <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#fff' }}>
                                  {selectedItem.details.startYear} - {selectedItem.details.expectedGraduation}
                                </p>
                              </div>
                            </div>
          
                            <div style={{ marginBottom: '30px' }}>
                              <h3 style={{ fontSize: '1.3rem', color: '#0ff', marginBottom: '15px' }}>Location</h3>
                              <p style={{ color: '#ccc', fontSize: '1.1rem' }}>{selectedItem.details.location}</p>
                            </div>
          
                            <div style={{ marginBottom: '30px' }}>
                              <h3 style={{ fontSize: '1.3rem', color: '#0ff', marginBottom: '15px' }}>Relevant Coursework</h3>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px' }}>
                                {selectedItem.details.coursework.map((course, i) => (
                                  <div key={i} style={{
                                    padding: '12px',
                                    background: 'rgba(0, 255, 255, 0.05)',
                                    border: '1px solid rgba(0, 255, 255, 0.1)',
                                    borderRadius: '8px',
                                    color: '#ccc',
                                    fontSize: '0.95rem'
                                  }}>
                                    • {course}
                                  </div>
                                ))}
                              </div>
                            </div>
          
                            {selectedItem.details.achievements && (
                              <div style={{ marginBottom: '30px' }}>
                                <h3 style={{ fontSize: '1.3rem', color: '#0ff', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <Award size={20} /> Academic Achievements
                                </h3>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                  {selectedItem.details.achievements.map((achievement, i) => (
                                    <li key={i} style={{
                                      padding: '12px 0',
                                      borderBottom: '1px solid rgba(0, 255, 255, 0.1)',
                                      color: '#ccc',
                                      display: 'flex',
                                      alignItems: 'start',
                                      gap: '10px'
                                    }}>
                                      <span style={{ color: '#0ff', marginTop: '2px' }}>★</span>
                                      <span>{achievement}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
          
                            {selectedItem.details.activities && (
                              <div style={{ marginBottom: '30px' }}>
                                <h3 style={{ fontSize: '1.3rem', color: '#0ff', marginBottom: '15px' }}>Extra-curricular Activities</h3>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                  {selectedItem.details.activities.map((activity, i) => (
                                    <li key={i} style={{
                                      padding: '12px 0',
                                      borderBottom: '1px solid rgba(0, 255, 255, 0.1)',
                                      color: '#ccc',
                                      display: 'flex',
                                      alignItems: 'start',
                                      gap: '10px'
                                    }}>
                                      <span style={{ color: '#0ff', marginTop: '2px' }}>→</span>
                                      <span>{activity}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
          
                            <div>
                              <a 
                                href={selectedItem.details.collegeWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  padding: '12px 24px',
                                  background: 'rgba(0, 255, 255, 0.1)',
                                  border: '1px solid rgba(0, 255, 255, 0.3)',
                                  borderRadius: '8px',
                                  color: '#0ff',
                                  textDecoration: 'none',
                                  transition: 'all 0.3s'
                                }}
                              >
                                <LinkIcon size={18} />
                                Visit College Website
                              </a>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
          
                <style>{`
                  @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                  }
                  
                  * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                  }
                  
                  @media (max-width: 768px) {
                    div[style*="width: '45%'"] {
                      width: 90% !important;
                    }
                  }
                `}</style>
              </div>
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