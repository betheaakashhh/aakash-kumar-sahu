import React, { useState, useEffect } from 'react';
import './ResumePage.css';

const API_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const ResumePage = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResume();
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

  if (loading) return <div className="resume-loading">Loading resume...</div>;
  if (!resume) return <div className="resume-error">Resume not available</div>;

  return (
    <div className="resume-page">
      <div className="resume-container">
        {/* Header */}
        <header className="resume-header">
          <h1>{resume.fullName}</h1>
          <p className="resume-title">{resume.title}</p>
          <div className="resume-contact">
            {resume.email && <span>📧 {resume.email}</span>}
            {resume.phone && <span>📞 {resume.phone}</span>}
            {resume.location && <span>📍 {resume.location}</span>}
          </div>
          <div className="resume-links">
            {resume.portfolio && <a href={resume.portfolio} target="_blank">🌐 Portfolio</a>}
            {resume.linkedin && <a href={resume.linkedin} target="_blank">💼 LinkedIn</a>}
            {resume.github && <a href={resume.github} target="_blank">💻 GitHub</a>}
          </div>
        </header>

        {/* Summary */}
        {resume.summary && (
          <section className="resume-section">
            <h2>Professional Summary</h2>
            <p>{resume.summary}</p>
          </section>
        )}

        {/* Education */}
        {resume.education?.length > 0 && (
          <section className="resume-section">
            <h2>🎓 Education</h2>
            {resume.education.map((edu, idx) => (
              <div key={idx} className="resume-item">
                <div className="resume-item-header">
                  <h3>{edu.institution}</h3>
                  <span className="resume-date">{edu.startYear} - {edu.endYear}</span>
                </div>
                <p className="resume-subtitle">{edu.course}</p>
                <p className="resume-location">{edu.location}</p>
                {edu.cgpa && <p className="resume-cgpa">CGPA: {edu.cgpa}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {resume.projects?.length > 0 && (
          <section className="resume-section">
            <h2>💻 Projects</h2>
            {resume.projects.map((project, idx) => (
              <div key={idx} className="resume-item">
                <div className="resume-item-header">
                  <h3>{project.name}</h3>
                  {(project.startDate || project.endDate) && (
                    <span className="resume-date">
                      {project.startDate} - {project.endDate}
                    </span>
                  )}
                </div>
                <p>{project.description}</p>
                {project.technologies && (
                  <p className="resume-tech">
                    <strong>Technologies:</strong> {project.technologies}
                  </p>
                )}
                <div className="resume-project-links">
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank">GitHub</a>
                  )}
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank">Live Demo</a>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {resume.certifications?.length > 0 && (
          <section className="resume-section">
            <h2>📜 Certifications</h2>
            {resume.certifications.map((cert, idx) => (
              <div key={idx} className="resume-item">
                <div className="resume-item-header">
                  <h3>{cert.title}</h3>
                  <span className="resume-date">{cert.year}</span>
                </div>
                <p className="resume-subtitle">{cert.issuer}</p>
                {cert.description && <p>{cert.description}</p>}
                {cert.certificateLink && (
                  <a href={cert.certificateLink} target="_blank" className="resume-cert-link">
                    View Certificate
                  </a>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Extracurricular */}
        {resume.extracurricular?.length > 0 && (
          <section className="resume-section">
            <h2>🏆 Extracurricular Activities</h2>
            {resume.extracurricular.map((activity, idx) => (
              <div key={idx} className="resume-item">
                <div className="resume-item-header">
                  <h3>{activity.title}</h3>
                  <span className="resume-date">{activity.year}</span>
                </div>
                {activity.organization && (
                  <p className="resume-subtitle">{activity.organization}</p>
                )}
                {activity.role && <p><strong>Role:</strong> {activity.role}</p>}
                <p>{activity.description}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default ResumePage;