import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './BlogDetail.css';

const BlogDetail = ({ blog, onBack, onUpdate }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(blog.likeCount || 0);
  const [comments, setComments] = useState(blog.comments || []);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [likeAnimation, setLikeAnimation] = useState(false);

  const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    fetchBlogDetails();
  }, [blog._id]);

  const fetchBlogDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/api/blogs/${blog.slug}`);
      const data = await response.json();
      if (data.success) {
        blog.content = data.blog.content;
        blog.views = data.blog.views;
        setLikeCount(data.blog.likes?.length || 0);
        setComments(data.blog.comments || []);
      }
    } catch (error) {
      console.error('Error fetching blog details:', error);
    }
  };

  const handleLike = async () => {
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
        setLikeAnimation(true);
        setTimeout(() => setLikeAnimation(false), 600);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch(`${API_URL}/api/blogs/${blog._id}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newComment }),
      });
      
      const data = await response.json();
      if (data.success) {
        setComments(data.comments);
        setNewComment('');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/public-blog/${blog.slug}`;
    const shareData = {
      title: blog.title,
      text: blog.content?.substring(0, 100),
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      setIsSharing(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.origin}/public-blog/${blog.slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatRelativeTime = (date) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diffInSeconds = Math.floor((now - commentDate) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return formatDate(date);
  };

  return (
    <div className="blog-detail-wrapper">
      <div className="blog-detail-container">
        <button className="back-button-modern" onClick={onBack}>
          <svg className="back-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Blog</span>
        </button>
        
        <article className="blog-article-modern">
          {blog.coverImage && (
            <div className="blog-hero-image">
              <img 
                src={blog.coverImage} 
                alt={blog.title}
                className="hero-image"
              />
              <div className="hero-overlay"></div>
            </div>
          )}
          
          <div className="blog-content-wrapper">
            <header className="blog-header-modern">
              <div className="blog-meta-row">
                <span className="blog-author-badge">
                  <svg className="author-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  Me/{blog.slug}
                </span>
                <span className="blog-date-badge">
                  <svg className="calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
                    <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
                    <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
                    <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
                  </svg>
                  {formatDate(blog.createdAt)}
                </span>
              </div>
              
              <h1 className="blog-title-modern">{blog.title}</h1>
              
              <div className="blog-tags-modern">
                {blog.tags?.map((tag, index) => (
                  <span key={index} className="tag-badge-modern">
                    <span className="tag-hash">#</span>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="blog-stats-bar">
                <div className="stat-item">
                  <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>{blog.views || 0} views</span>
                </div>
                <div className="stat-item">
                  <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{Math.ceil((blog.content?.length || 0) / 200)} min read</span>
                </div>
              </div>
            </header>
            
            <div className="blog-content-modern">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {blog.content}
              </ReactMarkdown>
            </div>
            
            <div className="blog-actions-modern">
              <button 
                className={`action-btn-modern like-btn ${liked ? 'liked' : ''} ${likeAnimation ? 'animate' : ''}`}
                onClick={handleLike}
              >
                <svg className="action-icon" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="action-text">{likeCount}</span>
              </button>
              
              <button 
                className={`action-btn-modern comment-btn ${showComments ? 'active' : ''}`}
                onClick={() => setShowComments(!showComments)}
              >
                <svg className="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="action-text">{comments.length}</span>
              </button>
              
              <button className="action-btn-modern share-btn" onClick={handleShare}>
                <svg className="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span className="action-text">Share</span>
              </button>
            </div>
            
            {showComments && (
              <div className="comments-section-modern">
                <div className="comments-header">
                  <h3 className="comments-title-modern">
                    <svg className="comments-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                    Comments ({comments.length})
                  </h3>
                </div>
                
                <form className="comment-form-modern" onSubmit={handleCommentSubmit}>
                  <div className="comment-input-wrapper">
                    <textarea
                      className="comment-input-modern"
                      placeholder="Share your thoughts..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows="3"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="comment-submit-modern"
                    disabled={!newComment.trim()}
                  >
                    <svg className="send-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Post Comment
                  </button>
                </form>
                
                <div className="comments-list-modern">
                  {comments.length === 0 ? (
                    <div className="no-comments">
                      <svg className="no-comments-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <p>No comments yet. Be the first to share your thoughts!</p>
                    </div>
                  ) : (
                    comments.map((comment, index) => (
                      <div key={comment.commentId} className="comment-item-modern" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="comment-avatar">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                        <div className="comment-content">
                          <div className="comment-header">
                            <span className="comment-author">Anonymous User</span>
                            <span className="comment-time">{formatRelativeTime(comment.timestamp)}</span>
                          </div>
                          <p className="comment-text-modern">{comment.text}</p>
                          
                          {comment.replies?.length > 0 && (
                            <div className="comment-replies-modern">
                              {comment.replies.map((reply, replyIndex) => (
                                <div key={reply.replyId} className="reply-item-modern" style={{ animationDelay: `${replyIndex * 0.05}s` }}>
                                  <div className="reply-avatar">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                  </div>
                                  <div className="reply-content">
                                    <div className="reply-header">
                                      <span className="reply-author">Anonymous User</span>
                                      <span className="reply-time">{formatRelativeTime(reply.timestamp)}</span>
                                    </div>
                                    <p className="reply-text-modern">{reply.text}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
      
      {isSharing && (
        <div className="share-modal-overlay-modern" onClick={() => setIsSharing(false)}>
          <div className="share-modal-modern" onClick={e => e.stopPropagation()}>
            <div className="share-modal-header">
              <h3>Share this blog</h3>
              <button className="modal-close" onClick={() => setIsSharing(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="share-link-box">
              <input 
                type="text" 
                value={`${window.location.origin}/public-blog/${blog.slug}`} 
                readOnly 
                className="share-link-input"
              />
              <button className={`copy-link-btn ${copied ? 'copied' : ''}`} onClick={copyToClipboard}>
                {copied ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
            
            <div className="share-options-modern">
              <a 
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.origin + '/public-blog/' + blog.slug)}&text=${encodeURIComponent(blog.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-option twitter"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Twitter
              </a>
              
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/public-blog/' + blog.slug)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-option facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
              
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + '/public-blog/' + blog.slug)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-option linkedin"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              
              <a 
                href={`https://wa.me/?text=${encodeURIComponent(blog.title + ' ' + window.location.origin + '/public-blog/' + blog.slug)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-option whatsapp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;