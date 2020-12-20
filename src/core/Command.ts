/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AbstractLego } from '../AbstractLego';
import { ICallback, ICommand, IGuard } from '../Types';
import { AbstractCommand } from './AbstractCommand';

export class Command extends AbstractCommand {
    private _lego: AbstractLego;
    private _guards: IGuard[] = [];
    private _payloads: unknown[] = [];

    public constructor(lego: AbstractLego) {
        super();
        this._lego = lego;
    }

    public on(event: string, command: ICommand): this {
        this._lego.event.on(event, this._getEventCallback(command));
        return this;
    }

    public once(event: string, command: ICommand): this {
        this._lego.event.once(event, this._getEventCallback(command));
        return this;
    }

    public off(event: string, command: ICommand): this {
        const ll = this._lego.event.getListeners(event);

        // @ts-ignore
        const found = ll.find((l) => l.callback.__command === command);
        if (!found) {
            return this;
        }

        this._lego.event.off(event, found.callback);

        return this;
    }

    public execute(...commands: ICommand[]): this {
        const { _guards: guards, _payloads: payloads } = this;

        const passed = !guards.length || !guards.find((guard) => !guard.call(undefined, ...payloads));
        if (passed) {
            for (const c of commands) {
                this._execute(c, ...payloads);
            }
        } else {
            this._resetGuardsAndPayloads();
        }

        return this;
    }

    public payload(...args: unknown[]): this {
        this._payloads = args;

        return this;
    }

    public guard(...args: IGuard[]): this {
        this._guards = args;
        return this;
    }

    private _execute(command: ICommand, ...args: unknown[]): void {
        this._resetGuardsAndPayloads();
        command.call(undefined, ...args);
    }

    private _resetGuardsAndPayloads(): void {
        this.guard().payload();
    }

    private _getEventCallback(command: ICommand): ICallback {
        return Object.defineProperties(this._execute.bind(this, command), {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            __command: { value: command },
        });
    }
}
