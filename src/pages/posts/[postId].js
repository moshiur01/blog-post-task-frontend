import RootLayout from "@/components/layout/RootLayout";
import axios from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { RiProfileLine } from "react-icons/ri";

import Comments from "@/components/UI/Comments";
import auth from "@/firebase/firebaase.auth";
import { useAuthState } from "react-firebase-hooks/auth";

const PostDetails = ({ post }) => {
  const [user] = useAuthState(auth);

  //handle tabs
  const [activeTab, setActiveTab] = useState("reviews");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="sm:m-4">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-center">
        {/* Image column */}
        <div className="">
          <Image
            src={post?.img}
            alt="Blog post image"
            width={500}
            height={500}
            className="w-full h-auto"
          />
        </div>

        {/* Body column */}
        <div className="my-7">
          <div>
            <h1 className="text-3xl font-bold">{post?.title}</h1>
            <div className="flex items-center gap-4 font-bold my-3">
              <RiProfileLine /> {post?.user?.name}
            </div>
            <hr className="w-full h-2 bg-black border-0 mb-4" />

            <div className="flex gap-4 mb-3">
              <div className="flex items-center gap-2">
                <MdDateRange className="" />
                <span className="text-gray-600">
                  {dayjs(post?.createdAt)?.format("MMM D, YYYY")}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FaRegComment />
                <span className="text-gray-600">{post?.comments?.length}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <BiCategoryAlt />
                <span className="text-gray-600">{post?.category?.name}</span>
              </div>
            </div>
            <p className="text-xl scroll-auto">{post?.description}</p>
          </div>
        </div>
      </div>

      {/* Comments section */}
      <Comments postId={post?.id} comments={post.comments} />
    </div>
  );
};

export default PostDetails;

PostDetails.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getServerSideProps = async (context) => {
  const { params } = context;

  const res = await axios.get(
    `https://blog-post-backend.vercel.app/api/v1/blogPosts/${params.postId}`
  );

  return {
    props: {
      post: res?.data?.data,
    },
  };
};
