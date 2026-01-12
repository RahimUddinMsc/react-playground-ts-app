import React from 'react';
import './css/Layout.css'; // new css file


const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="video-bg-wrapper">
      {/* Background video */}
      <video
        className="video-bg"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="public\videos\crm-loop.mp4" type="video/mp4" />
        {/* optional extra formats */}
        {/* <source src="/videos/crm-loop.webm" type="video/webm" /> */}
      </video>

      {/* Dark overlay so UI is readable */}
      <div className="video-overlay" />

      {/* Your actual app */}
      <div className="app-content">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;