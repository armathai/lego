/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AbstractLego } from '../AbstractLego';
import { AbstractObserve } from './AbstractObserve';

function adjustEventName(str: string): string {
    const clean = str.replace(/[^0-9a-z-A-Z]/g, '').replace(/ +/, ' ');

    return `${clean.charAt(0).toUpperCase()}${clean.slice(1)}`;
}

export class Observe extends AbstractObserve {
    private _lego: AbstractLego;

    public constructor(lego: AbstractLego) {
        super();
        this._lego = lego;
    }

    public makeObservable(obj: unknown & { uuid: unknown }, ...props: string[]): void {
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

    public removeObservable(obj: unknown, ...props: string[]): void {
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

    public createObservable(obj: unknown & { uuid: unknown }, prop: string, value: unknown): void {
        //@ts-ignore
        const eventName = `${obj.__name__}${adjustEventName(prop)}Update`;
        let oldValue = value;
        let newValue = oldValue;

        Object.defineProperty(obj, prop, {
            configurable: true,
            enumerable: true,
            get: () => {
                return newValue;
            },
            set: (val: unknown) => {
                if (val === newValue) {
                    return;
                }

                oldValue = newValue;
                newValue = val;

                this._lego.event.emit(eventName, newValue, oldValue, obj.uuid);
            },
        });
    }
}
