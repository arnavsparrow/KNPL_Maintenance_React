export type PageName = 'maintenance' | 'equipment' | 'asset-master' | 'tag-master';
export type TabName = 'active' | 'signals' | 'closure' | 'analytics';
export type Classification = 'breakdown' | 'quality' | 'cleaning' | 'others';
export type EquipmentStatus = 'run' | 'breakdown' | 'idle' | 'stop';
export type SensorStatus = 'ok' | 'warn' | 'crit' | 'off';

export interface Notification {
  id: string;
  type: 'auto' | 'manual';
  asset: string;
  assetId: string;
  subAsset: string;
  classification: Classification;
  reason: string;
  startTime: string;
  duration: string;
  durationClass: string;
  batch: string;
  sapNotif: string;
  status: 'open' | 'inprogress' | 'closed';
}

export interface SensorDef {
  id: string;
  name: string;
  unit: string;
  base: number;
  range: number;
  decimals: number;
  status: SensorStatus;
  max: number;
}

export interface Asset {
  id: string;
  sapCode: string;
  description: string;
  functionLocation: string;
  parentId: string | null;
}

export interface MqttTag {
  id: string;
  tagId: string;
  topicName: string;
  displayName: string;
  description: string;
  sensorRef?: string;
  unit: string;
  decimals: number;
  maxValue: number;
}

export interface AssetTagLink {
  id: string;
  assetId: string;
  tagId: string;
}

export interface Equipment {
  id: string;
  name: string;
  group: 'extruder' | 'acm' | 'premixer' | 'binloading';
  status: EquipmentStatus;
  batch?: string;
  notifId?: string;
  statusLabel: string;
  footLeft: string;
  footRight: string;
  footRightColor: string;
  sensors: SensorDef[];
}
