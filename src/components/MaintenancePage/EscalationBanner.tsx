import React from 'react';

interface EscalationBannerProps {
  idleSeconds: number;
  onOpenEscalation: () => void;
}

const EscalationBanner: React.FC<EscalationBannerProps> = ({ idleSeconds, onOpenEscalation }) => {
  const m = Math.floor(idleSeconds / 60);
  const s = idleSeconds % 60;
  const display = `${m}m ${s}s`;

  return (
    <div className="escalation-banner" onClick={onOpenEscalation} style={{ cursor: 'pointer' }}>
      <div className="escalation-icon">🚨</div>
      <div className="escalation-text">
        <strong>Mandatory Escalation Required — Extruder 2 (EXT-02)</strong>
        <p>Idle for {display} · Motor signal LOW · Side feeder LOW · Batch: PCB-2026-0412 · Click to enter breakdown details</p>
      </div>
      <button className="btn btn-danger" style={{ fontSize: 11, padding: '6px 12px' }}>Enter Details →</button>
    </div>
  );
};

export default EscalationBanner;
