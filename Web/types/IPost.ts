import { IImage } from "./IImage";

export interface IPost {
  readonly id: string;
  readonly description: string;
  readonly images: IImage[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
