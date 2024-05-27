import Sequence, { type PromiseHandler } from 'wing-sequence';
import { IAppender } from '../../shared/src/index';

export type ExecuteHandler = (value: string) => Promise<boolean>;

export class FileAppender implements IAppender {
  private sequence: Sequence<PromiseHandler<boolean>>;
  private executeHandler: ExecuteHandler;
  constructor(executeHandler: ExecuteHandler) {
    this.sequence = new Sequence<PromiseHandler<boolean>>();
    this.executeHandler = executeHandler;
  }
  execute(...args: any[]): void {
    const value = args.join(',');
    this.sequence.push((flag: boolean) => {
      return new Promise(async (resolve) => resolve(flag && (await this.executeHandler(value))));
    });
  }
}
