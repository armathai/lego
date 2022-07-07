import { lego, legoLogger } from '@armathai/lego';
import { BoardModel } from './board-model';
import { BoardView } from './board-view';
import { BoxModel } from './box-model';
import { BoxView } from './box-view';

legoLogger.start(lego, {
    excludedEvents: [],
});

const updateBoxColorCommand = (index: number, color: string): void => {
    const boxModel = boardModel.boxes[index];
    boxModel.color = color;
};

const onBoxClickCommand = (index: number): void => {
    const color = boardModel.boxes[index].color;

    lego.command
        //
        .guard(() => color === '#ffffff')
        .payload(index, '#4d8f24')
        .execute(updateBoxColorCommand);

    lego.command
        //
        .guard(lego.not(() => color === '#ffffff'))
        .payload(index, '#ffffff')
        .execute(updateBoxColorCommand);
};

const startupCommand = async (): Promise<void> => {
    lego.command.on('box_click', onBoxClickCommand);
};

lego.command.execute(startupCommand);

let boardModel: BoardModel;
let boardView: BoardView;

new (class {
    public constructor() {
        boardModel = new BoardModel();
        boardView = new BoardView();

        for (let i = 0; i < 10; i++) {
            const boxModel = new BoxModel(i);
            const boxView = new BoxView(i);

            boardModel.addBox(boxModel);
            boardView.addBox(boxView);

            boxView.view.onclick = () => {
                lego.event.emit('box_click', i);
            };
        }

        boardModel.boxes.forEach((box) => box.initialize());
    }
})();
