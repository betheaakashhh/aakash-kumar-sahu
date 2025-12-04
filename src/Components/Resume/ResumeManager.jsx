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
  const [editingId, setEditingId] = useState(null);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    "Content-Type": "application/json",
  };

  // Fetch resume on load - but handle empty case gracefully
  const fetchResume = async () => {
    try {
      setLoading(true);
      
      // First try to get admin resume (for editing)
      let resumeData = null;
      
      try {
        const adminRes = await fetch(`${API_URL}/api/resume/admin`, {
          headers
        });
        
        if (adminRes.ok) {
          const adminData = await adminRes.json();
          if (adminData.success && adminData.data) {
            resumeData = adminData.data;
          }
        }
      } catch (adminError) {
        console.log("Admin endpoint not accessible, trying public...");
      }
      
      // If admin endpoint didn't work or returned no data, try public
      if (!resumeData) {
        try {
          const publicRes = await fetch(`${API_URL}/api/resume/public`);
          if (publicRes.ok) {
            const publicData = await publicRes.json();
            if (publicData.success && publicData.data) {
              resumeData = publicData.data;
            }
          }
        } catch (publicError) {
          console.log("Public endpoint also failed");
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
      // Don't alert - just keep empty structure
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
      } else {
        // If update fails, it might be because resume doesn't exist yet
        // Try to create it
        await createNewResume();
      }
    } catch (error) {
      console.error("Update error:", error);
      // Try to create new resume
      await createNewResume();
    }
  };

  // Helper function to create new resume if it doesn't exist
  const createNewResume = async () => {
    try {
      const res = await fetch(`${API_URL}/api/resume`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          ...resume,
          isPublished: true
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Resume created successfully!");
        fetchResume();
      } else {
        alert("Failed to create resume. Please check console.");
      }
    } catch (error) {
      console.error("Create resume error:", error);
      alert("Error creating resume. Please try again.");
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
    
    // First update local state
    setResume({
      ...resume,
      education: [...resume.education, newEducation]
    });
    
    // Then try to save to backend
    try {
      const res = await fetch(`${API_URL}/api/resume/education`, {
        method: "POST",
        headers,
        body: JSON.stringify(newEducation),
      });
      const data = await res.json();
      if (data.success) {
        fetchResume(); // Refresh from server
      }
    } catch (error) {
      console.error("Add education error:", error);
      // Keep the local change even if backend fails
    }
  };

  const handleUpdateEducation = (index, field, value) => {
    const updated = [...resume.education];
    updated[index][field] = value;
    setResume({ ...resume, education: updated });
  };

  const handleSaveEducation = async (id, index) => {
    try {
      const edu = resume.education[index];
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
      alert("Saved locally. Backend update failed.");
    }
  };

  const handleDeleteEducation = async (id, index) => {
    if (!confirm("Delete this education entry?")) return;
    
    // First update local state
    const updatedEducation = resume.education.filter((_, i) => i !== index);
    setResume({ ...resume, education: updatedEducation });
    
    // Then try to delete from backend
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
      // Keep the local deletion even if backend fails
    }
  };

  // ==================== CERTIFICATIONS ====================
  const handleAddCertification = async () => {
    const newCert = {
      title: "",
      issuer: "",
      year: "",
      description: "",
      certificateLink: "",
    };
    
    setResume({
      ...resume,
      certifications: [...resume.certifications, newCert]
    });
    
    try {
      const res = await fetch(`${API_URL}/api/resume/certifications`, {
        method: "POST",
        headers,
        body: JSON.stringify(newCert),
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

  const handleSaveCertification = async (id, index) => {
    try {
      const cert = resume.certifications[index];
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
      alert("Saved locally. Backend update failed.");
    }
  };

  const handleDeleteCertification = async (id, index) => {
    if (!confirm("Delete this certification?")) return;
    
    const updatedCerts = resume.certifications.filter((_, i) => i !== index);
    setResume({ ...resume, certifications: updatedCerts });
    
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
    const newProject = {
      name: "",
      description: "",
      technologies: "",
      githubLink: "",
      liveLink: "",
      startDate: "",
      endDate: "",
    };
    
    setResume({
      ...resume,
      projects: [...resume.projects, newProject]
    });
    
    try {
      const res = await fetch(`${API_URL}/api/resume/projects`, {
        method: "POST",
        headers,
        body: JSON.stringify(newProject),
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

  const handleSaveProject = async (id, index) => {
    try {
      const project = resume.projects[index];
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
      alert("Saved locally. Backend update failed.");
    }
  };

  const handleDeleteProject = async (id, index) => {
    if (!confirm("Delete this project?")) return;
    
    const updatedProjects = resume.projects.filter((_, i) => i !== index);
    setResume({ ...resume, projects: updatedProjects });
    
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
    const newActivity = {
      title: "",
      organization: "",
      year: "",
      description: "",
      role: "",
    };
    
    setResume({
      ...resume,
      extracurricular: [...resume.extracurricular, newActivity]
    });
    
    try {
      const res = await fetch(`${API_URL}/api/resume/extracurricular`, {
        method: "POST",
        headers,
        body: JSON.stringify(newActivity),
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

  const handleSaveExtracurricular = async (id, index) => {
    try {
      const activity = resume.extracurricular[index];
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
      alert("Saved locally. Backend update failed.");
    }
  };

  const handleDeleteExtracurricular = async (id, index) => {
    if (!confirm("Delete this activity?")) return;
    
    const updatedActivities = resume.extracurricular.filter((_, i) => i !== index);
    setResume({ ...resume, extracurricular: updatedActivities });
    
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

  // ==================== SAVE ALL CHANGES ====================
  const handleSaveAllChanges = async () => {
    try {
      const res = await fetch(`${API_URL}/api/resume`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          ...resume,
          isPublished: true
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("All changes saved successfully!");
        fetchResume();
      } else {
        alert("Failed to save changes: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Save all error:", error);
      alert("Error saving changes. Please try again.");
    }
  };

  if (loading) return <div className="rm-loading">Loading resume editor...</div>;

  // Render the UI (same as before, but now it always shows forms even if empty)
  return (
    <div className="rm-resume-manager">
      <div className="rm-header">
        <h2>📄 Resume Manager</h2>
        <p className="rm-subtitle">
          {resume.fullName ? `Editing: ${resume.fullName}` : "Create New Resume"}
        </p>
        <button 
          className="rm-save-all-btn" 
          onClick={handleSaveAllChanges}
          style={{marginTop: '10px', backgroundColor: '#4CAF50'}}
        >
          💾 Save All Changes
        </button>
      </div>

      {/* Navigation Tabs - same as before */}
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

      {/* Section Content - same as before but will show empty forms */}
      <div className="rm-content">
        {/* ==================== PERSONAL INFO ==================== */}
        {activeSection === 'personal' && (
          <div className="rm-section">
            <div className="rm-section-header">
              <h3>👤 Personal Information</h3>
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

              {/* ... rest of personal info form (same as before) ... */}
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
              <h3>🎓 Education</h3>
              <button className="rm-add-btn" onClick={handleAddEducation}>
                + Add Education
              </button>
            </div>

            {resume.education && resume.education.length > 0 ? (
              resume.education.map((edu, index) => (
                <div key={index} className="rm-item-card">
                  <div className="rm-item-header">
                    <h4>Education Entry {index + 1}</h4>
                    <div className="rm-item-actions">
                      <button
                        className="rm-delete-btn-small"
                        onClick={() => handleDeleteEducation(edu._id || index, index)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>

                  <div className="rm-form-grid">
                    {/* ... education form fields (same as before) ... */}
                  </div>

                  <button
                    className="rm-save-btn rm-save-btn-small"
                    onClick={() => handleSaveEducation(edu._id || `temp-${index}`, index)}
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

        {/* ... Other sections (certifications, projects, extracurricular) ... */}
        {/* They will all show empty forms when there's no data */}
      </div>
    </div>
  );
};

export default ResumeManager;