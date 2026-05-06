import React from 'react';

const KpiCards: React.FC = () => (
  <div className="kpi-row">
    <div className="kpi-card red">
      <div className="kpi-icon">🔴</div>
      <div className="kpi-label">Active Breakdowns</div>
      <div className="kpi-value">3</div>
      <div className="kpi-sub">2 Auto-detected · 1 Manual</div>
    </div>
    <div className="kpi-card amber">
      <div className="kpi-icon">⏱</div>
      <div className="kpi-label">Total Idle Time Today</div>
      <div className="kpi-value">4h 12m</div>
      <div className="kpi-sub">Across all resources</div>
    </div>
    <div className="kpi-card blue">
      <div className="kpi-icon">🔔</div>
      <div className="kpi-label">Open Notifications</div>
      <div className="kpi-value">5</div>
      <div className="kpi-sub">3 Breakdown · 1 Quality · 1 Other</div>
    </div>
    <div className="kpi-card green">
      <div className="kpi-icon">⚡</div>
      <div className="kpi-label">MTTR (Avg)</div>
      <div className="kpi-value">38m</div>
      <div className="kpi-sub">Target: &lt; 45 min</div>
    </div>
    <div className="kpi-card purple">
      <div className="kpi-icon">📊</div>
      <div className="kpi-label">MTBF (Avg)</div>
      <div className="kpi-value">6.2h</div>
      <div className="kpi-sub">Target: &gt; 8 hrs</div>
    </div>
  </div>
);

export default KpiCards;
