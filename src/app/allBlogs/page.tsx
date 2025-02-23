'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

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
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {


      try {
        const response = await axios.get<{ data: Blog[] }>('http://localhost:4000/api/v1/allBlogs');
        if (Array.isArray(response.data.data)) {
          // Filter to include only public blogs
          const publicBlogs = response.data.data.filter(blog => blog.isPublic);
          setBlogs(publicBlogs);
        } else {
          console.error('Invalid API response:', response.data);
          setBlogs([]);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        toast.error('Failed to fetch blogs.');
      }
    };

    fetchBlogs();
  }, []);

  if (blogs.length === 0) {
    return (
      <div className="text-center min-h-[550px] text-gray-600 text-lg mt-10">
        <p>No public blogs available at the moment. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="container min-h-[550px] mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Public Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="p-6 bg-white shadow-md rounded-md border border-green-500"
          >
            <h3 className="text-xl font-bold">{blog.title}</h3>
            <p className="text-gray-600">by {blog.author}</p>
            <p className="mt-2">{blog.blogContent.slice(0, 100)}...</p>
            <span className="text-green-600 font-semibold">Public</span>

            <div className="mt-4 w-full flex justify-center">
              <button
                onClick={() => router.push(`/blog/${blog._id}`)}
                className="w-[75px] p-2 bg-black text-white py-2 hover:bg-gray-800 transition"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
