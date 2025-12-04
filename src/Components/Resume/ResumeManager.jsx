import React, { useState, useEffect } from "react";
import "./resume.css";

const API_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const ResumeManager = () => {
  // Start with empty resume structure
  const [resume, setResume] = useState({
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    portfolio: "",
    linkedin: "",
    github: "",
    summary: "",
    education: [],
    certifications: [],
    projects: [],
    extracurricular: [],
    skills: []
  });
  
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('personal');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Get token from localStorage
  const getAuthHeaders = () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      console.warn("No admin token found in localStorage");
      setIsAuthenticated(false);
      return null;
    }
    
    setIsAuthenticated(true);
    return {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };
  };

  // Fetch resume on load
  const fetchResume = async () => {
    try {
      setLoading(true);
      
      const headers = getAuthHeaders();
      let resumeData = null;
      
      // Try admin endpoint if we have a token
      if (headers) {
        try {
          const adminRes = await fetch(`${API_URL}/api/resume/admin`, {
            headers
          });
          
          if (adminRes.ok) {
            const adminData = await adminRes.json();
            if (adminData.success && adminData.data) {
              resumeData = adminData.data;
              console.log("Loaded resume from admin endpoint");
            }
          } else if (adminRes.status === 401 || adminRes.status === 403) {
            console.log("Admin token invalid or expired");
            setIsAuthenticated(false);
          }
        } catch (adminError) {
          console.log("Admin endpoint error:", adminError.message);
        }
      }
      
      // If admin endpoint didn't work or we have no token, try public
      if (!resumeData) {
        try {
          const publicRes = await fetch(`${API_URL}/api/resume/public`);
          if (publicRes.ok) {
            const publicData = await publicRes.json();
            if (publicData.success && publicData.data) {
              resumeData = publicData.data;
              console.log("Loaded resume from public endpoint");
            } else if (publicData.message === "Resume not found") {
              console.log("No resume found in database");
              // Keep empty structure
            }
          }
        } catch (publicError) {
          console.log("Public endpoint error:", publicError.message);
        }
      }
      
      // If we got data, use it. Otherwise keep empty structure
      if (resumeData) {
        setResume({
          fullName: resumeData.fullName || "",
          title: resumeData.title || "",
          email: resumeData.email || "",
          phone: resumeData.phone || "",
          location: resumeData.location || "",
          portfolio: resumeData.portfolio || "",
          linkedin: resumeData.linkedin || "",
          github: resumeData.github || "",
          summary: resumeData.summary || "",
          education: resumeData.education || [],
          certifications: resumeData.certifications || [],
          projects: resumeData.projects || [],
          extracurricular: resumeData.extracurricular || [],
          skills: resumeData.skills || []
        });
      }
      // If no data, keep the empty structure we already set
      
    } catch (error) {
      console.error("Resume fetch error:", error);
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
      const headers = getAuthHeaders();
      if (!headers) {
        alert("You need to be logged in as admin to save changes");
        return;
      }
      
      const res = await fetch(`${API_URL}/api/resume`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          ...resume,
          isPublished: true
        }),
      });
      
      if (res.status === 401 || res.status === 403) {
        alert("Session expired. Please login again.");
        setIsAuthenticated(false);
        return;
      }
      
      const data = await res.json();
      if (data.success) {
        alert("Personal info saved successfully!");
        fetchResume();
      } else {
        alert("Failed to save: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Error saving changes. Please check your connection.");
    }
  };

  // ==================== EDUCATION ====================
  const handleAddEducation = async () => {
    const newEducation = {
      institution: "",
      course: "",
      location: "",
      startYear: "",
      endYear: "",
      cgpa: "",
    };
    
    // Update local state immediately
    setResume({
      ...resume,
      education: [...resume.education, newEducation]
    });
    
    // Try to save to backend if authenticated
    const headers = getAuthHeaders();
    if (headers) {
      try {
        const res = await fetch(`${API_URL}/api/resume/education`, {
          method: "POST",
          headers,
          body: JSON.stringify(newEducation),
        });
        
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            fetchResume(); // Refresh from server
            return;
          }
        }
      } catch (error) {
        console.error("Backend save error:", error);
      }
    }
    
    // If not authenticated or backend failed, just show success locally
    alert("Education entry added locally. Save all changes when ready.");
  };

  const handleUpdateEducation = (index, field, value) => {
    const updated = [...resume.education];
    updated[index][field] = value;
    setResume({ ...resume, education: updated });
  };

  const handleSaveEducation = async (id, index) => {
    const headers = getAuthHeaders();
    if (!headers) {
      alert("Please login to save to backend");
      return;
    }
    
    try {
      const edu = resume.education[index];
      const res = await fetch(`${API_URL}/api/resume/education/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(edu),
      });
      
      const data = await res.json();
      if (data.success) {
        alert("Education updated in database!");
        fetchResume();
      } else {
        alert("Saved locally. Backend update failed.");
      }
    } catch (error) {
      console.error("Save education error:", error);
      alert("Saved locally. Could not connect to server.");
    }
  };

  const handleDeleteEducation = async (id, index) => {
    if (!confirm("Delete this education entry?")) return;
    
    // Update local state
    const updatedEducation = resume.education.filter((_, i) => i !== index);
    setResume({ ...resume, education: updatedEducation });
    
    // Try to delete from backend if authenticated
    const headers = getAuthHeaders();
    if (headers && id && !id.startsWith('temp-')) {
      try {
        const res = await fetch(`${API_URL}/api/resume/education/${id}`, {
          method: "DELETE",
          headers,
        });
        
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            console.log("Deleted from backend");
          }
        }
      } catch (error) {
        console.error("Backend delete error:", error);
      }
    }
    
    alert("Education entry removed.");
  };

  // ==================== SAVE ALL CHANGES ====================
  const handleSaveAllChanges = async () => {
    const headers = getAuthHeaders();
    if (!headers) {
      alert("You need to be logged in as admin to save changes");
      // Redirect to login or show login modal
      window.location.href = "/admin/login";
      return;
    }
    
    try {
      const res = await fetch(`${API_URL}/api/resume`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          ...resume,
          isPublished: true
        }),
      });
      
      if (res.status === 401 || res.status === 403) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }
      
      const data = await res.json();
      if (data.success) {
        alert("✅ All changes saved successfully!");
        fetchResume();
      } else {
        alert("❌ Failed to save: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Save all error:", error);
      alert("⚠️ Error saving changes. Please check your connection.");
    }
  };

  // ==================== CHECK AUTH STATUS ====================
  const checkAuthStatus = () => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  // Add temp IDs for local entries
  const getItemId = (item, index) => {
    return item._id || `temp-${Date.now()}-${index}`;
  };

  if (loading) {
    return (
      <div className="rm-loading">
        <div className="rm-loading-spinner"></div>
        <p>Loading resume editor...</p>
      </div>
    );
  }

  return (
    <div className="rm-resume-manager">
      <div className="rm-header">
        <h2>📄 Resume Manager</h2>
        <p className="rm-subtitle">
          {resume.fullName ? `Editing: ${resume.fullName}` : "Create New Resume"}
          {!isAuthenticated && (
            <span style={{color: '#ff9800', marginLeft: '10px'}}>
              ⚠️ Working offline - Login to save to database
            </span>
          )}
        </p>
        
        <div className="rm-action-buttons">
          {!isAuthenticated && (
            <button 
              className="rm-login-btn"
              onClick={() => window.location.href = "/admin/login"}
            >
              🔑 Login to Save
            </button>
          )}
          
          <button 
            className="rm-save-all-btn" 
            onClick={handleSaveAllChanges}
            disabled={!isAuthenticated}
            title={!isAuthenticated ? "Login required to save" : "Save all changes to database"}
          >
            {isAuthenticated ? "💾 Save All Changes" : "🔒 Login to Save"}
          </button>
        </div>
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
          🎓 Education {resume.education.length > 0 && `(${resume.education.length})`}
        </button>
        <button
          className={`rm-tab ${activeSection === 'certifications' ? 'rm-tab-active' : ''}`}
          onClick={() => setActiveSection('certifications')}
        >
          📜 Certifications {resume.certifications.length > 0 && `(${resume.certifications.length})`}
        </button>
        <button
          className={`rm-tab ${activeSection === 'projects' ? 'rm-tab-active' : ''}`}
          onClick={() => setActiveSection('projects')}
        >
          💻 Projects {resume.projects.length > 0 && `(${resume.projects.length})`}
        </button>
        <button
          className={`rm-tab ${activeSection === 'extracurricular' ? 'rm-tab-active' : ''}`}
          onClick={() => setActiveSection('extracurricular')}
        >
          🏆 Extracurricular {resume.extracurricular.length > 0 && `(${resume.extracurricular.length})`}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="rm-content">
        {activeSection === 'personal' && (
          <div className="rm-section">
            <div className="rm-section-header">
              <h3>👤 Personal Information</h3>
              <span className="rm-auth-status">
                {isAuthenticated ? "✅ Connected to database" : "⚠️ Working offline"}
              </span>
            </div>
            
            <div className="rm-form-grid">
              <div className="rm-form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  value={resume.fullName}
                  onChange={(e) => setResume({ ...resume, fullName: e.target.value })}
                  placeholder="John Doe"
                />
              </div>

              <div className="rm-form-group">
                <label>Professional Title *</label>
                <input
                  type="text"
                  value={resume.title}
                  onChange={(e) => setResume({ ...resume, title: e.target.value })}
                  placeholder="Full Stack Developer"
                />
              </div>

              <div className="rm-form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={resume.email}
                  onChange={(e) => setResume({ ...resume, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>

              <div className="rm-form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={resume.phone}
                  onChange={(e) => setResume({ ...resume, phone: e.target.value })}
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div className="rm-form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={resume.location}
                  onChange={(e) => setResume({ ...resume, location: e.target.value })}
                  placeholder="New York, USA"
                />
              </div>

              <div className="rm-form-group">
                <label>Portfolio Website</label>
                <input
                  type="url"
                  value={resume.portfolio}
                  onChange={(e) => setResume({ ...resume, portfolio: e.target.value })}
                  placeholder="https://yourportfolio.com"
                />
              </div>

              <div className="rm-form-group">
                <label>LinkedIn</label>
                <input
                  type="url"
                  value={resume.linkedin}
                  onChange={(e) => setResume({ ...resume, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              <div className="rm-form-group">
                <label>GitHub</label>
                <input
                  type="url"
                  value={resume.github}
                  onChange={(e) => setResume({ ...resume, github: e.target.value })}
                  placeholder="https://github.com/yourusername"
                />
              </div>

              <div className="rm-form-group rm-form-group-full">
                <label>Professional Summary</label>
                <textarea
                  rows="4"
                  value={resume.summary}
                  onChange={(e) => setResume({ ...resume, summary: e.target.value })}
                  placeholder="Brief professional summary..."
                />
              </div>
            </div>

            <div className="rm-section-footer">
              <button className="rm-save-btn" onClick={handlePersonalInfoUpdate}>
                {isAuthenticated ? "💾 Save to Database" : "💾 Save Locally"}
              </button>
              <p className="rm-help-text">
                {isAuthenticated 
                  ? "Changes will be visible on your portfolio immediately"
                  : "Login to save changes to database and make them public"}
              </p>
            </div>
          </div>
        )}

        {/* EDUCATION SECTION */}
        {activeSection === 'education' && (
          <div className="rm-section">
            <div className="rm-section-header">
              <h3>🎓 Education</h3>
              <div className="rm-section-actions">
                <button className="rm-add-btn" onClick={handleAddEducation}>
                  + Add Education
                </button>
              </div>
            </div>

            {resume.education.length > 0 ? (
              resume.education.map((edu, index) => (
                <div key={getItemId(edu, index)} className="rm-item-card">
                  <div className="rm-item-header">
                    <h4>Education Entry {index + 1}</h4>
                    <div className="rm-item-actions">
                      <button
                        className="rm-delete-btn-small"
                        onClick={() => handleDeleteEducation(getItemId(edu, index), index)}
                      >
                        🗑️ Delete
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

                  <div className="rm-item-footer">
                    {isAuthenticated && edu._id && !edu._id.startsWith('temp-') && (
                      <button
                        className="rm-save-btn rm-save-btn-small"
                        onClick={() => handleSaveEducation(edu._id, index)}
                      >
                        💾 Update in Database
                      </button>
                    )}
                    <span className="rm-item-status">
                      {edu._id && !edu._id.startsWith('temp-') 
                        ? "✅ Saved in database" 
                        : "📝 Local changes (not saved)"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="rm-empty-state">
                <p>No education entries yet. Click "Add Education" to create one.</p>
              </div>
            )}
          </div>
        )}

        {/* Add similar sections for Certifications, Projects, Extracurricular */}
        {/* They follow the same pattern as Education section */}

        {/* INFO MESSAGE FOR OFFLINE MODE */}
        {!isAuthenticated && (
          <div className="rm-offline-notice">
            <h4>⚠️ Working in Offline Mode</h4>
            <p>
              You are editing locally. To save your resume to the database and make it 
              visible on your portfolio, please login as admin.
            </p>
            <button 
              className="rm-login-btn-large"
              onClick={() => window.location.href = "/admin/login"}
            >
              🔑 Login as Admin
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeManager;