import React from 'react';

interface TopNavProps {
  clockStr: string;
}

const TopNav: React.FC<TopNavProps> = ({ clockStr }) => {
  return (
    <nav className="topnav">
      <div className="topnav-left">
        <div className="topnav-logo">
          🏭 IndustryOS™ <span className="logo-badge">KNPL</span>
        </div>
        <div className="topnav-divider"></div>
        <div className="breadcrumb">
          Hosur Factory &rsaquo; <span>Maintenance</span> &rsaquo; Breakdown &amp; Idle Time
        </div>
      </div>
      <div className="topnav-right">
        <div className="live-badge"><div className="live-dot"></div> LIVE</div>
        <div className="topnav-time">{clockStr}</div>
        <div className="topnav-user">
          <div className="avatar">RW</div>
          <div className="user-name">Rajwardhan</div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
