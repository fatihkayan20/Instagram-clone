import { Result } from './Result';

export class ErrorDataResult<T> extends Result {
  constructor(public readonly data: T, public readonly message?: string) {
    super(false, data, message);
  }
}
