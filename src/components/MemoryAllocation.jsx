import { useState } from 'react'

function MemoryAllocation() {
  const [algorithm, setAlgorithm] = useState('firstFit')
  const [memoryBlocks, setMemoryBlocks] = useState([100, 500, 200, 300, 600])
  const [processes, setProcesses] = useState([212, 417, 112, 426])
  const [results, setResults] = useState(null)

  // First Fit Algorithm
  const firstFit = (blocks, processes) => {
    const allocation = new Array(processes.length).fill(-1)
    const blocksCopy = [...blocks]
    const allocationDetails = []

    processes.forEach((processSize, i) => {
      for (let j = 0; j < blocksCopy.length; j++) {
        if (blocksCopy[j] >= processSize) {
          allocation[i] = j
          allocationDetails.push({
            processId: i,
            processSize,
            blockId: j,
            blockSize: blocks[j],
            allocated: true,
            internalFragmentation: blocksCopy[j] - processSize
          })
          blocksCopy[j] -= processSize
          break
        }
      }
      
      if (allocation[i] === -1) {
        allocationDetails.push({
          processId: i,
          processSize,
          blockId: -1,
          blockSize: 0,
          allocated: false,
          internalFragmentation: 0
        })
      }
    })

    return { allocation, allocationDetails, remainingBlocks: blocksCopy }
  }

  // Best Fit Algorithm
  const bestFit = (blocks, processes) => {
    const allocation = new Array(processes.length).fill(-1)
    const blocksCopy = [...blocks]
    const allocationDetails = []

    processes.forEach((processSize, i) => {
      let bestIdx = -1
      
      for (let j = 0; j < blocksCopy.length; j++) {
        if (blocksCopy[j] >= processSize) {
          if (bestIdx === -1 || blocksCopy[bestIdx] > blocksCopy[j]) {
            bestIdx = j
          }
        }
      }
      
      if (bestIdx !== -1) {
        allocation[i] = bestIdx
        allocationDetails.push({
          processId: i,
          processSize,
          blockId: bestIdx,
          blockSize: blocks[bestIdx],
          allocated: true,
          internalFragmentation: blocksCopy[bestIdx] - processSize
        })
        blocksCopy[bestIdx] -= processSize
      } else {
        allocationDetails.push({
          processId: i,
          processSize,
          blockId: -1,
          blockSize: 0,
          allocated: false,
          internalFragmentation: 0
        })
      }
    })

    return { allocation, allocationDetails, remainingBlocks: blocksCopy }
  }

  // Worst Fit Algorithm
  const worstFit = (blocks, processes) => {
    const allocation = new Array(processes.length).fill(-1)
    const blocksCopy = [...blocks]
    const allocationDetails = []

    processes.forEach((processSize, i) => {
      let worstIdx = -1
      
      for (let j = 0; j < blocksCopy.length; j++) {
        if (blocksCopy[j] >= processSize) {
          if (worstIdx === -1 || blocksCopy[worstIdx] < blocksCopy[j]) {
            worstIdx = j
          }
        }
      }
      
      if (worstIdx !== -1) {
        allocation[i] = worstIdx
        allocationDetails.push({
          processId: i,
          processSize,
          blockId: worstIdx,
          blockSize: blocks[worstIdx],
          allocated: true,
          internalFragmentation: blocksCopy[worstIdx] - processSize
        })
        blocksCopy[worstIdx] -= processSize
      } else {
        allocationDetails.push({
          processId: i,
          processSize,
          blockId: -1,
          blockSize: 0,
          allocated: false,
          internalFragmentation: 0
        })
      }
    })

    return { allocation, allocationDetails, remainingBlocks: blocksCopy }
  }

  const runAllocation = () => {
    let result
    
    switch (algorithm) {
      case 'firstFit':
        result = firstFit(memoryBlocks, processes)
        break
      case 'bestFit':
        result = bestFit(memoryBlocks, processes)
        break
      case 'worstFit':
        result = worstFit(memoryBlocks, processes)
        break
      default:
        result = firstFit(memoryBlocks, processes)
    }

    const totalInternalFragmentation = result.allocationDetails
      .filter(detail => detail.allocated)
      .reduce((sum, detail) => sum + detail.internalFragmentation, 0)

    const unallocatedProcesses = result.allocationDetails
      .filter(detail => !detail.allocated)

    const externalFragmentation = result.remainingBlocks
      .reduce((sum, block) => sum + block, 0)

    setResults({
      ...result,
      totalInternalFragmentation,
      unallocatedProcesses,
      externalFragmentation,
      algorithmName: algorithm
    })
  }

  const updateMemoryBlock = (index, value) => {
    const updated = [...memoryBlocks]
    updated[index] = parseInt(value) || 0
    setMemoryBlocks(updated)
  }

  const updateProcess = (index, value) => {
    const updated = [...processes]
    updated[index] = parseInt(value) || 0
    setProcesses(updated)
  }

  const addMemoryBlock = () => {
    setMemoryBlocks([...memoryBlocks, 100])
  }

  const addProcess = () => {
    setProcesses([...processes, 100])
  }

  const removeMemoryBlock = (index) => {
    if (memoryBlocks.length > 1) {
      setMemoryBlocks(memoryBlocks.filter((_, i) => i !== index))
    }
  }

  const removeProcess = (index) => {
    if (processes.length > 1) {
      setProcesses(processes.filter((_, i) => i !== index))
    }
  }

  const getAlgorithmName = (algo) => {
    switch (algo) {
      case 'firstFit': return 'First Fit'
      case 'bestFit': return 'Best Fit'
      case 'worstFit': return 'Worst Fit'
      default: return 'First Fit'
    }
  }

  return (
    <div className="min-h-screen px-2 sm:px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4 lg:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">Dynamic Memory Allocation Simulator</h2>
        
        {/* Algorithm Selection */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Algorithm:</label>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
            <label className="flex items-center text-gray-900 dark:text-white text-sm sm:text-base">
              <input
                type="radio"
                value="firstFit"
                checked={algorithm === 'firstFit'}
                onChange={(e) => setAlgorithm(e.target.value)}
                className="mr-2"
              />
              First Fit
            </label>
            <label className="flex items-center text-gray-900 dark:text-white text-sm sm:text-base">
              <input
                type="radio"
                value="bestFit"
                checked={algorithm === 'bestFit'}
                onChange={(e) => setAlgorithm(e.target.value)}
                className="mr-2"
              />
              Best Fit
            </label>
            <label className="flex items-center text-gray-900 dark:text-white text-sm sm:text-base">
              <input
                type="radio"
                value="worstFit"
                checked={algorithm === 'worstFit'}
                onChange={(e) => setAlgorithm(e.target.value)}
                className="mr-2"
              />
              Worst Fit
            </label>
          </div>
        </div>

        {/* Memory Blocks Input */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">Memory Blocks (KB)</h3>
            <button
              onClick={addMemoryBlock}
              className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-blue-600 text-sm sm:text-base w-full sm:w-auto"
            >
              Add Block
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {memoryBlocks.map((block, index) => (
              <div key={index} className="flex flex-col">
                <label className="text-xs sm:text-sm text-gray-600 dark:text-white mb-1">Block {index}</label>
                <div className="flex">
                  <input
                    type="number"
                    value={block}
                    onChange={(e) => updateMemoryBlock(index, e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-l-md px-2 sm:px-3 py-2 flex-1 text-sm sm:text-base"
                    min="1"
                  />
                  <button
                    onClick={() => removeMemoryBlock(index)}
                    className="bg-red-500 text-white px-2 py-2 rounded-r-md hover:bg-red-600 text-sm"
                    disabled={memoryBlocks.length <= 1}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Processes Input */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">Process Sizes (KB)</h3>
            <button
              onClick={addProcess}
              className="bg-green-500 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-green-600 text-sm sm:text-base w-full sm:w-auto"
            >
              Add Process
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {processes.map((process, index) => (
              <div key={index} className="flex flex-col">
                <label className="text-xs sm:text-sm text-gray-600 dark:text-white mb-1">Process {index}</label>
                <div className="flex">
                  <input
                    type="number"
                    value={process}
                    onChange={(e) => updateProcess(index, e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-l-md px-2 sm:px-3 py-2 flex-1 text-sm sm:text-base"
                    min="1"
                  />
                  <button
                    onClick={() => removeProcess(index)}
                    className="bg-red-500 text-white px-2 py-2 rounded-r-md hover:bg-red-600 text-sm"
                    disabled={processes.length <= 1}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Run Algorithm Button */}
        <div className="mb-4 sm:mb-6">
          <button
            onClick={runAllocation}
            className="bg-purple-500 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-purple-600 w-full sm:w-auto text-sm sm:text-base"
          >
            Allocate Memory
          </button>
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
              Results - {getAlgorithmName(results.algorithmName)}
            </h3>
            
            {/* Allocation Table */}
            <div className="overflow-x-auto border rounded">
              <table className="w-full border-collapse" style={{ minWidth: '900px' }}>
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">Process ID</th>
                    <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">Process Size (KB)</th>
                    <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">Block ID</th>
                    <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">Block Size (KB)</th>
                    <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">Status</th>
                    <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">Internal Fragmentation</th>
                  </tr>
                </thead>
                <tbody>
                  {results.allocationDetails.map((detail, index) => (
                    <tr key={index} className={`${detail.allocated ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}>
                      <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-center text-xs sm:text-sm whitespace-nowrap">P{detail.processId}</td>
                      <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-center text-xs sm:text-sm whitespace-nowrap">{detail.processSize}</td>
                      <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-center text-xs sm:text-sm whitespace-nowrap">
                        {detail.allocated ? `Block ${detail.blockId}` : 'Not Allocated'}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-center text-xs sm:text-sm whitespace-nowrap">
                        {detail.allocated ? detail.blockSize : '-'}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${
                          detail.allocated 
                            ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200' 
                            : 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200'
                        }`}>
                          {detail.allocated ? 'Allocated' : 'Failed'}
                        </span>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-center text-xs sm:text-sm whitespace-nowrap">
                        {detail.allocated ? `${detail.internalFragmentation} KB` : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 sm:p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 text-sm sm:text-base">Internal Fragmentation</h4>
                <p className="text-blue-700 dark:text-blue-400 text-sm sm:text-base">{results.totalInternalFragmentation} KB</p>
                <p className="text-xs text-blue-600 dark:text-blue-500 mt-1">
                  Wasted space within allocated blocks
                </p>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/30 p-3 sm:p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2 text-sm sm:text-base">External Fragmentation</h4>
                <p className="text-orange-700 dark:text-orange-400 text-sm sm:text-base">{results.externalFragmentation} KB</p>
                <p className="text-xs text-orange-600 dark:text-orange-500 mt-1">
                  Total free space in remaining blocks
                </p>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/30 p-3 sm:p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2 text-sm sm:text-base">Unallocated Processes</h4>
                <p className="text-red-700 dark:text-red-400 text-sm sm:text-base">{results.unallocatedProcesses.length}</p>
                <p className="text-xs text-red-600 dark:text-red-500 mt-1">
                  Processes that couldn't be allocated
                </p>
              </div>
            </div>

            {/* Unallocated Processes */}
            {results.unallocatedProcesses.length > 0 && (
              <div className="bg-red-50 dark:bg-red-900/30 p-3 sm:p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2 text-sm sm:text-base">Unallocated Processes</h4>
                <div className="flex flex-wrap gap-2">
                  {results.unallocatedProcesses.map((process, index) => (
                    <span key={index} className="bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 px-2 py-1 rounded text-xs sm:text-sm">
                      P{process.processId} ({process.processSize} KB)
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Algorithm Explanations */}
            <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2 text-sm sm:text-base">Algorithm Explanation</h4>
              <div className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm space-y-2">
                {algorithm === 'firstFit' && (
                  <p>
                    <strong>First Fit:</strong> Allocates the first memory block that is large enough to accommodate the process. 
                    Fast but can lead to fragmentation as it doesn't consider the size efficiency.
                  </p>
                )}
                {algorithm === 'bestFit' && (
                  <p>
                    <strong>Best Fit:</strong> Allocates the smallest memory block that can accommodate the process. 
                    Minimizes wasted space but can be slower and may create many small unusable fragments.
                  </p>
                )}
                {algorithm === 'worstFit' && (
                  <p>
                    <strong>Worst Fit:</strong> Allocates the largest available memory block to the process. 
                    Leaves larger remaining blocks but may waste more memory overall.
                  </p>
                )}
                <div className="mt-3 pt-3 border-t border-gray-300 dark:border-gray-600">
                  <h5 className="font-semibold text-gray-800 dark:text-white mb-2 text-xs sm:text-sm">Key Formulas:</h5>
                  <div className="space-y-1">
                    <div className="font-mono bg-white dark:bg-gray-800 p-2 rounded border text-gray-900 dark:text-gray-100 text-xs overflow-x-auto">
                      Internal Fragmentation = Block Size - Process Size
                    </div>
                    <div className="font-mono bg-white dark:bg-gray-800 p-2 rounded border text-gray-900 dark:text-gray-100 text-xs overflow-x-auto">
                      External Fragmentation = Sum of all remaining free blocks
                    </div>
                  </div>
                  <div className="mt-2 text-xs">
                    <p><strong>Internal Fragmentation:</strong> Unused memory within allocated blocks.</p>
                    <p><strong>External Fragmentation:</strong> Free memory that exists but cannot be used due to size constraints.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default MemoryAllocation