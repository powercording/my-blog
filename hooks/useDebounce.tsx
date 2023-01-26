import { useState } from 'react';

let timer: any;

export default function deBounce(ms: number = 500) {
  const [loading, setLoading] = useState(false);

  const useDebounce = async (fn: () => Promise<any>) => {
    if (timer) {
      setLoading(() => false);
      clearTimeout(timer);
    }

    const promise = new Promise(res => {
      timer = setTimeout(() => {
        setLoading(() => true);

        res((fn(), setLoading(() => false)));
      }, ms);
    });

    return promise;
  };

  return [useDebounce, { loading }, timer] as const;
}
