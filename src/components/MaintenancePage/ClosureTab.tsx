import React from 'react';

interface ClosureTabProps {
  onShowSnack: (msg: string) => void;
}

const ClosureTab: React.FC<ClosureTabProps> = ({ onShowSnack }) => {
  return (
    <div className="tab-content active" id="tab-closure">
      <div className="main">
        <div className="two-col">
          {/* Closure List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="card">
              <div className="card-header">
                <div>
                  <div className="card-title">Notifications Awaiting Closure</div>
                  <div className="card-subtitle">Engineering fills resolution → Operations acknowledges</div>
                </div>
              </div>
              <div className="card-body" style={{ padding: 0 }}>
                {/* MNT-0040 */}
                <div style={{ padding: '16px 18px', borderBottom: '1px solid #F1F5F9' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className="text-mono" style={{ fontSize: 12 }}>MNT-0040</span>
                        <span className="badge badge-breakdown">Breakdown</span>
                        <span className="badge badge-auto">Auto-detected</span>
                        <span className="sap-tag">IW21-004890</span>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#1E293B', marginTop: 4 }}>ACM-01 — Side Feeder Jam</div>
                      <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>Started: 13:55:22 · Duration: 37m 24s · Batch: PCB-2026-0411</div>
                    </div>
                  </div>
                  <div style={{ background: '#F8FAFC', borderRadius: 8, padding: 14 }}>
                    <div className="timeline">
                      <div className="timeline-item">
                        <div className="timeline-dot tl-done">✓</div>
                        <div className="timeline-body">
                          <div className="tl-title">Step 1 — Engineering: Breakdown Recorded</div>
                          <div className="tl-desc">Notification raised automatically via signal detection. SAP IW21 pushed.</div>
                          <div className="tl-time">14:10:46 · System Auto</div>
                        </div>
                      </div>
                      <div className="timeline-item">
                        <div className="timeline-dot tl-active">2</div>
                        <div className="timeline-body">
                          <div className="tl-title">Step 2 — Engineering: Enter Resolution Details</div>
                          <div className="tl-desc">Fill in repair start time, resolution description, and part replaced.</div>
                          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <div className="form-group">
                              <label className="form-label">Repair Start Time <span className="required">*</span></label>
                              <input type="time" className="form-control" defaultValue="14:10" />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Resolution Description <span className="required">*</span></label>
                              <textarea className="form-control" rows={2} placeholder="Describe what was done to fix the issue..."></textarea>
                            </div>
                            <div className="form-group">
                              <label className="form-label">Part Replaced (if any)</label>
                              <input className="form-control" placeholder="e.g. Feeder Belt — Part No. FB-2204" />
                            </div>
                            <button className="btn btn-primary" style={{ width: 'fit-content' }} onClick={() => onShowSnack('✓ Engineering resolution submitted')}>Submit Resolution</button>
                          </div>
                        </div>
                      </div>
                      <div className="timeline-item">
                        <div className="timeline-dot tl-pending">3</div>
                        <div className="timeline-body">
                          <div className="tl-title" style={{ color: '#94A3B8' }}>Step 3 — Operations: Acknowledge &amp; Confirm Restart</div>
                          <div className="tl-desc" style={{ color: '#CBD5E1' }}>Waiting for engineering to complete Step 2 first.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* MNT-0039 */}
                <div style={{ padding: '16px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className="text-mono" style={{ fontSize: 12 }}>MNT-0039</span>
                        <span className="badge badge-breakdown">Breakdown</span>
                        <span className="badge badge-manual">Manual</span>
                        <span className="sap-tag">IW21-004888</span>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#1E293B', marginTop: 4 }}>PMX-03 — Agitator Shaft Vibration</div>
                      <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>Started: 12:40:15 · Duration: 1h 52m · Batch: PCB-2026-0410</div>
                    </div>
                  </div>
                  <div style={{ background: '#F8FAFC', borderRadius: 8, padding: 14 }}>
                    <div className="timeline">
                      <div className="timeline-item">
                        <div className="timeline-dot tl-done">✓</div>
                        <div className="timeline-body">
                          <div className="tl-title">Step 1 — Engineering: Resolution Submitted</div>
                          <div className="tl-desc">Shaft re-aligned and balance weights adjusted. No part replacement.</div>
                          <div className="tl-time">13:55:00 · Suresh Kumar (Engineering)</div>
                        </div>
                      </div>
                      <div className="timeline-item">
                        <div className="timeline-dot tl-done">✓</div>
                        <div className="timeline-body">
                          <div className="tl-title">Step 2 — Engineering: Repair Complete</div>
                          <div className="tl-desc">Repair Start: 12:50 · Repair End: 13:52 · Duration: 62 min</div>
                          <div className="tl-time">13:52:00</div>
                        </div>
                      </div>
                      <div className="timeline-item">
                        <div className="timeline-dot tl-active">3</div>
                        <div className="timeline-body">
                          <div className="tl-title">Step 3 — Operations: Acknowledge Restart</div>
                          <div className="tl-desc">Confirm Premixer 3 is back in service and operational.</div>
                          <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                            <button className="btn btn-success" onClick={() => onShowSnack('✓ Closure acknowledged. MTTR calculated: 72 min')}>✓ Acknowledge &amp; Close</button>
                            <button className="btn btn-outline" onClick={() => onShowSnack('Escalated to supervisor')}>Raise Concern</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Closed Today */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="card">
              <div className="card-header">
                <div className="card-title">Closed Today</div>
                <div className="card-subtitle">2 notifications resolved</div>
              </div>
              <div className="card-body" style={{ padding: 0 }}>
                <div style={{ padding: '12px 18px', borderBottom: '1px solid #F1F5F9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700 }}>EXT-03 — Temperature Spike</div>
                      <div style={{ fontSize: 11, color: '#94A3B8' }}>Closed 11:20 · Duration: 22 min</div>
                    </div>
                    <span className="badge badge-closed">Closed</span>
                  </div>
                  <div style={{ marginTop: 6, fontSize: 11, color: '#475569' }}>Cooling fan cleaned and restarted. MTTR: 22 min</div>
                </div>
                <div style={{ padding: '12px 18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700 }}>ACM-02 — Powder Blockage</div>
                      <div style={{ fontSize: 11, color: '#94A3B8' }}>Closed 08:45 · Duration: 45 min</div>
                    </div>
                    <span className="badge badge-closed">Closed</span>
                  </div>
                  <div style={{ marginTop: 6, fontSize: 11, color: '#475569' }}>Chute cleared manually. No part replaced. MTTR: 45 min</div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header"><div className="card-title">Closure Rules</div></div>
              <div className="card-body">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12, color: '#475569' }}>
                  <div style={{ display: 'flex', gap: 8 }}><span>1.</span><span><strong>Manual notifications</strong> require Engineering to submit resolution before Operations can acknowledge.</span></div>
                  <div style={{ display: 'flex', gap: 8 }}><span>2.</span><span><strong>Auto-detected notifications</strong> can also be closed manually if signals have not resumed.</span></div>
                  <div style={{ display: 'flex', gap: 8 }}><span>3.</span><span><strong>Auto-closure</strong> occurs when both Motor + Side Feeder signals return to HIGH. System records restart time automatically.</span></div>
                  <div style={{ display: 'flex', gap: 8 }}><span>4.</span><span>If signals resume but Engineering has not confirmed, the system flags the discrepancy — notification stays open.</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClosureTab;
