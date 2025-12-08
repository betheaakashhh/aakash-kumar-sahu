import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import './BlogAdmin.css';

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [editingBlog, setEditingBlog] = useState(null);
  const [activeTab, setActiveTab] = useState("create");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTag, setFilterTag] = useState("all");
  const [showPreview, setShowPreview] = useState(false);
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0
  });

  const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [blogs]);

  const fetchBlogs = async () => {
    try {
     const res = await fetch(`${API_URL}/api/blogs/admin/all`, {
        method: "GET",
  headers: { Authorization: `Bearer ${token}` }
});

      const data = await res.json();
      if (data.success) setBlogs(data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const calculateStats = () => {
    const totalViews = blogs.reduce((sum, blog) => sum + (blog.views || 0), 0);
    const totalLikes = blogs.reduce((sum, blog) => sum + (blog.likes?.length || 0), 0);
    const totalComments = blogs.reduce((sum, blog) => sum + (blog.comments?.length || 0), 0);
    
    setStats({
      totalBlogs: blogs.length,
      totalViews,
      totalLikes,
      totalComments
    });
  };

  const createBlog = async (e) => {
    e.preventDefault();

    const newBlog = {
      title,
      content,
      tags: tags.split(",").map(t => t.trim()).filter(t => t),
      coverImage
    };

    try {
      const res = await fetch(`${API_URL}/api/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newBlog)
      });

      const data = await res.json();
      if (data.success) {
        showNotification("Blog Created Successfully!", "success");
        resetForm();
        fetchBlogs();
        setActiveTab("manage");
      } else {
        showNotification(data.message || "Error creating blog", "error");
      }
    } catch (error) {
      showNotification("Network error", "error");
    }
  };

const updateBlog = async (e) => {
  e.preventDefault();

  if (!editingBlog) {
    showNotification("No blog selected for editing", "error");
    return;
  }

  const updatedBlog = {
    title,
    content,
    tags: tags.split(",").map(t => t.trim()).filter(t => t),
    coverImage,
  };

  try {
    const res = await fetch(`${API_URL}/api/blogs/admin/update/${editingBlog._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedBlog),
    });

    const data = await res.json();
    if (data.success) {
      showNotification("Blog Updated Successfully!", "success");
      resetForm();
      fetchBlogs();
      setActiveTab("manage");
    } else {
      showNotification(data.message || "Error updating blog", "error");
    }
  } catch (error) {
    showNotification("Network error", "error");
  }
};

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`${API_URL}/api/blogs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      if (data.success) {
        showNotification("Blog Deleted Successfully!", "success");
        fetchBlogs();
      } else {
        showNotification(data.message || "Error deleting blog", "error");
      }
    } catch (error) {
      showNotification("Network error", "error");
    }
  };

  const startEditing = (blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setContent(blog.content);
    setTags(blog.tags?.join(", ") || "");
    setCoverImage(blog.coverImage || "");
    setActiveTab("create");
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setTags("");
    setCoverImage("");
    setEditingBlog(null);
  };

  const showNotification = (message, type) => {
    // Simple notification - you can enhance this with a toast library
    alert(message);
  };

  const getUniqueTags = () => {
    const allTags = new Set();
    blogs.forEach(blog => {
      if (blog.tags) {
        blog.tags.forEach(tag => allTags.add(tag));
      }
    });
    return ["all", ...Array.from(allTags)];
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = filterTag === "all" || (blog.tags && blog.tags.includes(filterTag));
    return matchesSearch && matchesTag;
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <h2>Blog Admin</h2>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </button>

          <button 
            className={`nav-item ${activeTab === "create" ? "active" : ""}`}
            onClick={() => { setActiveTab("create"); resetForm(); }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Post
          </button>

          <button 
            className={`nav-item ${activeTab === "manage" ? "active" : ""}`}
            onClick={() => setActiveTab("manage")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Manage Posts
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div className="user-info">
              <span className="user-name">Admin</span>
              <span className="user-role">Administrator</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="dashboard-content">
            <div className="dashboard-header">
              <h1>Dashboard Overview</h1>
              <p className="dashboard-subtitle">Monitor your blog performance</p>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon blogs">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="stat-content">
                  <p className="stat-label">Total Posts</p>
                  <h3 className="stat-value">{stats.totalBlogs}</h3>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon views">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div className="stat-content">
                  <p className="stat-label">Total Views</p>
                  <h3 className="stat-value">{stats.totalViews.toLocaleString()}</h3>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon likes">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="stat-content">
                  <p className="stat-label">Total Likes</p>
                  <h3 className="stat-value">{stats.totalLikes}</h3>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon comments">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="stat-content">
                  <p className="stat-label">Total Comments</p>
                  <h3 className="stat-value">{stats.totalComments}</h3>
                </div>
              </div>
            </div>

            <div className="recent-activity">
              <h2>Recent Posts</h2>
              <div className="activity-list">
                {blogs.slice(0, 5).map(blog => (
                  <div key={blog._id} className="activity-item">
                    <div className="activity-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="activity-content">
                      <h4>{blog.title}</h4>
                      <p>{formatDate(blog.createdAt)} • {blog.views || 0} views</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Create/Edit Tab */}
        {activeTab === "create" && (
          <div className="create-content">
            <div className="create-header">
              <h1>{editingBlog ? "Edit Post" : "Create New Post"}</h1>
              <p className="create-subtitle">
                {editingBlog ? "Update your blog post" : "Write and publish a new blog post"}
              </p>
            </div>

            <form className="blog-form-modern" onSubmit={editingBlog ? updateBlog : createBlog}>
              <div className="form-groups">
                <label htmlFor="title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  Blog Title
                </label>
                <input
                  id="title"
                  type="text"
                  className="form-input"
                  placeholder="Enter an engaging title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-groups">
                <label htmlFor="coverImage">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Cover Image URL
                </label>
                <input
                  id="coverImage"
                  type="text"
                  className="form-input"
                  placeholder="https://example.com/image.jpg"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                />
                {coverImage && (
                  <div className="image-preview">
                    <img src={coverImage} alt="Cover preview" />
                  </div>
                )}
              </div>

              <div className="form-groups">
                <label htmlFor="tags">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Tags
                </label>
                <input
                  id="tags"
                  type="text"
                  className="form-input"
                  placeholder="technology, programming, web development"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                <small className="form-hint">Separate tags with commas</small>
              </div>

              <div className="form-groups full-width">
                <div className="editor-header">
                  <label htmlFor="content">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Content (Markdown)
                  </label>
                  <button 
                    type="button" 
                    className="preview-toggle"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {showPreview ? "Hide Preview" : "Show Preview"}
                  </button>
                </div>

                <div className={`markdown-editor ${showPreview ? "split" : ""}`}>
                  <textarea
                    id="content"
                    className="markdown-input-modern"
                    placeholder="Write your blog content using Markdown...

# Heading 1
## Heading 2
**bold text**
*italic text*
[link](url)
![image](url)"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="20"
                    required
                  />

                  {showPreview && (
                    <div className="markdown-preview-modern">
                      <div className="preview-label">Live Preview</div>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {content || "Preview will appear here... ✨"}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-actions">
                {editingBlog && (
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
                <button type="submit" className="btn-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {editingBlog ? "Update Post" : "Publish Post"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Manage Tab */}
        {activeTab === "manage" && (
          <div className="manage-content">
            <div className="manage-header">
              <div>
                <h1>Manage Posts</h1>
                <p className="manage-subtitle">View, edit, and delete your blog posts</p>
              </div>
            </div>

            <div className="manage-controls">
              <div className="search-box">
                <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="filter-box">
                <svg className="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <select value={filterTag} onChange={(e) => setFilterTag(e.target.value)}>
                  {getUniqueTags().map(tag => (
                    <option key={tag} value={tag}>
                      {tag === "all" ? "All Tags" : tag}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="blog-grid">
              {filteredBlogs.length === 0 ? (
                <div className="empty-state">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3>No posts found</h3>
                  <p>Try adjusting your search or filter</p>
                </div>
              ) : (
                filteredBlogs.map((blog) => (
                  <div key={blog._id} className="blog-card-admin">
                    {blog.coverImage && (
                      <div className="blog-card-image">
                        <img src={blog.coverImage} alt={blog.title} />
                      </div>
                    )}
                    <div className="blog-card-content">
                      <h3>{blog.title}</h3>
                      <div className="blog-card-meta">
                        <span className="meta-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {blog.views || 0}
                        </span>
                        <span className="meta-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          {blog.likes?.length || 0}
                        </span>
                        <span className="meta-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          {blog.comments?.length || 0}
                        </span>
                      </div>
                      <div className="blog-card-tags">
                        {blog.tags?.slice(0, 3).map((tag, i) => (
                          <span key={i} className="tag-badge-small">#{tag}</span>
                        ))}
                      </div>
                      <p className="blog-card-date">{formatDate(blog.createdAt)}</p>
                    </div>
                    <div className="blog-card-actions">
                      <button 
                        className="action-btn edit"
                        onClick={() => startEditing(blog)}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button 
                        className="action-btn delete"
                        onClick={() => deleteBlog(blog._id)}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogAdmin;