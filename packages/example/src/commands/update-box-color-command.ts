import { store } from '../models/store-model';

export const updateBoxColorCommand = (index: number, color: string): void => {
    const boxModel = store.boardModel.boxes[index];
    boxModel.color = color;
};
