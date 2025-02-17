"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

// Define TypeScript Interface for Blog
interface Blog {
  _id: string;
  title: string;
  author: string;
  blogContent: string;
  isPublic: boolean;
}

const EditBlogPage = () => {
  const { id } = useParams(); // Get blog ID from URL
  const router = useRouter();
  const [formData, setFormData] = useState<Blog>({
    _id: "",
    title: "",
    author: "",
    blogContent: "",
    isPublic: false,
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch the blog data
  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const response = await axios.get<{ data: Blog }>(`http://localhost:4000/api/v1/blog/${id}`);
        setFormData(response.data.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setMessage("Failed to fetch blog.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle public/private toggle
  const handleToggle = () => {
    setFormData((prev) => ({ ...prev, isPublic: !prev.isPublic }));
  };

  // Handle form submission (Update Blog)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.put(`http://localhost:4000/api/v1/updateBlog/${id}`, formData);
      setMessage("Blog updated successfully!");
      console.log("Update Response:", response.data);

      // Redirect to blog details after update
      setTimeout(() => {
        router.push(`/blog/${id}`);
      }, 1500);
    } catch (error) {
      console.error("Error updating blog:", error);
      setMessage("Failed to update blog.");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>

      {message && <p className="text-center text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Blog Content</label>
          <textarea
            name="blogContent"
            value={formData.blogContent}
            onChange={handleChange}
            rows={6}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-700">Make Public</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={formData.isPublic} onChange={handleToggle} />
            <div className="w-10 h-5 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-300 rounded-full peer-checked:bg-black peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
          </label>
          <span className={`text-sm font-semibold ${formData.isPublic ? "text-green-600" : "text-red-600"}`}>
            {formData.isPublic ? "Public" : "Private"}
          </span>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlogPage;
