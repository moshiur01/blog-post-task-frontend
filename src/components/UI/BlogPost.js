/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const BlogPost = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [authorData, setAuthorData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategoryData();
    fetchAuthorData();
    fetchBlogPosts();
  }, [searchTerm, selectedCategory, selectedAuthor]);

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/categories"
      );
      setCategoryData(response?.data?.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchAuthorData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/users");
      setAuthorData(response?.data?.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const fetchBlogPosts = async () => {
    try {
      setIsLoading(true);
      let url = `http://localhost:5000/api/v1/blogPosts`;

      if (selectedAuthor && selectedCategory) {
        url += `?userId=${selectedAuthor}&categoryId=${selectedCategory}`;
      } else if (searchTerm) {
        url += `?searchTerm=${searchTerm}`;
      } else if (selectedCategory) {
        url += `?categoryId=${selectedCategory}`;
      } else if (selectedAuthor) {
        url += `?userId=${selectedAuthor}`;
      }

      const response = await axios?.get(url);
      setBlogPosts(response?.data?.data?.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setSelectedAuthor("");
    setSelectedCategory("");
  };

  const DynamicBlogs = dynamic(() => import("./BlogPostCard"), {
    loading: () => <span className="loading loading-ball loading-lg"></span>,
  });

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between items-center">
        <input
          className="input input-bordered w-full md:w-auto focus:outline-none"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="select select-bordered focus:outline-none"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Choose Category</option>
          {categoryData?.map((category) => (
            <option key={category?.id} value={category?.id}>
              {category?.name}
            </option>
          ))}
        </select>
        <select
          className="select select-bordered focus:outline-none"
          value={selectedAuthor}
          onChange={(e) => setSelectedAuthor(e.target.value)}
        >
          <option value="">Choose Author</option>
          {authorData?.map((author) => (
            <option key={author?.id} value={author?.id}>
              {author?.name}
            </option>
          ))}
        </select>
        <button className="btn" onClick={handleClear}>
          Clear
        </button>
      </div>
      <div className="mt-8">
        <DynamicBlogs blogPosts={blogPosts} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default BlogPost;
