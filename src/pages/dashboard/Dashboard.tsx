import React from 'react';
import './css/Dashboard.css';
import '../../layout/css/Layout.css';
import ActionPanel from '../../features/dasboard/actions/ActionPanel';
const videoPath = '/assets/videos/crm-loop-2.mp4';

const Dashboard: React.FC = () => {
    
  return <>
{/* <div className="video-bg-wrapper">
  <video className="video-bg" autoPlay muted loop playsInline>
    <source src={videoPath} type="video/mp4" />
  </video>
  <div className="video-overlay" />
  <div className="app-content">
    <div className="page">
      <main className="content">
        
      </main>
      <ActionPanel />
    </div>
  </div>
</div> */}

    <div className="video-bg-wrapper">  {/* Keep same wrapper */}
      {/* Animated background image replaces video */}
      <div className="image-bg-overlay" />
      
      <div className="page">
        <main className="content">

        </main>
          <ActionPanel />
      </div>
    </div>

    
  </>;
};

export default Dashboard;