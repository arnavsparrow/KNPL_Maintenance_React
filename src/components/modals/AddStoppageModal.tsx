import React, { useState } from 'react';

interface AddStoppageModalProps {
  open: boolean;
  onClose: () => void;
  onShowSnack: (msg: string) => void;
}

const AddStoppageModal: React.FC<AddStoppageModalProps> = ({ open, onClose, onShowSnack }) => {
  const [classification, setClassification] = useState('');

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = () => {
    onClose();
    onShowSnack('✓ Stoppage recorded. SAP notification created.');
  };

  return (
    <div className={`modal-overlay${open ? ' open' : ''}`} onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header">
          <div>
            <div className="modal-title">Add Manual Stoppage</div>
            <div className="modal-subtitle">For assets without auto-detection (Bin Loading, Premixer)</div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="form-row">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Asset <span className="required">*</span></label>
                <select className="form-control">
                  <option value="">— Select Asset —</option>
                  <option>Extruder (EXT-01)</option>
                  <option>Extruder (EXT-02)</option>
                  <option>ACM Line (ACM-01)</option>
                  <option>ACM Line (ACM-02)</option>
                  <option>Premixer (PMX-01)</option>
                  <option>Premixer (PMX-02)</option>
                  <option>Premixer (PMX-03)</option>
                  <option>Bin Loading (BL-01)</option>
                  <option>Bin Loading (BL-02)</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Sub-Asset <span className="required">*</span></label>
                <select className="form-control">
                  <option value="">— Select Asset first —</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Start Time <span className="required">*</span></label>
                <input type="datetime-local" className="form-control" />
              </div>
              <div className="form-group">
                <label className="form-label">Batch Number</label>
                <input className="form-control" placeholder="e.g. PCB-2026-0412" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Classification <span className="required">*</span></label>
              <div className="radio-group">
                {[
                  { value: 'breakdown', label: '🔴 Breakdown', desc: 'Equipment failure · Creates SAP notification (IW21)' },
                  { value: 'quality', label: '🟡 Quality Stop', desc: 'Quality-related stoppage · No SAP notification' },
                  { value: 'cleaning', label: '🔵 Cleaning', desc: 'Scheduled or ad-hoc cleaning · No SAP notification' },
                  { value: 'others', label: '⚪ Others', desc: 'Any other reason · No SAP notification' },
                ].map(opt => (
                  <label
                    key={opt.value}
                    className={`radio-option${classification === opt.value ? ' selected' : ''}`}
                    onClick={() => setClassification(opt.value)}
                  >
                    <input type="radio" name="classification" value={opt.value} />
                    <div>
                      <div className="radio-label">{opt.label}</div>
                      <div className="radio-desc">{opt.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Reason <span className="required">*</span></label>
              <select className="form-control">
                <option>— Select Reason —</option>
                <option>Motor Overload</option>
                <option>Feeder Jam</option>
                <option>Shaft Vibration</option>
                <option>Temperature Spike</option>
                <option>Powder Blockage</option>
                <option>Belt Slip</option>
                <option>Electrical Fault</option>
                <option>Material Quality Issue</option>
                <option>Planned Cleaning</option>
                <option>Other (specify below)</option>
              </select>
            </div>

            {/* SAP section — shown only for Breakdown */}
            {classification === 'breakdown' && (
              <div className="mandatory-section">
                <div className="mandatory-label">⚠ SAP Integration — Required for Breakdown</div>
                <div className="mandatory-grid">
                  <div className="form-group">
                    <label className="form-label">SAP Code (Object) <span className="required">*</span></label>
                    <input className="form-control" placeholder="e.g. EXT-MOT-002" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Object Part <span className="required">*</span></label>
                    <input className="form-control" placeholder="e.g. Rotor Assembly" />
                  </div>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label">Issue Description <span className="required">*</span></label>
                    <textarea className="form-control" rows={2} placeholder="Describe the breakdown in detail for SAP IW21 notification..."></textarea>
                  </div>
                </div>
                <div style={{ marginTop: 8, fontSize: 11, color: '#92400E' }}>
                  📤 A SAP notification (IW21) will be automatically created upon submission.
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Additional Notes</label>
              <textarea className="form-control" rows={2} placeholder="Any additional observations..."></textarea>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Submit Stoppage</button>
        </div>
      </div>
    </div>
  );
};

export default AddStoppageModal;
