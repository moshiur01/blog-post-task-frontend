import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
const BlogPostCard = ({ blogPosts }) => {
  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4 justify-items-center">
      {blogPosts?.map((post) => (
        <div key={post?.id} className="card w-full bg-base-100 shadow-xl">
          <figure className="overflow-hidden">
            <Image
              src={post?.img}
              alt="blog post img"
              layout="responsive"
              width={300}
              height={200}
            />
          </figure>
          <div className="card-body p-4">
            <h2 className="card-title text-lg font-semibold mb-2">
              {post?.title}
            </h2>
            <hr className="w-full h-2 bg-black border-0 mb-4" />
            <div className="flex justify-between gap-4">
              <div className="flex items-center gap-2 text-sm">
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
            <p className="mt-4 text-sm text-gray-700">
              {post?.description.length > 100
                ? post?.description.slice(0, 70) + "... read"
                : post?.description}
            </p>
            <Link href={"/"}>
              <button className="btn btn-active mt-4">Read More</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogPostCard;
