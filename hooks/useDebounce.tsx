import { useState } from 'react';

let timer: any;
export default function debounce(fn: () => void, ms: number) {
  const useDebounce = (): void => {
    if (timer) {
      console.log(timer, '타이머 있음');
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn();
    }, ms);
  };

  return [useDebounce, timer] as const;
}
