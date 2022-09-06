import EventEmitter, { ListenerFn } from 'eventemitter3';
import { IAbstractEmitter, IAbstractLego } from './types';

type EE = { fn: ListenerFn; context: unknown; once: boolean };

export class Emitter extends EventEmitter implements IAbstractEmitter {
    public constructor(private _lego: IAbstractLego) {
        super();
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
