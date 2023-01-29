import { useState } from 'react';

let timer: any;

export default function deBounce(ms: number = 500) {
  const [loading, setLoading] = useState(false);

  const useDebounce = async (fn: () => void) => {
    if (timer) {
      setLoading(() => false);
      clearTimeout(timer);
    }

    timer = setTimeout(async () => {
      setLoading(() => true);
      await fn();
      setLoading(() => false);
    }, ms);
  };

  return [useDebounce, loading, timer] as const;
}
