import { Result } from './Result';

export class SuccessResult extends Result {
  constructor(public readonly message?: string) {
    super(true, undefined, message);
  }
}
