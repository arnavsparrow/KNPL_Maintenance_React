import React from 'react';
import type { PageName } from '../../types';

interface MastersSectionProps {
  currentPage: PageName;
  collapsed: boolean;
  onNavigate: (page: PageName) => void;
  onToggle: () => void;
}

const MastersSection: React.FC<MastersSectionProps> = ({
  currentPage, collapsed, onNavigate, onToggle,
}) => {
  const isNavActive = currentPage === 'asset-master' || currentPage === 'tag-master';

  const items: { page: PageName; icon: string; label: string }[] = [
    { page: 'asset-master', icon: '🏗', label: 'Asset Master' },
    { page: 'tag-master',   icon: '📡', label: 'MQTT Tag Master' },
  ];

  return (
    <div className={`sn-section${isNavActive ? ' nav-active' : ''}${collapsed ? ' collapsed' : ''}`}>
      <div className="sn-section-header">
        <div className="sn-active-bar"></div>
        <div className="sn-nav-area" onClick={() => onNavigate('asset-master')} style={{ cursor: 'default' }}>
          <span className="sn-section-icon">⚙️</span>
          <span className="sn-section-title">Masters</span>
        </div>
        <button className="sn-toggle-btn" onClick={onToggle} title="Expand / Collapse">▼</button>
      </div>
      <div className="sn-section-body">
        {items.map(item => (
          <div
            key={item.page}
            className={`masters-nav-item${currentPage === item.page ? ' active' : ''}`}
            onClick={() => onNavigate(item.page)}
          >
            <span className="masters-nav-icon">{item.icon}</span>
            <span className="masters-nav-label">{item.label}</span>
            {currentPage === item.page && <span className="masters-nav-active-dot"></span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MastersSection;
