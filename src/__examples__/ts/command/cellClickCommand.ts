import { lego } from '../../..';
import { not } from '../utils/utils';
import { cellAliveGuard } from './guards/cellAliveGuard';
import { updateScoreCommand } from './player/updateScoreCommand';
import { removeCellCommand } from './removeCellCommand';
import { updateCellHealthCommand } from './updateCellHealthCommand';

export function cellClickCommand(cellUUID: string): void {
  lego.command
    .payload(cellUUID)
    .execute(updateCellHealthCommand)

    .payload(1)
    .execute(updateScoreCommand)

    .payload(cellUUID, 4)
    .guard(not(cellAliveGuard))
    .execute(removeCellCommand);
}
