import { Command } from './command';
import { Emitter } from './emitter';
import { Observe } from './observe';
import { IAbstractCommand, IAbstractEmitter, IAbstractLego, IAbstractObserve } from './types';

export class Lego implements IAbstractLego {
    public readonly observe: IAbstractObserve;
    public readonly event: IAbstractEmitter;
    public readonly command: IAbstractCommand;

    public constructor() {
        this.event = new Emitter(this);
        this.command = new Command(this);
        this.observe = new Observe(this);
    }

    public not(fn: (...args: unknown[]) => boolean): (...args: unknown[]) => boolean {
        return (...args) => !fn(...args);
    }
}
