import { IAbstractCommand, IAbstractLego, ICommand, IGuard } from './types';

export class Command implements IAbstractCommand {
    private _guards: IGuard[] = [];
    private _payloads: unknown[] = [];

    public constructor(private _lego: IAbstractLego) {
        //
    }

    public on(event: string, command: ICommand): this {
        this._lego.event.on(event, command);

        return this;
    }

    public once(event: string, command: ICommand): this {
        this._lego.event.once(event, command);

        return this;
    }

    public off(event: string, command: ICommand): this {
        this._lego.event.off(event, command);

        return this;
    }

    public execute(command: ICommand): this {
        const { _guards: guards, _payloads: payloads } = this;

        const passed = !guards.length || !guards.find((guard) => !guard(...payloads));

        if (passed) {
            this._resetGuardsAndPayloads();
            this._payloads = [command(...payloads)];
        } else {
            this._resetGuardsAndPayloads();
        }

        return this;
    }

    public async executeAsync(command: ICommand): Promise<this> {
        const { _guards: guards, _payloads: payloads } = this;

        const passed = !guards.length || !guards.find((guard) => !guard(...payloads));

        if (passed) {
            this._resetGuardsAndPayloads();
            this._payloads = [await command(...this._payloads)];
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

    private _resetGuardsAndPayloads(): void {
        this._guards = [];
        this._payloads = [];
    }
}
