import { lego } from '../../..';
import { ViewEvents } from '../view/ViewEvents';
import { cellClickCommand } from './cellClickCommand';
import { gameSceneReadyCommand } from './gameSceneReadyCommand';
import { loadCompleteCommand } from './loadCompleteCommand';

export function startupCommand(): void {
  lego.command
    .map(ViewEvents.Load.Complete, loadCompleteCommand)
    .map(ViewEvents.GameScene.Ready, gameSceneReadyCommand)
    .map(ViewEvents.CellView.Click, cellClickCommand);
}
