import { Result } from './Result';

export class SuccessResult<T> extends Result {
  constructor(public readonly message?: string) {
    super(true, undefined, message);
  }
}
