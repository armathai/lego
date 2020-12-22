import { AbstractLego } from './AbstractLego';
import { AbstractCommand } from './core/AbstractCommand';
import { AbstractEmitter } from './core/AbstractEmitter';
import { AbstractObserve } from './core/AbstractObserve';
import { Command } from './core/Command';
import { Emitter } from './core/Emitter';
import { Observe } from './core/Observe';

class Lego implements AbstractLego {
    private readonly _observe: AbstractObserve;
    private readonly _event: AbstractEmitter;
    private readonly _command: AbstractCommand;

    public constructor() {
        this._observe = new Observe(this);
        this._event = new Emitter();
        this._command = new Command(this);
    }

    public not(fn: (...args: unknown[]) => boolean): (...args: unknown[]) => boolean {
        return (...args) => !fn(...args);
    }

    public get observe(): AbstractObserve {
        return this._observe;
    }

    public get event(): AbstractEmitter {
        return this._event;
    }

    public get command(): AbstractCommand {
        return this._command;
    }
}

export const lego = new Lego();
