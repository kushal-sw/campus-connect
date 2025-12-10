import { useNavigate } from 'react-router-dom';

export default function CampusConnectLanding() {
  const navigate = useNavigate();
  
  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(280px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(280px) rotate(-360deg); }
        }
        
        .pulse-animation {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .float-animation-1 {
          animation: float 3s ease-in-out infinite;
        }
        
        .float-animation-2 {
          animation: float 3s ease-in-out infinite 1.5s;
        }
        
        .orbit-container {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          z-index: 5;
        }
        
        .orbit-card {
          position: absolute;
          left: -100px;
          top: -35px;
          transform-origin: center center;
        }
        
        .orbit-card-1 {
          animation: orbit 30s linear infinite;
        }
        
        .orbit-card-2 {
          animation: orbit 30s linear infinite;
          animation-delay: -7.5s;
        }
        
        .orbit-card-3 {
          animation: orbit 30s linear infinite;
          animation-delay: -15s;
        }
        
        .orbit-card-4 {
          animation: orbit 30s linear infinite;
          animation-delay: -22.5s;
        }
      `}</style>
      
      <div style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
        overflowX: 'hidden',
        background: 'linear-gradient(135deg, #FFE5B4 0%, #E8B5FF 25%, #9B7EDE 50%, #4A3B6B 75%, #1a1a2e 100%)',
        minHeight: '100vh'
      }}>
        {/* Navigation */}
        <nav style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.2rem 5%',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          zIndex: 1000,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{
            fontSize: '1.4rem',
            fontWeight: 700,
            color: '#1a1a2e',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 800
            }}>
              C
            </div>
            Campus Connect
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '3.5rem' }}>
            <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
              <a href="#features" style={{
                color: '#2a2a3e',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.95rem'
              }}>Features</a>
              <a href="#about" style={{
                color: '#2a2a3e',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.95rem'
              }}>About</a>
              <a href="#community" style={{
                color: '#2a2a3e',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.95rem'
              }}>Community</a>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button 
                onClick={() => navigate('/login')}
                style={{
                  padding: '0.65rem 1.5rem',
                  background: 'transparent',
                  border: 'none',
                  color: '#2a2a3e',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '0.95rem'
                }}>
                Log In
              </button>
              <button 
                onClick={() => navigate('/signup')}
                style={{
                  padding: '0.75rem 2rem',
                  background: 'white',
                  color: '#667eea',
                  border: 'none',
                  borderRadius: '50px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: '1rem',
                  boxShadow: '0 8px 24px rgba(102, 126, 234, 0.25)'
                }}>
                Register Now
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 5%',
          gap: '6rem'
        }}>
          {/* Left Content */}
          <div style={{
            flex: 1,
            maxWidth: '580px',
            paddingTop: '80px'
          }}>
            <p style={{
              fontSize: '0.95rem',
              color: '#2a2a3e',
              marginBottom: '0.5rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              💜 YOUR CAMPUS. UNFILTERED.
            </p>
            
            <h1 style={{
              fontSize: '5rem',
              lineHeight: 1.05,
              marginBottom: '2.5rem',
              color: '#1a1a2e',
              fontWeight: 900,
              letterSpacing: '-2px',
              maxWidth: '580px'
            }}>
              Where Campus<br/>
              Secrets Live.
            </h1>
            
            <p style={{
              fontSize: '1.2rem',
              color: '#3a3a4e',
              marginBottom: '2rem',
              lineHeight: 1.6,
              fontWeight: 500,
              maxWidth: '500px'
            }}>
              Anonymous confessions, tea drops, university updates, and student profiles — all in one exclusive college-only space.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <button 
                onClick={() => navigate('/signup')}
                style={{
                  padding: '1.2rem 3rem',
                  background: '#1a1a2e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.7rem',
                  boxShadow: '0 24px 60px rgba(15, 23, 42, 0.3)'
                }}>
                Enter the Campus
                <span>😈</span>
              </button>
              <button 
                onClick={() => navigate('/login')}
                style={{
                  padding: '1.2rem 3rem',
                  background: 'transparent',
                  color: '#3a3a4e',
                  border: '2px solid rgba(58, 58, 78, 0.25)',
                  borderRadius: '50px',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}>
                Join Your Campus
              </button>
            </div>
            
            <p style={{
              fontSize: '0.85rem',
              color: '#4a4a5e',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginTop: '0.5rem',
              marginBottom: '2rem'
            }}>
              🔒 Only for @isu.ac.in / college email
            </p>

            <div style={{
              display: 'flex',
              gap: '0.8rem',
              flexWrap: 'wrap',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <span style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                padding: '0.55rem 1.1rem',
                borderRadius: '50px',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#1a1a2e',
                border: '1px solid rgba(102, 126, 234, 0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)'
              }}>
                🧑‍🎓 Built for college students
              </span>
              <span style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                padding: '0.55rem 1.1rem',
                borderRadius: '50px',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#1a1a2e',
                border: '1px solid rgba(102, 126, 234, 0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)'
              }}>
                🔐 100% Anonymous
              </span>
              <span style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                padding: '0.55rem 1.1rem',
                borderRadius: '50px',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#1a1a2e',
                border: '1px solid rgba(102, 126, 234, 0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)'
              }}>
                📍 @isu.ac.in only
              </span>
            </div>
          </div>

          {/* Right Visual */}
          <div style={{
            flex: 1,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '650px'
          }}>
            <div style={{
              position: 'relative',
              width: '650px',
              height: '650px'
            }}>
              {/* Top Badge - Floating */}
              <div className="float-animation-1" style={{
                position: 'absolute',
                top: '0px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '0.6rem 1.3rem',
                borderRadius: '50px',
                boxShadow: '0 12px 30px rgba(102, 126, 234, 0.3)',
                fontWeight: 700,
                fontSize: '0.85rem',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                zIndex: 8
              }}>
                ✨ isu.ac.in Only
              </div>

              {/* Center Circle */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '220px',
                height: '220px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(30px)',
                border: '2px solid rgba(255, 255, 255, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 15,
                boxShadow: '0 0 80px rgba(102, 126, 234, 0.3), 0 20px 60px rgba(0, 0, 0, 0.15)'
              }}>
                <div className="pulse-animation" style={{ fontSize: '4.5rem' }}>👀</div>
                <div style={{
                  fontSize: '1.1rem',
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontWeight: 700,
                  marginTop: '0.8rem',
                  textAlign: 'center',
                  lineHeight: 1.4
                }}>
                  Be The First<br/>To Join
                </div>
                
                {/* Bottom Tagline - Floating */}
                <div className="float-animation-2" style={{
                  position: 'absolute',
                  bottom: '-50px',
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  padding: '0.6rem 1.3rem',
                  borderRadius: '50px',
                  border: '2px solid rgba(255, 255, 255, 0.5)',
                  boxShadow: '0 12px 30px rgba(102, 126, 234, 0.3)'
                }}>
                  😈 Chaos Lives Here
                </div>
              </div>
              
              {/* Orbit Rings */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '440px',
                height: '440px',
                borderRadius: '50%',
                border: '1px dashed rgba(255, 255, 255, 0.2)'
              }}></div>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '560px',
                height: '560px',
                borderRadius: '50%',
                border: '1px dashed rgba(255, 255, 255, 0.15)'
              }}></div>

              {/* Feature Cards with Orbit Animation */}
              <div className="orbit-container">
                <FeatureCard 
                  className="orbit-card-1"
                  icon="🎭"
                  title="Anonymous Confessions"
                  desc="Speak your truth"
                />
              </div>
              <div className="orbit-container">
                <FeatureCard 
                  className="orbit-card-2"
                  icon="☕"
                  title="Campus Tea"
                  desc="All the gossip"
                />
              </div>
              <div className="orbit-container">
                <FeatureCard 
                  className="orbit-card-3"
                  icon="📰"
                  title="Bulletin Board"
                  desc="Stay updated"
                />
              </div>
              <div className="orbit-container">
                <FeatureCard 
                  className="orbit-card-4"
                  icon="🔍"
                  title="Find Students"
                  desc="Connect with batch"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

interface FeatureCardProps {
  position?: React.CSSProperties;
  icon: string;
  title: string;
  desc: string;
  isHero?: boolean;
  className?: string;
}

function FeatureCard({ position = {}, icon, title, desc, isHero = false, className = '' }: FeatureCardProps) {
  return (
    <div className={`orbit-card ${className}`} style={{
      ...position,
      background: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(20px)',
      padding: '1rem 1.4rem',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(15, 23, 42, 0.12), 0 2px 8px rgba(15, 23, 42, 0.08)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.9rem',
      border: '1px solid rgba(102, 126, 234, 0.2)',
      whiteSpace: 'nowrap',
      minWidth: '200px'
    }}>
      <div style={{
        fontSize: '1.8rem',
        width: '46px',
        height: '46px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        {icon}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{
          fontWeight: 700,
          color: '#1a1a2e',
          fontSize: '0.95rem'
        }}>
          {title}
        </div>
        <div style={{
          fontSize: '0.8rem',
          color: '#666'
        }}>
          {desc}
        </div>
      </div>
    </div>
  );
}