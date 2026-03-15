import { motion } from 'framer-motion'
import { Cpu, Cloud, Package, Brain, Zap, Target } from 'lucide-react'
import { useState, useEffect } from 'react'

function Home({ setActiveTab, setCurrentAlgorithm }) {
  const [showShine, setShowShine] = useState(false)

  useEffect(() => {
    // Trigger shine animation when component mounts
    setShowShine(true)
    const timer = setTimeout(() => setShowShine(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const algorithms = [
    {
      id: 'scheduling',
      subId: 'sjf',
      title: 'SJF Scheduling',
      description: 'Shortest Job First algorithm - executes processes with shortest burst time first for optimal average waiting time.',
      icon: Cpu,
      color: 'blue',
      features: ['Non-preemptive', 'Optimal average waiting time', 'Step-by-step execution']
    },
    {
      id: 'scheduling',
      subId: 'priority',
      title: 'Priority Scheduling',
      description: 'Priority-based CPU scheduling where higher priority processes execute before lower priority ones.',
      icon: Cpu,
      color: 'blue',
      features: ['Priority-based', 'Preemptive/Non-preemptive', 'Custom priority values']
    },
    {
      id: 'cloud',
      subId: 'minmin',
      title: 'Min-Min Algorithm',
      description: 'Cloud task scheduling using Min-Min heuristic to minimize makespan by assigning tasks to their best VMs.',
      icon: Cloud,
      color: 'green',
      features: ['Makespan minimization', 'Load balancing', 'Resource optimization']
    },
    {
      id: 'cloud',
      subId: 'maxmin',
      title: 'Max-Min Algorithm',
      description: 'Max-Min scheduling prioritizes longer tasks first to achieve better load distribution across VMs.',
      icon: Cloud,
      color: 'green',
      features: ['Long task priority', 'Better load balancing', 'Resource utilization']
    },
    {
      id: 'knapsack',
      title: 'Fractional Knapsack',
      description: 'Greedy algorithm for the fractional knapsack problem using value-to-weight ratio for optimal selection.',
      icon: Package,
      color: 'purple',
      features: ['Greedy strategy', 'Value/weight ratio', 'Fractional solutions']
    },
    {
      id: 'quiz',
      title: 'Algorithm Quiz',
      description: 'Test your knowledge of optimization algorithms with interactive quizzes and challenges.',
      icon: Brain,
      color: 'orange',
      features: ['Multiple choice', 'Algorithm concepts', 'Progress tracking']
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-800',
        icon: 'text-blue-600 dark:text-blue-400',
        hover: 'hover:bg-blue-100 dark:hover:bg-blue-900/30',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      green: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        border: 'border-green-200 dark:border-green-800',
        icon: 'text-green-600 dark:text-green-400',
        hover: 'hover:bg-green-100 dark:hover:bg-green-900/30',
        button: 'bg-green-600 hover:bg-green-700'
      },
      purple: {
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        border: 'border-purple-200 dark:border-purple-800',
        icon: 'text-purple-600 dark:text-purple-400',
        hover: 'hover:bg-purple-100 dark:hover:bg-purple-900/30',
        button: 'bg-purple-600 hover:bg-purple-700'
      },
      orange: {
        bg: 'bg-orange-50 dark:bg-orange-900/20',
        border: 'border-orange-200 dark:border-orange-800',
        icon: 'text-orange-600 dark:text-orange-400',
        hover: 'hover:bg-orange-100 dark:hover:bg-orange-900/30',
        button: 'bg-orange-600 hover:bg-orange-700'
      }
    }
    return colors[color]
  }

  return (
    <motion.div 
      className="max-w-6xl mx-auto px-2 sm:px-4 relative"
      animate={showShine ? {
        background: [
          "radial-gradient(circle at center, transparent 0%, transparent 100%)",
          "radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
          "radial-gradient(circle at center, transparent 0%, transparent 100%)"
        ]
      } : {}}
      transition={showShine ? { duration: 2 } : {}}
    >
      {/* Shining Animation Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showShine ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 pointer-events-none z-50"
      >
        <motion.div
          initial={{ x: '-100%', y: '-100%', rotate: 45 }}
          animate={showShine ? { x: '200%', y: '200%' } : { x: '-100%', y: '-100%' }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-2 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent shadow-2xl"
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.8) 50%, transparent 70%)',
            boxShadow: '0 0 50px rgba(255,255,255,0.5), 0 0 100px rgba(255,255,255,0.3), 0 0 150px rgba(255,255,255,0.2)'
          }}
        />
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 sm:mb-12 relative"
      >
        <motion.div
          initial={{ filter: "drop-shadow(0 0 0 rgba(59, 130, 246, 0))" }}
          animate={{ filter: showShine ? "drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))" : "drop-shadow(0 0 0 rgba(59, 130, 246, 0))" }}
          transition={{ duration: 1.5 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Algorithm Optimization
            <span className="block text-blue-600 dark:text-blue-400">Simulator</span>
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          Interactive learning platform for understanding greedy algorithms and optimization techniques
          through hands-on simulations and visualizations.
        </motion.p>
      </motion.div>

      {/* Algorithm Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12"
      >
        {algorithms.map((algo) => {
          const IconComponent = algo.icon
          const colors = getColorClasses(algo.color)

          return (
            <motion.div
              key={algo.id}
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={showShine ? {
                boxShadow: [
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  "0 10px 15px -3px rgba(59, 130, 246, 0.3), 0 4px 6px -2px rgba(59, 130, 246, 0.2)",
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                ]
              } : {}}
              transition={showShine ? { duration: 2, repeat: 1 } : {}}
              className={`${colors.bg} ${colors.border} border-2 rounded-xl p-6 sm:p-8 cursor-pointer transition-all duration-300 ${colors.hover} shadow-lg hover:shadow-xl`}
              onClick={() => {
                setActiveTab(algo.id)
                if (algo.subId) {
                  setCurrentAlgorithm(algo.subId)
                }
              }}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${colors.icon} bg-white dark:bg-gray-800 shadow-md`}>
                  <IconComponent size={32} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {algo.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {algo.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {algo.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium shadow-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center px-4 py-2 ${colors.button} text-white rounded-lg font-medium transition-colors shadow-md`}
                  >
                    <Zap size={16} className="mr-2" />
                    Start Simulation
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Theory Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 sm:p-8 mb-8 sm:mb-12"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Algorithm Theory
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Understanding the fundamental concepts behind optimization algorithms
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                <Cpu className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
                CPU Scheduling Algorithms
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
                CPU scheduling determines which process runs when multiple processes are ready. The goal is to maximize CPU utilization and minimize response time.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <strong>SJF:</strong> Executes shortest jobs first for optimal average waiting time
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <strong>Priority:</strong> Higher priority processes execute before lower priority ones
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                <Cloud className="w-6 h-6 text-green-600 dark:text-green-400 mr-3" />
                Cloud Task Scheduling
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
                Cloud computing distributes tasks across virtual machines to optimize resource utilization and minimize completion time.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <strong>Min-Min:</strong> Assigns tasks to their best VM to minimize makespan
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <strong>Max-Min:</strong> Prioritizes longer tasks for better load balancing
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                <Package className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" />
                Greedy Algorithms
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
                Greedy algorithms make locally optimal choices at each step with the hope of finding a global optimum.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  <strong>Fractional Knapsack:</strong> Uses value-to-weight ratio for item selection
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  <strong>Strategy:</strong> Take the best immediate choice, may not always be optimal
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                <Brain className="w-6 h-6 text-orange-600 dark:text-orange-400 mr-3" />
                Key Concepts
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <strong className="text-orange-800 dark:text-orange-300">Optimization:</strong>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">Finding the best solution among many possible solutions</p>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <strong className="text-orange-800 dark:text-orange-300">Complexity:</strong>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">Time and space requirements of algorithms</p>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <strong className="text-orange-800 dark:text-orange-300">Trade-offs:</strong>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">Balancing between different performance metrics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Why Choose Our Simulator?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Designed for computer science students to master optimization algorithms through interactive learning
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Target,
              title: 'Interactive Learning',
              description: 'Step-by-step algorithm execution with visual feedback'
            },
            {
              icon: Zap,
              title: 'Real-time Results',
              description: 'Instant calculations and performance metrics display'
            },
            {
              icon: Brain,
              title: 'Concept Mastery',
              description: 'Understand complex algorithms through practical examples'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon size={32} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center mt-8 sm:mt-12"
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Built by Nupur Ingale | Ankita Jalkote | Anjali Mare | Rupali Kashid
        </p>
      </motion.div>
    </motion.div>
  )
}

export default Home