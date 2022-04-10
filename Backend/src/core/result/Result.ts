export class Result {
  constructor(
    public readonly success: boolean,
    public readonly data?: any,
    public readonly message?: string,
  ) {}
}
