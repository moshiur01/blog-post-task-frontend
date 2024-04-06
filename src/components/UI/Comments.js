/* eslint-disable react-hooks/exhaustive-deps */
import auth from "@/firebase/firebaase.auth";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FaUserAlt } from "react-icons/fa";
import { MdDeleteForever, MdOutlineAccessTimeFilled } from "react-icons/md";

const Comments = ({ comments, postId }) => {
  const [user] = useAuthState(auth);

  //   get user data
  const [userId, setUserId] = useState("");

  useEffect(() => {
    getUserData();
  }, [user?.email]);

  const getUserData = async () => {
    try {
      if (user?.email) {
        const res = await axios.get(
          `https://blog-post-backend.vercel.app/api/v1/users/${user?.email}`
        );

        setUserId(res?.data?.data?.id);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  //handle tabs
  const [activeTab, setActiveTab] = useState("reviews");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  //data gather for post a comment
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  //post user comment
  const onSubmit = async (data) => {
    const finalData = { postId, ...data, userId };

    try {
      const response = await axios.post(
        "https://blog-post-backend.vercel.app/api/v1/postComments/create-blogPost-comment",
        finalData
      );
      if (response.data.success) {
        toast.success("Comment added successfully");
        window.location.reload();
      }

      reset();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  //delete user comment
  const handleCommentDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://blog-post-backend.vercel.app/api/v1/postComments/${id}`
      );

      //   console.log(res);
      if (res?.data?.success) {
        toast?.success("Comment Deleted successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  return (
    <div className="container mx-auto my-8">
      <div className="flex bg-gray-200 rounded-md mb-4">
        {/*  Display Comments */}
        <div
          className={`px-4 py-2 cursor-pointer font-semibold ${
            activeTab === "reviews" ? "bg-gray-300" : ""
          }`}
          onClick={() => handleTabChange("reviews")}
        >
          Comments
        </div>

        {/* Post a comment */}

        <div
          className={`px-4 py-2 cursor-pointer font-semibold ${
            activeTab === "postReview" ? "bg-gray-300" : ""
          }`}
          onClick={() => handleTabChange("postReview")}
        >
          Post a Comment
        </div>
      </div>

      {/* Tab content */}
      {activeTab === "reviews" && (
        <div className="space-y-4">
          <p className="text-2xl font-bold">
            {" "}
            {comments?.length > 0
              ? "Comments"
              : "There is no Comments in the post"}
          </p>
          {comments?.map((comment, index) => (
            <div key={index} className="bg-white shadow-md p-4 rounded-md">
              <p className="text-gray-600 font-semibold flex items-center gap-3">
                <FaUserAlt /> {comment?.user?.name}
                {userId === comment?.user?.id && (
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      handleCommentDelete(comment?.id);
                    }}
                  >
                    <MdDeleteForever />
                  </span>
                )}
              </p>
              <p className="text-gray-500 flex items-center gap-3">
                <MdOutlineAccessTimeFilled />
                {dayjs(comment?.createdAt)?.format("MMM D, YYYY, h:m A")}
              </p>
              <hr className="mt-3" />
              <p>{comment?.commentBody}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "postReview" && user?.email ? (
        <form
          className="space-y-4 flex flex-col w-64"
          onSubmit={handleSubmit(onSubmit)}
        >
          <textarea
            onChange={(e) => setReviewBody(e.target.value)}
            placeholder="Write your comment here..."
            className="textarea textarea-bordered"
            rows={3}
            required
            {...register("commentBody", { required: true })}
          />
          <button type="submit" className="btn  btn-outline btn-sm w-20">
            Submit
          </button>
        </form>
      ) : (
        <p className="text-xl font-semibold">Please login to write a comment</p>
      )}

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Comments;
