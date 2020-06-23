export const getUUID = (() => {
  let num = 0;
  return (prefix = '') => {
    num += 1;
    const value = num < 10 ? `0${num}` : num;
    return `${prefix}${value.toString()}`;
  };
})();

export function not(fn: (...args: any[]) => boolean): () => boolean {
  // tslint:disable-next-line: only-arrow-functions
  return function() {
    return !fn(...arguments);
  };
}
