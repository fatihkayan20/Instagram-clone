import { ILike } from "./ILike";

export interface ILikeResponse {
  readonly likes: ILike[];
  readonly hasNext: boolean;
}
