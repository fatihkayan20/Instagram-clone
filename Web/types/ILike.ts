import { IUser } from "./IUser";

export interface ILike {
  readonly id: string;
  readonly postId: string;
  readonly user: IUser;
}
