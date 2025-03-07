"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

// Define TypeScript Interface for Blog
interface Blog {
  _id: string;
  title: string;
  author: string;
  blogContent: string;
  isPublic: boolean;
}

const BlogDetails = () => {
  const { id } = useParams(); // Get blog ID from URL
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get<{ data: Blog }>(
          process.env.NEXT_PUBLIC_API_URL + `/blog/${id}`
        );
        setBlog(response.data.data);
      } catch (err) {
        toast.error("Blog not found.");
        console.error("Error fetching blog:", err);
        setError("Blog not found.");
      } finally {
        setLoading(false);
      }
    };
    
    if (id) fetchBlog();
  }, [id]);
  
  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container min-h-[550px] mx-auto p-6">
      <h1 className="text-3xl font-bold">{blog?.title}</h1>
      <p className="text-gray-600">by {blog?.author}</p>
      <div className="mt-4 text-justify whitespace-pre-wrap">{blog?.blogContent}</div>
      <p
        className={`mt-4 font-semibold ${
          blog?.isPublic ? "text-green-600" : "text-red-600"
        }`}
      >
        {blog?.isPublic ? "Public" : "Private"}
      </p>
    </div>
  );
  
};

export default BlogDetails;
