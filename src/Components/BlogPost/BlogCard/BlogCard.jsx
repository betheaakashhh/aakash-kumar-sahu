import React, { useState } from 'react';
import './BlogCard.css';

const BlogCard = ({ blog, onClick }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(blog.likeCount || 0);
  
  const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

  const handleLikeClick = async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch(`${API_URL}/api/blogs/${blog._id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      if (data.success) {
        setLiked(data.liked);
        setLikeCount(data.likeCount);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/blog/${blog.slug}`;
    
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.preview,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      // Show copied message
      const shareBtn = e.target;
      const originalText = shareBtn.textContent;
      shareBtn.textContent = 'Copied!';
      setTimeout(() => {
        shareBtn.textContent = originalText;
      }, 2000);
    }
  };

  return (
    <div className="blog-card" onClick={onClick}>
      {blog.coverImage && (
        <div className="blog-image-container">
          <img 
            src={blog.coverImage} 
            alt={blog.title}
            className="blog-image"
            loading="lazy"
          />
        </div>
      )}
      
      <div className="blog-content">
        <div className="blog-meta">
          <span className="blog-slug">{blog.slug}</span>
          <span className="blog-date">
            {new Date(blog.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
        
        <h3 className="blog-title">{blog.title}</h3>
        
        <p className="blog-preview">
         {blog.preview 
  || (blog.content ? blog.content.substring(0, 120) : "No preview available")}...

        </p>
        
        <div className="blog-tags">
          {blog.tags?.slice(0, 3).map((tag, index) => (
            <span key={index} className="blog-tag">#{tag}</span>
          ))}
        </div>
        
        <div className="blog-stats">
          <button 
            className={`like-btn ${liked ? 'liked' : ''}`}
            onClick={handleLikeClick}
          >
            <span className="like-icon">{liked ? '❤️' : '🤍'}</span>
            <span className="like-count">{likeCount}</span>
          </button>
          
          <div className="views-count">
            <span className="views-icon">👁️</span>
            <span>{blog.views || 0}</span>
          </div>
          
          <button className="share-btn" onClick={handleShare}>
            <span className="share-icon">↗️</span>
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;