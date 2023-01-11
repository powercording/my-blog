let timer: any;
export default function debounce(fn: () => void, ms: number) {
  const useDebounce = (): void => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn();
    }, ms);
  };

  return [useDebounce, timer] as const;
}