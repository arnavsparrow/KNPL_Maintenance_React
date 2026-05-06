import React from 'react';

interface OeeRingProps {
  pct: number;
  label: string;
  color: string;
  sublabel: string;
}

const OeeRing: React.FC<OeeRingProps> = ({ pct, label, color, sublabel }) => {
  const circ = 2 * Math.PI * 28;
  const filled = (pct / 100) * circ;
  return (
    <div className="oee-ring-wrap">
      <div className="ring-container">
        <svg className="ring-svg" width="70" height="70" viewBox="0 0 70 70">
          <circle className="ring-bg" cx="35" cy="35" r="28" />
          <circle
            className="ring-fill"
            cx="35" cy="35" r="28"
            stroke={color}
            strokeDasharray={`${filled.toFixed(1)} ${circ.toFixed(1)}`}
          />
        </svg>
        <div className="ring-center">{pct}%<small>{sublabel}</small></div>
      </div>
      <div className="oee-ring-label">{label}</div>
    </div>
  );
};

const AnalyticsTab: React.FC = () => {
  const paretoData = [
    { label: 'Motor Overload',  width: '82%', color: '#EF4444', text: '7 incidents', count: 7 },
    { label: 'Feeder Jam',      width: '65%', color: '#F97316', text: '5 incidents', count: 5 },
    { label: 'Shaft Vibration', width: '52%', color: '#F59E0B', text: '4 incidents', count: 4 },
    { label: 'Temp. Spike',     width: '39%', color: '#EAB308', text: '3 incidents', count: 3 },
    { label: 'Powder Blockage', width: '26%', color: '#84CC16', text: '2 incidents', count: 2 },
    { label: 'Other',           width: '13%', color: '#6B7280', text: '1 incident',  count: 1 },
  ];

  return (
    <div className="tab-content active" id="tab-analytics">
      <div className="main">
        <div className="three-col">
          {/* MTTR Card */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">MTTR — Mean Time To Repair</div>
                <div className="card-subtitle">Sum of breakdown durations ÷ No. of breakdowns</div>
              </div>
            </div>
            <div className="card-body">
              <div style={{ textAlign: 'center', margin: '10px 0 20px' }}>
                <div style={{ fontSize: 44, fontWeight: 900, color: '#2563EB' }}>38m</div>
                <div style={{ fontSize: 12, color: '#94A3B8' }}>Average this month</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { label: 'Target', val: '< 45 min' },
                  { label: 'Last Month', val: '52 min' },
                  { label: 'Best (this month)', val: '18 min', color: '#16A34A' },
                  { label: 'Worst (this month)', val: '1h 52m', color: '#EF4444' },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                    <span style={{ color: '#64748B' }}>{row.label}</span>
                    <span style={{ fontWeight: 700, color: row.color }}>{row.val}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14, background: '#EFF6FF', borderRadius: 6, padding: '8px 10px', fontSize: 11, color: '#1D4ED8' }}>
                📈 MTTR improved 27% vs last month. On track to meet target.
              </div>
            </div>
          </div>

          {/* MTBF Card */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">MTBF — Mean Time Between Failures</div>
                <div className="card-subtitle">(Planned time − Breakdown time) ÷ No. of breakdowns</div>
              </div>
            </div>
            <div className="card-body">
              <div style={{ textAlign: 'center', margin: '10px 0 20px' }}>
                <div style={{ fontSize: 44, fontWeight: 900, color: '#8B5CF6' }}>6.2h</div>
                <div style={{ fontSize: 12, color: '#94A3B8' }}>Average this month</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { label: 'Target', val: '> 8 hrs' },
                  { label: 'Last Month', val: '4.8 hrs' },
                  { label: 'Best Asset', val: 'EXT-03 — 11.2h', color: '#16A34A' },
                  { label: 'Worst Asset', val: 'ACM-01 — 3.4h', color: '#EF4444' },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                    <span style={{ color: '#64748B' }}>{row.label}</span>
                    <span style={{ fontWeight: 700, color: row.color }}>{row.val}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14, background: '#F5F3FF', borderRadius: 6, padding: '8px 10px', fontSize: 11, color: '#5B21B6' }}>
                ⚠ Below target. Focus area: ACM-01 reliability improvement needed.
              </div>
            </div>
          </div>

          {/* OEE Availability */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">OEE Availability Component</div>
              <div className="card-subtitle">Run Time ÷ (Run + Breakdown + Idle)</div>
            </div>
            <div className="card-body">
              <div className="oee-row" style={{ flexWrap: 'wrap', justifyContent: 'space-around', marginBottom: 16 }}>
                <OeeRing pct={83} label="EXT-02" sublabel="EXT-02" color="#2563EB" />
                <OeeRing pct={97} label="EXT-03" sublabel="EXT-03" color="#16A34A" />
                <OeeRing pct={74} label="ACM-01" sublabel="ACM-01" color="#F59E0B" />
                <OeeRing pct={99} label="ACM-02" sublabel="ACM-02" color="#16A34A" />
              </div>
              <div style={{ background: '#FFF7ED', borderRadius: 6, padding: '8px 10px', fontSize: 11, color: '#92400E' }}>
                ACM-01 below 80% threshold — attention required.
              </div>
            </div>
          </div>
        </div>

        {/* Pareto Analysis */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Pareto Analysis — Breakdown Frequency by Reason</div>
              <div className="card-subtitle">This month · All assets · Sorted by frequency</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <select className="form-control" style={{ width: 130, fontSize: 11 }}>
                <option>All Assets</option><option>EXT-02</option><option>ACM-01</option>
              </select>
              <select className="form-control" style={{ width: 110, fontSize: 11 }}>
                <option>This Month</option><option>Last 7 Days</option>
              </select>
            </div>
          </div>
          <div className="card-body">
            <div className="pareto-bars">
              {paretoData.map(row => (
                <div className="pareto-row" key={row.label}>
                  <div className="pareto-label">{row.label}</div>
                  <div className="pareto-bar-wrap">
                    <div className="pareto-bar" style={{ width: row.width, background: row.color }}>{row.text}</div>
                  </div>
                  <div className="pareto-count">{row.count}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, display: 'flex', gap: 14, fontSize: 11, color: '#475569', flexWrap: 'wrap' }}>
              <span>📌 Top 2 reasons account for <strong>54%</strong> of all breakdowns</span>
              <span>·</span>
              <span>Total breakdowns this month: <strong>22</strong></span>
              <span>·</span>
              <span>Total downtime: <strong>14h 20m</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
