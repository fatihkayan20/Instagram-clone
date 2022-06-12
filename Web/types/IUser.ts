export interface IUser {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly profileUrl: {
    readonly url: string;
  };
  readonly isFollowing?: boolean;
  readonly isOwnUser?: boolean;
}
