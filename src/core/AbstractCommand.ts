import { ICommand } from '../Types';

export abstract class AbstractCommand {
    public abstract on(event: string, command: ICommand): this;

    public abstract once(event: string, command: ICommand): this;

    public abstract off(event: string, command: ICommand): this;

    public abstract execute(...commands: ICommand[]): this;

    public abstract payload(...args: unknown[]): this;

    public abstract guard(...args: unknown[]): this;
}
