import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const stats = [
    { label: 'Active Listings', value: '12,500+', icon: 'Home' },
    { label: 'Happy Clients', value: '8,900+', icon: 'Users' },
    { label: 'Cities Covered', value: '50+', icon: 'MapPin' },
    { label: 'Successful Sales', value: '15,000+', icon: 'TrendingUp' }
  ]

  const features = [
    {
      icon: 'Search',
      title: 'Advanced Search',
      description: 'Find your perfect property with our intelligent search filters'
    },
    {
      icon: 'Shield',
      title: 'Verified Listings',
      description: 'All properties are verified and authenticated for your peace of mind'
    },
    {
      icon: 'MessageCircle',
      title: 'Direct Communication',
      description: 'Connect directly with property owners and agents'
    },
    {
      icon: 'Heart',
      title: 'Save Favorites',
      description: 'Bookmark properties and get notified of price changes'
    }
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Navigation */}
      <nav className="relative z-10 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <ApperIcon name="Home" className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gradient">EstateHub 1</span>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:hover:bg-surface-700 transition-colors duration-200"
          >
            <ApperIcon 
              name={darkMode ? 'Sun' : 'Moon'} 
              className="h-5 w-5 text-surface-600 dark:text-surface-400" 
            />
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-surface-900 dark:text-white mb-6 leading-tight"
            >
              Find Your
              <span className="block text-gradient">Dream Property</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-surface-600 dark:text-surface-300 max-w-3xl mx-auto mb-8"
            >
              Discover premium real estate listings with advanced search capabilities, 
              verified properties, and direct communication with property owners.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <button className="btn-primary w-full sm:w-auto">
                <ApperIcon name="Search" className="h-5 w-5 mr-2" />
                Start Searching
              </button>
              <button className="btn-secondary w-full sm:w-auto">
                <ApperIcon name="Plus" className="h-5 w-5 mr-2" />
                List Property
              </button>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="glass-card p-6 text-center hover:shadow-property transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={stat.icon} className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-surface-600 dark:text-surface-400 text-sm sm:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Feature */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-white mb-4">
              Explore Premium Properties
            </h2>
            <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
              Browse through our curated collection of properties with advanced filtering and search capabilities.
            </p>
          </motion.div>
          
          <MainFeature />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-surface-50/50 dark:bg-surface-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-4">
              Why Choose EstateHub?
            </h2>
            <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
              We provide the most comprehensive real estate platform with cutting-edge features.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-soft hover:shadow-property transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <ApperIcon name={feature.icon} className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-surface-600 dark:text-surface-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 lg:px-8 py-12 bg-surface-900 dark:bg-surface-950">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <ApperIcon name="Home" className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">EstateHub</span>
          </div>
          <p className="text-surface-400 mb-8 max-w-2xl mx-auto">
            Your trusted partner in finding the perfect property. Connecting dreams with reality through innovative real estate solutions.
          </p>
          <div className="border-t border-surface-800 pt-8">
            <p className="text-surface-500">
              © 2024 EstateHub. All rights reserved. Built with ❤️ for property enthusiasts.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
