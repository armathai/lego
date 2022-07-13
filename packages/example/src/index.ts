import { lego, legoLogger } from '@armathai/lego';
import { startupCommand } from './commands/startup-command';
import { BoardModel } from './models/board-model';
import { BoxModel } from './models/box-model';
import { store } from './models/store-model';
import { BoardView } from './views/board-view';
import { BoxView } from './views/box-view';

legoLogger.start(lego, {
    excludedEvents: [],
});

lego.command.execute(startupCommand);

new (class {
    public constructor() {
        store.boardModel = new BoardModel();
        store.boardView = new BoardView();

        for (let i = 0; i < 10; i++) {
            const boxModel = new BoxModel(i);
            const boxView = new BoxView(i);

            store.boardModel.addBox(boxModel);
            store.boardView.addBox(boxView);

            boxView.view.onclick = () => {
                lego.event.emit('box_click', i);
            };
        }

        store.boardModel.boxes.forEach((box) => box.initialize());
    }
})();
