import * as React from "react";
import { IPost } from "types/IPost";

interface PostLikesProps {
  readonly post: IPost;
}

export const PostLikes: React.FC<PostLikesProps> = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return <div></div>;
};
