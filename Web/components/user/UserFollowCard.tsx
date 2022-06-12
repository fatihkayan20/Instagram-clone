import * as React from "react";
import { IUser } from "types/IUser";
import styles from "@styles/user/UserFollowCard.module.scss";
import Image from "next/image";

interface UserFollowCardProps {
  readonly user: IUser;
}

export const UserFollowCard: React.FC<UserFollowCardProps> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div className={styles.card}>
      <div className={styles.card__avatar}>
        <Image
          src={
            user.profileUrl?.url ??
            "https://instagram.fadb2-2.fna.fbcdn.net/v/t51.2885-19/278674079_363363892473476_4692092504744710756_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fadb2-2.fna.fbcdn.net&_nc_cat=108&_nc_ohc=1aq3l7Es6GUAX-xovPp&edm=AEF8tYYBAAAA&ccb=7-5&oh=00_AT8QkPBOdkt0Emiqrk76u01fKqKHqsClHu-yi4FyNCrU_w&oe=62AD36BD&_nc_sid=a9513d"
          }
          layout="fill"
          objectFit="contain"
          alt="user profile"
          draggable={false}
        />
      </div>
      <div className={styles.card__user}>
        <span className={styles.card__user__name}>{user.username}</span>
      </div>

      {!user.isOwnUser && (
        <button className={styles.card__button}>
          {user.isFollowing ? "Following" : "Follow"}
        </button>
      )}
    </div>
  );
};
