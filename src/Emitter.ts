import { ICallback, IListener } from './Types';
import { Map } from './utils/Map';

export class Emitter {
  private _events: Map<IListener[]> = new Map();
  public getListeners(event: string): IListener[] {
    return this._events.get(event) || [];
  }

  public on(name: string, callback: ICallback, context?: any): this {
    this._addListener(name, callback, context, false);
    return this;
  }

  public once(name: string, callback: ICallback, context?: any): this {
    this._addListener(name, callback, context, true);
    return this;
  }

  public off(name: string, callback: ICallback, context?: any): this {
    this._removeListener(name, callback, context);
    return this;
  }

  public emit(name: string, ...args: any[]): void {
    const ll: IListener[] = this.getListeners(name);
    if (!ll.length) {
      return;
    }

    const llCopy = [...ll];
    for (const l of llCopy) {
      const { callback, context, once } = l;
      if (once) {
        this._removeListener(name, callback, context);
      }
      callback.apply(context, args);
    }
  }

  public removeListenersOf(context: any): void {
    const keys = this._events.keys();
    for (let i = keys.length - 1; i >= 0; i -= 1) {
      const name = keys[i];
      const ll = this.getListeners(name);

      for (let j = ll.length - 1; j >= 0; j -= 1) {
        const l = ll[j];
        if (l.context === context) {
          this._removeListener(name, l.callback, context);
        }
      }
    }
  }

  private _addListener(name: string, callback: ICallback, context: any, once: boolean): void {
    const ll: IListener[] = this.getListeners(name);
    const l = { callback, context, once };
    !ll.length ? this._events.set(name, [l]) : ll.push(l);
  }

  private _removeListener(name: string, callback: ICallback, context?: any): void {
    const ll: IListener[] = this.getListeners(name);
    if (!ll.length) {
      return;
    }

    for (let i = ll.length - 1; i >= 0; i -= 1) {
      const l = ll[i];
      const { callback: clb, context: ctx } = l;
      if (clb === callback && ctx === context) {
        ll.splice(i, 1);
        break;
      }
    }
    if (!ll.length) {
      this._events.delete(name);
    }
  }
}
