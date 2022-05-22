import * as React from "react";
import styles from "@styles/home/PostActions.module.scss";
import { IPost } from "types/IPost";
import HeartPassive from "@/public/Heart-passive.svg";
import HeartActive from "@/public/Heart-active-red.svg";
import Comment from "@/public/Comment.svg";
import SharePost from "@/public/Share-post.svg";
import SavePost from "@/public/Save-post.svg";
import Image from "next/image";

interface PostActionsProps {
  readonly post: IPost;
  readonly currentImage: number;
}

export const PostActions: React.FC<PostActionsProps> = ({
  post,
  currentImage,
}) => {
  const leftIcons = React.useMemo(
    () => [
      {
        name: "Like post",
        icon: post.isLiked ? HeartActive : HeartPassive,
      },
      {
        name: "Comment",
        icon: Comment,
      },
      {
        name: "Share post",
        icon: SharePost,
      },
    ],
    [post.isLiked]
  );

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {leftIcons.map((icon, index) => (
          <button
            key={icon.name}
            className={[
              styles.icon,
              index === leftIcons.length - 1 ? styles.last__child : "",
            ].join(" ")}
          >
            <Image src={icon.icon} alt={icon.name} layout="fill" />
          </button>
        ))}
      </div>

      <div className={styles.dots}>
        {post.images?.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${
              index === currentImage ? styles.active : ""
            }`}
          />
        ))}
      </div>
      <div className={styles.right}>
        <button className={[styles.icon, styles.last__child].join(" ")}>
          <Image src={SavePost} alt={"Save Post"} layout="fill" />
        </button>
      </div>
    </div>
  );
};
