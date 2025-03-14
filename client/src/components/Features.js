import { motion } from 'framer-motion';
import { LightBulbIcon, PencilIcon, ChartBarIcon, CloudArrowUpIcon, ShieldCheckIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const Features = () => {
  const features = [
    {
      icon: <PencilIcon className="h-8 w-8" />,
      title: "Rich Text Editor",
      description: "Advanced WYSIWYG editor with support for markdown, images, and code snippets."
    },
    {
      icon: <CloudArrowUpIcon className="h-8 w-8" />,
      title: "Auto-Save & Drafts",
      description: "Never lose your work with automatic saving and draft management system."
    },
    {
      icon: <ChartBarIcon className="h-8 w-8" />,
      title: "Analytics Dashboard",
      description: "Track your blog's performance with detailed analytics and insights."
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8" />,
      title: "SEO Optimization",
      description: "Built-in SEO tools to help your content rank better in search engines."
    },
    {
      icon: <UserGroupIcon className="h-8 w-8" />,
      title: "Community Features",
      description: "Engage with readers through comments, likes, and social sharing."
    },
    {
      icon: <LightBulbIcon className="h-8 w-8" />,
      title: "AI Assistance",
      description: "Get writing suggestions and content improvements powered by AI."
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Blogging
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to create, manage, and grow your blog in one place.
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-primary mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-20 text-center bg-primary text-white rounded-2xl p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Start Blogging?</h2>
          <p className="text-lg mb-8">Join thousands of content creators who trust our platform.</p>
          <motion.button
            className="bg-white text-primary px-8 py-3 rounded-full text-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;