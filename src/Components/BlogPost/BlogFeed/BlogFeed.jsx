import React, { useState, useEffect, useRef, useCallback } from 'react';
import BlogCard from '../BlogCard/BlogCard';
import './BlogFeed.css';

const BlogFeed = ({ blogs, onBlogClick, onLoadMore }) => {
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const pageSize = 6;

  const lastBlogRef = useCallback(node => {
    if (loadingMore) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreBlogs();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loadingMore, hasMore]);

  const loadMoreBlogs = async () => {
    setLoadingMore(true);
    try {
      // In a real app, you'd fetch with pagination
      // For now, we'll simulate loading more from the existing list
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (blogs.length <= page * pageSize) {
        setHasMore(false);
      }
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading more blogs:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const displayedBlogs = blogs.slice(0, page * pageSize);

  return (
    <div className="blog-feed">
      <header className="feed-header">
        <h1 className="feed-title">Blog Feed</h1>
        <p className="feed-subtitle">Thoughts, stories and ideas</p>
      </header>
      
      <div className="blogs-grid">
        {displayedBlogs.map((blog, index) => (
          <div 
            key={blog._id || blog.slug} 
            ref={index === displayedBlogs.length - 1 ? lastBlogRef : null}
          >
            <BlogCard blog={blog} onClick={() => onBlogClick(blog)} />
          </div>
        ))}
      </div>
      
      {loadingMore && (
        <div className="loading-more">
          <div className="loader"></div>
          <p>Loading more blogs...</p>
        </div>
      )}
      
      {!hasMore && blogs.length > 0 && (
        <div className="end-message">
          <p>You've reached the end ✨</p>
        </div>
      )}
      
      {blogs.length === 0 && !loadingMore && (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No blogs yet</h3>
          <p>Be the first to share your thoughts</p>
        </div>
      )}
    </div>
  );
};

export default BlogFeed;