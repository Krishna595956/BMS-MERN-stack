import { motion } from 'framer-motion';

const Home = () => {
  const featuredBlogs = [
    {
      title: "The Art of Creative Writing",
      excerpt: "Discover the secrets to crafting compelling stories that captivate your readers...",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      date: "Oct 15, 2023",
      author: "Sarah Johnson"
    },
    {
      title: "Travel Diaries: Barcelona",
      excerpt: "Exploring the vibrant streets and architectural wonders of Catalunya's capital...",
      image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      date: "Oct 12, 2023",
      author: "Mark Thompson"
    },
    {
      title: "Tech Trends 2024",
      excerpt: "A deep dive into the emerging technologies that will shape our future...",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      date: "Oct 10, 2023",
      author: "Alex Chen"
    }
  ];

  const features = [
    {
      title: "Easy to Use",
      description: "Intuitive interface for seamless blogging experience",
      icon: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      title: "Rich Editor",
      description: "Advanced editing tools to create beautiful content",
      icon: "https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      title: "SEO Friendly",
      description: "Optimized for better search engine visibility",
      icon: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div 
        className="relative text-center py-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7)'
          }}
        />
        <div className="relative z-10 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to BlogMS
          </h1>
          <p className="text-xl mb-8">
            Share your stories with the world
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-primary px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Start Writing
          </motion.button>
        </div>
      </motion.div>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose BlogMS?</h2>
          <p className="text-gray-600 mt-4">Discover the features that make us stand out</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="mb-4 h-40 overflow-hidden rounded-lg">
                <img 
                  src={feature.icon} 
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Blogs Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Featured Blogs</h2>
          <p className="text-gray-600 mt-4">Explore our most popular stories</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {featuredBlogs.map((blog, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">{blog.date}</span>
                    <span className="text-sm text-primary">{blog.author}</span>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-primary hover:text-blue-700"
                  >
                    Read More →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-primary text-white text-center relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.2)'
          }}
        />
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Blogging?</h2>
          <p className="text-lg mb-8">Join our community of writers and share your voice with the world</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-primary px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Create Account
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default Home;