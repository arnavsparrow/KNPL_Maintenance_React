import React from 'react';
import { formatTimer } from '../../hooks/useIdleTimer';

interface SignalMonitorTabProps {
  idleSeconds: number;
}

const SignalMonitorTab: React.FC<SignalMonitorTabProps> = ({ idleSeconds }) => {
  return (
    <div className="tab-content active" id="tab-signals">
      <div className="main">
        <div className="two-col">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Extruder Signals */}
            <div className="card">
              <div className="card-header">
                <div>
                  <div className="card-title">Extruder — Signal Status</div>
                  <div className="card-subtitle">Motor + Side Feeder dual-signal monitoring · AND condition for Run Time</div>
                </div>
                <span style={{ fontSize: 11, color: '#94A3B8' }}>Updated: 14:32:07</span>
              </div>
              <div className="card-body">
                <div className="signal-grid">
                  {/* EXT-01 */}
                  <div className="signal-row">
                    <div className="signal-header">
                      <div className="signal-asset-name">EXT-01 — Extruder 1</div>
                      <span className="badge badge-others">Planned Stop</span>
                    </div>
                    <div className="signal-body">
                      <div className="signal-line">
                        <div className="signal-label">Motor Signal</div>
                        <div className="signal-indicator sig-low"><span className="sig-dot sig-dot-low"></span> LOW</div>
                      </div>
                      <div className="signal-line">
                        <div className="signal-label">Side Feeder Signal</div>
                        <div className="signal-indicator sig-low"><span className="sig-dot sig-dot-low"></span> LOW</div>
                      </div>
                      <div className="signal-line">
                        <div className="signal-label">System State</div>
                        <span className="badge badge-others">Others — Stop</span>
                      </div>
                      <div className="signal-line">
                        <div className="signal-label">Active Batch</div>
                        <span style={{ fontSize: 11, color: '#94A3B8' }}>— No batch assigned</span>
                      </div>
                    </div>
                  </div>
                  {/* EXT-02 — BREAKDOWN */}
                  <div className="signal-row" style={{ borderColor: '#FECACA' }}>
                    <div className="signal-header" style={{ background: '#FFF1F2' }}>
                      <div className="signal-asset-name" style={{ color: '#B91C1C' }}>EXT-02 — Extruder 2 ⚠</div>
                      <span className="badge badge-breakdown">Breakdown</span>
                    </div>
                    <div className="signal-body">
                      <div className="signal-line">
                        <div className="signal-label">Motor Signal</div>
                        <div className="signal-indicator sig-low"><span className="sig-dot sig-dot-low"></span> LOW</div>
                      </div>
                      <div className="signal-line">
                        <div className="signal-label">Side Feeder Signal</div>
                        <div className="signal-indicator sig-low"><span className="sig-dot sig-dot-low"></span> LOW</div>
                      </div>
                      <div className="signal-line">
                        <div className="signal-label">System State</div>
                        <span className="badge badge-breakdown">Idle → Escalated</span>
                      </div>
                      <div className="signal-line">
                        <div className="signal-label">Idle Timer</div>
                        <div className="idle-timer">⏱ <span className="timer-val">{formatTimer(idleSeconds)}</span> <span style={{ fontSize: 10, color: '#92400E' }}>(+3m over threshold)</span></div>
                      </div>
                      <div className="signal-line">
                        <div className="signal-label">Active Batch</div>
                        <span className="text-mono">PCB-2026-0412</span>
                      </div>
                    </div>
                  </div>
                  {/* EXT-03 */}
                  <div className="signal-row" style={{ borderColor: '#BBF7D0' }}>
                    <div className="signal-header" style={{ background: '#F0FDF4' }}>
                      <div className="signal-asset-name">EXT-03 — Extruder 3</div>
                      <span className="badge badge-run">Run Time</span>
                    </div>
                    <div className="signal-body">
                      <div className="signal-line">
                        <div className="signal-label">Motor Signal</div>
                        <div className="signal-indicator sig-high"><span className="sig-dot sig-dot-high"></span> HIGH</div>
                      </div>
                      <div className="signal-line">
                        <div className="signal-label">Side Feeder Signal</div>
                        <div className="signal-indicator sig-high"><span className="sig-dot sig-dot-high"></span> HIGH</div>
                      </div>
                      <div className="signal-line">
                        <div className="signal-label">System State</div>
                        <span className="badge badge-run">✓ Run Time</span>
                      </div>
                      <div className="signal-line">
                        <div className="signal-label">Active Batch</div>
                        <span className="text-mono">PCB-2026-0413</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ACM Signals */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">ACM — Signal Status</div>
                <div className="card-subtitle">Same dual-signal logic applies</div>
              </div>
              <div className="card-body">
                <div className="signal-grid">
                  {/* ACM-01 IDLE */}
                  <div className="signal-row" style={{ borderColor: '#FED7AA' }}>
                    <div className="signal-header" style={{ background: '#FFF7ED' }}>
                      <div className="signal-asset-name" style={{ color: '#92400E' }}>ACM-01 — ACM Line 1 ⏱</div>
                      <span className="badge badge-inprogress">Idle — In Repair</span>
                    </div>
                    <div className="signal-body">
                      <div className="signal-line">
                        <div className="signal-label">Motor Signal</div>
                        <div className="signal-indicator sig-low"><span className="sig-dot sig-dot-low"></span> LOW</div>
                      </div>
                      <div className="signal-line">
                        <div className="signal-label">Side Feeder Signal</div>
                        <div className="signal-indicator sig-high"><span className="sig-dot sig-dot-high"></span> HIGH</div>
                      </div>
                      <div className="signal-line">
                        <div className="signal-label">System State</div>
                        <span className="badge badge-idle">Idle Time</span>
                      </div>
                      <div className="signal-line">
                        <div className="signal-label">Idle Timer</div>
                        <div className="idle-timer">⏱ <span className="timer-val">37:24</span></div>
                      </div>
                    </div>
                  </div>
                  {/* ACM-02 RUN */}
                  <div className="signal-row" style={{ borderColor: '#BBF7D0' }}>
                    <div className="signal-header" style={{ background: '#F0FDF4' }}>
                      <div className="signal-asset-name">ACM-02 — ACM Line 2</div>
                      <span className="badge badge-run">Run Time</span>
                    </div>
                    <div className="signal-body">
                      <div className="signal-line">
                        <div className="signal-label">Motor Signal</div>
                        <div className="signal-indicator sig-high"><span className="sig-dot sig-dot-high"></span> HIGH</div>
                      </div>
                      <div className="signal-line">
                        <div className="signal-label">Side Feeder Signal</div>
                        <div className="signal-indicator sig-high"><span className="sig-dot sig-dot-high"></span> HIGH</div>
                      </div>
                      <div className="signal-line">
                        <div className="signal-label">System State</div>
                        <span className="badge badge-run">✓ Run Time</span>
                      </div>
                      <div className="signal-line">
                        <div className="signal-label">Active Batch</div>
                        <span className="text-mono">PCB-2026-0411</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Signal Logic Reference */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="card">
              <div className="card-header">
                <div className="card-title">Signal Logic Matrix</div>
              </div>
              <div className="card-body">
                <table>
                  <thead>
                    <tr>
                      <th>Motor</th>
                      <th>Side Feeder</th>
                      <th>State</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ background: '#F0FDF4' }}>
                      <td><span className="badge badge-run">HIGH</span></td>
                      <td><span className="badge badge-run">HIGH</span></td>
                      <td><strong style={{ color: '#16A34A' }}>Run Time</strong></td>
                      <td style={{ fontSize: 11, color: '#64748B' }}>No action</td>
                    </tr>
                    <tr style={{ background: '#FFF7ED' }}>
                      <td><span className="badge badge-breakdown">LOW</span></td>
                      <td><span className="badge badge-run">HIGH</span></td>
                      <td><strong style={{ color: '#D97706' }}>Idle Time</strong></td>
                      <td style={{ fontSize: 11, color: '#D97706' }}>15-min timer starts</td>
                    </tr>
                    <tr style={{ background: '#FFF7ED' }}>
                      <td><span className="badge badge-run">HIGH</span></td>
                      <td><span className="badge badge-breakdown">LOW</span></td>
                      <td><strong style={{ color: '#D97706' }}>Idle Time</strong></td>
                      <td style={{ fontSize: 11, color: '#D97706' }}>15-min timer starts</td>
                    </tr>
                    <tr style={{ background: '#FFF1F2' }}>
                      <td><span className="badge badge-breakdown">LOW</span></td>
                      <td><span className="badge badge-breakdown">LOW</span></td>
                      <td><strong style={{ color: '#EF4444' }}>Idle Time</strong></td>
                      <td style={{ fontSize: 11, color: '#EF4444' }}>15-min timer starts</td>
                    </tr>
                  </tbody>
                </table>
                <div style={{ marginTop: 12, background: '#F8FAFC', borderRadius: 6, padding: '10px 12px', fontSize: 11, color: '#475569' }}>
                  <strong>⚠ Escalation Rule:</strong> If idle state persists for 15+ minutes continuously, a mandatory pop-up is triggered requiring the operator to enter breakdown details. Breakdown time is counted from initial signal drop — not from pop-up.
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header"><div className="card-title">Today's Equipment Summary</div></div>
              <div className="card-body">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { id: 'EXT-01', run: '0h', bd: 'Stop: 5h 32m', idle: '0m' },
                    { id: 'EXT-02', run: '5h 13m', bd: 'BD: 18m', idle: '0m' },
                    { id: 'EXT-03', run: '5h 31m', bd: 'BD: 0m', idle: '1m' },
                    { id: 'ACM-01', run: '4h 55m', bd: 'BD: 37m', idle: '0m' },
                    { id: 'ACM-02', run: '5h 32m', bd: 'BD: 0m', idle: '0m' },
                  ].map((row, i, arr) => (
                    <div key={row.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < arr.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                      <span style={{ fontSize: 12, fontWeight: 600 }}>{row.id}</span>
                      <div style={{ display: 'flex', gap: 8, fontSize: 11 }}>
                        <span style={{ color: '#16A34A' }}>Run: {row.run}</span>
                        <span style={{ color: '#EF4444' }}>{row.bd}</span>
                        <span style={{ color: '#D97706' }}>Idle: {row.idle}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalMonitorTab;
