let timer: any;

export function useDebounce(fn: () => void) {
  if (timer) clearTimeout(timer);

  timer = setTimeout(() => {
    fn();
  }, 500);
}
