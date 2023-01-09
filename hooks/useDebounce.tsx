import { useState } from 'react';

let timer: any;
export default function debounce(fn: () => void, ms: number) {
  const [isLoading, setIsLoading] = useState(false);
  console.log('나불름?');

  const useDebounce = (): void => {
    if (timer) {
      console.log(timer, '타이머 있음');
      clearTimeout(timer);
    }

    if (!isLoading) {
      setIsLoading(true);
    }

    timer = setTimeout(() => {
      setIsLoading(false);
      fn();
    }, ms);
  };

  return [useDebounce, isLoading] as const;
}
