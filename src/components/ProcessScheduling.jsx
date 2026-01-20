import { useState } from 'react'

function ProcessScheduling() {
  const [algorithm, setAlgorithm] = useState('fcfs')
  const [processes, setProcesses] = useState([
    { id: 'P1', arrivalTime: 0, burstTime: 5, priority: 1 },
    { id: 'P2', arrivalTime: 1, burstTime: 3, priority: 2 },
    { id: 'P3', arrivalTime: 2, burstTime: 8, priority: 3 }
  ])
  const [timeQuantum, setTimeQuantum] = useState(2)
  const [results, setResults] = useState(null)
  const [ganttChart, setGanttChart] = useState([])

  // FCFS Algorithm
  const fcfsScheduling = (processes) => {
    const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime)
    let currentTime = 0
    const results = []
    const gantt = []

    sorted.forEach(process => {
      // Add idle time if CPU is idle
      if (currentTime < process.arrivalTime) {
        gantt.push({ processId: 'IDLE', startTime: currentTime, endTime: process.arrivalTime })
        currentTime = process.arrivalTime
      }
      
      const startTime = currentTime
      const completionTime = startTime + process.burstTime
      const turnaroundTime = completionTime - process.arrivalTime
      const waitingTime = turnaroundTime - process.burstTime

      results.push({
        ...process,
        startTime,
        completionTime,
        turnaroundTime,
        waitingTime
      })

      gantt.push({ processId: process.id, startTime, endTime: completionTime })
      currentTime = completionTime
    })

    return { results, gantt }
  }

  // SJF Algorithm
  const sjfScheduling = (processes) => {
    const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime)
    const results = []
    const gantt = []
    let currentTime = 0
    const completed = new Set()
    let idleStart = null

    while (completed.size < processes.length) {
      const available = sorted.filter(p => 
        p.arrivalTime <= currentTime && !completed.has(p.id)
      )

      if (available.length === 0) {
        if (idleStart === null) idleStart = currentTime
        currentTime++
        continue
      }

      // Add idle time if there was any
      if (idleStart !== null) {
        gantt.push({ processId: 'IDLE', startTime: idleStart, endTime: currentTime })
        idleStart = null
      }

      const shortest = available.reduce((min, p) => 
        p.burstTime < min.burstTime ? p : min
      )

      const startTime = currentTime
      const completionTime = startTime + shortest.burstTime
      const turnaroundTime = completionTime - shortest.arrivalTime
      const waitingTime = turnaroundTime - shortest.burstTime

      results.push({
        ...shortest,
        startTime,
        completionTime,
        turnaroundTime,
        waitingTime
      })

      gantt.push({ processId: shortest.id, startTime, endTime: completionTime })
      completed.add(shortest.id)
      currentTime = completionTime
    }

    return { results: results.sort((a, b) => a.id.localeCompare(b.id)), gantt }
  }

  // Round Robin Algorithm
  const roundRobinScheduling = (processes, quantum) => {
    const queue = [...processes].map(p => ({ ...p, remainingTime: p.burstTime }))
    queue.sort((a, b) => a.arrivalTime - b.arrivalTime)
    
    const results = []
    const gantt = []
    let currentTime = 0
    let i = 0
    const readyQueue = []
    let processIndex = 0

    // Start from the earliest arrival time
    if (queue.length > 0) {
      currentTime = queue[0].arrivalTime
      if (currentTime > 0) {
        gantt.push({ processId: 'IDLE', startTime: 0, endTime: currentTime })
      }
    }

    while (queue.some(p => p.remainingTime > 0) || readyQueue.length > 0) {
      // Add newly arrived processes to ready queue
      while (processIndex < queue.length && queue[processIndex].arrivalTime <= currentTime) {
        readyQueue.push(queue[processIndex])
        processIndex++
      }

      if (readyQueue.length === 0) {
        // CPU is idle, advance to next process arrival
        const nextArrival = queue.find(p => p.arrivalTime > currentTime)
        if (nextArrival) {
          gantt.push({ processId: 'IDLE', startTime: currentTime, endTime: nextArrival.arrivalTime })
          currentTime = nextArrival.arrivalTime
        }
        continue
      }

      const process = readyQueue.shift()
      
      if (process.remainingTime > 0) {
        const executeTime = Math.min(quantum, process.remainingTime)
        const startTime = currentTime
        process.remainingTime -= executeTime
        currentTime += executeTime
        
        gantt.push({ processId: process.id, startTime, endTime: currentTime })

        if (process.remainingTime === 0) {
          const completionTime = currentTime
          const turnaroundTime = completionTime - process.arrivalTime
          const waitingTime = turnaroundTime - process.burstTime

          results.push({
            ...process,
            completionTime,
            turnaroundTime,
            waitingTime
          })
        } else {
          // Add newly arrived processes before re-adding current process
          const tempQueue = []
          while (processIndex < queue.length && queue[processIndex].arrivalTime <= currentTime) {
            tempQueue.push(queue[processIndex])
            processIndex++
          }
          readyQueue.push(...tempQueue, process)
        }
      }
    }

    return { results: results.sort((a, b) => a.id.localeCompare(b.id)), gantt }
  }

  // Priority Scheduling (Non-preemptive)
  const priorityScheduling = (processes) => {
    const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime)
    const results = []
    const gantt = []
    let currentTime = 0
    const completed = new Set()
    let idleStart = null

    while (completed.size < processes.length) {
      const available = sorted.filter(p => 
        p.arrivalTime <= currentTime && !completed.has(p.id)
      )

      if (available.length === 0) {
        if (idleStart === null) idleStart = currentTime
        currentTime++
        continue
      }

      // Add idle time if there was any
      if (idleStart !== null) {
        gantt.push({ processId: 'IDLE', startTime: idleStart, endTime: currentTime })
        idleStart = null
      }

      const highest = available.reduce((max, p) => 
        p.priority < max.priority ? p : max // Lower number = higher priority
      )

      const startTime = currentTime
      const completionTime = startTime + highest.burstTime
      const turnaroundTime = completionTime - highest.arrivalTime
      const waitingTime = turnaroundTime - highest.burstTime

      results.push({
        ...highest,
        startTime,
        completionTime,
        turnaroundTime,
        waitingTime
      })

      gantt.push({ processId: highest.id, startTime, endTime: completionTime })
      completed.add(highest.id)
      currentTime = completionTime
    }

    return { results: results.sort((a, b) => a.id.localeCompare(b.id)), gantt }
  }

  // SRTF Algorithm (Preemptive SJF)
  const srtfScheduling = (processes) => {
    const queue = [...processes].map(p => ({ ...p, remainingTime: p.burstTime }))
    const results = []
    const gantt = []
    let currentTime = 0
    const completed = new Set()

    while (completed.size < processes.length) {
      const available = queue.filter(p => 
        p.arrivalTime <= currentTime && p.remainingTime > 0
      )

      if (available.length === 0) {
        if (gantt.length === 0 || gantt[gantt.length - 1].processId !== 'IDLE') {
          gantt.push({ processId: 'IDLE', startTime: currentTime, endTime: currentTime + 1 })
        } else {
          gantt[gantt.length - 1].endTime = currentTime + 1
        }
        currentTime++
        continue
      }

      const shortest = available.reduce((min, p) => 
        p.remainingTime < min.remainingTime ? p : min
      )

      const startTime = currentTime
      shortest.remainingTime--
      currentTime++

      if (gantt.length === 0 || gantt[gantt.length - 1].processId !== shortest.id) {
        gantt.push({ processId: shortest.id, startTime, endTime: currentTime })
      } else {
        gantt[gantt.length - 1].endTime = currentTime
      }

      if (shortest.remainingTime === 0) {
        const completionTime = currentTime
        const turnaroundTime = completionTime - shortest.arrivalTime
        const waitingTime = turnaroundTime - shortest.burstTime

        results.push({
          ...shortest,
          completionTime,
          turnaroundTime,
          waitingTime
        })
        completed.add(shortest.id)
      }
    }

    return { results: results.sort((a, b) => a.id.localeCompare(b.id)), gantt }
  }

  // Multilevel Queue Scheduling
  const multilevelQueueScheduling = (processes) => {
    // Divide processes into queues based on priority
    const systemQueue = processes.filter(p => p.priority === 1) // Highest priority
    const interactiveQueue = processes.filter(p => p.priority === 2)
    const batchQueue = processes.filter(p => p.priority >= 3) // Lowest priority

    const results = []
    const gantt = []
    let currentTime = 0

    // Find the earliest arrival time
    const allProcesses = [...systemQueue, ...interactiveQueue, ...batchQueue]
    if (allProcesses.length > 0) {
      const earliestArrival = Math.min(...allProcesses.map(p => p.arrivalTime))
      if (earliestArrival > 0) {
        gantt.push({ processId: 'IDLE', startTime: 0, endTime: earliestArrival })
        currentTime = earliestArrival
      }
    }

    // Process system queue first (FCFS)
    const processQueue = (queue, queueName) => {
      const sorted = queue.sort((a, b) => a.arrivalTime - b.arrivalTime)
      sorted.forEach(process => {
        // Add idle time if needed
        if (currentTime < process.arrivalTime) {
          gantt.push({ processId: 'IDLE', startTime: currentTime, endTime: process.arrivalTime })
          currentTime = process.arrivalTime
        }
        
        const startTime = currentTime
        const completionTime = startTime + process.burstTime
        const turnaroundTime = completionTime - process.arrivalTime
        const waitingTime = turnaroundTime - process.burstTime

        results.push({
          ...process,
          startTime,
          completionTime,
          turnaroundTime,
          waitingTime,
          queue: queueName
        })

        gantt.push({ processId: process.id, startTime, endTime: completionTime })
        currentTime = completionTime
      })
    }

    processQueue(systemQueue, 'System')
    processQueue(interactiveQueue, 'Interactive')
    processQueue(batchQueue, 'Batch')

    return { results: results.sort((a, b) => a.id.localeCompare(b.id)), gantt }
  }

  const calculateResults = () => {
    let schedulingResults
    
    switch (algorithm) {
      case 'fcfs':
        schedulingResults = fcfsScheduling(processes)
        break
      case 'sjf':
        schedulingResults = sjfScheduling(processes)
        break
      case 'rr':
        schedulingResults = roundRobinScheduling(processes, timeQuantum)
        break
      case 'priority':
        schedulingResults = priorityScheduling(processes)
        break
      case 'srtf':
        schedulingResults = srtfScheduling(processes)
        break
      case 'multilevel':
        schedulingResults = multilevelQueueScheduling(processes)
        break
      default:
        schedulingResults = fcfsScheduling(processes)
    }

    const { results: processResults, gantt } = schedulingResults
    const avgWaitingTime = processResults.reduce((sum, p) => sum + p.waitingTime, 0) / processResults.length
    const avgTurnaroundTime = processResults.reduce((sum, p) => sum + p.turnaroundTime, 0) / processResults.length

    setResults({
      processes: processResults,
      avgWaitingTime: avgWaitingTime.toFixed(2),
      avgTurnaroundTime: avgTurnaroundTime.toFixed(2)
    })
    setGanttChart(gantt)
  }

  const addProcess = () => {
    const newId = `P${processes.length + 1}`
    setProcesses([...processes, { id: newId, arrivalTime: 0, burstTime: 1, priority: 1 }])
  }

  const updateProcess = (index, field, value) => {
    const updated = [...processes]
    updated[index][field] = parseInt(value) || 0
    setProcesses(updated)
  }

  const removeProcess = (index) => {
    if (processes.length > 1) {
      setProcesses(processes.filter((_, i) => i !== index))
    }
  }

  const getAlgorithmExplanation = () => {
    const explanations = {
      fcfs: (
        <div>
          <p><strong>FCFS (First Come First Serve):</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Non-preemptive scheduling algorithm</li>
            <li>Processes are executed in arrival order</li>
            <li>Simple implementation but can cause convoy effect</li>
            <li>Long processes can delay shorter ones</li>
            <li>No starvation as every process gets CPU time</li>
            <li>Poor average waiting time performance</li>
          </ul>
        </div>
      ),
      sjf: (
        <div>
          <p><strong>SJF (Shortest Job First):</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Non-preemptive scheduling algorithm</li>
            <li>Selects process with shortest burst time</li>
            <li>Optimal for minimizing average waiting time</li>
            <li>Can cause starvation of longer processes</li>
            <li>Requires knowledge of burst time in advance</li>
            <li>Difficult to implement in practice</li>
          </ul>
        </div>
      ),
      rr: (
        <div>
          <p><strong>Round Robin (RR):</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Preemptive scheduling algorithm</li>
            <li>Each process gets a fixed time quantum to execute</li>
            <li>After time quantum expires, process moves to end of ready queue</li>
            <li>Fair allocation of CPU time to all processes</li>
            <li>Performance depends heavily on time quantum value</li>
            <li>Better response time for interactive systems</li>
          </ul>
          <p className="mt-2"><strong>Time Quantum Used:</strong> {timeQuantum} ms</p>
        </div>
      ),
      priority: (
        <div>
          <p><strong>Priority Scheduling:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Non-preemptive scheduling algorithm</li>
            <li>Processes with higher priority (lower number) execute first</li>
            <li>Can be implemented with or without preemption</li>
            <li>May cause starvation of low-priority processes</li>
            <li>Priority inversion problem can occur</li>
            <li>Aging technique can prevent starvation</li>
          </ul>
          <p className="mt-2"><strong>Priority Rule:</strong> Lower number = Higher priority</p>
        </div>
      ),
      srtf: (
        <div>
          <p><strong>SRTF (Shortest Remaining Time First):</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Preemptive version of SJF algorithm</li>
            <li>Selects process with shortest remaining time</li>
            <li>Optimal for minimizing average waiting time</li>
            <li>High context switching overhead</li>
            <li>Can cause starvation of longer processes</li>
            <li>Requires continuous monitoring of remaining times</li>
          </ul>
        </div>
      ),
      multilevel: (
        <div>
          <p><strong>Multilevel Queue Scheduling:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Processes divided into separate queues by priority</li>
            <li>System Queue (Priority 1): Highest priority processes</li>
            <li>Interactive Queue (Priority 2): Medium priority processes</li>
            <li>Batch Queue (Priority 3+): Lowest priority processes</li>
            <li>Each queue can have different scheduling algorithm</li>
            <li>No process movement between queues</li>
          </ul>
          <p className="mt-2"><strong>Queue Priority:</strong> System &gt; Interactive &gt; Batch</p>
        </div>
      )
    }
    return explanations[algorithm] || ""
  }

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4 lg:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">Process Scheduling Simulator</h2>
        
        {/* Algorithm Selection */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Algorithm:</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
            {[
              { value: 'fcfs', label: 'FCFS' },
              { value: 'sjf', label: 'SJF' },
              { value: 'rr', label: 'Round Robin' },
              { value: 'priority', label: 'Priority' },
              { value: 'srtf', label: 'SRTF' },
              { value: 'multilevel', label: 'Multilevel Queue' }
            ].map(alg => (
              <label key={alg.value} className="flex items-center text-gray-900 dark:text-white text-sm sm:text-base">
                <input
                  type="radio"
                  value={alg.value}
                  checked={algorithm === alg.value}
                  onChange={(e) => setAlgorithm(e.target.value)}
                  className="mr-2"
                />
                {alg.label}
              </label>
            ))}
          </div>
        </div>

        {/* Time Quantum for Round Robin */}
        {algorithm === 'rr' && (
          <div className="mb-4 sm:mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time Quantum:</label>
            <input
              type="number"
              value={timeQuantum}
              onChange={(e) => setTimeQuantum(parseInt(e.target.value) || 1)}
              className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md px-3 py-2 w-20 text-sm sm:text-base"
              min="1"
            />
          </div>
        )}

        {/* Process Input Table */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">Process Details</h3>
            <button
              onClick={addProcess}
              className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-blue-600 text-sm sm:text-base w-full sm:w-auto"
            >
              Add Process
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 dark:border-gray-600">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-xs sm:text-sm">Process ID</th>
                  <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-xs sm:text-sm">Arrival Time</th>
                  <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-xs sm:text-sm">Burst Time</th>
                  {(algorithm === 'priority' || algorithm === 'multilevel') && <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-xs sm:text-sm">Priority</th>}
                  <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-xs sm:text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {processes.map((process, index) => (
                  <tr key={process.id} className="bg-white dark:bg-gray-800">
                    <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-center text-xs sm:text-sm">{process.id}</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-2 sm:px-4 py-2">
                      <input
                        type="number"
                        value={process.arrivalTime}
                        onChange={(e) => updateProcess(index, 'arrivalTime', e.target.value)}
                        className="w-full border-0 bg-transparent text-gray-900 dark:text-white text-center focus:outline-none text-xs sm:text-sm"
                        min="0"
                      />
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-2 sm:px-4 py-2">
                      <input
                        type="number"
                        value={process.burstTime}
                        onChange={(e) => updateProcess(index, 'burstTime', e.target.value)}
                        className="w-full border-0 bg-transparent text-gray-900 dark:text-white text-center focus:outline-none text-xs sm:text-sm"
                        min="1"
                      />
                    </td>
                    {(algorithm === 'priority' || algorithm === 'multilevel') && (
                      <td className="border border-gray-300 dark:border-gray-600 px-2 sm:px-4 py-2">
                        <input
                          type="number"
                          value={process.priority}
                          onChange={(e) => updateProcess(index, 'priority', e.target.value)}
                          className="w-full border-0 bg-transparent text-gray-900 dark:text-white text-center focus:outline-none text-xs sm:text-sm"
                          min="1"
                        />
                      </td>
                    )}
                    <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-center">
                      <button
                        onClick={() => removeProcess(index)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-xs sm:text-sm"
                        disabled={processes.length <= 1}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="mb-4 sm:mb-6">
          <button
            onClick={calculateResults}
            className="bg-green-500 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-green-600 w-full sm:w-auto text-sm sm:text-base"
          >
            Calculate Schedule
          </button>
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">Results</h3>
            
            {/* Gantt Chart */}
            <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2 text-sm sm:text-base">Gantt Chart</h4>
              <div className="overflow-x-auto border rounded">
                <div className="flex items-center gap-0.5 sm:gap-1 p-2" style={{ width: 'max-content', minWidth: '100%' }}>
                  {ganttChart.map((segment, index) => (
                    <div key={index} className="flex flex-col items-center flex-shrink-0">
                      <div 
                        className={`${segment.processId === 'IDLE' ? 'bg-gray-400 text-gray-700' : 'bg-blue-500 text-white'} px-2 py-1 text-xs border border-gray-300 whitespace-nowrap flex items-center justify-center`}
                        style={{ 
                          minWidth: `${Math.max(50, (segment.endTime - segment.startTime) * 20)}px`,
                          width: `${Math.max(50, (segment.endTime - segment.startTime) * 20)}px`
                        }}
                      >
                        {segment.processId}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 mt-1 whitespace-nowrap">
                        {segment.startTime}-{segment.endTime}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto border rounded">
              <table className="w-full border-collapse" style={{ minWidth: '800px' }}>
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">Process ID</th>
                    <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">Arrival Time</th>
                    <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">Burst Time</th>
                    {(algorithm === 'priority' || algorithm === 'multilevel') && <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">Priority</th>}
                    <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">Completion Time</th>
                    <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">Turnaround Time</th>
                    <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">Waiting Time</th>
                    {algorithm === 'multilevel' && <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">Queue</th>}
                  </tr>
                </thead>
                <tbody>
                  {results.processes.map((process) => (
                    <tr key={process.id} className="bg-white dark:bg-gray-800">
                      <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-center text-xs sm:text-sm whitespace-nowrap">{process.id}</td>
                      <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-center text-xs sm:text-sm whitespace-nowrap">{process.arrivalTime}</td>
                      <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-center text-xs sm:text-sm whitespace-nowrap">{process.burstTime}</td>
                      {(algorithm === 'priority' || algorithm === 'multilevel') && <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-center text-xs sm:text-sm whitespace-nowrap">{process.priority}</td>}
                      <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-center text-xs sm:text-sm whitespace-nowrap">{process.completionTime}</td>
                      <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-center text-xs sm:text-sm whitespace-nowrap">{process.turnaroundTime}</td>
                      <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-center text-xs sm:text-sm whitespace-nowrap">{process.waitingTime}</td>
                      {algorithm === 'multilevel' && <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-center text-xs sm:text-sm whitespace-nowrap">{process.queue}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 sm:p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 text-sm sm:text-base">Performance Metrics</h4>
              <p className="text-blue-700 dark:text-blue-400 text-sm sm:text-base">Average Waiting Time: {results.avgWaitingTime} units</p>
              <p className="text-blue-700 dark:text-blue-400 text-sm sm:text-base">Average Turnaround Time: {results.avgTurnaroundTime} units</p>
              <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-700">
                <h5 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 text-sm sm:text-base">Formulas Used:</h5>
                <div className="space-y-1 text-sm">
                  <div className="font-mono bg-white dark:bg-gray-800 p-2 rounded border text-blue-700 dark:text-blue-400 text-gray-900 dark:text-gray-100 text-xs sm:text-sm overflow-x-auto">
                    Turnaround Time = Completion Time - Arrival Time
                  </div>
                  <div className="font-mono bg-white dark:bg-gray-800 p-2 rounded border text-blue-700 dark:text-blue-400 text-gray-900 dark:text-gray-100 text-xs sm:text-sm overflow-x-auto">
                    Waiting Time = Turnaround Time - Burst Time
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2 text-sm sm:text-base">Algorithm Explanation</h4>
              <div className="text-gray-600 dark:text-gray-300 text-sm">{getAlgorithmExplanation()}</div>
              <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
                <h5 className="font-semibold text-gray-800 dark:text-white mb-2 text-sm sm:text-base">Key Formulas:</h5>
                <div className="space-y-2">
                  <div className="font-mono text-xs sm:text-sm bg-white dark:bg-gray-800 p-2 rounded border text-gray-900 dark:text-gray-100 overflow-x-auto">
                    Turnaround Time = Completion Time - Arrival Time
                  </div>
                  <div className="font-mono text-xs sm:text-sm bg-white dark:bg-gray-800 p-2 rounded border text-gray-900 dark:text-gray-100 overflow-x-auto">
                    Waiting Time = Turnaround Time - Burst Time
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProcessScheduling