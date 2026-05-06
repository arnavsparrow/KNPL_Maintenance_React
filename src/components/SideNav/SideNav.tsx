import React, { useState } from 'react';
import type { PageName } from '../../types';
import MaintenanceSection from './MaintenanceSection';
import EquipmentSection from './EquipmentSection';
import MastersSection from './MastersSection';

interface SideNavProps {
  currentPage: PageName;
  onNavigate: (page: PageName) => void;
  sensorValues: Record<string, number>;
  onOpenDetail: (id: string) => void;
  onOpenEscalation: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const SideNav: React.FC<SideNavProps> = ({
  currentPage, onNavigate, sensorValues,
  onOpenDetail, onOpenEscalation,
  collapsed, onToggleCollapse,
}) => {
  const [section1Collapsed, setSection1Collapsed] = useState(false);
  const [section2Collapsed, setSection2Collapsed] = useState(false);
  const [section3Collapsed, setSection3Collapsed] = useState(false);

  return (
    <aside className={`sidenav${collapsed ? ' collapsed' : ''}`} id="sidenav">
      <div className="sidenav-header">
        <div className="sidenav-title">🏭 Plant Monitor</div>
        <button
          className="sidenav-toggle"
          onClick={onToggleCollapse}
          title="Collapse / Expand"
        >
          {collapsed ? '▶' : '◀'}
        </button>
      </div>

      <div className="sidenav-body">
        <MaintenanceSection
          isNavActive={currentPage === 'maintenance'}
          collapsed={section1Collapsed}
          onNavigate={() => onNavigate('maintenance')}
          onToggle={() => setSection1Collapsed(c => !c)}
          onOpenDetail={onOpenDetail}
          onOpenEscalation={onOpenEscalation}
        />
        <EquipmentSection
          isNavActive={currentPage === 'equipment'}
          collapsed={section2Collapsed}
          onNavigate={() => onNavigate('equipment')}
          onToggle={() => setSection2Collapsed(c => !c)}
          sensorValues={sensorValues}
        />
        <MastersSection
          currentPage={currentPage}
          collapsed={section3Collapsed}
          onNavigate={onNavigate}
          onToggle={() => setSection3Collapsed(c => !c)}
        />
      </div>

      <div className="sidenav-footer">
        <div className="sidenav-stats">
          <div className="sidenav-stat">
            <div className="sidenav-stat-val" style={{ color: '#16A34A' }}>4</div>
            <div className="sidenav-stat-label">Running</div>
          </div>
          <div className="sidenav-stat">
            <div className="sidenav-stat-val" style={{ color: '#EF4444' }}>3</div>
            <div className="sidenav-stat-label">Fault</div>
          </div>
          <div className="sidenav-stat">
            <div className="sidenav-stat-val" style={{ color: '#D97706' }}>1</div>
            <div className="sidenav-stat-label">Idle</div>
          </div>
          <div className="sidenav-stat">
            <div className="sidenav-stat-val" style={{ color: '#94A3B8' }}>1</div>
            <div className="sidenav-stat-label">Stopped</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideNav;
