import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between w-screen h-14 bg-slate-500'>
        <div>
            <h1>Blog-App</h1>
        </div>
        <div className='bg-red-800'>
            <Link href={"/"}>Home</Link>
            <Link href={"#"}>Create Blogs</Link>
            <Link href={"#"}>View Blogs</Link>
        </div>
    </div>
  )
}

export default Navbar