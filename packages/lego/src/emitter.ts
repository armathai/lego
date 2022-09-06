import EventEmitter, { ListenerFn } from 'eventemitter3';
import { IAbstractEmitter, IAbstractLego } from './types';

type EE = { fn: ListenerFn; context: unknown; once: boolean };

export class Emitter extends EventEmitter implements IAbstractEmitter {
    public constructor(private _lego: IAbstractLego) {
        super();
    }

    public on(event: string | symbol, fn: (...args: unknown[]) => void | Promise<void>, context?: unknown): this {
        return super.on(event, fn, context);
    }

    public once(event: string | symbol, fn: (...args: unknown[]) => void | Promise<void>, context?: unknown): this {
        return super.once(event, fn, context);
    }

    public off(
        event: string | symbol,
        fn?: ((...args: unknown[]) => void | Promise<void>) | undefined,
        context?: unknown,
        once?: boolean | undefined
    ): this {
        return super.off(event, fn, context, once);
    }

    /* eslint-disable @typescript-eslint/ban-ts-comment */
    public removeListenersOf(_context: unknown): void {
        // @ts-ignore
        const events: Record<string, EE | EE[]> = this._events;

        Object.keys(events).forEach((event) => {
            const entry = events[event];
            const ee: EE[] = Array.isArray(entry) ? entry : [entry];

            ee.forEach(({ context, fn, once }) => {
                if (context === _context) {
                    this.removeListener(event, fn, context, once);
                }
            });
        });
    }
}
