export default function deBounce(fn: any, delay: number = 500) {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(fn.bind(null, ...args), delay);
  };
}
