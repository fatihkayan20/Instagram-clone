import { Result } from './Result';
export class ErrorResult extends Result {
  constructor(public readonly message?: string) {
    super(false, undefined, message);
  }
}
