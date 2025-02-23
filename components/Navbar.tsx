"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // Mobile menu icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Detects the current route

  // Function to check authentication status
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // If token exists, user is authenticated
  };

  // Check auth on component mount & re-check on route change
  useEffect(() => {
    checkAuth();
  }, [pathname]); // Re-run checkAuth whenever the route changes

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <nav className="w-full bg-white h-[80px] z-50 flex justify-between items-center p-6 shadow-md">
      {/* Logo */}
      <div>
        <Link href="/" className="text-2xl md:text-4xl font-semibold">
          Blog App
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <Link href="/" className="hover:text-gray-600">
          Home
        </Link>
        <Link href="/allBlogs" className="hover:text-gray-600">
        Public Blogs
        </Link>
        {isAuthenticated ? (
          <>
            <Link href="/createBlog" className="hover:text-gray-600">
              Create Blog
            </Link>
            <Link href="/myBlogs" className="hover:text-gray-600">
              My Blogs
            </Link>
            <button
              onClick={handleLogout}
              className="bg-black text-white px-4 py-2 hover:bg-gray-800 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {pathname === "/login" ? (
              <Link
                href="/register"
                className="bg-black text-white px-4 py-2 hover:bg-gray-800 transition"
              >
                Register
              </Link>
            ) : (
              <Link
                href="/login"
                className="bg-black text-white px-4 py-2 hover:bg-gray-800 transition"
              >
                Login
              </Link>
            )}
          </>
        )}
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
          <Link href="/" className="hover:text-gray-600" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/allBlogs" className="hover:text-gray-600" onClick={() => setIsOpen(false)}>
            Public Blogs
          </Link>
          {isAuthenticated ? (
            <>
              <Link href="/createBlog" className="hover:text-gray-600" onClick={() => setIsOpen(false)}>
                Create Blog
              </Link>
              <Link href="/myBlogs" className="hover:text-gray-600" onClick={() => setIsOpen(false)}>
                My Blogs
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="bg-black text-white px-4 py-2 hover:bg-gray-800 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {pathname === "/login" ? (
                <Link
                  href="/register"
                  className="bg-black text-white px-4 py-2 hover:bg-gray-800 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="bg-black text-white px-4 py-2 hover:bg-gray-800 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
