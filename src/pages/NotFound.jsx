import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-primary/5 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-property">
            <ApperIcon name="Home" className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-6xl sm:text-7xl font-bold text-surface-900 mb-4">404</h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-surface-700 mb-4">Property Not Found</h2>
          <p className="text-surface-600 text-lg mb-8">
            Sorry, the property you're looking for doesn't exist. Let's get you back to browsing amazing listings.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/"
            className="inline-flex items-center btn-primary"
          >
            <ApperIcon name="ArrowLeft" className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound