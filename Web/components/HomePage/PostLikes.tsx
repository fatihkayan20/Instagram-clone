import { LoadingIndicator } from "@components/shared/LoadingIndicator";
import { Modal } from "@components/shared/Modal";
import { UserFollowCard } from "@components/user/UserFollowCard";
import { useGetPostLikesQuery } from "queries/post";
import * as React from "react";
import { IPost } from "types/IPost";

interface PostLikesProps {
  readonly post: IPost;
}

export const PostLikes: React.FC<PostLikesProps> = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(1);

  const { data, isLoading } = useGetPostLikesQuery(post.id, page, {
    enabled: isModalOpen,
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  React.useEffect(() => {
    if (isModalOpen) {
      setPage(1);
    }
  }, [isModalOpen]);

  return (
    <>
      <button onClick={toggleModal}>{post.likeCount} likes</button>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        {data?.likes?.map((like, index) => (
          <UserFollowCard key={index} user={like.user} />
        ))}
        {isLoading && <LoadingIndicator type={"spinner"} />}
      </Modal>
    </>
  );
};
