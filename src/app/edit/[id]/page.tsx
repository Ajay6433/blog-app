"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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

  // Fetch the blog data
  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const response = await axios.get<{ data: Blog }>(
          `http://localhost:4000/api/v1/blog/${id}`
        );
        setFormData(response.data.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to fetch blog.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle public/private toggle
  const handleToggle = () => {
    setFormData((prev) => ({ ...prev, isPublic: !prev.isPublic }));
  };

  // Handle form submission (Update Blog)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Unauthorized! Please log in first.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/updateBlog/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token in headers
          },
        }
      );

      toast.success("Blog updated successfully!");
      console.log("Update Response:", response.data);

      // Redirect to blog details after update
      setTimeout(() => {
        router.push(`/blog/${id}`);
      }, 1500);
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error(error.response?.data?.message || "Failed to update blog.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="w-full mx-auto p-4 space-y-4">
      <form onSubmit={handleSubmit} className="">
        {/* Author Input */}
        <div className="m-auto w-1/2">
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-2 text-center border focus:ring-2 focus:ring-gray-900 focus:outline-none"
            placeholder="Author"
            required
          />
        </div>

        {/* Title Input */}
        <div>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 text-3xl font-bold text-gray-600 text-center border focus:ring-2 focus:ring-gray-900 focus:outline-none"
            placeholder="Title"
            required
          />
        </div>

        {/* Blog Content Textarea */}
        <div>
          <textarea
            name="blogContent"
            value={formData.blogContent}
            onChange={handleChange}
            rows={14}
            className="w-full p-2 border focus:ring-2 focus:ring-gray-900 focus:outline-none"
            placeholder="Blog Content"
            required
          />
        </div>

        <div className="flex justify-between items-center gap-4">
          {/* Make Public Toggle */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-gray-700">Make Public</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={formData.isPublic}
                onChange={handleToggle}
              />
              <div className="w-10 h-5 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-300 rounded-full peer-checked:bg-black peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
            </label>
            <span
              className={`text-sm font-semibold ${formData.isPublic ? "text-green-600" : "text-red-600"}`}
            >
              {formData.isPublic ? "Public" : "Private"}
            </span>
          </div>

          {/* Update Button */}
          <div className="flex justify-center items-center mt-4">
            <button
              type="submit"
              className="p-2 bg-black text-white py-2 hover:bg-gray-800 transition"
            >
              {loading ? "Updating..." : "Update Blog"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditBlogPage;
