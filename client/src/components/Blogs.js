import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HeartIcon, 
  ChatBubbleLeftIcon, 
  HandThumbDownIcon,
  CalendarIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { 
  HeartIcon as HeartIconSolid,
  HandThumbDownIcon as HandThumbDownIconSolid,
} from '@heroicons/react/24/solid';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const mockBlogs = [
          {
            id: 1,
            title: 'Getting Started with React',
            summary: 'A comprehensive guide for React beginners',
            author: 'John Doe',
            coverImage: 'https://example.com/react-image.jpg',
            createdAt: '2023-10-20',
            likes: 42,
            dislikes: 5,
            comments: [
              { id: 1, user: 'Alice', text: 'Great article!', timestamp: '2023-10-21' },
              { id: 2, user: 'Bob', text: 'Very helpful', timestamp: '2023-10-22' }
            ],
            isLiked: false,
            isDisliked: false
          },
        ];
        
        setBlogs(mockBlogs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleLike = (blogId) => {
    setBlogs(blogs.map(blog => {
      if (blog.id === blogId) {
        if (blog.isLiked) {
          return { ...blog, likes: blog.likes - 1, isLiked: false };
        } else {
          if (blog.isDisliked) {
            return {
              ...blog,
              likes: blog.likes + 1,
              dislikes: blog.dislikes - 1,
              isLiked: true,
              isDisliked: false
            };
          }
          return { ...blog, likes: blog.likes + 1, isLiked: true };
        }
      }
      return blog;
    }));
  };

  const handleDislike = (blogId) => {
    setBlogs(blogs.map(blog => {
      if (blog.id === blogId) {
        if (blog.isDisliked) {
          return { ...blog, dislikes: blog.dislikes - 1, isDisliked: false };
        } else {
          if (blog.isLiked) {
            return {
              ...blog,
              likes: blog.likes - 1,
              dislikes: blog.dislikes + 1,
              isLiked: false,
              isDisliked: true
            };
          }
          return { ...blog, dislikes: blog.dislikes + 1, isDisliked: true };
        }
      }
      return blog;
    }));
  };

  const handleComment = (blogId) => {
    if (!comment.trim()) return;

    const newComment = {
      id: Date.now(),
      user: 'Current User',
      text: comment,
      timestamp: new Date().toISOString()
    };

    setBlogs(blogs.map(blog => {
      if (blog.id === blogId) {
        return {
          ...blog,
          comments: [...blog.comments, newComment]
        };
      }
      return blog;
    }));

    setComment('');
    setSelectedBlog(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">All Blogs</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {blogs.map(blog => (
            <motion.div
              key={blog.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-full h-48 relative">
                <img 
                  src={blog.coverImage} 
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="h-3 w-3" />
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <UserIcon className="h-3 w-3" />
                    {blog.author}
                  </span>
                </div>

                <Link to={`/blog/${blog.id}`}>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary line-clamp-2">
                    {blog.title}
                  </h2>
                </Link>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
                  {blog.summary}
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleLike(blog.id)}
                    className={`flex items-center gap-1 text-sm ${blog.isLiked ? 'text-primary' : 'text-gray-500'}`}
                  >
                    {blog.isLiked ? (
                      <HeartIconSolid className="h-4 w-4" />
                    ) : (
                      <HeartIcon className="h-4 w-4" />
                    )}
                    {blog.likes}
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDislike(blog.id)}
                    className={`flex items-center gap-1 text-sm ${blog.isDisliked ? 'text-red-500' : 'text-gray-500'}`}
                  >
                    {blog.isDisliked ? (
                      <HandThumbDownIconSolid className="h-4 w-4" />
                    ) : (
                      <HandThumbDownIcon className="h-4 w-4" />
                    )}
                    {blog.dislikes}
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedBlog(selectedBlog === blog.id ? null : blog.id)}
                    className="flex items-center gap-1 text-sm text-gray-500"
                  >
                    <ChatBubbleLeftIcon className="h-4 w-4" />
                    {blog.comments.length}
                  </motion.button>
                </div>

                {selectedBlog === blog.id && (
                  <div className="mt-4">
                    <div className="mb-3 space-y-2 max-h-32 overflow-y-auto">
                      {blog.comments.map(comment => (
                        <div key={comment.id} className="bg-gray-50 p-2 rounded text-sm">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-xs">{comment.user}</span>
                            <span className="text-xs text-gray-500">
                              {new Date(comment.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-600">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleComment(blog.id)}
                        className="px-3 py-1 text-sm bg-primary text-white rounded"
                      >
                        Post
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;