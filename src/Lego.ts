import { Command } from './Command';
import { Emitter } from './Emitter';
import { Observe } from './Observe';

export class Lego {
  public readonly observe: Observe = new Observe();
  public readonly event: Emitter = new Emitter();
  public readonly command: Command = new Command();
}
