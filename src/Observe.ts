import { lego } from './index';
function adjustEventName(str: string): string {
  const clean = str.replace(/[^0-9a-z-A-Z]/g, '').replace(/ +/, ' ');

  return `${clean.charAt(0).toUpperCase()}${clean.slice(1)}`;
}

export class Observe {
  public makeObservable(obj: any, ...props: string[]): void {
    if (!props.length) {
      props = Object.keys(obj);
    }

    for (const prop of props) {
      const value = obj[prop];

      if (delete obj[prop]) {
        this.createObservable(obj, prop, value);
      }
    }
  }

  public removeObservable(obj: any, ...props: string[]): void {
    if (!props.length) {
      props = Object.keys(obj);
    }

    for (const prop of props) {
      const value = obj[prop];

      if (delete obj[prop]) {
        Object.defineProperty(obj, prop, {
          configurable: true,
          enumerable: true,
          writable: true,
          value,
        });
      }
    }
  }

  public createObservable(obj: any, prop: string, value: any): void {
    const eventName = `${obj.__name__}${adjustEventName(prop)}Update`;
    let oldValue = value;
    let newValue = oldValue;

    Object.defineProperty(obj, prop, {
      configurable: true,
      enumerable: true,
      get() {
        return newValue;
      },
      set(val: any) {
        if (val === newValue) {
          return;
        }

        oldValue = newValue;
        newValue = val;

        lego.event.emit(eventName, newValue, oldValue, obj.uuid);
      },
    });
  }
}
