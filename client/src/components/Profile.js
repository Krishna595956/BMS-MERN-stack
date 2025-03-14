import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PencilIcon,
  DocumentTextIcon,
  CalendarIcon,
  ChartBarIcon,
  HeartIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';
import { getProfile } from '../services/api';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([
    {
      id: 1,
      title: 'Getting Started with React',
      status: 'published',
      views: 1200,
      likes: 45,
      comments: 8,
      publishedDate: '2023-10-20'
    },
    {
      id: 2,
      title: 'Understanding JavaScript Promises',
      status: 'published',
      views: 800,
      likes: 32,
      comments: 5,
      publishedDate: '2023-10-15'
    },
    {
      id: 3,
      title: 'CSS Grid Layout Guide',
      status: 'draft',
      views: 0,
      likes: 0,
      comments: 0,
      publishedDate: null
    }
  ]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const userData = await getProfile();
        setUser({
          name: userData.fullname,
          email: userData.email,
          joinDate: new Date(userData.createdAt).toISOString().split('T')[0],
          avatar: userData.profilePicture || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          bio: userData.bio || 'No bio available'
        });
      } catch (err) {
        setError('Failed to load profile data');
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No profile data available</p>
          <Link 
            to="/login" 
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 inline-block"
          >
            Please login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-primary"
              />
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
                <p className="text-gray-600 mb-2">{user.email}</p>
                <p className="text-gray-600 mb-4">{user.bio}</p>
                <div className="flex items-center justify-center sm:justify-start gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    Joined {new Date(user.joinDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium"
                onClick={() => navigate('/profile/edit')}
              >
                <PencilIcon className="h-4 w-4" />
                Edit Profile
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Recent Blogs */}
        <motion.div
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Blogs</h3>
            <div className="space-y-4">
              {recentBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="mb-4 sm:mb-0">
                    <Link
                      to={`/blog/${blog.id}`}
                      className="text-lg font-medium text-gray-900 hover:text-primary"
                    >
                      {blog.title}
                    </Link>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        blog.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {blog.status}
                      </span>
                      {blog.publishedDate && (
                        <span>{new Date(blog.publishedDate).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <ChartBarIcon className="h-4 w-4" />
                      {blog.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <HeartIcon className="h-4 w-4" />
                      {blog.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <ChatBubbleLeftIcon className="h-4 w-4" />
                      {blog.comments}
                    </span>
                    <Link
                      to={`/edit/${blog.id}`}
                      className="text-primary hover:text-blue-700"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;