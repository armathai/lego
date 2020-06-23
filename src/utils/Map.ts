export class Map<V> {
  public get(key: string): V {
    // @ts-ignore
    return this[key];
  }

  public keys() {
    return Object.keys(this);
  }

  public values() {
    const keys = this.keys();
    // @ts-ignore
    return keys.map(k => this[k]);
  }

  public set(key: string, value: V): void {
    // @ts-ignore
    this[key] = value;
  }

  public delete(key: string): V {
    const v = this.get(key);
    // @ts-ignore
    delete this[key];
    return v;
  }

  public forEach(fn: (k: string, v: V, index: number) => void): void {
    Object.keys(this).forEach((prop, index) => fn(prop, this.get(prop), index));
  }
}
