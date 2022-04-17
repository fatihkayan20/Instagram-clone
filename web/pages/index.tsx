import * as React from "react";
import styles from "@styles/home/Home.module.scss";
import { dehydrate } from "react-query";
import { GetServerSideProps } from "next";
import { getPrefetchPostsQuery, useGetPostQuery } from "queries/post";
import { PostCard } from "@components/HomePage/PostCard";

const HomePage = () => {
  const { data: posts } = useGetPostQuery();

  return (
    <div>
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = await getPrefetchPostsQuery();
  return { props: { dehydratedState: dehydrate(queryClient) } };
};
