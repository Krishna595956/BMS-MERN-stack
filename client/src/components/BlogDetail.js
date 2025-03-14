import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CalendarIcon, 
  UserIcon, 
  TagIcon, 
  HeartIcon,
  ChatBubbleLeftIcon,
  HandThumbDownIcon
} from '@heroicons/react/24/outline';
import { 
  HeartIcon as HeartIconSolid,
  HandThumbDownIcon as HandThumbDownIconSolid,
} from '@heroicons/react/24/solid';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // Simulated API call - replace with actual API call
        const mockBlog = {
          id: id,
          title: 'Getting Started with React',
          content: `Lorem ipsum dolor sit amet...`,
          summary: 'A beginner\'s guide to React development',
          author: 'John Doe',
          category: 'Technology',
          tags: ['react', 'javascript', 'web development'],
          coverImage: 'https://example.com/react-image.jpg',
          createdAt: '2023-10-20',
          likes: 42,
          dislikes: 5,
          isLiked: false,
          isDisliked: false,
          comments: [
            { id: 1, user: 'Alice', text: 'Great article!', timestamp: '2023-10-21' },
            { id: 2, user: 'Bob', text: 'Very helpful', timestamp: '2023-10-22' }
          ]
        };
        
        setBlog(mockBlog);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleLike = () => {
    setBlog(prev => ({
      ...prev,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
      isLiked: !prev.isLiked,
      isDisliked: false,
      dislikes: prev.isDisliked ? prev.dislikes - 1 : prev.dislikes
    }));
  };

  const handleDislike = () => {
    setBlog(prev => ({
      ...prev,
      dislikes: prev.isDisliked ? prev.dislikes - 1 : prev.dislikes + 1,
      isDisliked: !prev.isDisliked,
      isLiked: false,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes
    }));
  };

  const handleComment = () => {
    if (!comment.trim()) return;

    const newComment = {
      id: Date.now(),
      user: 'Current User',
      text: comment,
      timestamp: new Date().toISOString()
    };

    setBlog(prev => ({
      ...prev,
      comments: [...prev.comments, newComment]
    }));
    setComment('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div 
      className="max-w-4xl mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Cover Image */}
      <div className="rounded-xl overflow-hidden mb-8 h-[400px]">
        <img 
          src={blog.coverImage} 
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title and Meta */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-8">
        <span className="flex items-center gap-1">
          <CalendarIcon className="h-4 w-4" />
          {new Date(blog.createdAt).toLocaleDateString()}
        </span>
        <span className="flex items-center gap-1">
          <UserIcon className="h-4 w-4" />
          {blog.author}
        </span>
      </div>

      {/* Content */}
      <div className="prose max-w-none mb-8">
        {blog.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4 text-gray-800">{paragraph.trim()}</p>
        ))}
      </div>

      {/* Interactions */}
      <div className="flex items-center gap-6 mb-8">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleLike}
          className={`flex items-center gap-2 text-lg ${blog.isLiked ? 'text-primary' : 'text-gray-500'}`}
        >
          {blog.isLiked ? <HeartIconSolid className="h-6 w-6" /> : <HeartIcon className="h-6 w-6" />}
          {blog.likes}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleDislike}
          className={`flex items-center gap-2 text-lg ${blog.isDisliked ? 'text-red-500' : 'text-gray-500'}`}
        >
          {blog.isDisliked ? <HandThumbDownIconSolid className="h-6 w-6" /> : <HandThumbDownIcon className="h-6 w-6" />}
          {blog.dislikes}
        </motion.button>
      </div>

      {/* Comments Section */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6">Comments ({blog.comments.length})</h2>
        
        {/* Comment Input */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleComment}
            className="px-6 py-2 bg-primary text-white rounded-lg"
          >
            Post
          </motion.button>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {blog.comments.map(comment => (
            <div key={comment.id} className="bg-white p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{comment.user}</span>
                <span className="text-sm text-gray-500">
                  {new Date(comment.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="mt-8">
        <div className="flex flex-wrap gap-2">
          {blog.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BlogDetail;