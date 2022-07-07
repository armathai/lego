/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Lego } from './lego';
import { IAbstractCommand, IAbstractEmitter, ICommand, IDebugConfig, IGuard } from './types';

export class Logger {
    private _event!: IAbstractEmitter;
    private _command!: IAbstractCommand;
    private _config!: IDebugConfig;
    private _gap = 0;

    public start(lego: Lego, debugConfig?: IDebugConfig): void {
        const { event, command } = lego;
        this._event = event;
        this._command = command;
        this._config = this._getConfig(debugConfig);

        this._patchEvents()._patchCommands()._patchNot(lego);
    }

    private _patchNot(lego: { not: (fn: (...args: unknown[]) => boolean) => (...args: unknown[]) => boolean }): this {
        const patchNot = (fn: (...args: unknown[]) => boolean): ((...args: unknown[]) => boolean) => {
            const wrappedFn = (...args: unknown[]): boolean => {
                return !fn(...args);
            };

            const wrappedFnDescriptor = Object.getOwnPropertyDescriptor(wrappedFn, 'name') as PropertyDescriptor;

            if (!wrappedFnDescriptor.configurable) {
                return wrappedFn;
            }

            const upperCaseName = fn.name.charAt(0).toUpperCase() + fn.name.slice(1);

            Object.defineProperties(wrappedFn, {
                name: { value: `not${upperCaseName}` },
            });

            return wrappedFn;
        };

        lego.not = patchNot;

        return this;
    }

    private _patchEvents(): this {
        const originalEmit = this._event.emit.bind(this._event);
        const { debugEvents, excludedEvents } = this._config;

        if (debugEvents) {
            // @ts-ignore
            this._event.emit = (name: string, ...args: unknown[]) => {
                if (excludedEvents?.length && excludedEvents.indexOf(name) !== -1) {
                    return originalEmit(name, ...args);
                }

                this._gap += 1;
                this._debugEmit(name, ...args);
                const emitResult = originalEmit(name, ...args);
                this._gap -= 1;

                return emitResult;
            };
        }

        return this;
    }

    private _patchCommands(): this {
        const { debugCommand, debugGuards } = this._config;

        if (debugCommand) {
            const originalExecute = this._command.execute.bind(this._command);
            this._command.execute = (command: ICommand) => {
                // @ts-ignore
                const guards = this._command._guards;
                // @ts-ignore
                const payloads = this._command._payloads;

                if (debugGuards && guards.length) {
                    this._gap += 1;
                    this._debugGuards(command, guards, payloads);
                    this._gap -= 1;
                } else {
                    this._gap += 1;
                    this._debugCommand(command);
                    this._gap -= 1;
                }

                return originalExecute(command);
            };

            const originalAsyncExecute = this._command.executeAsync.bind(this._command);
            this._command.executeAsync = (command: ICommand) => {
                // @ts-ignore
                const guards = this._command._guards;
                // @ts-ignore
                const payloads = this._command._payloads;

                if (debugGuards && guards.length) {
                    this._gap += 1;
                    this._debugGuards(command, guards, payloads);
                    this._gap -= 1;
                } else {
                    this._gap += 1;
                    this._debugCommand(command);
                    this._gap -= 1;
                }

                return originalAsyncExecute(command);
            };
        }

        return this;
    }

    private _getStyle(background: string, color: string): string {
        const { fontSize, padding, fontFamily } = this._config;
        return `background: ${background}; color: ${color}; font-size: ${fontSize}px; font-family: "${fontFamily}"; font-weight: bold; padding: ${padding}px;`;
    }

    private _debugEmit(event: string, ...args: unknown[]): void {
        const { debugEventArguments, debugRedundantEventFlag } = this._config;

        const logStyle = [this._getStyle('#C3E6CB', '#000000')];

        let message = `${this._getSpace()}%c ${event} `;

        if (debugEventArguments && args.length > 0) {
            logStyle.push(this._getStyle('#BDE5EB', '#000000'));
            const argsMsg = args.reduce((msg, arg: unknown, index) => {
                logStyle.push(this._getStyle(index % 2 === 0 ? '#FDFDFE' : '#C6C8CA', '#000000'));
                return (msg += `%c  ${arg} `);
            }, '');
            message += `%c  \u21E8  ${argsMsg}`;
        }

        if (debugRedundantEventFlag) {
            const listeners = this._event.listeners(event);
            if (listeners.length === 0) {
                logStyle.push(this._getStyle('#FFEEBA', '#000000'));
                message += `%c ⚠️`;
            }
        }

        this._log(message, ...logStyle);
    }

    private async _debugGuards(command: ICommand, guards: IGuard[], payloads: unknown[]): Promise<void> {
        const notPassedGuard = guards.find((guard) => !guard.call(undefined, ...payloads));
        const passed = !notPassedGuard;

        const logStyle = [this._getStyle('#D6D8DB', '#000000')];
        let message = `${this._getSpace()}%c ${command.name} `;
        for (const guard of guards) {
            logStyle.push(this._getStyle('#FDFDFE', '#000000'));
            message += `%c ${guard.name} `;
            if (guard === notPassedGuard) {
                message += ` 🛑 `;
                break;
            } else {
                message += ` ✅ `;
            }
        }
        if (!passed) {
            logStyle[0] = logStyle[0] + ' text-decoration: line-through;';
        }
        this._log(message, ...logStyle);
    }

    private _debugCommand(command: ICommand): void {
        this._log(`${this._getSpace()}%c ${command.name} `, this._getStyle('#B8DAFF', '#000000'));
    }

    private _getSpace(): string {
        return this._gap === 0 ? '' : ' '.repeat(this._gap - 1);
    }

    private _log(value: string, ...args: unknown[]): void {
        console.log(value, ...args);
    }

    private _getConfig(rawConfig?: IDebugConfig): IDebugConfig {
        const defaults = {
            debugGuards: true,
            debugCommand: true,
            debugEventArguments: true,
            debugRedundantEventFlag: true,
            debugEvents: true,
            fontSize: 12,
            excludedEvents: [''],
            padding: 1,
            fontFamily: 'Arial',
        };

        return Object.assign(defaults, rawConfig);
    }
}
