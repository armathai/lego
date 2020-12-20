export { lego } from './Lego';

export function not(fn: (...args: unknown[]) => boolean): (...args: unknown[]) => boolean {
    const wrappedFn = (...args: unknown[]): boolean => {
        return !fn(...args);
    };

    const upperCaseName = fn.name.charAt(0).toUpperCase() + fn.name.slice(1);
    Object.defineProperties(wrappedFn, {
        name: { value: `not${upperCaseName}` },
    });

    return wrappedFn;
}
