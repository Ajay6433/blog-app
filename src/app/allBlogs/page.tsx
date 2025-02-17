"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Define TypeScript Interface for Blogs
interface Blog {
  _id: string;
  title: string;
  author: string;
  blogContent: string;
  isPublic: boolean;
}

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const API_URL = "http://localhost:4000/api/v1/allBlogs";
  const router = useRouter(); // For navigation

  useEffect(() => {
    const fetchBlogs = async (): Promise<void> => {
      try {
        const response = await axios.get<{ data: Blog[] }>(API_URL);
        console.log("API Response:", response.data);
        if (Array.isArray(response.data.data)) {
          setBlogs(response.data.data);
        } else {
          console.error("Invalid API response:", response.data);
          setBlogs([]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      }
    };

    fetchBlogs();
  }, []);

  // Function to delete a blog
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/blogs/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id)); // Remove from UI
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  // Separate public and private blogs
  const publicBlogs = blogs.filter((blog) => blog.isPublic);
  const privateBlogs = blogs.filter((blog) => !blog.isPublic);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>

      {/* Public Blogs Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Public Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publicBlogs.map((blog) => (
            <div key={blog._id} className="p-6 bg-white shadow-md rounded-md border border-green-500">
              <h3 className="text-xl font-bold">{blog.title}</h3>
              <p className="text-gray-600">by {blog.author}</p>
              <p className="mt-2">{blog.blogContent.slice(0, 100)}...</p>
              <span className="text-green-600 font-semibold">Public</span>

              {/* Buttons */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => router.push(`/blog/${blog._id}`)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  View
                </button>
                <button
                  onClick={() => router.push(`/edit/${blog._id}`)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Private Blogs Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Private Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {privateBlogs.map((blog) => (
            <div key={blog._id} className="p-6 bg-gray-200 shadow-md rounded-md border border-red-500">
              <h3 className="text-xl font-bold">{blog.title}</h3>
              <p className="text-gray-700">by {blog.author}</p>
              <p className="mt-2">{blog.blogContent.slice(0, 100)}...</p>
              <span className="text-red-600 font-semibold">Private</span>

              {/* Buttons */}
              <div className="mt-4 flex gap-2">
                 {/* View Blog Button */}
    <Link href={`/blogs/${blog._id}`}>
      <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
        View Full Blog
      </button>
    </Link>
                <button
                  onClick={() => router.push(`/blogs/edit/${blog._id}`)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;
