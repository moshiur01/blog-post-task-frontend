import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import Loading from "./Loading";
const BlogPostCard = ({ blogPosts, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : blogPosts?.length === 0 ? (
        <div>
          <p className="text-4xl font-bold text-center">No Post available</p>
        </div>
      ) : (
        <div className="container mx-auto grid sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4 justify-items-center">
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
                <div className="badge badge-outline">{post?.user?.name}</div>
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
                    <span className="text-gray-600">
                      {post?.comments?.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BiCategoryAlt />
                    <span className="text-gray-600">
                      {post?.category?.name}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-700">
                  {post?.description.length > 100
                    ? post?.description.slice(0, 70) + " ..."
                    : post?.description}
                </p>
                <Link href={`/posts/${post?.id}`}>
                  <button className="btn btn-active mt-4">Read More</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default BlogPostCard;
