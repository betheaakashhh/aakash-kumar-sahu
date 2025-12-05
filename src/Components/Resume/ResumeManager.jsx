import React, { useState, useEffect } from "react";
import "./resume.css";

const API_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const ResumeManager = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('personal');
  const [editingId, setEditingId] = useState(null);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    "Content-Type": "application/json",
  };

  // Fetch resume on load
  const fetchResume = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/resume/admin`, { headers });
      const data = await res.json();
      if (data.success) {
        setResume(data.data);
      }
    } catch (error) {
      console.error("Resume fetch error:", error);
      alert("Failed to load resume");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  // ==================== PERSONAL INFO ====================
  const handlePersonalInfoUpdate = async () => {
    try {
      const res = await fetch(`${API_URL}/api/resume`, {
        method: "PUT",
        headers,
        body: JSON.stringify(resume),
      });
      const data = await res.json();
      if (data.success) {
        alert("Personal info updated!");
        fetchResume();
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update personal info");
    }
  };

  // ==================== EDUCATION ====================
  const handleAddEducation = async () => {
    try {
      const res = await fetch(`${API_URL}/api/resume/education`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          institution: "",
          course: "",
          location: "",
          startYear: "",
          endYear: "",
          cgpa: "",
        }),
      });
      const data = await res.json();
      if (data.success) {
        fetchResume();
      }
    } catch (error) {
      console.error("Add education error:", error);
    }
  };

  const handleUpdateEducation = (index, field, value) => {
    const updated = [...resume.education];
    updated[index][field] = value;
    setResume({ ...resume, education: updated });
  };

  const handleSaveEducation = async (id) => {
    try {
      const edu = resume.education.find(e => e._id === id);
      const res = await fetch(`${API_URL}/api/resume/education/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(edu),
      });
      const data = await res.json();
      if (data.success) {
        alert("Education updated!");
        setEditingId(null);
        fetchResume();
      }
    } catch (error) {
      console.error("Save education error:", error);
    }
  };

  const handleDeleteEducation = async (id) => {
    if (!confirm("Delete this education entry?")) return;
    try {
      const res = await fetch(`${API_URL}/api/resume/education/${id}`, {
        method: "DELETE",
        headers,
      });
      const data = await res.json();
      if (data.success) {
        alert("Education deleted!");
        fetchResume();
      }
    } catch (error) {
      console.error("Delete education error:", error);
    }
  };

  // ==================== CERTIFICATIONS ====================
  const handleAddCertification = async () => {
    try {
      const res = await fetch(`${API_URL}/api/resume/certifications`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          title: "",
          issuer: "",
          year: "",
          description: "",
          certificateLink: "",
        }),
      });
      const data = await res.json();
      if (data.success) {
        fetchResume();
      }
    } catch (error) {
      console.error("Add certification error:", error);
    }
  };

  const handleUpdateCertification = (index, field, value) => {
    const updated = [...resume.certifications];
    updated[index][field] = value;
    setResume({ ...resume, certifications: updated });
  };

  const handleSaveCertification = async (id) => {
    try {
      const cert = resume.certifications.find(c => c._id === id);
      const res = await fetch(`${API_URL}/api/resume/certifications/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(cert),
      });
      const data = await res.json();
      if (data.success) {
        alert("Certification updated!");
        setEditingId(null);
        fetchResume();
      }
    } catch (error) {
      console.error("Save certification error:", error);
    }
  };

  const handleDeleteCertification = async (id) => {
    if (!confirm("Delete this certification?")) return;
    try {
      const res = await fetch(`${API_URL}/api/resume/certifications/${id}`, {
        method: "DELETE",
        headers,
      });
      const data = await res.json();
      if (data.success) {
        alert("Certification deleted!");
        fetchResume();
      }
    } catch (error) {
      console.error("Delete certification error:", error);
    }
  };

  // ==================== PROJECTS ====================
  const handleAddProject = async () => {
    try {
      const res = await fetch(`${API_URL}/api/resume/projects`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          name: "",
          description: "",
          technologies: "",
          githubLink: "",
          liveLink: "",
          startDate: "",
          endDate: "",
        }),
      });
      const data = await res.json();
      if (data.success) {
        fetchResume();
      }
    } catch (error) {
      console.error("Add project error:", error);
    }
  };

  const handleUpdateProject = (index, field, value) => {
    const updated = [...resume.projects];
    updated[index][field] = value;
    setResume({ ...resume, projects: updated });
  };

  const handleSaveProject = async (id) => {
    try {
      const project = resume.projects.find(p => p._id === id);
      const res = await fetch(`${API_URL}/api/resume/projects/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(project),
      });
      const data = await res.json();
      if (data.success) {
        alert("Project updated!");
        setEditingId(null);
        fetchResume();
      }
    } catch (error) {
      console.error("Save project error:", error);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm("Delete this project?")) return;
    try {
      const res = await fetch(`${API_URL}/api/resume/projects/${id}`, {
        method: "DELETE",
        headers,
      });
      const data = await res.json();
      if (data.success) {
        alert("Project deleted!");
        fetchResume();
      }
    } catch (error) {
      console.error("Delete project error:", error);
    }
  };

  // ==================== EXTRACURRICULAR ====================
  const handleAddExtracurricular = async () => {
    try {
      const res = await fetch(`${API_URL}/api/resume/extracurricular`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          title: "",
          organization: "",
          year: "",
          description: "",
          role: "",
        }),
      });
      const data = await res.json();
      if (data.success) {
        fetchResume();
      }
    } catch (error) {
      console.error("Add extracurricular error:", error);
    }
  };

  const handleUpdateExtracurricular = (index, field, value) => {
    const updated = [...resume.extracurricular];
    updated[index][field] = value;
    setResume({ ...resume, extracurricular: updated });
  };

  const handleSaveExtracurricular = async (id) => {
    try {
      const activity = resume.extracurricular.find(e => e._id === id);
      const res = await fetch(`${API_URL}/api/resume/extracurricular/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(activity),
      });
      const data = await res.json();
      if (data.success) {
        alert("Extracurricular activity updated!");
        setEditingId(null);
        fetchResume();
      }
    } catch (error) {
      console.error("Save extracurricular error:", error);
    }
  };

  const handleDeleteExtracurricular = async (id) => {
    if (!confirm("Delete this activity?")) return;
    try {
      const res = await fetch(`${API_URL}/api/resume/extracurricular/${id}`, {
        method: "DELETE",
        headers,
      });
      const data = await res.json();
      if (data.success) {
        alert("Extracurricular activity deleted!");
        fetchResume();
      }
    } catch (error) {
      console.error("Delete extracurricular error:", error);
    }
  };

  if (loading) return <div className="rm-loading">Loading resume...</div>;
  if (!resume) return <div className="rm-error">Resume not found</div>;

  return (
    <div className="rm-resume-manager">
      <div className="rm-header">
        <h2>Resume Manager</h2>
        <p className="rm-subtitle">
          Edit your resume sections - changes will reflect on your portfolio
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="rm-tabs">
        <button
          className={`rm-tab ${activeSection === 'personal' ? 'rm-tab-active' : ''}`}
          onClick={() => setActiveSection('personal')}
        >
          👤 Personal Info
        </button>
        <button
          className={`rm-tab ${activeSection === 'education' ? 'rm-tab-active' : ''}`}
          onClick={() => setActiveSection('education')}
        >
          🎓 Education
        </button>
        <button
          className={`rm-tab ${activeSection === 'certifications' ? 'rm-tab-active' : ''}`}
          onClick={() => setActiveSection('certifications')}
        >
          📜 Certifications
        </button>
        <button
          className={`rm-tab ${activeSection === 'projects' ? 'rm-tab-active' : ''}`}
          onClick={() => setActiveSection('projects')}
        >
          💻 Projects
        </button>
        <button
          className={`rm-tab ${activeSection === 'extracurricular' ? 'rm-tab-active' : ''}`}
          onClick={() => setActiveSection('extracurricular')}
        >
          🏆 Extracurricular
        </button>
      </div>

      {/* Section Content */}
      <div className="rm-content">
        {/* ==================== PERSONAL INFO ==================== */}
        {activeSection === 'personal' && (
          <div className="rm-section">
            <div className="rm-section-header">
              <h3> Personal Information</h3>
            </div>
            
            <div className="rm-form-grid">
              <div className="rm-form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  value={resume.fullName || ""}
                  onChange={(e) => setResume({ ...resume, fullName: e.target.value })}
                  placeholder="John Doe"
                />
              </div>

              <div className="rm-form-group">
                <label>Professional Title *</label>
                <input
                  type="text"
                  value={resume.title || ""}
                  onChange={(e) => setResume({ ...resume, title: e.target.value })}
                  placeholder="Full Stack Developer"
                />
              </div>

              <div className="rm-form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={resume.email || ""}
                  onChange={(e) => setResume({ ...resume, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>

              <div className="rm-form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={resume.phone || ""}
                  onChange={(e) => setResume({ ...resume, phone: e.target.value })}
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div className="rm-form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={resume.location || ""}
                  onChange={(e) => setResume({ ...resume, location: e.target.value })}
                  placeholder="New York, USA"
                />
              </div>

              <div className="rm-form-group">
                <label>Portfolio Website</label>
                <input
                  type="url"
                  value={resume.portfolio || ""}
                  onChange={(e) => setResume({ ...resume, portfolio: e.target.value })}
                  placeholder="https://yourportfolio.com"
                />
              </div>

              <div className="rm-form-group">
                <label>LinkedIn</label>
                <input
                  type="url"
                  value={resume.linkedin || ""}
                  onChange={(e) => setResume({ ...resume, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              <div className="rm-form-group">
                <label>GitHub</label>
                <input
                  type="url"
                  value={resume.github || ""}
                  onChange={(e) => setResume({ ...resume, github: e.target.value })}
                  placeholder="https://github.com/yourusername"
                />
              </div>

              <div className="rm-form-group rm-form-group-full">
                <label>Professional Summary</label>
                <textarea
                  rows="4"
                  value={resume.summary || ""}
                  onChange={(e) => setResume({ ...resume, summary: e.target.value })}
                  placeholder="Brief professional summary..."
                />
              </div>
            </div>

            <button className="rm-save-btn" onClick={handlePersonalInfoUpdate}>
              💾 Save Personal Info
            </button>
          </div>
        )}

        {/* ==================== EDUCATION ==================== */}
        {activeSection === 'education' && (
          <div className="rm-section">
            <div className="rm-section-header">
              <h3>Education</h3>
              <button className="rm-add-btn" onClick={handleAddEducation}>
                + Add Education
              </button>
            </div>

            {resume.education && resume.education.length > 0 ? (
              resume.education.map((edu, index) => (
                <div key={edu._id} className="rm-item-card">
                  <div className="rm-item-header">
                    <h4>Education Entry {index + 1}</h4>
                    <div className="rm-item-actions">
                      <button
                        className="rm-delete-btn-small"
                        onClick={() => handleDeleteEducation(edu._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="rm-form-grid">
                    <div className="rm-form-group rm-form-group-full">
                      <label>Institution Name *</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => handleUpdateEducation(index, "institution", e.target.value)}
                        placeholder="University/College Name"
                      />
                    </div>

                    <div className="rm-form-group rm-form-group-full">
                      <label>Course/Degree *</label>
                      <input
                        type="text"
                        value={edu.course}
                        onChange={(e) => handleUpdateEducation(index, "course", e.target.value)}
                        placeholder="B.Tech in Computer Science"
                      />
                    </div>

                    <div className="rm-form-group">
                      <label>Location *</label>
                      <input
                        type="text"
                        value={edu.location}
                        onChange={(e) => handleUpdateEducation(index, "location", e.target.value)}
                        placeholder="City, Country"
                      />
                    </div>

                    <div className="rm-form-group">
                      <label>Start Year *</label>
                      <input
                        type="text"
                        value={edu.startYear}
                        onChange={(e) => handleUpdateEducation(index, "startYear", e.target.value)}
                        placeholder="2018"
                      />
                    </div>

                    <div className="rm-form-group">
                      <label>End Year *</label>
                      <input
                        type="text"
                        value={edu.endYear}
                        onChange={(e) => handleUpdateEducation(index, "endYear", e.target.value)}
                        placeholder="2022"
                      />
                    </div>

                    <div className="rm-form-group">
                      <label>CGPA/Percentage</label>
                      <input
                        type="text"
                        value={edu.cgpa}
                        onChange={(e) => handleUpdateEducation(index, "cgpa", e.target.value)}
                        placeholder="8.5/10 or 85%"
                      />
                    </div>
                  </div>

                  <button
                    className="rm-save-btn rm-save-btn-small"
                    onClick={() => handleSaveEducation(edu._id)}
                  >
                    💾 Save Entry
                  </button>
                </div>
              ))
            ) : (
              <div className="rm-empty-state">
                <p>No education entries yet. Click "Add Education" to create one.</p>
              </div>
            )}
          </div>
        )}

        {/* ==================== CERTIFICATIONS ==================== */}
        {activeSection === 'certifications' && (
          <div className="rm-section">
            <div className="rm-section-header">
              <h3>📜 Certifications</h3>
              <button className="rm-add-btn" onClick={handleAddCertification}>
                + Add Certification
              </button>
            </div>

            {resume.certifications && resume.certifications.length > 0 ? (
              resume.certifications.map((cert, index) => (
                <div key={cert._id} className="rm-item-card">
                  <div className="rm-item-header">
                    <h4>Certification {index + 1}</h4>
                    <button
                      className="rm-delete-btn-small"
                      onClick={() => handleDeleteCertification(cert._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>

                  <div className="rm-form-grid">
                    <div className="rm-form-group rm-form-group-full">
                      <label>Certificate Title *</label>
                      <input
                        type="text"
                        value={cert.title}
                        onChange={(e) => handleUpdateCertification(index, "title", e.target.value)}
                        placeholder="AWS Certified Developer"
                      />
                    </div>

                    <div className="rm-form-group">
                      <label>Issuing Organization *</label>
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => handleUpdateCertification(index, "issuer", e.target.value)}
                        placeholder="Amazon Web Services"
                      />
                    </div>

                    <div className="rm-form-group">
                      <label>Year *</label>
                      <input
                        type="text"
                        value={cert.year}
                        onChange={(e) => handleUpdateCertification(index, "year", e.target.value)}
                        placeholder="2023"
                      />
                    </div>

                    <div className="rm-form-group rm-form-group-full">
                      <label>Description</label>
                      <textarea
                        rows="3"
                        value={cert.description}
                        onChange={(e) => handleUpdateCertification(index, "description", e.target.value)}
                        placeholder="Brief description of the certification..."
                      />
                    </div>

                    <div className="rm-form-group rm-form-group-full">
                      <label>Certificate Link (Optional)</label>
                      <input
                        type="url"
                        value={cert.certificateLink}
                        onChange={(e) => handleUpdateCertification(index, "certificateLink", e.target.value)}
                        placeholder="https://certificate-url.com"
                      />
                    </div>
                  </div>

                  <button
                    className="rm-save-btn rm-save-btn-small"
                    onClick={() => handleSaveCertification(cert._id)}
                  >
                    💾 Save Certification
                  </button>
                </div>
              ))
            ) : (
              <div className="rm-empty-state">
                <p>No certifications yet. Click "Add Certification" to create one.</p>
              </div>
            )}
          </div>
        )}

        {/* ==================== PROJECTS ==================== */}
        {activeSection === 'projects' && (
          <div className="rm-section">
            <div className="rm-section-header">
              <h3>💻 Projects</h3>
              <button className="rm-add-btn" onClick={handleAddProject}>
                + Add Project
              </button>
            </div>

            {resume.projects && resume.projects.length > 0 ? (
              resume.projects.map((project, index) => (
                <div key={project._id} className="rm-item-card">
                  <div className="rm-item-header">
                    <h4>Project {index + 1}</h4>
                    <button
                      className="rm-delete-btn-small"
                      onClick={() => handleDeleteProject(project._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>

                  <div className="rm-form-grid">
                    <div className="rm-form-group rm-form-group-full">
                      <label>Project Name *</label>
                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) => handleUpdateProject(index, "name", e.target.value)}
                        placeholder="E-commerce Platform"
                      />
                    </div>

                    <div className="rm-form-group rm-form-group-full">
                      <label>Description *</label>
                      <textarea
                        rows="4"
                        value={project.description}
                        onChange={(e) => handleUpdateProject(index, "description", e.target.value)}
                        placeholder="Detailed project description..."
                      />
                    </div>

                    <div className="rm-form-group rm-form-group-full">
                      <label>Technologies Used</label>
                      <input
                        type="text"
                        value={project.technologies}
                        onChange={(e) => handleUpdateProject(index, "technologies", e.target.value)}
                        placeholder="React, Node.js, MongoDB"
                      />
                    </div>

                    <div className="rm-form-group">
                      <label>GitHub Link</label>
                      <input
                        type="url"
                        value={project.githubLink}
                        onChange={(e) => handleUpdateProject(index, "githubLink", e.target.value)}
                        placeholder="https://github.com/..."
                      />
                    </div>

                    <div className="rm-form-group">
                      <label>Live Demo Link</label>
                      <input
                        type="url"
                        value={project.liveLink}
                        onChange={(e) => handleUpdateProject(index, "liveLink", e.target.value)}
                        placeholder="https://project-demo.com"
                      />
                    </div>

                    <div className="rm-form-group">
                      <label>Start Date</label>
                      <input
                        type="text"
                        value={project.startDate}
                        onChange={(e) => handleUpdateProject(index, "startDate", e.target.value)}
                        placeholder="Jan 2023"
                      />
                    </div>

                    <div className="rm-form-group">
                      <label>End Date</label>
                      <input
                        type="text"
                        value={project.endDate}
                        onChange={(e) => handleUpdateProject(index, "endDate", e.target.value)}
                        placeholder="Mar 2023"
                      />
                    </div>
                  </div>

                  <button
                    className="rm-save-btn rm-save-btn-small"
                    onClick={() => handleSaveProject(project._id)}
                  >
                    💾 Save Project
                  </button>
                </div>
              ))
            ) : (
              <div className="rm-empty-state">
                <p>No projects yet. Click "Add Project" to create one.</p>
              </div>
            )}
          </div>
        )}

        {/* ==================== EXTRACURRICULAR ==================== */}
        {activeSection === 'extracurricular' && (
          <div className="rm-section">
            <div className="rm-section-header">
              <h3>🏆 Extracurricular Activities</h3>
              <button className="rm-add-btn" onClick={handleAddExtracurricular}>
                + Add Activity
              </button>
            </div>

            {resume.extracurricular && resume.extracurricular.length > 0 ? (
              resume.extracurricular.map((activity, index) => (
                <div key={activity._id} className="rm-item-card">
                  <div className="rm-item-header">
                    <h4>Activity {index + 1}</h4>
                    <button
                      className="rm-delete-btn-small"
                      onClick={() => handleDeleteExtracurricular(activity._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>

                  <div className="rm-form-grid">
                    <div className="rm-form-group rm-form-group-full">
                      <label>Activity Title *</label>
                      <input
                        type="text"
                        value={activity.title}
                        onChange={(e) => handleUpdateExtracurricular(index, "title", e.target.value)}
                        placeholder="Hackathon Winner"
                      />
                    </div>

                    <div className="rm-form-group">
                      <label>Organization</label>
                      <input
                        type="text"
                        value={activity.organization}
                        onChange={(e) => handleUpdateExtracurricular(index, "organization", e.target.value)}
                        placeholder="Tech Club"
                      />
                    </div>

                    <div className="rm-form-group">
                      <label>Year *</label>
                      <input
                        type="text"
                        value={activity.year}
                        onChange={(e) => handleUpdateExtracurricular(index, "year", e.target.value)}
                        placeholder="2023"
                      />
                    </div>

                    <div className="rm-form-group">
                      <label>Role</label>
                      <input
                        type="text"
                        value={activity.role}
                        onChange={(e) => handleUpdateExtracurricular(index, "role", e.target.value)}
                        placeholder="Team Lead"
                      />
                    </div>

                    <div className="rm-form-group rm-form-group-full">
                      <label>Description *</label>
                      <textarea
                        rows="3"
                        value={activity.description}
                        onChange={(e) => handleUpdateExtracurricular(index, "description", e.target.value)}
                        placeholder="Describe your involvement and achievements..."
                      />
                    </div>
                  </div>

                  <button
                    className="rm-save-btn rm-save-btn-small"
                    onClick={() => handleSaveExtracurricular(activity._id)}
                  >
                    💾 Save Activity
                  </button>
                </div>
              ))
            ) : (
              <div className="rm-empty-state">
                <p>No activities yet. Click "Add Activity" to create one.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeManager;