import { lego } from '@armathai/lego';
import { BoxView } from './box-view';

export class BoardView {
    public view: HTMLDivElement;
    public boxes: BoxView[] = [];

    public constructor() {
        lego.event.on('BoxModelColorUpdate', this._onBoxColorUpdate, this);

        this._createView();
    }

    public addBox(box: BoxView): void {
        this.boxes.push(box);
        this.view.appendChild(box.view);
    }

    private _onBoxColorUpdate(color: string, oldColor: string, uuid: string): void {
        this.boxes[uuid].updateColor(color);
    }

    private _createView(): void {
        this.view = document.createElement('div');
        this.view.classList.add('board');
        document.body.appendChild(this.view);
    }
}
