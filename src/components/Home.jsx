function Home() {
  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
          Algorithm Optimization Simulator
        </h1>
        
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">Project Objective</h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            This web application demonstrates key optimization algorithms including Process Scheduling, 
            Cloud Task Scheduling using Greedy Methods, and Fractional Knapsack Problem. Built as an educational tool 
            for computer science students to understand and visualize greedy algorithms and optimization techniques.
          </p>
        </div>

        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">Covered Syllabus Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/30 border dark:border-blue-800 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 text-sm sm:text-base">Process Scheduling</h3>
              <ul className="text-xs sm:text-sm text-blue-700 dark:text-blue-400 space-y-1">
                <li>• SJF (Shortest Job First)</li>
                <li>• Priority Scheduling</li>
              </ul>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/30 border dark:border-green-800 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2 text-sm sm:text-base">OS: Cloud Task Scheduling</h3>
              <ul className="text-xs sm:text-sm text-green-700 dark:text-green-400 space-y-1">
                <li>• Min-Min Algorithm</li>
                <li>• Max-Min Algorithm</li>
                <li>• FCFS Cloud Scheduling</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/30 border dark:border-purple-800 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2 text-sm sm:text-base">AOA: Fractional Knapsack</h3>
              <ul className="text-xs sm:text-sm text-purple-700 dark:text-purple-400 space-y-1">
                <li>• Greedy Approach</li>
                <li>• Value/Weight Ratio</li>
                <li>• Optimal Solution</li>
              </ul>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-900/30 border dark:border-orange-800 p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold text-orange-800 dark:text-orange-300 mb-2 text-sm sm:text-base">Optimization Techniques</h3>
              <ul className="text-xs sm:text-sm text-orange-700 dark:text-orange-400 space-y-1">
                <li>• Greedy Algorithms</li>
                <li>• Resource Optimization</li>
                <li>• Performance Analysis</li>
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
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">Algorithm Theory & Solving Methods</h2>
          
          {/* Fractional Knapsack Theory */}
          <div className="mb-6">
            <div className="bg-purple-50 dark:bg-purple-900/30 border dark:border-purple-800 p-4 sm:p-6 rounded-lg">
              <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-3 text-sm sm:text-base">Fractional Knapsack Problem Theory</h3>
              <div className="space-y-3 text-purple-700 dark:text-purple-400 text-xs sm:text-sm">
                <div>
                  <strong>Problem Statement:</strong> Given a knapsack with capacity W and n items with values and weights, 
                  select items (or fractions) to maximize total value without exceeding capacity.
                </div>
                <div>
                  <strong>Greedy Strategy:</strong> Always select the item with highest value-to-weight ratio first.
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded border">
                  <strong>Step-by-Step Solution Method:</strong>
                  <ol className="list-decimal list-inside mt-2 space-y-1 text-gray-900 dark:text-gray-100">
                    <li><strong>Step 1:</strong> Calculate profit/weight ratio for each item: Ai = Pi/Wi</li>
                    <li><strong>Step 2:</strong> Arrange objects in descending order of ratios</li>
                    <li><strong>Step 3:</strong> Initialize solution vector X = [x1, x2, x3, ...] = [0, 0, 0, ...]</li>
                    <li><strong>Step 4:</strong> Set current weight = 0, current profit = 0, available capacity = W</li>
                    <li><strong>Step 5:</strong> For each item in sorted order:
                      <ul className="list-disc list-inside ml-4 mt-1">
                        <li>If item weight ≤ remaining capacity: take full item (xi = 1)</li>
                        <li>Else if remaining capacity &gt; 0: take fraction (xi = remaining/weight)</li>
                        <li>Else: skip item (xi = 0)</li>
                      </ul>
                    </li>
                    <li><strong>Step 6:</strong> Calculate total profit = Σ(Pi × xi)</li>
                  </ol>
                </div>
                <div>
                  <strong>Time Complexity:</strong> O(n log n) for sorting + O(n) for selection = O(n log n)
                </div>
                <div>
                  <strong>Space Complexity:</strong> O(1) auxiliary space
                </div>
              </div>
            </div>
          </div>

          {/* Cloud Task Scheduling Theory */}
          <div className="mb-6">
            <div className="bg-green-50 dark:bg-green-900/30 border dark:border-green-800 p-4 sm:p-6 rounded-lg">
              <h3 className="font-semibold text-green-800 dark:text-green-300 mb-3 text-sm sm:text-base">Cloud Task Scheduling Theory</h3>
              <div className="space-y-3 text-green-700 dark:text-green-400 text-xs sm:text-sm">
                <div>
                  <strong>Problem Statement:</strong> Schedule n tasks on m virtual machines (VMs) to minimize makespan 
                  (total completion time) using greedy heuristics.
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded border">
                  <strong>Min-Min Algorithm:</strong>
                  <ol className="list-decimal list-inside mt-2 space-y-1 text-gray-900 dark:text-gray-100">
                    <li><strong>Step 1:</strong> Initialize VM loads = [0, 0, ..., 0]</li>
                    <li><strong>Step 2:</strong> While unscheduled tasks exist:
                      <ul className="list-disc list-inside ml-4 mt-1">
                        <li>For each task, find VM that gives minimum completion time</li>
                        <li>Select task with overall minimum completion time</li>
                        <li>Assign selected task to its best VM</li>
                        <li>Update VM load: VM_load[i] += execution_time</li>
                      </ul>
                    </li>
                    <li><strong>Step 3:</strong> Calculate Makespan = max(VM_loads)</li>
                    <li><strong>Step 4:</strong> Calculate Utilization = Total_Exec_Time / (VMs × Makespan)</li>
                  </ol>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded border">
                  <strong>Max-Min Algorithm:</strong>
                  <ol className="list-decimal list-inside mt-2 space-y-1 text-gray-900 dark:text-gray-100">
                    <li>Similar to Min-Min but selects task with maximum minimum completion time</li>
                    <li>Prioritizes longer tasks first to balance load better</li>
                    <li>Often produces better load balancing than Min-Min</li>
                  </ol>
                </div>
                <div>
                  <strong>Time Complexity:</strong> O(n² × m) where n = tasks, m = VMs
                </div>
                <div>
                  <strong>Objective:</strong> Minimize makespan and maximize resource utilization
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 rounded-lg">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">Conclusion</h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            This simulator provides hands-on experience with optimization algorithms and greedy methods, helping students 
            understand theoretical concepts through practical implementation. Each module includes 
            step-by-step numerical calculations, detailed explanations and visual results to enhance learning outcomes.
          </p>
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Nupur Ingale | Ankita Jalkote | Anjali Mare | Rupali Kashid. 
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home