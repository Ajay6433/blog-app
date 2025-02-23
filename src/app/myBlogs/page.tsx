'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';

// Define TypeScript Interface for Blogs
interface Blog {
  _id: string;
  title: string;
  author: string;
  blogContent: string;
  isPublic: boolean;
  authorId: string;
}

const MyBlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMyBlogs = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Unauthorized! Please log in first.');
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:4000/api/v1/myBlogs', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          setBlogs(response.data.data);
        } else {
          throw new Error('Failed to fetch blogs');
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        toast.error('Failed to fetch your blogs.');
      }
    };

    fetchMyBlogs();
  }, [router]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Unauthorized! Please log in first.');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:4000/api/v1/deleteBlog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
        toast.success('Blog deleted successfully!');
      } else {
        throw new Error('Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog. Please try again.');
    }
  };

  if (blogs.length === 0) {
    return (
      <div className="text-center text-gray-600 text-lg mt-10">
        <p>You don't have any blogs yet. Start writing some!</p>
        <button
          onClick={() => router.push('/createBlog')}
          className="mt-4 px-4 py-2 bg-black text-white hover:bg-gray-800 transition"
        >
          Write a Blog
        </button>
      </div>
    );
  }

  return (
    <div className="container min-h-[550px] mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className={`p-6 bg-white shadow-md rounded-md border ${
              blog.isPublic ? 'border-green-500' : 'border-red-500'
            }`}
          >
            <h3 className="text-xl font-bold">{blog.title}</h3>
            <p className="text-gray-600">by {blog.author}</p>
            <p className="mt-2">{blog.blogContent.slice(0, 100)}...</p>
            <span
              className={`font-semibold ${
                blog.isPublic ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {blog.isPublic ? 'Public' : 'Private'}
            </span>

            <div className="mt-4 w-full flex justify-between">
              <button
                onClick={() => router.push(`/blog/${blog._id}`)}
                className="w-[75px] p-2 bg-black text-white py-2 hover:bg-gray-800 transition"
              >
                View
              </button>
              <button
                onClick={() => router.push(`/edit/${blog._id}`)}
                className="w-[75px] p-2 bg-black text-white py-2 hover:bg-gray-800 transition"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="w-[75px] p-2 bg-black text-white py-2 hover:bg-gray-800 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBlogsPage;
