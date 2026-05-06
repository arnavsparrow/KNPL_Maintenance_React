import React from 'react';

interface MaintenanceSectionProps {
  isNavActive: boolean;
  collapsed: boolean;
  onNavigate: () => void;
  onToggle: () => void;
  onOpenDetail: (id: string) => void;
  onOpenEscalation: () => void;
}

const MaintenanceSection: React.FC<MaintenanceSectionProps> = ({
  isNavActive, collapsed, onNavigate, onToggle, onOpenDetail, onOpenEscalation,
}) => {
  return (
    <div className={`sn-section${isNavActive ? ' nav-active' : ''}${collapsed ? ' collapsed' : ''}`} id="snSection1">
      <div className="sn-section-header">
        <div className="sn-active-bar"></div>
        <div className="sn-nav-area" onClick={onNavigate}>
          <span className="sn-section-icon">🔧</span>
          <span className="sn-section-title">Maintenance &amp; Breakdown</span>
          <span className="sn-badge sn-badge-red">3 Active</span>
        </div>
        <button className="sn-toggle-btn" onClick={onToggle} title="Expand / Collapse">▼</button>
      </div>
      <div className="sn-section-body">
        {/* Mini KPI strip */}
        <div className="sn-kpi-strip">
          <div className="sn-kpi red">
            <div className="sn-kpi-val">3</div>
            <div className="sn-kpi-label">Breakdowns</div>
          </div>
          <div className="sn-kpi amber">
            <div className="sn-kpi-val">4h 12m</div>
            <div className="sn-kpi-label">Idle Today</div>
          </div>
          <div className="sn-kpi blue">
            <div className="sn-kpi-val">5</div>
            <div className="sn-kpi-label">Open Notifs</div>
          </div>
        </div>

        {/* MTTR / MTBF row */}
        <div className="sn-metric-row">
          <div className="sn-metric-item">
            <span className="sn-metric-key">MTTR</span>
            <span className="sn-metric-val">38m</span>
            <span className="sn-metric-ok">✓</span>
          </div>
          <div className="sn-divider"></div>
          <div className="sn-metric-item">
            <span className="sn-metric-key">MTBF</span>
            <span className="sn-metric-val">6.2h</span>
            <span className="sn-metric-warn">⚠</span>
          </div>
          <div className="sn-divider"></div>
          <div className="sn-metric-item">
            <span className="sn-metric-key">Closed</span>
            <span className="sn-metric-val" style={{ color: '#16A34A' }}>2</span>
            <span className="sn-metric-ok">Today</span>
          </div>
        </div>

        {/* Active Notifications compact list */}
        <div className="sn-notif-label">Active Notifications</div>

        {/* MNT-0041 — EXT-02 Escalated */}
        <div className="sn-notif-item" onClick={() => { onOpenDetail('MNT-0041'); onOpenEscalation(); }}>
          <div className="sn-notif-bar breakdown"></div>
          <div className="sn-notif-content">
            <div className="sn-notif-top">
              <span className="sn-notif-asset">EXT-02 — Extruder 2</span>
              <span className="sn-notif-dur bd">18m+</span>
            </div>
            <div className="sn-notif-sub">
              <span>Motor Drive · Breakdown</span>
              <span className="sn-esc-pill">ESCALATED</span>
            </div>
          </div>
        </div>

        {/* MNT-0040 */}
        <div className="sn-notif-item" onClick={() => onOpenDetail('MNT-0040')}>
          <div className="sn-notif-bar breakdown"></div>
          <div className="sn-notif-content">
            <div className="sn-notif-top">
              <span className="sn-notif-asset">ACM-01 — ACM Line 1</span>
              <span className="sn-notif-dur bd">37m</span>
            </div>
            <div className="sn-notif-sub">Side Feeder · Breakdown · In Progress</div>
          </div>
        </div>

        {/* MNT-0039 */}
        <div className="sn-notif-item" onClick={() => onOpenDetail('MNT-0039')}>
          <div className="sn-notif-bar breakdown"></div>
          <div className="sn-notif-content">
            <div className="sn-notif-top">
              <span className="sn-notif-asset">PMX-03 — Premixer 3</span>
              <span className="sn-notif-dur bd">1h 52m</span>
            </div>
            <div className="sn-notif-sub">Agitator Shaft · Breakdown · In Progress</div>
          </div>
        </div>

        {/* MNT-0038 */}
        <div className="sn-notif-item" onClick={() => onOpenDetail('MNT-0038')}>
          <div className="sn-notif-bar quality"></div>
          <div className="sn-notif-content">
            <div className="sn-notif-top">
              <span className="sn-notif-asset">BL-02 — Bin Loading 2</span>
              <span className="sn-notif-dur ql">2h 10m</span>
            </div>
            <div className="sn-notif-sub">Conveyor Belt · Quality Stop</div>
          </div>
        </div>

        {/* MNT-0037 */}
        <div className="sn-notif-item" onClick={() => onOpenDetail('MNT-0037')}>
          <div className="sn-notif-bar others"></div>
          <div className="sn-notif-content">
            <div className="sn-notif-top">
              <span className="sn-notif-asset">EXT-01 — Extruder 1</span>
              <span className="sn-notif-dur ot">5h 32m</span>
            </div>
            <div className="sn-notif-sub">Screw Drive · Others · In Progress</div>
          </div>
        </div>

        {/* Closed today mini-row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: '#F0FDF4', borderTop: '1px solid #F1F5F9' }}>
          <span style={{ fontSize: 11 }}>✅</span>
          <span style={{ fontSize: 10, color: '#15803D', fontWeight: 600 }}>2 notifications closed today</span>
          <span style={{ fontSize: 10, color: '#94A3B8', marginLeft: 'auto' }}>MTTR avg 33m</span>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceSection;
