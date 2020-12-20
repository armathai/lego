export abstract class AbstractObserve {
    public abstract makeObservable(obj: unknown, ...props: string[]): void;

    public abstract removeObservable(obj: unknown, ...props: string[]): void;

    public abstract createObservable(obj: unknown, prop: string, value: unknown): void;
}
