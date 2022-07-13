import { BoardView } from '../views/board-view';
import { BoardModel } from './board-model';

class StoreModel {
    public boardModel: BoardModel;
    public boardView: BoardView;
}

export const store = new StoreModel();
