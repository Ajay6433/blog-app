# Blog App

A full-stack blog application that allows users to register, log in, create, update, delete, and view blog posts. Users can publish public blogs that everyone can see, and also create private blogs that only the owner can access and manage.

## Features

- **User Authentication**: 
  - Register and login using email/password or Google OAuth.
  - Secure JWT-based authentication for protecting routes.
- **Blog Operations**:
  - **Create Blog**: Authenticated users can create new blog posts.
  - **Update Blog**: Only the owner can update their blog posts.
  - **Delete Blog**: Only the owner can delete their blog posts.
  - **View Blog**: Public blogs are accessible to everyone, while private blogs are viewable only by the owner.
  - **My Blogs**: A dedicated page for users to view their personal (both public and private) blogs.
- **Responsive UI**: Built with Next.js and Tailwind CSS, ensuring a great experience on both mobile and desktop.
- **Real-time Notifications**: Uses React Hot Toast for providing immediate feedback on user actions.
- **RESTful API**: Built with Express, Node.js, and MongoDB using Mongoose.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, React Hot Toast
- **Backend**: Express, Node.js, MongoDB, Mongoose
- **Authentication**: JWT, Google OAuth (using google-auth-library)
- **Tooling**: ESLint, Prettier, etc.

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- A running MongoDB instance (local or cloud)

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user.
- `POST /api/v1/auth/login` - Log in with email and password.
- `POST /api/v1/auth/googleLogin` - Register/Login with Google OAuth.

### Blog Operations
- `GET /api/v1/allBlogs` - Fetch all public blogs.
- `GET /api/v1/myBlogs` - Fetch blogs created by the authenticated user.
- `GET /api/v1/blog/:id` - Get details of a single blog.
- `POST /api/v1/createBlog` - Create a new blog (protected).
- `PUT /api/v1/updateBlog/:id` - Update a blog (protected, owner only).
- `DELETE /api/v1/deleteBlog/:id` - Delete a blog (protected, owner only).

---

## Routing Flow

### Public Routes
- **`/register`**: Register a new user.
- **`/login`**: Log in a user.
- **`/allBlogs`**: View all public blogs.
- **`/blog/:id`**: View details of a single blog.  
  _(If private, access is restricted to the owner.)_

### Protected Routes (require a valid JWT token)
- **`/createBlog`**: Create a new blog post.
- **`/myBlogs`**: View blogs created by the logged-in user.
- **`/editBlog/:id`**: Update a blog post (only if the user is the owner).
- **`/deleteBlog/:id`**: Delete a blog post (only if the user is the owner).

---

## Contributing

Contributions are welcome!  
1. **Fork the repository.**
2. **Create a new branch** for your feature or bug fix.
3. **Submit a pull request** for review.

## Contact
- Ajaykhan6433@gmail.com 
