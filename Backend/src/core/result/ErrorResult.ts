import { Result } from './Result';
export class ErrorResult<T> extends Result {
  constructor(public readonly message?: string) {
    super(false, undefined, message);
  }
}
