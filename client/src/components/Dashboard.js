import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PencilIcon, TrashIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
  // This would typically come from an API
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'Getting Started with React',
      summary: 'A beginner\'s guide to React development',
      content: 'React is a powerful JavaScript library...',
      category: 'technology',
      tags: 'react,javascript,web development',
      coverImage: 'https://example.com/react-image.jpg',
      createdAt: '2023-10-20',
      status: 'published'
    },
    // Add more sample blogs as needed
  ]);

  const [filter, setFilter] = useState('all'); // all, published, draft

  const filteredBlogs = filter === 'all' 
    ? blogs 
    : blogs.filter(blog => blog.status === filter);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setBlogs(blogs.filter(blog => blog.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog Dashboard</h1>
          <Link to="/write">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-4 py-2 rounded-lg"
            >
              Create New Blog
            </motion.button>
          </Link>
        </div>

        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'all' 
                ? 'bg-primary text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('published')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'published' 
                ? 'bg-primary text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Published
          </button>
          <button
            onClick={() => setFilter('draft')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'draft' 
                ? 'bg-primary text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Drafts
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <motion.div
              key={blog.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <img 
                className="h-48 w-full object-cover"
                src={blog.coverImage}
                alt={blog.title}
              />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    blog.status === 'published' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {blog.status}
                  </span>
                  <span className="text-sm text-gray-500">{blog.createdAt}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{blog.summary}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.split(',').map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
                
                {/* Category and Read More button */}
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {blog.category}
                    </span>
                    <Link to={`/blog/${blog.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-primary hover:text-blue-700 flex items-center gap-1 text-sm font-medium"
                      >
                        Read More
                        <ArrowRightIcon className="h-4 w-4" />
                      </motion.button>
                    </Link>
                  </div>

                  {/* Edit and Delete buttons */}
                  <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                    <Link to={`/edit/${blog.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-indigo-600 hover:text-indigo-900"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </motion.button>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(blog.id)}
                      className="p-2 text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;