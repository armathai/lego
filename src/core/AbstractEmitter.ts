import { ICallback, IListener } from '../Types';

export abstract class AbstractEmitter {
    public abstract getListeners(event: string): IListener[];

    public abstract on(name: string, callback: ICallback, context?: unknown): this;

    public abstract once(name: string, callback: ICallback, context?: unknown): this;

    public abstract off(name: string, callback: ICallback, context?: unknown): this;

    public abstract emit(name: string, ...args: unknown[]): void;

    public abstract removeListenersOf(context: unknown): void;
}
