import React, { useState, useEffect } from 'react';
import Logo from '../components/Logo';

const Welcome = ({ onEnter }) => {
  const [showLoading, setShowLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const name = "MuRsHiD KhAnA";

  useEffect(() => {
    // Stage 1: Emergence of name (takes ~2s)
    // Stage 2: Show Loading Bar after 2.5s
    const loadingTimer = setTimeout(() => {
      setShowLoading(true);
    }, 2500);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (showLoading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(onEnter, 600); // Elegant exit after completion
            return 100;
          }
          // Non-linear progress for more professional feel
          const step = prev < 30 ? 3 : (prev < 70 ? 2 : 1.5);
          return Math.min(prev + step, 100);
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [showLoading, onEnter]);

  return (
    <div className="welcome-screen">
      <div className="welcome-bg-decoration"></div>

      <div className="welcome-content">
        <div className="welcome-hero">
          <Logo size={90} prominent={true} className="royal-logo" />
        </div>

        <div className="welcome-text-group">
          <h1>
            {name.split('').map((char, index) => (
              <span
                key={index}
                className="char-emerge"
                style={{
                  animationDelay: `${0.5 + index * 0.08}s`,
                  marginRight: char === ' ' ? '15px' : '2px'
                }}
              >
                {char}
              </span>
            ))}
          </h1>
          <p className="animate-fade-in-up" style={{ animationDelay: '1.8s' }}>
            Premium Tea Stall & Operations
          </p>
        </div>

        <div className={`royal-loading-wrapper ${showLoading ? 'active' : ''}`}>
          {showLoading && (
            <div className="loading-content">
              <div className="loading-status">Initializing Royal Systems...</div>
              <div className="royal-loading-bar-outer">
                <div
                  className="royal-loading-bar-inner"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="loading-percent">{Math.round(progress)}%</div>
            </div>
          )}
        </div>
      </div>

      <div className="welcome-footer animate-fade-in" style={{ animationDelay: '2s' }}>
        Est. 2026 · MuRsHiD KhAnA · Smart Stall v2.1
      </div>
    </div>
  );
};

export default Welcome;
