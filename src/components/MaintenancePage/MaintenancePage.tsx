import React from 'react';
import type { TabName } from '../../types';
import ActiveNotificationsTab from './ActiveNotificationsTab';
import SignalMonitorTab from './SignalMonitorTab';
import ClosureTab from './ClosureTab';
import AnalyticsTab from './AnalyticsTab';

interface MaintenancePageProps {
  activeTab: TabName;
  onSetTab: (tab: TabName) => void;
  idleSeconds: number;
  onOpenDetail: (id: string) => void;
  onOpenEscalation: () => void;
  onOpenAddModal: () => void;
  onOpenCloseModal: () => void;
  onShowSnack: (msg: string) => void;
}

const MaintenancePage: React.FC<MaintenancePageProps> = ({
  activeTab, onSetTab, idleSeconds,
  onOpenDetail, onOpenEscalation, onOpenAddModal, onOpenCloseModal, onShowSnack,
}) => {
  return (
    <div id="pv-maintenance" className="fullpage active">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="page-title">Maintenance — Breakdown &amp; Idle Time Management</div>
          <div className="page-subtitle">Real-time stoppage tracking · Auto-detection · SAP IW21 Integration · MTTR / MTBF Analytics</div>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={() => onShowSnack('Refreshing data...')}>↻ Refresh</button>
          <button className="btn btn-outline" onClick={() => onShowSnack('Exported to Excel')}>⬇ Export</button>
          <button className="btn btn-primary" onClick={onOpenAddModal}>＋ Add Stoppage</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <div
          className={`tab${activeTab === 'active' ? ' active' : ''}`}
          onClick={() => onSetTab('active')}
        >
          Active Notifications <span style={{ background: '#EF4444', color: '#fff', borderRadius: 10, padding: '1px 7px', fontSize: 10, marginLeft: 4 }}>5</span>
        </div>
        <div
          className={`tab${activeTab === 'signals' ? ' active' : ''}`}
          onClick={() => onSetTab('signals')}
        >
          Signal Monitor
        </div>
        <div
          className={`tab${activeTab === 'closure' ? ' active' : ''}`}
          onClick={() => onSetTab('closure')}
        >
          Notification Closure
        </div>
        <div
          className={`tab${activeTab === 'analytics' ? ' active' : ''}`}
          onClick={() => onSetTab('analytics')}
        >
          KPI Analytics
        </div>
      </div>

      {activeTab === 'active' && (
        <ActiveNotificationsTab
          idleSeconds={idleSeconds}
          onOpenDetail={onOpenDetail}
          onOpenEscalation={onOpenEscalation}
          onOpenCloseModal={onOpenCloseModal}
          onShowSnack={onShowSnack}
        />
      )}
      {activeTab === 'signals' && (
        <SignalMonitorTab idleSeconds={idleSeconds} />
      )}
      {activeTab === 'closure' && (
        <ClosureTab onShowSnack={onShowSnack} />
      )}
      {activeTab === 'analytics' && (
        <AnalyticsTab />
      )}
    </div>
  );
};

export default MaintenancePage;
