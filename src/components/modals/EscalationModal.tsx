import React from 'react';

interface EscalationModalProps {
  open: boolean;
  onClose: () => void;
  onShowSnack: (msg: string) => void;
  idleSeconds: number;
}

const EscalationModal: React.FC<EscalationModalProps> = ({ open, onClose, onShowSnack, idleSeconds }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = () => {
    onClose();
    onShowSnack('✓ Breakdown details submitted & pushed to SAP IW21.');
  };

  const m = Math.floor(idleSeconds / 60);
  const s = idleSeconds % 60;
  const durationStr = `${m}m ${s}s`;

  return (
    <div className={`modal-overlay${open ? ' open' : ''}`} onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header" style={{ background: '#FFF1F2', borderBottomColor: '#FECACA' }}>
          <div>
            <div className="modal-title" style={{ color: '#991B1B' }}>🚨 Mandatory Escalation — Action Required</div>
            <div className="modal-subtitle" style={{ color: '#DC2626' }}>EXT-02 has been idle for over 15 minutes. Breakdown details must be entered.</div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="escalation-alert">
            <div className="escalation-alert-icon">⏱</div>
            <div className="escalation-alert-text">
              <strong>Idle time exceeds 15-minute threshold</strong>
              <p>Breakdown time is counted from initial signal drop (14:14:03), not from this pop-up. This form cannot be dismissed without entering details.</p>
            </div>
          </div>

          {/* Auto-detected data */}
          <table className="modal-table">
            <thead>
              <tr>
                <th>Motor Signal</th>
                <th>Side Feeder Signal</th>
                <th>Stop Time</th>
                <th>Duration</th>
                <th>Batch No.</th>
                <th>Admin / Operator</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="badge badge-breakdown">LOW</span></td>
                <td><span className="badge badge-breakdown">LOW</span></td>
                <td className="text-mono">14:14:03</td>
                <td style={{ fontWeight: 700, color: '#EF4444' }}>{durationStr}</td>
                <td className="text-mono">PCB-2026-0412</td>
                <td>Rajwardhan (Ops)</td>
              </tr>
            </tbody>
          </table>

          {/* SAP mandatory fields */}
          <div className="mandatory-section">
            <div className="mandatory-label">⚠ Mandatory SAP Fields — Required for IW21 Notification</div>
            <div className="mandatory-grid">
              <div className="form-group">
                <label className="form-label">SAP Code (Object) <span className="required">*</span></label>
                <input className="form-control" placeholder="e.g. EXT-MOT-002" />
              </div>
              <div className="form-group">
                <label className="form-label">Object Part <span className="required">*</span></label>
                <input className="form-control" placeholder="e.g. Motor Drive Assembly" />
              </div>
              <div className="form-group">
                <label className="form-label">Breakdown Reason <span className="required">*</span></label>
                <select className="form-control">
                  <option>— Select —</option>
                  <option>Motor Overload</option>
                  <option>Electrical Fault</option>
                  <option>Mechanical Jam</option>
                  <option>Drive Failure</option>
                  <option>Unknown / Under Investigation</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Event Code <span className="required">*</span></label>
                <input className="form-control" placeholder="e.g. EVNT-0044" />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Issue Description <span className="required">*</span></label>
                <textarea className="form-control" rows={2} placeholder="Describe what happened. This will be sent to SAP IW21..."></textarea>
              </div>
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: '#92400E' }}>
              📤 SAP notification (IW21) will be created regardless of breakdown duration. Reference via IW23 for display.
            </div>
          </div>
        </div>
        <div className="modal-footer" style={{ background: '#FFF7ED', borderTopColor: '#FED7AA' }}>
          <span style={{ fontSize: 11, color: '#92400E', flex: 1 }}>This notification will be pushed to SAP upon submission</span>
          <button className="btn btn-outline" onClick={onClose}>Save Draft</button>
          <button className="btn btn-danger" onClick={handleSubmit}>Submit &amp; Push to SAP</button>
        </div>
      </div>
    </div>
  );
};

export default EscalationModal;
