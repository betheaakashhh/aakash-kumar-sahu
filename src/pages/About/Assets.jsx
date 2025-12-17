import React from 'react';
import { FileText, Award, Image, ExternalLink } from 'lucide-react';

// Centralized Assets Management
const Assets = {
  certificates: {
    iitBhubaneswar2024: {
      id: 'iit-bhubaneswar-2024',
      name: 'IIT Bhubaneswar Internship Certificate',
      type: 'image',
      url: '/images/iit-intern.jpg',
      previewUrl: 'https://via.placeholder.com/800x600/0a0a0a/0ff?text=IIT+Bhubaneswar+Certificate',
      issuer: 'IIT Bhubaneswar',
      date: 'August 2024',
      description: 'Technical Research Internship Completion Certificate'
    },
    freelancePortfolio: {
      id: 'freelance-portfolio-2023',
      name: 'Freelance Portfolio Certificate',
      type: 'image',
      url: 'https://example.com/certificates/freelance-portfolio.pdf',
      previewUrl: 'https://via.placeholder.com/800x600/0a0a0a/00ff88?text=Freelance+Portfolio+Certificate',
      issuer: 'Self-Employed',
      date: 'December 2023',
      description: 'Full Stack Development Portfolio Completion'
    },
    foundationCourse: {
      id: 'foundation-course-2021',
      name: 'Programming Foundation Certificate',
      type: 'image',
      url: 'https://example.com/certificates/foundation-course.pdf',
      previewUrl: 'https://via.placeholder.com/800x600/0a0a0a/ff0099?text=Foundation+Course+Certificate',
      issuer: 'Online Learning Platform',
      date: 'December 2021',
      description: 'Introduction to Programming Completion'
    },
    hackathon2023: {
      id: 'smart-india-hackathon-2023',
      name: 'Smart India Hackathon Winner',
      type: 'image',
      url: 'https://example.com/certificates/sih-2023.pdf',
      previewUrl: 'https://via.placeholder.com/800x600/0a0a0a/ffd700?text=Smart+India+Hackathon+Winner',
      issuer: 'Government of India',
      date: 'September 2023',
      description: 'National Level Hackathon Winner Certificate'
    },
    ieeePublication: {
      id: 'ieee-publication-2023',
      name: 'IEEE Conference Publication',
      type: 'pdf',
      url: 'https://example.com/certificates/ieee-paper.pdf',
      previewUrl: 'https://via.placeholder.com/800x600/0a0a0a/ff6600?text=IEEE+Publication+Certificate',
      issuer: 'IEEE Computer Society',
      date: 'November 2023',
      description: 'Research Paper Publication Certificate'
    }
  },
  
  projects: {
    ecommercePlatform: {
      id: 'ecommerce-platform',
      name: 'E-commerce Platform',
      thumbnail: 'https://via.placeholder.com/400x300/0a0a0a/0ff?text=E-commerce+Platform',
      screenshots: [
        'https://via.placeholder.com/800x600/0a0a0a/0ff?text=Homepage',
        'https://via.placeholder.com/800x600/0a0a0a/0ff?text=Product+Page'
      ]
    },
    mlDashboard: {
      id: 'ml-dashboard',
      name: 'ML Data Visualization Dashboard',
      thumbnail: 'https://via.placeholder.com/400x300/0a0a0a/00ff88?text=ML+Dashboard',
      screenshots: [
        'https://via.placeholder.com/800x600/0a0a0a/00ff88?text=Dashboard+Overview'
      ]
    }
  },
  
  getCertificate: (id) => {
    return Object.values(Assets.certificates).find(cert => cert.id === id);
  },
  
  getProject: (id) => {
    return Assets.projects[id];
  }
};

const CertificatePreview = ({ certificate, onClose }) => {
  if (!certificate) return null;

  return (
    <div style={{
      marginTop: '20px',
      padding: '20px',
      background: 'rgba(0, 255, 255, 0.09)',
      border: '2px solid rgba(0, 255, 255, 0.3)',
      borderRadius: '12px',
      animation: 'slideDown 0.3s ease-out'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        marginBottom: '15px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div>
          <h4 style={{ color: '#0ff', fontSize: '1.1rem', marginBottom: '5px' }}>
            {certificate.name}
          </h4>
          <p style={{ color: '#999', fontSize: '0.9rem' }}>
            Issued by {certificate.issuer} • {certificate.date}
          </p>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255, 0, 0, 0.2)',
            border: '1px solid rgba(255, 0, 0, 0.5)',
            color: '#ff0000',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          Close Preview
        </button>
      </div>

      <div style={{
        width: '100%',
        maxHeight: '500px',
        overflow: 'hidden',
        borderRadius: '8px',
        border: '1px solid rgba(0, 255, 255, 0.2)',
        marginBottom: '15px'
      }}>
        <img 
          src={certificate.url} 
          alt={certificate.name}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block'
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <a
          href={certificate.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: 'rgba(0, 255, 255, 0.2)',
            border: '1px solid rgba(0, 255, 255, 0.5)',
            borderRadius: '8px',
            color: '#0ff',
            textDecoration: 'none',
            fontSize: '0.95rem',
            transition: 'all 0.3s'
          }}
        >
          <ExternalLink size={16} />
          Open Full Certificate
        </a>
        <button
          onClick={() => window.open(certificate.url, '_blank')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: 'rgba(0, 255, 136, 0.2)',
            border: '1px solid rgba(0, 255, 136, 0.5)',
            borderRadius: '8px',
            color: '#00ff88',
            cursor: 'pointer',
            fontSize: '0.95rem',
            transition: 'all 0.3s'
          }}
        >
          <FileText size={16} />
          Download
        </button>
      </div>
    </div>
  );
};

const AssetsDemo = () => {
  const [previewCert, setPreviewCert] = React.useState(null);

  const demoData = [
    {
      title: 'IIT Bhubaneswar Internship',
      certId: 'iit-bhubaneswar-2024',
      description: 'Technical Research Internship 2024'
    },
    {
      title: 'Smart India Hackathon',
      certId: 'smart-india-hackathon-2023',
      description: 'Winner - National Level Competition'
    },
    {
      title: 'IEEE Publication',
      certId: 'ieee-publication-2023',
      description: 'Research Paper in ML Optimization'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          marginBottom: '20px',
          background: 'linear-gradient(90deg, #0ff, #00ff88)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center'
        }}>
          <Award size={40} style={{ verticalAlign: 'middle', marginRight: '10px', color: '#0ff' }} />
          Certificate Showcase
        </h1>

        <p style={{
          textAlign: 'center',
          color: '#999',
          marginBottom: '40px',
          fontSize: '1.1rem'
        }}>
          Click "View Certificate" to see live preview below
        </p>

        <div style={{
          display: 'grid',
          gap: '30px'
        }}>
          {demoData.map((item, index) => {
            const cert = Assets.getCertificate(item.certId);
            const isPreviewOpen = previewCert?.id === cert?.id;

            return (
              <div key={index} style={{
                padding: '30px',
                background: 'rgba(0, 255, 255, 0.05)',
                border: '1px solid rgba(0, 255, 255, 0.2)',
                borderRadius: '12px',
                transition: 'all 0.3s'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  marginBottom: '15px',
                  flexWrap: 'wrap',
                  gap: '15px'
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '1.5rem',
                      color: '#fff',
                      marginBottom: '8px'
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      color: '#999',
                      fontSize: '1rem'
                    }}>
                      {item.description}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (isPreviewOpen) {
                        setPreviewCert(null);
                      } else {
                        setPreviewCert(cert);
                      }
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 24px',
                      background: isPreviewOpen 
                        ? 'rgba(255, 0, 0, 0.2)' 
                        : 'rgba(0, 255, 255, 0.2)',
                      border: isPreviewOpen 
                        ? '1px solid rgba(255, 0, 0, 0.5)' 
                        : '1px solid rgba(0, 255, 255, 0.5)',
                      borderRadius: '8px',
                      color: isPreviewOpen ? '#ff0000' : '#0ff',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 600,
                      transition: 'all 0.3s',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {isPreviewOpen ? (
                      <>✕ Hide Preview</>
                    ) : (
                      <>
                        <Award size={18} />
                        View Certificate
                      </>
                    )}
                  </button>
                </div>

                {isPreviewOpen && (
                  <CertificatePreview 
                    certificate={cert} 
                    onClose={() => setPreviewCert(null)}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '60px' }}>
          <h2 style={{
            fontSize: '2rem',
            marginBottom: '30px',
            color: '#0ff',
            textAlign: 'center'
          }}>
            <Image size={30} style={{ verticalAlign: 'middle', marginRight: '10px', color: '#0ff' }} />
            All Certificates
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            {Object.values(Assets.certificates).map((cert, index) => (
              <div
                key={index}
                onClick={() => setPreviewCert(cert)}
                style={{
                  padding: '20px',
                  background: 'rgba(0, 255, 255, 0.05)',
                  border: '1px solid rgba(0, 255, 255, 0.2)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 255, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '100%',
                  height: '150px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  marginBottom: '15px'
                }}>
                  <img 
                    src={cert.previewUrl}
                    alt={cert.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <h4 style={{
                  color: '#0ff',
                  fontSize: '1rem',
                  marginBottom: '5px'
                }}>
                  {cert.name}
                </h4>
                <p style={{
                  color: '#999',
                  fontSize: '0.85rem'
                }}>
                  {cert.issuer} • {cert.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        button:hover, a:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default AssetsDemo;
export { Assets, CertificatePreview };