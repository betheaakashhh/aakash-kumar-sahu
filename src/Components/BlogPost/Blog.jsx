import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BlogFeed from './BlogFeed/BlogFeed';
import BlogDetail from './BlogDetails/BlogDetail';
import './Blog.css';

function Blog() {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedTag, setSelectedTag] = useState('all');
  const [allTags, setAllTags] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    if (slug) {
      fetchBlogBySlug();
      setIsDetailOpen(true);
      setLoading(false);
    } else {
      fetchBlogs();
    }
  }, [slug]);

  const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

  const fetchBlogBySlug = async () => {
    const res = await fetch(`${API_URL}/api/blogs/${slug}`);
    const data = await res.json();
    if (data.success) {
      setSelectedBlog(data.blog);
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${API_URL}/api/blogs`);
      const data = await response.json();
      if (data.success) {
        setBlogs(data.blogs);
        setFilteredBlogs(data.blogs);
        
        // Extract unique tags from all blogs
        const tags = new Set();
        data.blogs.forEach(blog => {
          if (blog.tags && Array.isArray(blog.tags)) {
            blog.tags.forEach(tag => tags.add(tag));
          }
        });
        setAllTags(['all', ...Array.from(tags)]);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTagFilter = (tag) => {
    setSelectedTag(tag);
    if (tag === 'all') {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(blog => 
        blog.tags && blog.tags.includes(tag)
      );
      setFilteredBlogs(filtered);
    }
  };

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    setIsDetailOpen(true);
    window.history.pushState({}, '', `/public-blog/${blog.slug}`);
  };

  const handleBack = () => {
    setIsDetailOpen(false);
    setSelectedBlog(null);
    setSelectedTag('all');
    window.history.pushState({}, '', '/public-blog');
    fetchBlogs();
  };

  useEffect(() => {
    const handlePopState = () => {
      setIsDetailOpen(false);
      setSelectedBlog(null);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading amazing content...</p>
      </div>
    );
  }

  return (
    <div className="blog-app">
      {isDetailOpen && selectedBlog ? (
        <BlogDetail 
          blog={selectedBlog} 
          onBack={handleBack} 
          onUpdate={fetchBlogs}
        />
      ) : (
        <div className="blog-main-container">
          <div className="blog-header">
            <h1 className="blog-title">Blog</h1>
            <p className="blog-subtitle">Explore our latest articles and insights</p>
          </div>

          {allTags.length > 1 && (
            <div className="tag-filter-container">
              <div className="tag-filter-wrapper">
                <span className="filter-label">Filter by:</span>
                <div className="tag-pills">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      className={`tag-pill ${selectedTag === tag ? 'active' : ''}`}
                      onClick={() => handleTagFilter(tag)}
                    >
                      {tag === 'all' ? 'All Posts' : tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {filteredBlogs.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">📝</div>
              <h3>No posts found</h3>
              <p>Try selecting a different tag or check back later</p>
            </div>
          ) : (
            <BlogFeed 
              blogs={filteredBlogs} 
              onBlogClick={handleBlogClick}
              onLoadMore={fetchBlogs}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Blog;