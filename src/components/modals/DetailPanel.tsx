import React from 'react';

interface DetailPanelProps {
  open: boolean;
  onClose: () => void;
  onOpenEscalation: () => void;
  onShowSnack: (msg: string) => void;
}

const DetailPanel: React.FC<DetailPanelProps> = ({ open, onClose, onOpenEscalation, onShowSnack }) => {
  return (
    <div className={`detail-panel${open ? ' open' : ''}`} id="detailPanel">
      <div className="detail-header">
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#1E293B' }}>MNT-0041 — Notification Detail</div>
          <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 1 }}>EXT-02 · Breakdown · Auto-detected</div>
        </div>
        <button className="modal-close" onClick={onClose}>✕</button>
      </div>
      <div className="detail-body">
        <div className="detail-section">
          <div className="detail-section-title">Classification</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span className="badge badge-breakdown">⬤ Breakdown</span>
            <span className="badge badge-auto">Auto-detected</span>
            <span className="badge badge-open">Open</span>
            <span className="sap-tag">IW21-004891</span>
          </div>
        </div>

        <div className="detail-section">
          <div className="detail-section-title">Equipment</div>
          <div className="detail-grid">
            <div className="detail-item"><div className="detail-key">Asset</div><div className="detail-val">Extruder 2 (EXT-02)</div></div>
            <div className="detail-item"><div className="detail-key">Sub-Asset</div><div className="detail-val">Motor Drive</div></div>
            <div className="detail-item"><div className="detail-key">Motor Signal</div><div className="detail-val" style={{ color: '#EF4444' }}>LOW 🔴</div></div>
            <div className="detail-item"><div className="detail-key">Side Feeder</div><div className="detail-val" style={{ color: '#EF4444' }}>LOW 🔴</div></div>
          </div>
        </div>

        <div className="detail-section">
          <div className="detail-section-title">Time Details</div>
          <div className="detail-grid">
            <div className="detail-item"><div className="detail-key">Stop Time</div><div className="detail-val">14:14:03</div></div>
            <div className="detail-item"><div className="detail-key">Duration</div><div className="detail-val" style={{ color: '#EF4444' }}>18m 43s</div></div>
            <div className="detail-item"><div className="detail-key">Batch No.</div><div className="detail-val text-mono">PCB-2026-0412</div></div>
            <div className="detail-item"><div className="detail-key">Raised By</div><div className="detail-val">System (Auto)</div></div>
          </div>
        </div>

        <div className="detail-section">
          <div className="detail-section-title">SAP Integration</div>
          <div style={{ background: '#EDE9FE', borderRadius: 6, padding: '10px 12px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#5B21B6' }}>IW21-004891</div>
            <div style={{ fontSize: 11, color: '#6D28D9', marginTop: 2 }}>Created: 14:14:03 · Status: Open in SAP</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <button className="btn btn-outline" style={{ fontSize: 11, padding: '5px 10px' }} onClick={() => onShowSnack('Opening SAP IW23 display...')}>View in SAP (IW23)</button>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <div className="detail-section-title">Reason</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1E293B' }}>Motor Overload</div>
          <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>Pending breakdown details entry — mandatory escalation triggered.</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 4 }}>
          <button
            className="btn btn-danger"
            style={{ width: '100%' }}
            onClick={() => { onOpenEscalation(); onClose(); }}
          >
            ⚡ Enter Breakdown Details
          </button>
          <button className="btn btn-outline" style={{ width: '100%' }} onClick={onClose}>Close Panel</button>
        </div>
      </div>
    </div>
  );
};

export default DetailPanel;
