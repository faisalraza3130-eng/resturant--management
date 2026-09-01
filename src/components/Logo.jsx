import React from 'react';

const Logo = ({ size = 40, className = "", prominent = false }) => {
  return (
    <div className={`logo-container ${className}`} style={{
      display: 'flex',
      alignItems: 'center',
      gap: prominent ? '24px' : '12px',
      flexDirection: prominent ? 'column' : 'row',
      transition: 'all 0.5s ease'
    }}>
      <div className={prominent ? "logo-svg-wrapper prominent" : "logo-svg-wrapper"}>
        <svg
          width={prominent ? size * 1.6 : size}
          height={prominent ? size * 1.6 : size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: prominent ? 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.4))' : 'none',
            transition: 'all 0.3s ease'
          }}
        >
          {/* Base Circle (Deep Teal) */}
          <circle cx="50" cy="50" r="48" fill="#002d26" />

          {/* Golden Ornate Ring */}
          <circle cx="50" cy="50" r="44" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="2 1" />
          <circle cx="50" cy="50" r="41" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />

          {/* Stylized Tea Kettle (Gold) */}
          <path
            d="M35 65C35 72 65 72 65 65V45C65 40 35 40 35 45V65ZM30 48L35 50M65 55L75 45M45 40C45 35 55 35 55 40"
            stroke="#D4AF37"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Liquid Flow Detail */}
          <path
            d="M40 50Q50 55 60 50"
            stroke="#D4AF37"
            strokeWidth="1"
            opacity="0.6"
          />

          {/* Animated Steam (Gold) */}
          <g className="steam-group">
            <path d="M45 32Q48 22 46 17" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <path d="M52 28Q55 18 53 13" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          </g>
        </svg>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        lineHeight: '1.1',
        textAlign: prominent ? 'center' : 'left',
        alignItems: prominent ? 'center' : 'flex-start'
      }}>
        <span style={{
          color: '#D4AF37',
          fontWeight: '900',
          fontSize: prominent ? '38px' : '18px',
          letterSpacing: prominent ? '4px' : '1.5px',
          textShadow: prominent ? '0 4px 10px rgba(0,0,0,0.3)' : '0.5px 0.5px 0px rgba(0,0,0,0.5)',
          fontFamily: 'serif'
        }}>
          MuRsHiD
        </span>
        <span style={{
          color: prominent ? '#D4AF37' : '#004D40',
          fontWeight: '400',
          fontSize: prominent ? '22px' : '13px',
          letterSpacing: prominent ? '10px' : '3px',
          textTransform: 'uppercase',
          marginTop: prominent ? '6px' : '2px',
          opacity: prominent ? 0.9 : 1,
          borderTop: prominent ? '1px solid rgba(212, 175, 55, 0.3)' : 'none',
          paddingTop: prominent ? '4px' : '0'
        }}>
          KhAnA
        </span>
      </div>
    </div>
  );
};

export default Logo;
