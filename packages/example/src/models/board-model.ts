import { BoxModel } from './box-model';

export class BoardModel {
    public boxes: BoxModel[] = [];

    public constructor() {
        //
    }

    public addBox(box: BoxModel): void {
        this.boxes.push(box);
    }
}
