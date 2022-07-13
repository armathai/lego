import { lego } from '@armathai/lego';
import { onBoxClickCommand } from './on-box-click-command';

export const startupCommand = async (): Promise<void> => {
    lego.command.on('box_click', onBoxClickCommand);
};
