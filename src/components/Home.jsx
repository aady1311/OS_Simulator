function Home() {
  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
          Dynamic Memory Allocation & Deadlock Simulator
        </h1>
        
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">Project Objective</h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            This web application demonstrates key Operating System concepts including Process Scheduling, 
            Deadlock Avoidance, and Dynamic Memory Allocation algorithms. Built as an educational tool 
            for computer science students to understand and visualize OS algorithms.
          </p>
        </div>

        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">Covered Syllabus Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/30 border dark:border-blue-800 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 text-sm sm:text-base">CO2: Process Scheduling</h3>
              <ul className="text-xs sm:text-sm text-blue-700 dark:text-blue-400 space-y-1">
                <li>• FCFS (First Come First Serve)</li>
                <li>• SJF (Shortest Job First)</li>
                <li>• Round Robin Algorithm</li>
                <li>• Priority Scheduling</li>
                <li>• SRTF (Shortest Remaining Time First)</li>
                <li>• Multilevel Queue</li>
              </ul>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/30 border dark:border-green-800 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2 text-sm sm:text-base">CO3: Deadlock Avoidance</h3>
              <ul className="text-xs sm:text-sm text-green-700 dark:text-green-400 space-y-1">
                <li>• Banker's Algorithm</li>
                <li>• Safe State Detection</li>
                <li>• Resource Allocation</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/30 border dark:border-purple-800 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2 text-sm sm:text-base">CO4: Memory Management</h3>
              <ul className="text-xs sm:text-sm text-purple-700 dark:text-purple-400 space-y-1">
                <li>• First Fit Algorithm</li>
                <li>• Best Fit Algorithm</li>
                <li>• Worst Fit Algorithm</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Interactive algorithm simulations</span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Step-by-step explanations</span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Clean tabular results</span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">No backend required</span>
            </div>
          </div>
        </div>

        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">Algorithm Explanation</h2>
          <div className="bg-blue-50 dark:bg-blue-900/30 border dark:border-blue-800 p-4 sm:p-6 rounded-lg">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3 text-sm sm:text-base">Process Scheduling Formulas</h3>
            <div className="space-y-2 text-blue-700 dark:text-blue-400">
              <div className="font-mono text-xs sm:text-sm bg-white dark:bg-gray-800 p-2 sm:p-3 rounded border text-gray-900 dark:text-gray-100 overflow-x-auto">
                Turnaround Time = Completion Time - Arrival Time
              </div>
              <div className="font-mono text-xs sm:text-sm bg-white dark:bg-gray-800 p-2 sm:p-3 rounded border text-gray-900 dark:text-gray-100 overflow-x-auto">
                Waiting Time = Turnaround Time - Burst Time
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 rounded-lg">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">Conclusion</h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            This simulator provides hands-on experience with fundamental OS algorithms, helping students 
            understand theoretical concepts through practical implementation. Each module includes 
            detailed explanations and visual results to enhance learning outcomes.
          </p>
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            @Aditya Yadav
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home