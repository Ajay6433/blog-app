"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for mobile menu

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white h-[80px] z-50 flex justify-between items-center p-6 shadow-md">
      {/* Logo */}
      <div>
        <Link href={"/"} className="text-2xl md:text-4xl font-semibold">
          Blog App
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6">
        <Link href={"/"} className="hover:text-gray-600">Home</Link>
        <Link href={"/createBlog"} className="hover:text-gray-600">Create Blog</Link>
        <Link href={"/allBlogs"} className="hover:text-gray-600">View Blogs</Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-lg p-4 flex flex-col items-center space-y-4 md:hidden">
          <Link href={"/"} className="hover:text-gray-600" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href={"/createBlog"} className="hover:text-gray-600" onClick={() => setIsOpen(false)}>Create Blog</Link>
          <Link href={"/allBlogs"} className="hover:text-gray-600" onClick={() => setIsOpen(false)}>View Blogs</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
