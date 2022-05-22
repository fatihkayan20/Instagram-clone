import Image from "next/image";
import * as React from "react";
import { IPost } from "types/IPost";
import { PostActionModal } from "./PostActionModal";
import styles from "@styles/home/PostHeader.module.scss";

interface PostHeaderProps {
  readonly post: IPost;
}

export const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  if (!post) {
    return null;
  }

  return (
    <div className={styles.header}>
      <div className={styles.user}>
        <div className={styles.user__avatar}>
          <Image
            src={
              post.user.profileUrl?.url ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            layout="fill"
            alt="user avatar"
          />
        </div>
        <span>{post.user.username}</span>
      </div>

      <PostActionModal />
    </div>
  );
};
