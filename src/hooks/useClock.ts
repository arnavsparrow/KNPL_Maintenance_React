import { useState, useEffect } from 'react';

export function useClock(): string {
  const getStr = () => {
    const now = new Date();
    const d = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const t = now.toLocaleTimeString('en-GB');
    return d + ' \u00a0—\u00a0 ' + t;
  };

  const [clock, setClock] = useState(getStr);

  useEffect(() => {
    const id = setInterval(() => setClock(getStr()), 1000);
    return () => clearInterval(id);
  }, []);

  return clock;
}
