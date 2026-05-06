import React, { useState } from 'react';
import { equipmentList } from '../../data';
import type { Equipment } from '../../types';

interface EquipmentSectionProps {
  isNavActive: boolean;
  collapsed: boolean;
  onNavigate: () => void;
  onToggle: () => void;
  sensorValues: Record<string, number>;
}

const EquipmentGroup: React.FC<{
  equip: Equipment;
  sensorValues: Record<string, number>;
}> = ({ equip, sensorValues }) => {
  const [open, setOpen] = useState(
    equip.status === 'breakdown' && (equip.id === 'EXT-02' || equip.id === 'ACM-01' || equip.id === 'PMX-03')
  );

  const statusDotClass = `dot-${equip.status}`;
  const iconClass = equip.status;
  const iconEmoji = equip.group === 'extruder' ? '⚙' :
    equip.group === 'acm' ? '🔄' :
    equip.group === 'premixer' ? '🌀' : '📦';

  return (
    <div className="equip-group" data-equip={`${equip.id} ${equip.name.replace(' ⚠', '')}`}>
      <div
        className={`equip-header${open ? ' open' : ''}`}
        onClick={() => setOpen(o => !o)}
      >
        <div className={`equip-icon ${iconClass}`}>{iconEmoji}</div>
        <div className="equip-meta">
          <div className="equip-name">{equip.name}</div>
          <div className="equip-id">{equip.id} · {equip.statusLabel}</div>
        </div>
        <div className={`equip-state-dot ${statusDotClass}`}></div>
        <span className="equip-chevron">▶</span>
      </div>
      <div className={`sensor-list${open ? ' open' : ''}`}>
        {equip.sensors.map(sensor => {
          const val = sensorValues[sensor.id] ?? sensor.base;
          const displayVal = val.toFixed(sensor.decimals);
          return (
            <div className="sensor-item" key={sensor.id}>
              <div className="sensor-left">
                <span className={`sensor-dot sdot-${sensor.status}`}></span>
                <span className="sensor-name-text">{sensor.name}</span>
              </div>
              <div className="sensor-right">
                <span className={`sensor-val${sensor.status !== 'ok' ? ` ${sensor.status}` : ''}`}>
                  {displayVal}
                </span>
                <span className="sensor-unit">{sensor.unit}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const EquipmentSection: React.FC<EquipmentSectionProps> = ({
  isNavActive, collapsed, onNavigate, onToggle, sensorValues,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const extruders = equipmentList.filter(e => e.group === 'extruder');
  const acm = equipmentList.filter(e => e.group === 'acm');
  const premixers = equipmentList.filter(e => e.group === 'premixer');
  const binLoading = equipmentList.filter(e => e.group === 'binloading');

  const filterEquip = (list: Equipment[]) => {
    if (!searchQuery) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(e =>
      e.id.toLowerCase().includes(q) ||
      e.name.toLowerCase().replace(' ⚠', '').includes(q)
    );
  };

  return (
    <div className={`sn-section${isNavActive ? ' nav-active' : ''}${collapsed ? ' collapsed' : ''}`} id="snSection2">
      <div className="sn-section-header">
        <div className="sn-active-bar"></div>
        <div className="sn-nav-area" onClick={onNavigate}>
          <span className="sn-section-icon">📡</span>
          <span className="sn-section-title">Equipment Sensor Data</span>
          <span className="sn-badge sn-badge-blue">9 Equipment</span>
        </div>
        <button className="sn-toggle-btn" onClick={onToggle} title="Expand / Collapse">▼</button>
      </div>
      <div className="sn-section-body">
        {/* Search */}
        <div className="sn-search-wrap">
          <div className="sn-search-inner">
            <input
              className="sn-search"
              placeholder="Search equipment or sensor…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="sn-equip-label">⚙ Extruders</div>
        {filterEquip(extruders).map(e => (
          <EquipmentGroup key={e.id} equip={e} sensorValues={sensorValues} />
        ))}

        <div className="sn-equip-label">🔄 ACM Lines</div>
        {filterEquip(acm).map(e => (
          <EquipmentGroup key={e.id} equip={e} sensorValues={sensorValues} />
        ))}

        <div className="sn-equip-label">🌀 Premixers</div>
        {filterEquip(premixers).map(e => (
          <EquipmentGroup key={e.id} equip={e} sensorValues={sensorValues} />
        ))}

        <div className="sn-equip-label">📦 Bin Loading</div>
        {filterEquip(binLoading).map(e => (
          <EquipmentGroup key={e.id} equip={e} sensorValues={sensorValues} />
        ))}
      </div>
    </div>
  );
};

export default EquipmentSection;
