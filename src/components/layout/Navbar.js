import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = ({ authors }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [authorData, setAuthorData] = useState([]);

  // useEffect(() => {
  //   fetchCategoryData();
  //   fetchAuthorData();
  // }, []);

  const fetchCategoryData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/categories");

      const data = await response.json();
      setCategoryData(data?.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchAuthorData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/users");

      const data = await response.json();
      setAuthorData(data?.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  useEffect(() => {
    fetchCategoryData();
    fetchAuthorData();
  }, []);

  return (
    <div className="navbar bg-black text-white font-semibold container mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black"
          >
            <li className="my-2">
              <details>
                <summary>Category</summary>
                <ul className="p-2 text-black">
                  {categoryData?.map((cat) => (
                    <li key={cat?.id}>
                      <Link href={`/category/${cat?.id}`}>{cat?.name}</Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Author</summary>
                <ul className="p-2 text-black">
                  {authorData?.map((author) => (
                    <li key={author?.id}>
                      <Link href={`/author/${author?.id}`}>{author?.name}</Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Blog Post</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 z-10 lg:space-x-4">
          <li className="mx-3">
            <details>
              <summary>Category</summary>
              <ul className="p-2 text-black lg:w-32">
                {categoryData?.map((cat) => (
                  <li key={cat?.id}>
                    <Link href={`/category/${cat?.id}`}>{cat?.name}</Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Author</summary>
              <ul className="p-2 text-black lg:w-32">
                {authorData?.map((author) => (
                  <li key={author?.id}>
                    <Link className="text-black" href={`/author/${author?.id}`}>
                      {author?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default Navbar;
