import * as React from "react";
import { IPost } from "types/IPost";
import styles from "@styles/home/PostCard.module.scss";
import { PostImageCarousel } from "./PostImageCarousel";
import { PostHeader } from "./PostHeader";
import { PostActions } from "./PostActions";
import { PostLikes } from "./PostLikes";

interface PostCardProps {
  readonly post: IPost;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [currentImage, setCurrentImage] = React.useState(0);
  return (
    <div className={styles.container}>
      <PostHeader post={post} />

      <PostImageCarousel
        images={post.images}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
      />

      <PostActions post={post} currentImage={currentImage} />

      <PostLikes post={post} />
      <div className={styles.bottom}></div>
    </div>
  );
};
