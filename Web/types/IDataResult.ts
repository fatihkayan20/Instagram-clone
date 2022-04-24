import { IResult } from "./IResult";

export interface IDataResult<TData> extends IResult {
  readonly data: TData;
}
