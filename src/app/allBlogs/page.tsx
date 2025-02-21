"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get<{ data: Blog[] }>(API_URL);
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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Unauthorized! Please log in first.");
      return;
    }

    try {
      await axios.delete(`http://localhost:4000/api/v1/deleteBlog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      toast.success("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog. Please try again.");
    }
  };

  const publicBlogs = blogs.filter((blog) => blog.isPublic);
  const privateBlogs = blogs.filter((blog) => !blog.isPublic);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>

      {/* Show message if no blogs are available */}
      {blogs.length === 0 ? (
        <div className="text-center text-gray-600 text-lg mt-10">
          <p>You don't have any blogs yet. Start writing some!</p>
          <button
            onClick={() => router.push("/createBlog")}
            className="mt-4 px-4 py-2 bg-black text-white hover:bg-gray-800 transition"
          >
            Write a Blog
          </button>
        </div>
      ) : (
        <>
          {/* Public Blogs Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Public Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {publicBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="p-6 bg-white shadow-md rounded-md border border-green-500"
                >
                  <h3 className="text-xl font-bold">{blog.title}</h3>
                  <p className="text-gray-600">by {blog.author}</p>
                  <p className="mt-2">{blog.blogContent.slice(0, 100)}...</p>
                  <span className="text-green-600 font-semibold">Public</span>

                  <div className="mt-4 w-full flex justify-between">
                    <button
                      onClick={() => router.push(`/blog/${blog._id}`)}
                      className=" w-[75px] p-2 bg-black m-auto text-white py-2 hover:bg-gray-800 transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => router.push(`/edit/${blog._id}`)}
                      className=" w-[75px] p-2 bg-black m-auto text-white py-2 hover:bg-gray-800 transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className=" w-[75px] p-2 bg-black m-auto text-white py-2 hover:bg-gray-800 transition"
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
                <div
                  key={blog._id}
                  className="p-6 bg-gray-200 shadow-md rounded-md border border-red-500"
                >
                  <h3 className="text-xl font-bold">{blog.title}</h3>
                  <p className="text-gray-700">by {blog.author}</p>
                  <p className="mt-2">{blog.blogContent.slice(0, 100)}...</p>
                  <span className="text-red-600 font-semibold">Private</span>

                  <div className="mt-4 w-full flex justify-between">
                    <button
                      onClick={() => router.push(`/blog/${blog._id}`)}
                      className=" w-[75px] p-2 bg-black m-auto text-white py-2 hover:bg-gray-800 transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => router.push(`/edit/${blog._id}`)}
                      className="w-[75px] p-2 bg-black m-auto text-white py-2 hover:bg-gray-800 transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="w-[75px] p-2 bg-black m-auto text-white py-2 hover:bg-gray-800 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default BlogsPage;
