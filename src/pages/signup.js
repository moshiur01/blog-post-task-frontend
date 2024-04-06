import RootLayout from "@/components/layout/RootLayout";
import auth from "@/firebase/firebaase.auth";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlinePhoneEnabled } from "react-icons/md";
import { PiIdentificationCardBold } from "react-icons/pi";

import { useRouter } from "next/router";
const SignUpPage = () => {
  const router = useRouter();

  //toast
  const errorToast = (message) => toast.error(message);
  const successToast = (message) => toast.success(message);

  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // Signup credential
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (data?.password.length < 6) {
      errorToast("Password must be more than 6 characters");
      return;
    }
    setName(data?.displayName);
    setUserEmail(data?.email);
    createUserWithEmailAndPassword(data?.email, data?.password)
      .then(() => {
        successToast("Sign up successful");
      })
      .catch((error) => {
        errorToast("Error signing up");
        console.error("Error signing up:", error);
      });
  };

  useEffect(() => {
    if (user?.user?.email) {
      sentToDb(name, userEmail);
    }
  }, [user?.user?.email]);

  const sentToDb = async (name, email) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/users/create-user",
        {
          name: name,
          email: email,
        }
      );
      router.push("/");
    } catch (error) {
      console.error("Error sending data to API:", error);
    }
  };

  return (
    <div className="container mx-auto ">
      <div className="text-center">
        <h1 className="lg:text-4xl font-bold">Please Sign up</h1>
      </div>
      <div>
        <form
          className="space-y-4 lg:w-[400px] mx-auto mt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="input input-bordered flex items-center gap-2">
            <PiIdentificationCardBold />
            <input
              type="text"
              className="grow"
              placeholder="Name"
              {...register("displayName", { required: true })}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="password"
              {...register("password", { required: true })}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <MdOutlinePhoneEnabled />
            <input
              type="number"
              className="grow"
              placeholder="Phone Number"
              {...register("phoneNumber", { required: true })}
            />
          </label>

          <button className="btn btn-outline btn-sm" type="submit">
            Sign Up
          </button>
          <div className="flex gap-2 ">
            <p>Already have an account?</p>
            <Link href={"/login"} className="font-bold">
              Login
            </Link>
          </div>
        </form>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default SignUpPage;

SignUpPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
