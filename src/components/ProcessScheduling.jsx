import { useState } from 'react'

function ProcessScheduling() {
  const [algorithm, setAlgorithm] = useState('sjf')
  const [processes, setProcesses] = useState([
    { id: 'P1', arrivalTime: 0, burstTime: 5, priority: 1 },
    { id: 'P2', arrivalTime: 1, burstTime: 3, priority: 2 },
    { id: 'P3', arrivalTime: 2, burstTime: 8, priority: 3 }
  ])
  const [timeQuantum, setTimeQuantum] = useState(2)
  const [results, setResults] = useState(null)
  const [ganttChart, setGanttChart] = useState([])

  // SJF Algorithm with step-by-step explanation
  const sjfScheduling = (processes) => {
    const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime)
    const results = []
    const gantt = []
    const steps = []
    let currentTime = 0
    const completed = new Set()
    let idleStart = null
    let stepNumber = 1

    while (completed.size < processes.length) {
      const available = sorted.filter(p => 
        p.arrivalTime <= currentTime && !completed.has(p.id)
      )

      if (available.length === 0) {
        if (idleStart === null) idleStart = currentTime
        currentTime++
        continue
      }

      if (idleStart !== null) {
        gantt.push({ processId: 'IDLE', startTime: idleStart, endTime: currentTime })
        steps.push({
          step: stepNumber++,
          description: `CPU was idle from time ${idleStart} to ${currentTime}`,
          type: 'idle'
        })
        idleStart = null
      }

      const shortest = available.reduce((min, p) => 
        p.burstTime < min.burstTime ? p : min
      )

      const startTime = currentTime
      const completionTime = startTime + shortest.burstTime
      const turnaroundTime = completionTime - shortest.arrivalTime
      const waitingTime = turnaroundTime - shortest.burstTime

      steps.push({
        step: stepNumber++,
        processId: shortest.id,
        arrivalTime: shortest.arrivalTime,
        burstTime: shortest.burstTime,
        startTime,
        completionTime,
        turnaroundTime,
        waitingTime,
        calculation: `TAT = CT - AT = ${completionTime} - ${shortest.arrivalTime} = ${turnaroundTime}\nWT = TAT - BT = ${turnaroundTime} - ${shortest.burstTime} = ${waitingTime}`,
        type: 'process'
      })

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

    return { results: results.sort((a, b) => a.id.localeCompare(b.id)), gantt, steps }
  }

  // Priority Scheduling (Non-preemptive) with step-by-step explanation
  const priorityScheduling = (processes) => {
    const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime)
    const results = []
    const gantt = []
    const steps = []
    let currentTime = 0
    const completed = new Set()
    let idleStart = null
    let stepNumber = 1

    while (completed.size < processes.length) {
      const available = sorted.filter(p => 
        p.arrivalTime <= currentTime && !completed.has(p.id)
      )

      if (available.length === 0) {
        if (idleStart === null) idleStart = currentTime
        currentTime++
        continue
      }

      if (idleStart !== null) {
        gantt.push({ processId: 'IDLE', startTime: idleStart, endTime: currentTime })
        steps.push({
          step: stepNumber++,
          description: `CPU was idle from time ${idleStart} to ${currentTime}`,
          type: 'idle'
        })
        idleStart = null
      }

      const highest = available.reduce((max, p) => 
        p.priority < max.priority ? p : max
      )

      const startTime = currentTime
      const completionTime = startTime + highest.burstTime
      const turnaroundTime = completionTime - highest.arrivalTime
      const waitingTime = turnaroundTime - highest.burstTime

      steps.push({
        step: stepNumber++,
        processId: highest.id,
        arrivalTime: highest.arrivalTime,
        burstTime: highest.burstTime,
        priority: highest.priority,
        startTime,
        completionTime,
        turnaroundTime,
        waitingTime,
        calculation: `TAT = CT - AT = ${completionTime} - ${highest.arrivalTime} = ${turnaroundTime}\nWT = TAT - BT = ${turnaroundTime} - ${highest.burstTime} = ${waitingTime}`,
        type: 'process'
      })

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

    return { results: results.sort((a, b) => a.id.localeCompare(b.id)), gantt, steps }
  }



  const calculateResults = () => {
    let schedulingResults
    
    switch (algorithm) {
      case 'sjf':
        schedulingResults = sjfScheduling(processes)
        break
      case 'priority':
        schedulingResults = priorityScheduling(processes)
        break
      default:
        schedulingResults = sjfScheduling(processes)
    }

    const { results: processResults, gantt, steps } = schedulingResults
    const avgWaitingTime = processResults.reduce((sum, p) => sum + p.waitingTime, 0) / processResults.length
    const avgTurnaroundTime = processResults.reduce((sum, p) => sum + p.turnaroundTime, 0) / processResults.length

    setResults({
      processes: processResults,
      avgWaitingTime: avgWaitingTime.toFixed(2),
      avgTurnaroundTime: avgTurnaroundTime.toFixed(2),
      steps
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
      sjf: (
        <div>
          <p><strong>SJF (Shortest Job First):</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Non-preemptive scheduling algorithm</li>
            <li>Selects process with shortest burst time</li>
            <li>Optimal for minimizing average waiting time</li>
            <li>Can cause starvation of longer processes</li>
            <li>Requires knowledge of burst time in advance</li>
          </ul>
        </div>
      ),
      priority: (
        <div>
          <p><strong>Priority Scheduling:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Non-preemptive scheduling algorithm</li>
            <li>Processes with higher priority (lower number) execute first</li>
            <li>May cause starvation of low-priority processes</li>
            <li>Priority inversion problem can occur</li>
            <li>Aging technique can prevent starvation</li>
          </ul>
          <p className="mt-2"><strong>Priority Rule:</strong> Lower number = Higher priority</p>
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
          <div className="flex flex-col sm:flex-row gap-4">
            {[
              { value: 'sjf', label: 'SJF (Shortest Job First)' },
              { value: 'priority', label: 'Priority Scheduling' }
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
                  {algorithm === 'priority' && <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-xs sm:text-sm">Priority</th>}
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
                    {algorithm === 'priority' && (
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
                    {algorithm === 'priority' && <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">Priority</th>}
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
                      {algorithm === 'priority' && <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-center text-xs sm:text-sm whitespace-nowrap">{process.priority}</td>}
                      <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-center text-xs sm:text-sm whitespace-nowrap">{process.completionTime}</td>
                      <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-center text-xs sm:text-sm whitespace-nowrap">{process.turnaroundTime}</td>
                      <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-2 sm:px-4 py-2 text-center text-xs sm:text-sm whitespace-nowrap">{process.waitingTime}</td>
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

            {/* Step-by-step Calculation */}
            {results.steps && results.steps.length > 0 && (
              <div className="bg-green-50 dark:bg-green-900/30 p-3 sm:p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-3 text-sm sm:text-base">Step-by-Step Calculation</h4>
                <div className="space-y-3">
                  {results.steps.map((step, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded-md border border-green-200 dark:border-green-700">
                      {step.type === 'idle' ? (
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                          <strong>Step {step.step}:</strong> {step.description}
                        </p>
                      ) : (
                        <div className="text-xs sm:text-sm">
                          <p className="text-green-800 dark:text-green-300 font-semibold mb-2">
                            Step {step.step}: Process {step.processId} selected
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
                            <div>• Arrival Time (AT) = {step.arrivalTime}</div>
                            <div>• Burst Time (BT) = {step.burstTime}</div>
                            {step.priority !== undefined && <div>• Priority = {step.priority}</div>}
                            <div>• Start Time = {step.startTime}</div>
                            <div>• Completion Time (CT) = {step.completionTime}</div>
                            <div>• Turnaround Time (TAT) = {step.turnaroundTime}</div>
                            <div>• Waiting Time (WT) = {step.waitingTime}</div>
                          </div>
                          <div className="mt-2 p-2 bg-green-100 dark:bg-green-900/50 rounded text-gray-800 dark:text-gray-200">
                            <strong>Calculation:</strong>
                            <pre className="mt-1 text-xs whitespace-pre-wrap">{step.calculation}</pre>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProcessScheduling