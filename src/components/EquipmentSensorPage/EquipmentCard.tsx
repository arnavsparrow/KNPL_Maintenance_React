import React, { useState } from 'react';
import type { Equipment, SensorDef } from '../../types';
import SensorSparkline from './SensorSparkline';

interface EquipmentCardProps {
  equip: Equipment;
  sensorValues: Record<string, number>;
  sensorHistory: Record<string, number[]>;
}

const getBadge = (status: Equipment['status'], statusLabel: string) => {
  if (status === 'run') return <span className="badge badge-run">✓ Running</span>;
  if (status === 'breakdown') {
    if (statusLabel === 'In Repair') return <span className="badge badge-inprogress">In Repair</span>;
    return <span className="badge badge-breakdown">Breakdown</span>;
  }
  if (status === 'idle') return <span className="badge badge-quality">Quality Stop</span>;
  return <span className="badge badge-others">Planned Stop</span>;
};

const EquipmentCard: React.FC<EquipmentCardProps> = ({ equip, sensorValues, sensorHistory }) => {
  const [chartView, setChartView] = useState(false);

  return (
    <div className="esc-card">
      <div className={`esc-card-head ${equip.status}`}>
        <div>
          <div className="esc-card-name">{equip.name}</div>
          <div className="esc-card-id">{equip.id}{equip.notifId ? ` · ${equip.notifId}` : ''}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {getBadge(equip.status, equip.statusLabel)}
          <button
            className="esc-view-toggle"
            onClick={() => setChartView(v => !v)}
            title={chartView ? 'Switch to list view' : 'Switch to chart view'}
          >
            {chartView ? '☰' : '📈'}
          </button>
        </div>
      </div>

      <div className="esc-card-body">
        {equip.sensors.map((sensor: SensorDef) => {
          if (chartView) {
            const hist = sensorHistory[sensor.id] ?? Array(30).fill(sensor.base);
            return (
              <SensorSparkline
                key={sensor.id}
                sensor={sensor}
                history={hist}
              />
            );
          }
          const val = sensorValues[sensor.id] ?? sensor.base;
          const displayVal = val.toFixed(sensor.decimals);
          const barPct = sensor.max > 0
            ? Math.min(100, Math.max(0, (val / sensor.max) * 100))
            : 0;
          return (
            <div className="esc-sensor-row" key={sensor.id}>
              <span className={`esc-sdot ${sensor.status}`}></span>
              <span className="esc-sname">{sensor.name}</span>
              <div className="esc-bar-track">
                <div
                  className={`esc-bar-fill ${sensor.status}`}
                  style={{ width: `${barPct.toFixed(1)}%` }}
                ></div>
              </div>
              <span className={`esc-sval ${sensor.status}`}>{displayVal}</span>
              <span className="esc-sunit">{sensor.unit}</span>
            </div>
          );
        })}
      </div>

      <div className="esc-card-foot">
        <span className={equip.batch ? 'text-mono' : ''}>{equip.footLeft}</span>
        <span style={{ color: equip.footRightColor }}>{equip.footRight}</span>
      </div>
    </div>
  );
};

export default EquipmentCard;
