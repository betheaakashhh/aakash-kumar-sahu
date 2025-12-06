import React, { useState, useEffect, useRef } from 'react';


const API_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const ResumePage = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visitors, setVisitors] = useState(0);
  const resumeRef = useRef(null);

  useEffect(() => {
    fetchResume();
    trackVisitor();
  }, []);

  const fetchResume = async () => {
    try {
      const res = await fetch(`${API_URL}/api/resume/public`);
      const data = await res.json();
      if (data.success) {
        setResume(data.data);
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
    } finally {
      setLoading(false);
    }
  };

  const trackVisitor = async () => {
    try {
      const res = await fetch(`${API_URL}/api/resume/visitor`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) {
        setVisitors(data.count);
      }
    } catch (error) {
      console.error('Error tracking visitor:', error);
    }
  };

  const handleDownload = () => {
    window.print();
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontFamily: '"Times New Roman", Times, serif',
        fontSize: '18px',
        color: '#333'
      }}>
        Loading resume...
      </div>
    );
  }

  if (!resume) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontFamily: '"Times New Roman", Times, serif',
        fontSize: '18px',
        color: '#333'
      }}>
        Resume not available
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      paddingBottom: '40px',
      
    }}>
      {/* Action Buttons */}
    

      {/* Resume Container */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div 
          ref={resumeRef}
          style={{
            width: '850px',
            backgroundColor: 'white',
            padding: '60px 80px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Times New Roman',
            color: '#000',
            lineHeight: '1.4',
            margin: '3.5rem auto'
          }}
        >
          {/* Header */}
          <header style={{
            textAlign: 'center',
            marginBottom: '25px',
            borderBottom: '2px solid #000',
            paddingBottom: '15px'
          }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              margin: '0 0 8px 0',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              {resume.fullName}
            </h1>
            <div style={{
              fontSize: '16px',
              fontStyle: 'italic',
              marginBottom: '10px',
              color: '#333'
            }}>
              {resume.title}
            </div>
            
            <div style={{
              fontSize: '12px',
              marginBottom: '6px',
              color: '#333'
            }}>
              {resume.email && <span>{resume.email}</span>}
              {resume.phone && <><span style={{ margin: '0 8px', color: '#666' }}>|</span><span>{resume.phone}</span></>}
              {resume.location && <><span style={{ margin: '0 8px', color: '#666' }}>|</span><span>{resume.location}</span></>}
            </div>
            
            <div style={{ fontSize: '12px', color: '#333' }}>
              {resume.portfolio && (
                <>
                  <a href={resume.portfolio} target="_blank" rel="noopener noreferrer" style={{
                    color: '#000',
                    textDecoration: 'none',
                    borderBottom: '1px solid #000'
                  }}>
                    Portfolio
                  </a>
                  {(resume.linkedin || resume.github) && <span style={{ margin: '0 8px', color: '#666' }}>|</span>}
                </>
              )}
              {resume.linkedin && (
                <>
                  <a href={resume.linkedin} target="_blank" rel="noopener noreferrer" style={{
                    color: '#000',
                    textDecoration: 'none',
                    borderBottom: '1px solid #000'
                  }}>
                    LinkedIn
                  </a>
                  {resume.github && <span style={{ margin: '0 8px', color: '#666' }}>|</span>}
                </>
              )}
              {resume.github && (
                <a href={resume.github} target="_blank" rel="noopener noreferrer" style={{
                  color: '#000',
                  textDecoration: 'none',
                  borderBottom: '1px solid #000'
                }}>
                  GitHub
                </a>
              )}
            </div>
          </header>

          {/* Summary */}
          {resume.summary && (
            <section style={{ marginBottom: '20px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                margin: '0 0 4px 0',
                color: '#000'
              }}>
                PROFESSIONAL SUMMARY
              </h2>
              <div style={{
                height: '1px',
                backgroundColor: '#000',
                marginBottom: '12px'
              }}></div>
              <p style={{
                fontSize: '12px',
                textAlign: 'justify',
                margin: '0',
                lineHeight: '1.5'
              }}>
                {resume.summary}
              </p>
            </section>
          )}

          {/* Education */}
          {resume.education?.length > 0 && (
            <section style={{ marginBottom: '20px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                margin: '0 0 4px 0',
                color: '#000'
              }}>
                EDUCATION
              </h2>
              <div style={{
                height: '1px',
                backgroundColor: '#000',
                marginBottom: '12px'
              }}></div>
              {resume.education.map((edu, idx) => (
                <div key={idx} style={{ marginBottom: '16px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '4px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '13px',
                        fontWeight: 'bold',
                        margin: '0 0 2px 0',
                        color: '#000'
                      }}>
                        {edu.institution}
                      </h3>
                      <div style={{
                        fontSize: '12px',
                        fontStyle: 'italic',
                        color: '#333',
                        marginBottom: '2px'
                      }}>
                        {edu.course}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', minWidth: '150px' }}>
                      <div style={{
                        fontSize: '12px',
                        color: '#333',
                        fontStyle: 'italic'
                      }}>
                        {edu.startYear} - {edu.endYear}
                      </div>
                      <div style={{ fontSize: '11px', color: '#555' }}>
                        {edu.location}
                      </div>
                    </div>
                  </div>
                  {edu.cgpa && (
                    <div style={{ fontSize: '11px', color: '#333', marginTop: '4px' }}>
                      CGPA: {edu.cgpa}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {resume.projects?.length > 0 && (
            <section style={{ marginBottom: '20px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                margin: '0 0 4px 0',
                color: '#000'
              }}>
                PROJECTS
              </h2>
              <div style={{
                height: '1px',
                backgroundColor: '#000',
                marginBottom: '12px'
              }}></div>
              {resume.projects.map((project, idx) => (
                <div key={idx} style={{ marginBottom: '16px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '4px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '13px',
                        fontWeight: 'bold',
                        margin: '0 0 2px 0',
                        color: '#000'
                      }}>
                        {project.name}
                      </h3>
                    </div>
                    <div style={{ textAlign: 'right', minWidth: '150px' }}>
                      {(project.startDate || project.endDate) && (
                        <div style={{
                          fontSize: '12px',
                          color: '#333',
                          fontStyle: 'italic'
                        }}>
                          {project.startDate} - {project.endDate}
                        </div>
                      )}
                    </div>
                  </div>
                  <p style={{
                    fontSize: '12px',
                    margin: '6px 0',
                    textAlign: 'justify',
                    lineHeight: '1.4'
                  }}>
                    {project.description}
                  </p>
                  {project.technologies && (
                    <div style={{ fontSize: '11px', color: '#333', marginTop: '4px' }}>
                      <strong>Technologies:</strong> {project.technologies}
                    </div>
                  )}
                  {(project.githubLink || project.liveLink) && (
                    <div style={{ marginTop: '6px', fontSize: '11px' }}>
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" style={{
                          color: '#000',
                          textDecoration: 'none',
                          marginRight: '15px',
                          borderBottom: '1px solid #000'
                        }}>
                          GitHub
                        </a>
                      )}
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" style={{
                          color: '#000',
                          textDecoration: 'none',
                          borderBottom: '1px solid #000'
                        }}>
                          Live Demo
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Certifications */}
          {resume.certifications?.length > 0 && (
            <section style={{ marginBottom: '20px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                margin: '0 0 4px 0',
                color: '#000'
              }}>
                CERTIFICATIONS
              </h2>
              <div style={{
                height: '1px',
                backgroundColor: '#000',
                marginBottom: '12px'
              }}></div>
              {resume.certifications.map((cert, idx) => (
                <div key={idx} style={{ marginBottom: '16px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '4px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '13px',
                        fontWeight: 'bold',
                        margin: '0 0 2px 0',
                        color: '#000'
                      }}>
                        {cert.title}
                      </h3>
                      <div style={{
                        fontSize: '12px',
                        fontStyle: 'italic',
                        color: '#333',
                        marginBottom: '2px'
                      }}>
                        {cert.issuer}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', minWidth: '150px' }}>
                      <div style={{
                        fontSize: '12px',
                        color: '#333',
                        fontStyle: 'italic'
                      }}>
                        {cert.year}
                      </div>
                    </div>
                  </div>
                  {cert.description && (
                    <p style={{
                      fontSize: '12px',
                      margin: '6px 0',
                      textAlign: 'justify',
                      lineHeight: '1.4'
                    }}>
                      {cert.description}
                    </p>
                  )}
                  {cert.certificateLink && (
                    <a href={cert.certificateLink} target="_blank" rel="noopener noreferrer" style={{
                      display: 'inline-block',
                      marginTop: '6px',
                      fontSize: '11px',
                      color: '#000',
                      textDecoration: 'none',
                      borderBottom: '1px solid #000'
                    }}>
                      View Certificate
                    </a>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Extracurricular */}
          {resume.extracurricular?.length > 0 && (
            <section style={{ marginBottom: '20px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                margin: '0 0 4px 0',
                color: '#000'
              }}>
                EXTRACURRICULAR ACTIVITIES
              </h2>
              <div style={{
                height: '1px',
                backgroundColor: '#000',
                marginBottom: '12px'
              }}></div>
              {resume.extracurricular.map((activity, idx) => (
                <div key={idx} style={{ marginBottom: '16px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '4px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '13px',
                        fontWeight: 'bold',
                        margin: '0 0 2px 0',
                        color: '#000'
                      }}>
                        {activity.title}
                      </h3>
                      {activity.organization && (
                        <div style={{
                          fontSize: '12px',
                          fontStyle: 'italic',
                          color: '#333',
                          marginBottom: '2px'
                        }}>
                          {activity.organization}
                        </div>
                      )}
                    </div>
                    <div style={{ textAlign: 'right', minWidth: '150px' }}>
                      <div style={{
                        fontSize: '12px',
                        color: '#333',
                        fontStyle: 'italic'
                      }}>
                        {activity.year}
                      </div>
                    </div>
                  </div>
                  {activity.role && (
                    <div style={{ fontSize: '11px', color: '#333', marginTop: '4px' }}>
                      <strong>Role:</strong> {activity.role}
                    </div>
                  )}
                  <p style={{
                    fontSize: '12px',
                    margin: '6px 0',
                    textAlign: 'justify',
                    lineHeight: '1.4'
                  }}>
                    {activity.description}
                  </p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
       <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '850px',
        margin: '20px auto',
        padding: '0 20px'
      }}>
        <button 
          onClick={handleDownload}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            backgroundColor: '#2c3e50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontFamily: '"Times New Roman", Times, serif',
            fontSize: '16px',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1a252f'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#2c3e50'}
        >
          <span style={{ fontSize: '18px' }}></span> Download Resume
        </button>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 16px',
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontFamily: '"Times New Roman", Times, serif',
          fontSize: '14px',
          color: '#555'
        }}>
          <span style={{ fontSize: '16px' }}>👁</span>
          <span>{visitors} visitors</span>
        </div>
      </div>
      <style>{`
        @media print {
          body {
            background-color: white !important;
          }
          button, .visitor-count {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePage;