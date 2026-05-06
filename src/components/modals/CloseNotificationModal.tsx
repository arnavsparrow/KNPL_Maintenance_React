import React from 'react';

interface CloseNotificationModalProps {
  open: boolean;
  onClose: () => void;
  onShowSnack: (msg: string) => void;
}

const CloseNotificationModal: React.FC<CloseNotificationModalProps> = ({ open, onClose, onShowSnack }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = () => {
    onClose();
    onShowSnack('✓ Resolution submitted. Awaiting Operations acknowledgement.');
  };

  return (
    <div className={`modal-overlay${open ? ' open' : ''}`} onClick={handleOverlayClick}>
      <div className="modal" style={{ width: 460 }}>
        <div className="modal-header">
          <div>
            <div className="modal-title">Close Notification</div>
            <div className="modal-subtitle">Engineering confirmation required before closure</div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Repair Start Time <span className="required">*</span></label>
              <input type="time" className="form-control" />
            </div>
            <div className="form-group">
              <label className="form-label">Repair End Time <span className="required">*</span></label>
              <input type="time" className="form-control" />
            </div>
            <div className="form-group">
              <label className="form-label">Resolution Description <span className="required">*</span></label>
              <textarea className="form-control" rows={3} placeholder="What was done to resolve the breakdown?"></textarea>
            </div>
            <div className="form-group">
              <label className="form-label">Part Replaced</label>
              <input className="form-control" placeholder="Part number / description (leave blank if none)" />
            </div>
            <div style={{ background: '#F0FDF4', borderRadius: 6, padding: '10px 12px', fontSize: 11, color: '#15803D' }}>
              ✓ After Engineering submits, Operations must acknowledge to confirm the resource is back in service.
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-success" onClick={handleSubmit}>Submit Resolution</button>
        </div>
      </div>
    </div>
  );
};

export default CloseNotificationModal;
