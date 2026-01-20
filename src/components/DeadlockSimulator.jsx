import { useState } from 'react'

function DeadlockSimulator() {
  const [numProcesses, setNumProcesses] = useState(3)
  const [numResources, setNumResources] = useState(3)
  const [allocation, setAllocation] = useState([
    [0, 1, 0],
    [2, 0, 0],
    [3, 0, 2]
  ])
  const [maximum, setMaximum] = useState([
    [7, 5, 3],
    [3, 2, 2],
    [9, 0, 2]
  ])
  const [available, setAvailable] = useState([3, 3, 2])
  const [results, setResults] = useState(null)

  // Banker's Algorithm Implementation
  const bankersAlgorithm = () => {
    const processes = numProcesses
    const resources = numResources
    
    // Calculate Need matrix
    const need = []
    for (let i = 0; i < processes; i++) {
      need[i] = []
      for (let j = 0; j < resources; j++) {
        need[i][j] = maximum[i][j] - allocation[i][j]
      }
    }

    // Available resources copy
    const work = [...available]
    const finish = new Array(processes).fill(false)
    const safeSequence = []
    const steps = []

    let found = true
    while (found && safeSequence.length < processes) {
      found = false
      
      for (let i = 0; i < processes; i++) {
        if (!finish[i]) {
          // Check if need[i] <= work
          let canAllocate = true
          for (let j = 0; j < resources; j++) {
            if (need[i][j] > work[j]) {
              canAllocate = false
              break
            }
          }
          
          if (canAllocate) {
            // Add allocation to work
            for (let j = 0; j < resources; j++) {
              work[j] += allocation[i][j]
            }
            
            finish[i] = true
            safeSequence.push(`P${i}`)
            found = true
            
            steps.push({
              process: `P${i}`,
              need: [...need[i]],
              work: [...work],
              allocated: [...allocation[i]]
            })
            break
          }
        }
      }
    }

    const isSafe = safeSequence.length === processes
    
    return {
      isSafe,
      safeSequence,
      need,
      steps,
      message: isSafe 
        ? `System is in SAFE state. Safe sequence: ${safeSequence.join(' → ')}`
        : 'System is in UNSAFE state. Deadlock may occur!'
    }
  }

  const updateMatrix = (matrix, setMatrix, row, col, value) => {
    const newMatrix = [...matrix]
    newMatrix[row][col] = parseInt(value) || 0
    setMatrix(newMatrix)
  }

  const updateAvailable = (index, value) => {
    const newAvailable = [...available]
    newAvailable[index] = parseInt(value) || 0
    setAvailable(newAvailable)
  }

  const resizeMatrices = (newProcesses, newResources) => {
    // Resize allocation matrix
    const newAllocation = []
    for (let i = 0; i < newProcesses; i++) {
      newAllocation[i] = []
      for (let j = 0; j < newResources; j++) {
        newAllocation[i][j] = (allocation[i] && allocation[i][j]) || 0
      }
    }
    
    // Resize maximum matrix
    const newMaximum = []
    for (let i = 0; i < newProcesses; i++) {
      newMaximum[i] = []
      for (let j = 0; j < newResources; j++) {
        newMaximum[i][j] = (maximum[i] && maximum[i][j]) || 0
      }
    }
    
    // Resize available array
    const newAvailable = []
    for (let j = 0; j < newResources; j++) {
      newAvailable[j] = available[j] || 0
    }
    
    setAllocation(newAllocation)
    setMaximum(newMaximum)
    setAvailable(newAvailable)
  }

  const handleProcessChange = (value) => {
    const newProcesses = parseInt(value) || 1
    setNumProcesses(newProcesses)
    resizeMatrices(newProcesses, numResources)
  }

  const handleResourceChange = (value) => {
    const newResources = parseInt(value) || 1
    setNumResources(newResources)
    resizeMatrices(numProcesses, newResources)
  }

  const runBankersAlgorithm = () => {
    const result = bankersAlgorithm()
    setResults(result)
  }

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4 lg:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">Deadlock Avoidance - Banker's Algorithm</h2>
        
        {/* Input Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Number of Processes:</label>
            <input
              type="number"
              value={numProcesses}
              onChange={(e) => handleProcessChange(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md px-3 py-2 w-full sm:w-20 text-sm sm:text-base"
              min="1"
              max="10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Number of Resources:</label>
            <input
              type="number"
              value={numResources}
              onChange={(e) => handleResourceChange(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md px-3 py-2 w-full sm:w-20 text-sm sm:text-base"
              min="1"
              max="10"
            />
          </div>
        </div>

        {/* Available Resources */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Available Resources</h3>
          <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-2">
            {available.map((resource, index) => (
              <div key={index} className="flex flex-col items-center">
                <label className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">R{index}</label>
                <input
                  type="number"
                  value={resource}
                  onChange={(e) => updateAvailable(index, e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md px-2 py-1 w-full sm:w-16 text-center text-sm"
                  min="0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Allocation Matrix */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Allocation Matrix</h3>
          <div className="overflow-x-auto">
            <table className="border border-gray-300 dark:border-gray-600 w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-3 py-2 text-xs sm:text-sm">Process</th>
                  {Array.from({ length: numResources }, (_, i) => (
                    <th key={i} className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-3 py-2 text-xs sm:text-sm">R{i}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allocation.map((row, i) => (
                  <tr key={i} className="bg-white dark:bg-gray-800">
                    <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-3 py-2 text-center font-medium text-xs sm:text-sm">P{i}</td>
                    {row.map((cell, j) => (
                      <td key={j} className="border border-gray-300 dark:border-gray-600 px-1 sm:px-2 py-1">
                        <input
                          type="number"
                          value={cell}
                          onChange={(e) => updateMatrix(allocation, setAllocation, i, j, e.target.value)}
                          className="w-full text-center border-0 bg-transparent text-gray-900 dark:text-white focus:outline-none text-xs sm:text-sm"
                          min="0"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Maximum Matrix */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Maximum Matrix</h3>
          <div className="overflow-x-auto">
            <table className="border border-gray-300 dark:border-gray-600 w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-3 py-2 text-xs sm:text-sm">Process</th>
                  {Array.from({ length: numResources }, (_, i) => (
                    <th key={i} className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-3 py-2 text-xs sm:text-sm">R{i}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {maximum.map((row, i) => (
                  <tr key={i} className="bg-white dark:bg-gray-800">
                    <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-3 py-2 text-center font-medium text-xs sm:text-sm">P{i}</td>
                    {row.map((cell, j) => (
                      <td key={j} className="border border-gray-300 dark:border-gray-600 px-1 sm:px-2 py-1">
                        <input
                          type="number"
                          value={cell}
                          onChange={(e) => updateMatrix(maximum, setMaximum, i, j, e.target.value)}
                          className="w-full text-center border-0 bg-transparent text-gray-900 dark:text-white focus:outline-none text-xs sm:text-sm"
                          min="0"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Run Algorithm Button */}
        <div className="mb-4 sm:mb-6">
          <button
            onClick={runBankersAlgorithm}
            className="bg-green-500 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-green-600 w-full sm:w-auto text-sm sm:text-base"
          >
            Check Safe State
          </button>
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-4 sm:space-y-6">
            <div className={`p-3 sm:p-4 rounded-lg ${results.isSafe ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}>
              <h3 className={`text-base sm:text-lg font-semibold mb-2 ${results.isSafe ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                Result
              </h3>
              <p className={`text-sm sm:text-base ${results.isSafe ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                {results.message}
              </p>
            </div>

            {/* Need Matrix */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Need Matrix (Max - Allocation)</h4>
              <div className="overflow-x-auto">
                <table className="border border-gray-300 dark:border-gray-600 w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-3 py-2 text-xs sm:text-sm">Process</th>
                      {Array.from({ length: numResources }, (_, i) => (
                        <th key={i} className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-3 py-2 text-xs sm:text-sm">R{i}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {results.need.map((row, i) => (
                      <tr key={i} className="bg-white dark:bg-gray-800">
                        <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-3 py-2 text-center font-medium text-xs sm:text-sm">P{i}</td>
                        {row.map((cell, j) => (
                          <td key={j} className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-3 py-2 text-center text-xs sm:text-sm">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Step-by-step execution */}
            {results.isSafe && (
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Step-by-step Execution</h4>
                <div className="space-y-2">
                  {results.steps.map((step, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                      <p className="text-xs sm:text-sm text-gray-900 dark:text-white">
                        <strong>Step {index + 1}:</strong> Process {step.process} can be allocated.
                        Need: [{step.need.join(', ')}], Available after completion: [{step.work.join(', ')}]
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2 text-sm sm:text-base">Banker's Algorithm Explanation</h4>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
                The Banker's Algorithm is a deadlock avoidance algorithm. It checks if granting a resource request 
                will leave the system in a safe state. A safe state means there exists a sequence of process execution 
                where all processes can complete without deadlock. The algorithm calculates the Need matrix (Max - Allocation) 
                and finds a safe sequence by checking if each process's need can be satisfied with available resources.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DeadlockSimulator