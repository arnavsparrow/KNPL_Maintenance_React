import React, { useState } from 'react';
import { equipmentList } from '../../data';
import EquipmentCard from './EquipmentCard';

interface EquipmentSensorPageProps {
  sensorValues: Record<string, number>;
  sensorHistory: Record<string, number[]>;
  onShowSnack: (msg: string) => void;
}

const EquipmentSensorPage: React.FC<EquipmentSensorPageProps> = ({ sensorValues, sensorHistory, onShowSnack }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const chips = [
    { key: 'all', label: 'All Equipment (9)' },
    { key: 'extruder', label: '⚙ Extruders (3)' },
    { key: 'acm', label: '🔄 ACM Lines (2)' },
    { key: 'premixer', label: '🌀 Premixers (3)' },
    { key: 'binloading', label: '📦 Bin Loading (2)' },
  ];

  const sections = [
    { key: 'extruder', label: 'Extruders', icon: '⚙' },
    { key: 'acm',      label: 'ACM Lines', icon: '🔄' },
    { key: 'premixer', label: 'Premixers', icon: '🌀' },
    { key: 'binloading', label: 'Bin Loading', icon: '📦' },
  ];

  const now = new Date().toLocaleTimeString('en-GB');

  return (
    <div id="pv-equipment" className="fullpage active">
      <div className="ep-header">
        <div className="ep-title-wrap">
          <div className="ep-title">📡 Equipment Sensor Data — Live Monitor</div>
          <div className="ep-sub">Real-time sensor readings across all plant equipment · Updates every 2 seconds</div>
        </div>
        <div className="ep-actions">
          <button className="btn btn-outline" onClick={() => onShowSnack('Refreshing sensor data...')}>↻ Refresh</button>
          <button className="btn btn-outline" onClick={() => onShowSnack('Exported sensor log')}>⬇ Export</button>
        </div>
      </div>

      <div className="ep-filter-bar">
        <span className="ep-filter-label">FILTER:</span>
        {chips.map(chip => (
          <div
            key={chip.key}
            className={`ep-chip${activeFilter === chip.key ? ' active' : ''}`}
            onClick={() => setActiveFilter(chip.key)}
          >
            {chip.label}
          </div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#16A34A', fontWeight: 600 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#16A34A', display: 'inline-block', animation: 'dot-pulse 2s infinite' }}></span>
            Live
          </span>
          <span style={{ fontSize: 11, color: '#94A3B8' }}>Updated {now}</span>
        </div>
      </div>

      <div className="ep-grid-wrap">
        {sections.map(section => {
          const show = activeFilter === 'all' || activeFilter === section.key;
          if (!show) return null;
          const items = equipmentList.filter(e => e.group === section.key);
          return (
            <div key={section.key} className="ep-section-wrap ep-grp" data-group={section.key}>
              <div className="ep-section-label">
                <span>{section.icon}</span> {section.label}
              </div>
              <div className="ep-grid">
                {items.map(equip => (
                  <EquipmentCard key={equip.id} equip={equip} sensorValues={sensorValues} sensorHistory={sensorHistory} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EquipmentSensorPage;
