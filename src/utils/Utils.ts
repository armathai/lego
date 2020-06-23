export function not(fn: (...args: any[]) => boolean) {
  const wrappedFn = (...args: any[]) => {
    return !fn(...args);
  };

  const upperCaseName = fn.name.charAt(0).toUpperCase() + fn.name.slice(1);
  Object.defineProperties(wrappedFn, {
    name: { value: `not${upperCaseName}` },
  });

  return wrappedFn;
}
