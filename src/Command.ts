import { lego } from './index';
import { ICommand, IGuard } from './Types';

export class Command {
  private _guards: IGuard[] = [];
  private _payloads: any[] = [];

  public on(event: string, command: ICommand): this {
    lego.event.on(event, this._getEventCallback(command));

    return this;
  }

  public once(event: string, command: ICommand): this {
    lego.event.once(event, this._getEventCallback(command));

    return this;
  }

  public off(event: string, command: ICommand): this {
    const ll = lego.event.getListeners(event);

    // @ts-ignore
    const found = ll.find(l => l.callback.__command === command);
    if (!found) {
      return this;
    }

    lego.event.off(event, found.callback);

    return this;
  }

  public execute(...commands: ICommand[]): this {
    const { _guards, _payloads } = this;

    const passed = !_guards.length || !_guards.find(guard => !guard.apply(undefined, _payloads));
    if (passed) {
      for (const c of commands) {
        this._execute(c, ..._payloads);
      }
    } else {
      this._resetGuardsAndPayloads();
    }

    return this;
  }

  public payload(...args: any[]): this {
    this._payloads = args;

    return this;
  }

  public guard(...args: any[]): this {
    this._guards = args;

    return this;
  }

  private _execute(command: ICommand, ...args: any[]): void {
    this._resetGuardsAndPayloads();
    command.apply(undefined, args);
  }

  private _resetGuardsAndPayloads() {
    this.guard().payload();
  }

  private _getEventCallback(command: ICommand): any {
    return Object.defineProperties(this._execute.bind(this, command), {
      __command: { value: command },
    });
  }
}
