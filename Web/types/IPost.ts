import { IImage } from "./IImage";
import { IUser } from "./IUser";

export interface IPost {
  readonly id: string;
  readonly user: IUser;
  readonly images: IImage[];
  readonly likeCount: number;
  readonly commentCount: number;
  readonly description: string;
  readonly isLiked: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
