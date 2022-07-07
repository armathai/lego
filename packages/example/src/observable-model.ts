import { lego } from '@armathai/lego';

export class ObservableModel {
    public uuid: number;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    private __name__ = 'BoxModel';

    public constructor(name: string, uuid: number) {
        this.__name__ = name;
        this.uuid = uuid;
    }

    public makeObservable(...properties: string[]): void {
        lego.observe.makeObservable(this, ...properties);
    }

    public createObservable(property: string, value: unknown): void {
        lego.observe.createObservable(this, property, value);
    }

    public removeObservable(...properties: string[]): void {
        lego.observe.removeObservable(this, ...properties);
    }
}
