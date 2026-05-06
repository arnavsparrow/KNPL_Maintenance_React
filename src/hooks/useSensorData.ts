import { useState, useEffect, useRef } from 'react';
import { equipmentList } from '../data';

const HISTORY_LEN = 30;

function buildInitialValues(): Record<string, number> {
  const values: Record<string, number> = {};
  equipmentList.forEach(equip => {
    equip.sensors.forEach(sensor => {
      values[sensor.id] = sensor.base;
    });
  });
  return values;
}

function buildInitialHistory(seed: Record<string, number>): Record<string, number[]> {
  const history: Record<string, number[]> = {};
  equipmentList.forEach(equip => {
    equip.sensors.forEach(sensor => {
      history[sensor.id] = Array(HISTORY_LEN).fill(seed[sensor.id]);
    });
  });
  return history;
}

const sensorDefs: Array<[string, number, number, number]> = [];
equipmentList.forEach(equip => {
  equip.sensors.forEach(sensor => {
    sensorDefs.push([sensor.id, sensor.base, sensor.range, sensor.decimals]);
  });
});

export interface SensorDataResult {
  values: Record<string, number>;
  history: Record<string, number[]>;
}

export function useSensorData(): SensorDataResult {
  const initVals = buildInitialValues();
  const [values, setValues] = useState<Record<string, number>>(initVals);
  const [history, setHistory] = useState<Record<string, number[]>>(() => buildInitialHistory(initVals));
  const currentRef = useRef<Record<string, number>>(initVals);
  const historyRef = useRef<Record<string, number[]>>(buildInitialHistory(initVals));

  useEffect(() => {
    const tick = () => {
      const cur = currentRef.current;
      const next = { ...cur };

      sensorDefs.forEach(([id, base, range]) => {
        if (range === 0) {
          next[id] = cur[id];
          return;
        }
        let val = cur[id];
        val += (Math.random() - 0.5) * range * 2;
        val = Math.max(base - range * 3, Math.min(base + range * 3, val));
        next[id] = val;
      });

      if ('ext02-temp' in next) {
        next['ext02-temp'] = Math.max(38, cur['ext02-temp'] - 0.08);
      }
      if ('acm01-class' in next) {
        next['acm01-class'] = Math.max(0, cur['acm01-class'] - 0.6);
      }

      const newHistory: Record<string, number[]> = {};
      const prevHist = historyRef.current;
      for (const id in next) {
        const prev = prevHist[id] ?? [];
        newHistory[id] = [...prev.slice(-(HISTORY_LEN - 1)), next[id]];
      }

      currentRef.current = next;
      historyRef.current = newHistory;
      setValues({ ...next });
      setHistory({ ...newHistory });
    };

    const id = setInterval(tick, 2000);
    return () => clearInterval(id);
  }, []);

  return { values, history };
}
