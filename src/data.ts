import type { Notification, Equipment, Asset, MqttTag, AssetTagLink } from './types';

export const notifications: Notification[] = [
  {
    id: 'MNT-0041', type: 'auto', asset: 'Extruder 2', assetId: 'EXT-02',
    subAsset: 'Motor Drive', classification: 'breakdown', reason: 'Motor Overload',
    startTime: '14:14:03', duration: '18m 43s', durationClass: 'bd',
    batch: 'PCB-2026-0412', sapNotif: 'IW21-004891', status: 'open',
  },
  {
    id: 'MNT-0040', type: 'auto', asset: 'ACM 1', assetId: 'ACM-01',
    subAsset: 'Side Feeder', classification: 'breakdown', reason: 'Feeder Jam',
    startTime: '13:55:22', duration: '37m 24s', durationClass: 'bd',
    batch: 'PCB-2026-0411', sapNotif: 'IW21-004890', status: 'inprogress',
  },
  {
    id: 'MNT-0039', type: 'manual', asset: 'Premixer 3', assetId: 'PMX-03',
    subAsset: 'Agitator Shaft', classification: 'breakdown', reason: 'Shaft Vibration',
    startTime: '12:40:15', duration: '1h 52m', durationClass: 'bd',
    batch: 'PCB-2026-0410', sapNotif: 'IW21-004888', status: 'inprogress',
  },
  {
    id: 'MNT-0038', type: 'manual', asset: 'Bin Loading 2', assetId: 'BL-02',
    subAsset: 'Conveyor Belt', classification: 'quality', reason: 'Material Check',
    startTime: '11:22:45', duration: '2h 10m', durationClass: 'ql',
    batch: 'PCB-2026-0409', sapNotif: '', status: 'open',
  },
  {
    id: 'MNT-0037', type: 'manual', asset: 'Extruder 1', assetId: 'EXT-01',
    subAsset: 'Screw Drive', classification: 'others', reason: 'Planned Cleaning',
    startTime: '09:00:00', duration: '5h 32m', durationClass: 'ot',
    batch: '—', sapNotif: '', status: 'inprogress',
  },
];

export const equipmentList: Equipment[] = [
  // Extruders
  {
    id: 'EXT-01', name: 'Extruder 1', group: 'extruder', status: 'stop',
    statusLabel: 'Planned Stop', footLeft: 'No active batch', footRight: 'Stop: 5h 32m',
    footRightColor: '#94A3B8',
    sensors: [
      { id: 'ext01-curr',  name: 'Motor Current',  unit: 'A',   base: 0,   range: 0,    decimals: 1, status: 'off',  max: 80 },
      { id: 'ext01-speed', name: 'Motor Speed',    unit: 'RPM', base: 0,   range: 0,    decimals: 0, status: 'off',  max: 1600 },
      { id: 'ext01-temp',  name: 'Barrel Temp',    unit: '°C',  base: 42,  range: 0.3,  decimals: 1, status: 'warn', max: 220 },
      { id: 'ext01-press', name: 'Melt Pressure',  unit: 'bar', base: 0,   range: 0,    decimals: 1, status: 'off',  max: 25 },
      { id: 'ext01-torque',name: 'Screw Torque',   unit: 'Nm',  base: 0,   range: 0,    decimals: 0, status: 'off',  max: 400 },
    ],
  },
  {
    id: 'EXT-02', name: 'Extruder 2 ⚠', group: 'extruder', status: 'breakdown',
    notifId: 'MNT-0041', batch: 'PCB-2026-0412',
    statusLabel: 'Breakdown', footLeft: 'PCB-2026-0412', footRight: '⏱ 18m+ idle',
    footRightColor: '#EF4444',
    sensors: [
      { id: 'ext02-curr',  name: 'Motor Current',  unit: 'A',   base: 0,   range: 0,    decimals: 1, status: 'crit', max: 80 },
      { id: 'ext02-speed', name: 'Motor Speed',    unit: 'RPM', base: 0,   range: 0,    decimals: 0, status: 'crit', max: 1600 },
      { id: 'ext02-temp',  name: 'Barrel Temp',    unit: '°C',  base: 178, range: 0.2,  decimals: 0, status: 'warn', max: 220 },
      { id: 'ext02-press', name: 'Melt Pressure',  unit: 'bar', base: 0,   range: 0,    decimals: 1, status: 'crit', max: 25 },
      { id: 'ext02-vib',   name: 'Vibration',      unit: 'mm/s',base: 8.4, range: 0.15, decimals: 1, status: 'crit', max: 10 },
    ],
  },
  {
    id: 'EXT-03', name: 'Extruder 3', group: 'extruder', status: 'run',
    batch: 'PCB-2026-0413',
    statusLabel: 'Running', footLeft: 'PCB-2026-0413', footRight: 'Run: 5h 31m',
    footRightColor: '#16A34A',
    sensors: [
      { id: 'ext03-curr',  name: 'Motor Current',  unit: 'A',   base: 52.1, range: 1.4,  decimals: 1, status: 'ok', max: 80 },
      { id: 'ext03-speed', name: 'Motor Speed',    unit: 'RPM', base: 1452, range: 8,    decimals: 0, status: 'ok', max: 1600 },
      { id: 'ext03-temp',  name: 'Barrel Temp',    unit: '°C',  base: 195,  range: 0.8,  decimals: 0, status: 'ok', max: 220 },
      { id: 'ext03-press', name: 'Melt Pressure',  unit: 'bar', base: 12.4, range: 0.3,  decimals: 1, status: 'ok', max: 25 },
      { id: 'ext03-torque',name: 'Screw Torque',   unit: 'Nm',  base: 248,  range: 5,    decimals: 0, status: 'ok', max: 400 },
    ],
  },
  // ACM
  {
    id: 'ACM-01', name: 'ACM Line 1 ⚠', group: 'acm', status: 'breakdown',
    notifId: 'MNT-0040', batch: 'PCB-2026-0411',
    statusLabel: 'In Repair', footLeft: 'PCB-2026-0411', footRight: 'Idle: 37m',
    footRightColor: '#D97706',
    sensors: [
      { id: 'acm01-curr',  name: 'Motor Current',    unit: 'A',   base: 0,    range: 0,    decimals: 1, status: 'crit', max: 80 },
      { id: 'acm01-rotor', name: 'Rotor Speed',      unit: 'RPM', base: 0,    range: 0,    decimals: 0, status: 'crit', max: 5000 },
      { id: 'acm01-class', name: 'Classifier Speed', unit: 'RPM', base: 1840, range: 12,   decimals: 0, status: 'warn', max: 4200 },
      { id: 'acm01-inlet', name: 'Inlet Temp',       unit: '°C',  base: 38,   range: 0.3,  decimals: 0, status: 'warn', max: 60 },
      { id: 'acm01-outlet',name: 'Outlet Temp',      unit: '°C',  base: 44,   range: 0.2,  decimals: 0, status: 'warn', max: 80 },
    ],
  },
  {
    id: 'ACM-02', name: 'ACM Line 2', group: 'acm', status: 'run',
    batch: 'PCB-2026-0411',
    statusLabel: 'Running', footLeft: 'PCB-2026-0411', footRight: 'Run: 5h 32m',
    footRightColor: '#16A34A',
    sensors: [
      { id: 'acm02-curr',  name: 'Motor Current',    unit: 'A',   base: 38.5, range: 0.9,  decimals: 1, status: 'ok', max: 80 },
      { id: 'acm02-rotor', name: 'Rotor Speed',      unit: 'RPM', base: 4210, range: 15,   decimals: 0, status: 'ok', max: 5000 },
      { id: 'acm02-class', name: 'Classifier Speed', unit: 'RPM', base: 2800, range: 10,   decimals: 0, status: 'ok', max: 4200 },
      { id: 'acm02-inlet', name: 'Inlet Temp',       unit: '°C',  base: 28,   range: 0.2,  decimals: 0, status: 'ok', max: 60 },
      { id: 'acm02-outlet',name: 'Outlet Temp',      unit: '°C',  base: 35,   range: 0.2,  decimals: 0, status: 'ok', max: 80 },
    ],
  },
  // Premixers
  {
    id: 'PMX-01', name: 'Premixer 1', group: 'premixer', status: 'run',
    statusLabel: 'Running', footLeft: '—', footRight: 'Running',
    footRightColor: '#16A34A',
    sensors: [
      { id: 'pmx01-curr',  name: 'Motor Current',   unit: 'A',   base: 18.2, range: 0.4,  decimals: 1, status: 'ok', max: 30 },
      { id: 'pmx01-speed', name: 'Agitator Speed',  unit: 'RPM', base: 960,  range: 6,    decimals: 0, status: 'ok', max: 1200 },
      { id: 'pmx01-temp',  name: 'Temp (Chamber)',  unit: '°C',  base: 32,   range: 0.2,  decimals: 0, status: 'ok', max: 80 },
      { id: 'pmx01-vib',   name: 'Vibration',       unit: 'mm/s',base: 1.2,  range: 0.08, decimals: 1, status: 'ok', max: 10 },
    ],
  },
  {
    id: 'PMX-02', name: 'Premixer 2', group: 'premixer', status: 'run',
    statusLabel: 'Running', footLeft: '—', footRight: 'Running',
    footRightColor: '#16A34A',
    sensors: [
      { id: 'pmx02-curr',  name: 'Motor Current',   unit: 'A',   base: 17.9, range: 0.4,  decimals: 1, status: 'ok', max: 30 },
      { id: 'pmx02-speed', name: 'Agitator Speed',  unit: 'RPM', base: 948,  range: 6,    decimals: 0, status: 'ok', max: 1200 },
      { id: 'pmx02-temp',  name: 'Temp (Chamber)',  unit: '°C',  base: 30,   range: 0.2,  decimals: 0, status: 'ok', max: 80 },
    ],
  },
  {
    id: 'PMX-03', name: 'Premixer 3 ⚠', group: 'premixer', status: 'breakdown',
    notifId: 'MNT-0039', batch: 'PCB-2026-0410',
    statusLabel: 'Breakdown', footLeft: 'PCB-2026-0410', footRight: 'BD: 1h 52m',
    footRightColor: '#EF4444',
    sensors: [
      { id: 'pmx03-curr',  name: 'Motor Current',   unit: 'A',   base: 0,    range: 0,    decimals: 1, status: 'crit', max: 30 },
      { id: 'pmx03-speed', name: 'Agitator Speed',  unit: 'RPM', base: 0,    range: 0,    decimals: 0, status: 'crit', max: 1200 },
      { id: 'pmx03-temp',  name: 'Temp (Chamber)',  unit: '°C',  base: 29,   range: 0.1,  decimals: 0, status: 'ok',   max: 80 },
      { id: 'pmx03-vib',   name: 'Vibration',       unit: 'mm/s',base: 12.8, range: 0.4,  decimals: 1, status: 'crit', max: 10 },
    ],
  },
  // Bin Loading
  {
    id: 'BL-01', name: 'Bin Loading 1', group: 'binloading', status: 'run',
    statusLabel: 'Running', footLeft: '—', footRight: 'Running',
    footRightColor: '#16A34A',
    sensors: [
      { id: 'bl01-belt', name: 'Belt Speed',    unit: 'm/min', base: 0.8,  range: 0.02, decimals: 1, status: 'ok', max: 1.5 },
      { id: 'bl01-load', name: 'Load Cell',     unit: 'kg',    base: 142.4,range: 1.2,  decimals: 1, status: 'ok', max: 200 },
      { id: 'bl01-curr', name: 'Motor Current', unit: 'A',     base: 6.4,  range: 0.2,  decimals: 1, status: 'ok', max: 10 },
    ],
  },
  {
    id: 'BL-02', name: 'Bin Loading 2', group: 'binloading', status: 'idle',
    notifId: 'MNT-0038', batch: 'PCB-2026-0409',
    statusLabel: 'Quality Stop', footLeft: 'PCB-2026-0409', footRight: 'Stopped: 2h 10m',
    footRightColor: '#D97706',
    sensors: [
      { id: 'bl02-belt', name: 'Belt Speed',    unit: 'm/min', base: 0,    range: 0,    decimals: 1, status: 'off',  max: 1.5 },
      { id: 'bl02-load', name: 'Load Cell',     unit: 'kg',    base: 88.2, range: 0.1,  decimals: 1, status: 'warn', max: 200 },
      { id: 'bl02-curr', name: 'Motor Current', unit: 'A',     base: 0,    range: 0,    decimals: 1, status: 'off',  max: 10 },
    ],
  },
];

export const initialAssets: Asset[] = [
  { id: 'A-001', sapCode: 'FL-KNPL-PLANT',    description: 'KNPL Plant – Kankurgachi',    functionLocation: 'FL-KNPL',      parentId: null },
  { id: 'A-002', sapCode: 'FL-PL1',           description: 'Production Line 1',           functionLocation: 'FL-KNPL-PL1',   parentId: 'A-001' },
  { id: 'A-003', sapCode: 'FL-PL2',           description: 'Production Line 2',           functionLocation: 'FL-KNPL-PL2',   parentId: 'A-001' },
  { id: 'A-004', sapCode: 'FL-PMX',           description: 'Premixer Area',               functionLocation: 'FL-KNPL-PMX',   parentId: 'A-001' },
  { id: 'A-005', sapCode: 'FL-BL',            description: 'Bin Loading Area',            functionLocation: 'FL-KNPL-BL',    parentId: 'A-001' },
  { id: 'A-006', sapCode: '10010001-EXT-01',  description: 'Extruder 1',                  functionLocation: 'FL-KNPL-PL1-E1', parentId: 'A-002' },
  { id: 'A-007', sapCode: '10010002-ACM-01',  description: 'ACM Line 1',                  functionLocation: 'FL-KNPL-PL1-A1', parentId: 'A-002' },
  { id: 'A-008', sapCode: '10010003-EXT-02',  description: 'Extruder 2',                  functionLocation: 'FL-KNPL-PL2-E2', parentId: 'A-003' },
  { id: 'A-009', sapCode: '10010004-EXT-03',  description: 'Extruder 3',                  functionLocation: 'FL-KNPL-PL2-E3', parentId: 'A-003' },
  { id: 'A-010', sapCode: '10010005-ACM-02',  description: 'ACM Line 2',                  functionLocation: 'FL-KNPL-PL2-A2', parentId: 'A-003' },
  { id: 'A-011', sapCode: '10010006-PMX-01',  description: 'Premixer 1',                  functionLocation: 'FL-KNPL-PMX-P1', parentId: 'A-004' },
  { id: 'A-012', sapCode: '10010007-PMX-02',  description: 'Premixer 2',                  functionLocation: 'FL-KNPL-PMX-P2', parentId: 'A-004' },
  { id: 'A-013', sapCode: '10010008-PMX-03',  description: 'Premixer 3',                  functionLocation: 'FL-KNPL-PMX-P3', parentId: 'A-004' },
  { id: 'A-014', sapCode: '10010009-BL-01',   description: 'Bin Loading 1',               functionLocation: 'FL-KNPL-BL-B1',  parentId: 'A-005' },
  { id: 'A-015', sapCode: '10010010-BL-02',   description: 'Bin Loading 2',               functionLocation: 'FL-KNPL-BL-B2',  parentId: 'A-005' },
];

export const initialMqttTags: MqttTag[] = [
  { id: 'T-001', tagId: 'EXT01_CURR',   topicName: 'knpl/ext01/motor_current',    description: 'Extruder 1 – Motor Current (A)' },
  { id: 'T-002', tagId: 'EXT01_SPEED',  topicName: 'knpl/ext01/motor_speed',      description: 'Extruder 1 – Motor Speed (RPM)' },
  { id: 'T-003', tagId: 'EXT01_TEMP',   topicName: 'knpl/ext01/barrel_temp',      description: 'Extruder 1 – Barrel Temperature (°C)' },
  { id: 'T-004', tagId: 'EXT01_PRESS',  topicName: 'knpl/ext01/melt_pressure',    description: 'Extruder 1 – Melt Pressure (bar)' },
  { id: 'T-005', tagId: 'EXT01_TORQUE', topicName: 'knpl/ext01/screw_torque',     description: 'Extruder 1 – Screw Torque (Nm)' },
  { id: 'T-006', tagId: 'EXT02_CURR',   topicName: 'knpl/ext02/motor_current',    description: 'Extruder 2 – Motor Current (A)' },
  { id: 'T-007', tagId: 'EXT02_SPEED',  topicName: 'knpl/ext02/motor_speed',      description: 'Extruder 2 – Motor Speed (RPM)' },
  { id: 'T-008', tagId: 'EXT02_TEMP',   topicName: 'knpl/ext02/barrel_temp',      description: 'Extruder 2 – Barrel Temperature (°C)' },
  { id: 'T-009', tagId: 'EXT02_PRESS',  topicName: 'knpl/ext02/melt_pressure',    description: 'Extruder 2 – Melt Pressure (bar)' },
  { id: 'T-010', tagId: 'EXT02_VIB',    topicName: 'knpl/ext02/vibration',        description: 'Extruder 2 – Vibration (mm/s)' },
  { id: 'T-011', tagId: 'EXT03_CURR',   topicName: 'knpl/ext03/motor_current',    description: 'Extruder 3 – Motor Current (A)' },
  { id: 'T-012', tagId: 'EXT03_SPEED',  topicName: 'knpl/ext03/motor_speed',      description: 'Extruder 3 – Motor Speed (RPM)' },
  { id: 'T-013', tagId: 'EXT03_TEMP',   topicName: 'knpl/ext03/barrel_temp',      description: 'Extruder 3 – Barrel Temperature (°C)' },
  { id: 'T-014', tagId: 'EXT03_PRESS',  topicName: 'knpl/ext03/melt_pressure',    description: 'Extruder 3 – Melt Pressure (bar)' },
  { id: 'T-015', tagId: 'EXT03_TORQUE', topicName: 'knpl/ext03/screw_torque',     description: 'Extruder 3 – Screw Torque (Nm)' },
  { id: 'T-016', tagId: 'ACM01_CURR',   topicName: 'knpl/acm01/motor_current',    description: 'ACM Line 1 – Motor Current (A)' },
  { id: 'T-017', tagId: 'ACM01_ROTOR',  topicName: 'knpl/acm01/rotor_speed',      description: 'ACM Line 1 – Rotor Speed (RPM)' },
  { id: 'T-018', tagId: 'ACM01_CLASS',  topicName: 'knpl/acm01/classifier_speed', description: 'ACM Line 1 – Classifier Speed (RPM)' },
  { id: 'T-019', tagId: 'ACM01_INLET',  topicName: 'knpl/acm01/inlet_temp',       description: 'ACM Line 1 – Inlet Temperature (°C)' },
  { id: 'T-020', tagId: 'ACM01_OUTLET', topicName: 'knpl/acm01/outlet_temp',      description: 'ACM Line 1 – Outlet Temperature (°C)' },
  { id: 'T-021', tagId: 'ACM02_CURR',   topicName: 'knpl/acm02/motor_current',    description: 'ACM Line 2 – Motor Current (A)' },
  { id: 'T-022', tagId: 'ACM02_ROTOR',  topicName: 'knpl/acm02/rotor_speed',      description: 'ACM Line 2 – Rotor Speed (RPM)' },
  { id: 'T-023', tagId: 'ACM02_CLASS',  topicName: 'knpl/acm02/classifier_speed', description: 'ACM Line 2 – Classifier Speed (RPM)' },
  { id: 'T-024', tagId: 'PMX01_CURR',   topicName: 'knpl/pmx01/motor_current',    description: 'Premixer 1 – Motor Current (A)' },
  { id: 'T-025', tagId: 'PMX01_SPEED',  topicName: 'knpl/pmx01/agitator_speed',   description: 'Premixer 1 – Agitator Speed (RPM)' },
  { id: 'T-026', tagId: 'PMX01_TEMP',   topicName: 'knpl/pmx01/chamber_temp',     description: 'Premixer 1 – Chamber Temperature (°C)' },
  { id: 'T-027', tagId: 'PMX01_VIB',    topicName: 'knpl/pmx01/vibration',        description: 'Premixer 1 – Vibration (mm/s)' },
  { id: 'T-028', tagId: 'PMX03_VIB',    topicName: 'knpl/pmx03/vibration',        description: 'Premixer 3 – Vibration (mm/s)' },
  { id: 'T-029', tagId: 'BL01_BELT',    topicName: 'knpl/bl01/belt_speed',        description: 'Bin Loading 1 – Belt Speed (m/min)' },
  { id: 'T-030', tagId: 'BL01_LOAD',    topicName: 'knpl/bl01/load_cell',         description: 'Bin Loading 1 – Load Cell (kg)' },
];
