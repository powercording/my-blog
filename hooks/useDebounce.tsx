import { useState } from 'react';

let timer: any;

export default function deBounce(ms: number = 500) {
  const [loading, setLoading] = useState(false);

  const useDebounce = async (url: string) => {
    if (timer) {
      setLoading(() => false);
      clearTimeout(timer);
    }

    const promise = new Promise(res => {
      timer = setTimeout(() => {
        setLoading(() => true);
        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(res => res.json().catch(() => {}))
          .then(data => {
            setLoading(() => false);
            res(data);
          });
      }, ms);
    });

    return promise;
  };

  return [useDebounce, { loading }, timer] as const;
}
