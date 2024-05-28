import Sequence, { PromiseHandler } from 'wing-sequence';

export interface IAppender {
  execute(...args: any[]): void;
}

export type ExecuteHandler = (value: string) => Promise<boolean>;

export class Appender implements IAppender {
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
