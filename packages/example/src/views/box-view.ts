export class BoxView {
    public view: HTMLDivElement;
    public index: number;

    public constructor(index: number) {
        this.index = index;

        this._createView();
    }

    public updateColor(color: string): void {
        this.view.style.backgroundColor = color;
    }

    private _createView(): void {
        this.view = document.createElement('div');
        this.view.classList.add('box');
    }
}
