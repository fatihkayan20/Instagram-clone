import * as React from "react";
import { IPost } from "types/IPost";
import styles from "@styles/home/PostCard.module.scss";
import Image from "next/image";

interface PostCardProps {
  readonly post: IPost;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}></div>
      {post.images?.map((image) => (
        <Image
          key={image.id}
          src={image.url}
          layout="responsive"
          width={500}
          height={500}
          alt="post"
        />
      ))}

      <div className={styles.bottom}></div>
    </div>
  );
};
