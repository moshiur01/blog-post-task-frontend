/* eslint-disable react-hooks/exhaustive-deps */
import BlogPostCard from "@/components/UI/BlogPostCard";
import RootLayout from "@/components/layout/RootLayout";
import { useState } from "react";

const BlogPostByCategory = ({ posts }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
      <div className="text-3xl font-bold p-4 text-center">
        <h1 className="border-b-4 border-black  p-2">Author Wise Blog Posts</h1>
      </div>
      <div className="mt-8">
        <BlogPostCard blogPosts={posts?.data} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default BlogPostByCategory;

BlogPostByCategory.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getServerSideProps = async (context) => {
  const { params } = context;
  const res = await fetch(
    `https://blog-post-backend.vercel.app/api/v1/blogPosts?userId=${params.authorId}`
  );
  const data = await res.json();

  console.log(data);
  return {
    props: {
      posts: data?.data,
    },
  };
};
