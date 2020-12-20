import { AbstractCommand } from './core/AbstractCommand';
import { AbstractEmitter } from './core/AbstractEmitter';
import { AbstractObserve } from './core/AbstractObserve';

export interface AbstractLego {
    readonly observe: AbstractObserve;
    readonly event: AbstractEmitter;
    readonly command: AbstractCommand;
}
