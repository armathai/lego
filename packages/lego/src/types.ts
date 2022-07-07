/* eslint-disable @typescript-eslint/no-explicit-any */

export type ICommand = (...args: any[]) => void;

export type IGuard = (...args: any[]) => boolean;

export type ICallback = (...args: any[]) => void;

export interface IAbstractLego {
    readonly observe: IAbstractObserve;
    readonly event: IAbstractEmitter;
    readonly command: IAbstractCommand;
}

export interface IAbstractCommand {
    on(event: string, command: ICommand): this;
    once(event: string, command: ICommand): this;
    off(event: string, command: ICommand): this;
    execute(command: ICommand): this;
    executeAsync(command: ICommand): Promise<this>;
    payload(...args: unknown[]): this;
    guard(...args: unknown[]): this;
}

type EventEmitterType = import('eventemitter3');
export interface IAbstractEmitter extends EventEmitterType {
    removeListenersOf(context: unknown): void;
}

export interface IAbstractObserve {
    makeObservable(obj: unknown, ...props: string[]): void;
    removeObservable(obj: unknown, ...props: string[]): void;
    createObservable(obj: unknown, prop: string, value: unknown): void;
}

export interface IDebugConfig {
    debugEvents?: boolean;
    debugCommand?: boolean;
    debugGuards?: boolean;
    debugEventArguments?: boolean;
    debugRedundantEventFlag?: boolean;
    fontSize?: number;
    excludedEvents?: string[];
    padding?: number;
    fontFamily?: string;
}
