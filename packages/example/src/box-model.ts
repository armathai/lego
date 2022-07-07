import { ObservableModel } from './observable-model';

export class BoxModel extends ObservableModel {
    public color: string;

    public constructor(index: number) {
        super('BoxModel', index);

        this.makeObservable('color');
    }

    public initialize(): void {
        this.color = '#4d8f24';
    }
}
