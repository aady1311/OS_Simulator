import { useState } from 'react'
import Home from './components/Home'
import ProcessScheduling from './components/ProcessScheduling'
import DeadlockSimulator from './components/DeadlockSimulator'
import MemoryAllocation from './components/MemoryAllocation'
import CloudTaskScheduling from './components/CloudTaskScheduling'
import FractionalKnapsack from './components/FractionalKnapsack'
import Quiz from './components/Quiz'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const tabs = [
    { id: 'home', label: 'Home', component: Home },
    { id: 'scheduling', label: 'Process Scheduling', component: ProcessScheduling },
    { id: 'cloud', label: 'Cloud Task Scheduling', component: CloudTaskScheduling },
    { id: 'knapsack', label: 'Fractional Knapsack', component: FractionalKnapsack },
    { id: 'quiz', label: 'Quiz', component: Quiz },
    // { id: 'deadlock', label: 'Deadlock Simulator', component: DeadlockSimulator },
    // { id: 'memory', label: 'Memory Allocation', component: MemoryAllocation }
  ]

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || Home

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
    setIsMobileMenuOpen(false)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Navigation */}
      <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-blue-600'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            <h1 className="text-white text-sm sm:text-lg md:text-xl font-bold">
              Algorithm Optimization Simulator
            </h1>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex space-x-1">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? `${isDarkMode ? 'bg-gray-700 text-white' : 'bg-blue-800 text-white'}`
                        : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-blue-100 hover:bg-blue-700 hover:text-white'}`
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-md transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                    : 'bg-blue-700 text-white hover:bg-blue-800'
                }`}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-md transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                    : 'bg-blue-700 text-white hover:bg-blue-800'
                }`}
              >
                {isDarkMode ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-md transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-blue-700 text-white hover:bg-blue-800'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden pb-4">
              <div className="flex flex-col space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`px-4 py-3 rounded-md text-sm font-medium transition-colors text-left ${
                      activeTab === tab.id
                        ? `${isDarkMode ? 'bg-gray-700 text-white' : 'bg-blue-800 text-white'}`
                        : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-blue-100 hover:bg-blue-700 hover:text-white'}`
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <ActiveComponent isDarkMode={isDarkMode} />
      </main>
    </div>
  )
}

export default App