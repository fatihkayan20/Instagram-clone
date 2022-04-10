import { Result } from './Result';
export class SuccessDataResult<T> extends Result {
  constructor(public readonly data: T, public readonly message?: string) {
    super(true, data, message);
  }
}
