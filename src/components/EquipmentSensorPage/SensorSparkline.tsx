import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  YAxis,
  ReferenceLine,
  Tooltip,
} from 'recharts';
import type { SensorDef } from '../../types';

interface SensorSparklineProps {
  sensor: SensorDef;
  history: number[];
}

const STATUS_COLOR: Record<string, string> = {
  ok:   '#16A34A',
  warn: '#D97706',
  crit: '#EF4444',
  off:  '#CBD5E1',
};

const SensorSparkline: React.FC<SensorSparklineProps> = ({ sensor, history }) => {
  const color = STATUS_COLOR[sensor.status] ?? '#94A3B8';
  const data = history.map((v, i) => ({ i, v }));
  const min = Math.min(...history);
  const max = Math.max(...history);
  const pad = (max - min) * 0.3 || 1;

  return (
    <div className="sensor-sparkline-wrap">
      <div className="sensor-sparkline-label">
        <span className={`esc-sdot ${sensor.status}`} style={{ flexShrink: 0 }} />
        <span className="esc-sname">{sensor.name}</span>
        <span className={`esc-sval ${sensor.status}`} style={{ marginLeft: 'auto' }}>
          {history[history.length - 1]?.toFixed(sensor.decimals) ?? '—'}
        </span>
        <span className="esc-sunit">{sensor.unit}</span>
      </div>
      <div className="sensor-sparkline-chart">
        <ResponsiveContainer width="100%" height={44}>
          <LineChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 4 }}>
            <YAxis domain={[min - pad, max + pad]} hide />
            {sensor.max > 0 && (
              <ReferenceLine
                y={sensor.max}
                stroke="#EF444440"
                strokeDasharray="3 3"
              />
            )}
            <Tooltip
              contentStyle={{
                background: '#1E293B',
                border: 'none',
                borderRadius: 4,
                padding: '3px 8px',
                fontSize: 11,
                color: '#fff',
              }}
              itemStyle={{ color: '#fff' }}
              formatter={(val: number) => [`${val.toFixed(sensor.decimals)} ${sensor.unit}`, sensor.name]}
              labelFormatter={() => ''}
            />
            <Line
              type="monotone"
              dataKey="v"
              dot={false}
              stroke={color}
              strokeWidth={1.5}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SensorSparkline;
