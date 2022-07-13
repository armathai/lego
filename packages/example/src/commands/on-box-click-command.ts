import { lego } from '@armathai/lego';
import { store } from '../models/store-model';
import { updateBoxColorCommand } from './update-box-color-command';

export const onBoxClickCommand = (index: number): void => {
    const color = store.boardModel.boxes[index].color;

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
