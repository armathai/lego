import { lego } from '../../..';
import { ViewEvents } from '../view/ViewEvents';
import { cellClickCommand } from './cellClickCommand';
import { gameSceneReadyCommand } from './gameSceneReadyCommand';
import { loadCompleteCommand } from './loadCompleteCommand';

export function startupCommand(): void {
  lego.command
    .once(ViewEvents.Load.Complete, loadCompleteCommand)
    .once(ViewEvents.GameScene.Ready, gameSceneReadyCommand)
    .on(ViewEvents.CellView.Click, cellClickCommand);
}
