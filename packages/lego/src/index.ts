import { Lego } from './lego';
import { Logger } from './logger';

export const lego = new Lego();
export const legoLogger = new Logger();

export { ICallback, ICommand, IDebugConfig, IGuard } from './types';
