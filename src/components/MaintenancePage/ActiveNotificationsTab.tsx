import React, { useState } from 'react';
import KpiCards from './KpiCards';
import EscalationBanner from './EscalationBanner';

interface ActiveNotificationsTabProps {
  idleSeconds: number;
  onOpenDetail: (id: string) => void;
  onOpenEscalation: () => void;
  onOpenCloseModal: () => void;
  onShowSnack: (msg: string) => void;
}

const ActiveNotificationsTab: React.FC<ActiveNotificationsTabProps> = ({
  idleSeconds, onOpenDetail, onOpenEscalation, onOpenCloseModal,
}) => {
  const [activeChip, setActiveChip] = useState('all');

  const chips = [
    { key: 'all', label: 'All (5)' },
    { key: 'breakdown', label: '🔴 Breakdown (3)' },
    { key: 'quality', label: '🟡 Quality (1)' },
    { key: 'cleaning', label: '🔵 Cleaning (0)' },
    { key: 'others', label: '⚪ Others (1)' },
  ];

  return (
    <div className="tab-content active" id="tab-active">
      <div className="main">
        <KpiCards />
        <EscalationBanner idleSeconds={idleSeconds} onOpenEscalation={onOpenEscalation} />

        {/* Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div className="chip-row">
            {chips.map(chip => (
              <div
                key={chip.key}
                className={`chip${activeChip === chip.key ? ' active' : ''}`}
                onClick={() => setActiveChip(chip.key)}
              >
                {chip.label}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div className="search-wrap">
              <span className="search-icon">🔍</span>
              <input className="search-input" placeholder="Search asset, batch..." />
            </div>
            <select className="form-control" style={{ width: 140, fontSize: 11 }}>
              <option>All Assets</option>
              <option>Extruder</option>
              <option>ACM</option>
              <option>Premixer</option>
              <option>Bin Loading</option>
            </select>
          </div>
        </div>

        {/* Active Notifications Table */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Active Notifications</div>
              <div className="card-subtitle">Auto-populated from signal detection + manual entries</div>
            </div>
            <div style={{ display: 'flex', gap: 8, fontSize: 11, color: '#94A3B8', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span className="status-dot dot-red"></span> Auto-detected</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span className="status-dot dot-amber"></span> Manual</span>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Notif. ID</th>
                  <th>Type</th>
                  <th>Asset</th>
                  <th>Sub-Asset</th>
                  <th>Classification</th>
                  <th>Reason</th>
                  <th>Start Time</th>
                  <th>Duration</th>
                  <th>Batch No.</th>
                  <th>SAP Notif.</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* MNT-0041 */}
                <tr onClick={() => onOpenDetail('MNT-0041')} style={{ cursor: 'pointer' }}>
                  <td><span className="text-mono">MNT-0041</span></td>
                  <td><span className="badge badge-auto">Auto</span></td>
                  <td><strong>Extruder 2</strong><div style={{ fontSize: 10, color: '#94A3B8' }}>EXT-02</div></td>
                  <td>Motor Drive</td>
                  <td><span className="badge badge-breakdown">⬤ Breakdown</span></td>
                  <td>Motor Overload</td>
                  <td>14:14:03</td>
                  <td style={{ fontWeight: 700, color: '#EF4444' }}>18m 43s</td>
                  <td className="text-mono">PCB-2026-0412</td>
                  <td><span className="sap-tag">🔗 IW21-004891</span></td>
                  <td><span className="badge badge-open">Open</span></td>
                  <td><div className="action-btns">
                    <button className="action-btn view-btn" onClick={e => { e.stopPropagation(); onOpenDetail('MNT-0041'); }}>View</button>
                    <button className="action-btn close-btn" onClick={e => { e.stopPropagation(); onOpenCloseModal(); }}>Close</button>
                  </div></td>
                </tr>
                {/* MNT-0040 */}
                <tr onClick={() => onOpenDetail('MNT-0040')} style={{ cursor: 'pointer' }}>
                  <td><span className="text-mono">MNT-0040</span></td>
                  <td><span className="badge badge-auto">Auto</span></td>
                  <td><strong>ACM 1</strong><div style={{ fontSize: 10, color: '#94A3B8' }}>ACM-01</div></td>
                  <td>Side Feeder</td>
                  <td><span className="badge badge-breakdown">⬤ Breakdown</span></td>
                  <td>Feeder Jam</td>
                  <td>13:55:22</td>
                  <td style={{ fontWeight: 700, color: '#EF4444' }}>37m 24s</td>
                  <td className="text-mono">PCB-2026-0411</td>
                  <td><span className="sap-tag">🔗 IW21-004890</span></td>
                  <td><span className="badge badge-inprogress">In Progress</span></td>
                  <td><div className="action-btns">
                    <button className="action-btn view-btn" onClick={e => { e.stopPropagation(); onOpenDetail('MNT-0040'); }}>View</button>
                    <button className="action-btn close-btn" onClick={e => { e.stopPropagation(); onOpenCloseModal(); }}>Close</button>
                  </div></td>
                </tr>
                {/* MNT-0039 */}
                <tr onClick={() => onOpenDetail('MNT-0039')} style={{ cursor: 'pointer' }}>
                  <td><span className="text-mono">MNT-0039</span></td>
                  <td><span className="badge badge-manual">Manual</span></td>
                  <td><strong>Premixer 3</strong><div style={{ fontSize: 10, color: '#94A3B8' }}>PMX-03</div></td>
                  <td>Agitator Shaft</td>
                  <td><span className="badge badge-breakdown">⬤ Breakdown</span></td>
                  <td>Shaft Vibration</td>
                  <td>12:40:15</td>
                  <td style={{ fontWeight: 700, color: '#EF4444' }}>1h 52m</td>
                  <td className="text-mono">PCB-2026-0410</td>
                  <td><span className="sap-tag">🔗 IW21-004888</span></td>
                  <td><span className="badge badge-inprogress">In Progress</span></td>
                  <td><div className="action-btns">
                    <button className="action-btn view-btn" onClick={e => { e.stopPropagation(); onOpenDetail('MNT-0039'); }}>View</button>
                    <button className="action-btn close-btn" onClick={e => { e.stopPropagation(); onOpenCloseModal(); }}>Close</button>
                  </div></td>
                </tr>
                {/* MNT-0038 */}
                <tr onClick={() => onOpenDetail('MNT-0038')} style={{ cursor: 'pointer' }}>
                  <td><span className="text-mono">MNT-0038</span></td>
                  <td><span className="badge badge-manual">Manual</span></td>
                  <td><strong>Bin Loading 2</strong><div style={{ fontSize: 10, color: '#94A3B8' }}>BL-02</div></td>
                  <td>Conveyor Belt</td>
                  <td><span className="badge badge-quality">Quality Stop</span></td>
                  <td>Material Check</td>
                  <td>11:22:45</td>
                  <td style={{ color: '#D97706', fontWeight: 700 }}>2h 10m</td>
                  <td className="text-mono">PCB-2026-0409</td>
                  <td><span style={{ fontSize: 11, color: '#94A3B8' }}>— No SAP</span></td>
                  <td><span className="badge badge-open">Open</span></td>
                  <td><div className="action-btns">
                    <button className="action-btn view-btn" onClick={e => e.stopPropagation()}>View</button>
                    <button className="action-btn close-btn" onClick={e => { e.stopPropagation(); onOpenCloseModal(); }}>Close</button>
                  </div></td>
                </tr>
                {/* MNT-0037 */}
                <tr onClick={() => onOpenDetail('MNT-0037')} style={{ cursor: 'pointer' }}>
                  <td><span className="text-mono">MNT-0037</span></td>
                  <td><span className="badge badge-manual">Manual</span></td>
                  <td><strong>Extruder 1</strong><div style={{ fontSize: 10, color: '#94A3B8' }}>EXT-01</div></td>
                  <td>Screw Drive</td>
                  <td><span className="badge badge-others">Others</span></td>
                  <td>Planned Cleaning</td>
                  <td>09:00:00</td>
                  <td style={{ color: '#64748B', fontWeight: 700 }}>5h 32m</td>
                  <td className="text-mono">—</td>
                  <td><span style={{ fontSize: 11, color: '#94A3B8' }}>— No SAP</span></td>
                  <td><span className="badge badge-inprogress">In Progress</span></td>
                  <td><div className="action-btns">
                    <button className="action-btn view-btn" onClick={e => e.stopPropagation()}>View</button>
                    <button className="action-btn close-btn" onClick={e => { e.stopPropagation(); onOpenCloseModal(); }}>Close</button>
                  </div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveNotificationsTab;
