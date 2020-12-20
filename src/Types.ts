/* eslint-disable @typescript-eslint/no-explicit-any */
export type ICommand = (...args: any[]) => void;

export type IGuard = (...args: any[]) => boolean;

export type ICallback = (...args: any[]) => void;

export interface IListener {
    callback: ICallback;
    context?: unknown;
    once: boolean;
}
