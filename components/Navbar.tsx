import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full bg-white h-[80px] z-50 flex justify-between items-center p-6 gap-4 shadow-md">
      <div>
        <Link href={"/"} className="text-4xl font-semibold">
          Blog App
        </Link>
      </div>
      <div className=" w-100 flex justify-between items-center p-3 gap-4">
        <Link href={"/"}>Home</Link>
        <Link href={"/createBlog"}>Create Blogs</Link>
        <Link href={"/allBlogs"}>View Blogs</Link>
      </div>
    </div>
  );
};

export default Navbar;
