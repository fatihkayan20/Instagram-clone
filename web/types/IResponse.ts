export interface IResponse<TData> {
  readonly data: TData;
  readonly success: boolean;
  readonly message: string;
}
