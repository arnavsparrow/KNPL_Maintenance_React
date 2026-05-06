import { useState, useCallback, useRef } from 'react';
import type { PageName, TabName } from './types';
import { useClock } from './hooks/useClock';
import { useSensorData } from './hooks/useSensorData';
import { useIdleTimer } from './hooks/useIdleTimer';
import TopNav from './components/TopNav';
import SideNav from './components/SideNav/SideNav';
import MaintenancePage from './components/MaintenancePage/MaintenancePage';
import EquipmentSensorPage from './components/EquipmentSensorPage/EquipmentSensorPage';
import AssetMasterPage from './components/Masters/AssetMasterPage';
import TagMasterPage from './components/Masters/TagMasterPage';
import AddStoppageModal from './components/modals/AddStoppageModal';
import EscalationModal from './components/modals/EscalationModal';
import CloseNotificationModal from './components/modals/CloseNotificationModal';
import DetailPanel from './components/modals/DetailPanel';

function App() {
  const [currentPage, setCurrentPage] = useState<PageName>('maintenance');
  const [activeTab, setActiveTab] = useState<TabName>('active');
  const [sidenavCollapsed, setSidenavCollapsed] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEscalationModal, setShowEscalationModal] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [detailPanelOpen, setDetailPanelOpen] = useState(false);
  const [snackVisible, setSnackVisible] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');
  const snackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clockStr = useClock();
  const { values: sensorValues, history: sensorHistory } = useSensorData();
  const idleSeconds = useIdleTimer(18 * 60 + 43);

  const showSnack = useCallback((msg: string) => {
    setSnackMsg(msg);
    setSnackVisible(true);
    if (snackTimerRef.current) clearTimeout(snackTimerRef.current);
    snackTimerRef.current = setTimeout(() => setSnackVisible(false), 3200);
  }, []);

  const handleNavigate = useCallback((page: PageName) => {
    setCurrentPage(page);
  }, []);

  return (
    <div style={{ minHeight: '100vh' }}>
      <TopNav clockStr={clockStr} />

      <div className="app-layout">
        <SideNav
          currentPage={currentPage}
          onNavigate={handleNavigate}
          sensorValues={sensorValues}
          onOpenDetail={() => setDetailPanelOpen(true)}
          onOpenEscalation={() => setShowEscalationModal(true)}
          collapsed={sidenavCollapsed}
          onToggleCollapse={() => setSidenavCollapsed(c => !c)}
        />

        <div className="main-wrapper">
          {currentPage === 'maintenance' && (
            <MaintenancePage
              activeTab={activeTab}
              onSetTab={setActiveTab}
              idleSeconds={idleSeconds}
              onOpenDetail={() => setDetailPanelOpen(true)}
              onOpenEscalation={() => setShowEscalationModal(true)}
              onOpenAddModal={() => setShowAddModal(true)}
              onOpenCloseModal={() => setShowCloseModal(true)}
              onShowSnack={showSnack}
            />
          )}
          {currentPage === 'equipment' && (
            <EquipmentSensorPage
              sensorValues={sensorValues}
              sensorHistory={sensorHistory}
              onShowSnack={showSnack}
            />
          )}
          {currentPage === 'asset-master' && <AssetMasterPage />}
          {currentPage === 'tag-master' && <TagMasterPage />}
        </div>
      </div>

      {/* Modals */}
      <AddStoppageModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onShowSnack={showSnack}
      />
      <EscalationModal
        open={showEscalationModal}
        onClose={() => setShowEscalationModal(false)}
        onShowSnack={showSnack}
        idleSeconds={idleSeconds}
      />
      <CloseNotificationModal
        open={showCloseModal}
        onClose={() => setShowCloseModal(false)}
        onShowSnack={showSnack}
      />
      <DetailPanel
        open={detailPanelOpen}
        onClose={() => setDetailPanelOpen(false)}
        onOpenEscalation={() => setShowEscalationModal(true)}
        onShowSnack={showSnack}
      />

      {/* Snackbar */}
      <div className={`snackbar${snackVisible ? ' show' : ''}`}>
        <span>{snackMsg}</span>
      </div>
    </div>
  );
}

export default App;
