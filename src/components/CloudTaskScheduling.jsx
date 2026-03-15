import React, { useState } from 'react'

function CloudTaskScheduling({ initialAlgorithm = 'minmin' }) {
  const [algorithm, setAlgorithm] = useState(initialAlgorithm)
  const [tasks, setTasks] = useState([
    { id: 'T1', executionTime: [10, 15, 20] },
    { id: 'T2', executionTime: [12, 8, 16] },
    { id: 'T3', executionTime: [5, 10, 8] }
  ])
  const [numVMs, setNumVMs] = useState(3)
  const [results, setResults] = useState(null)

  // Min-Min Algorithm
  const minMinScheduling = (tasks, vms) => {
    const vmLoad = new Array(vms).fill(0)
    const schedule = []
    const steps = []
    const remainingTasks = [...tasks]
    let stepNumber = 1

    while (remainingTasks.length > 0) {
      let minTime = Infinity
      let selectedTask = null
      let selectedVM = -1
      let taskIndex = -1

      // Find task with minimum completion time
      remainingTasks.forEach((task, tIndex) => {
        task.executionTime.forEach((execTime, vmIndex) => {
          const completionTime = vmLoad[vmIndex] + execTime
          if (completionTime < minTime) {
            minTime = completionTime
            selectedTask = task
            selectedVM = vmIndex
            taskIndex = tIndex
          }
        })
      })

      const startTime = vmLoad[selectedVM]
      const completionTime = startTime + selectedTask.executionTime[selectedVM]
      
      schedule.push({
        taskId: selectedTask.id,
        vmId: selectedVM,
        startTime,
        completionTime,
        executionTime: selectedTask.executionTime[selectedVM]
      })

      steps.push({
        step: stepNumber++,
        taskId: selectedTask.id,
        vmId: selectedVM,
        startTime,
        completionTime,
        executionTime: selectedTask.executionTime[selectedVM],
        calculation: `VM${selectedVM}: ${startTime} + ${selectedTask.executionTime[selectedVM]} = ${completionTime}`,
        vmLoads: [...vmLoad]
      })

      vmLoad[selectedVM] = completionTime
      remainingTasks.splice(taskIndex, 1)
    }

    const makespan = Math.max(...vmLoad)
    const totalExecTime = schedule.reduce((sum, s) => sum + s.executionTime, 0)
    const utilization = ((totalExecTime / (vms * makespan)) * 100).toFixed(2)

    return { schedule, steps, makespan, utilization, vmLoad }
  }

  // Max-Min Algorithm
  const maxMinScheduling = (tasks, vms) => {
    const vmLoad = new Array(vms).fill(0)
    const schedule = []
    const steps = []
    const remainingTasks = [...tasks]
    let stepNumber = 1

    while (remainingTasks.length > 0) {
      let maxMinTime = -1
      let selectedTask = null
      let selectedVM = -1
      let taskIndex = -1

      // Find task with maximum minimum completion time
      remainingTasks.forEach((task, tIndex) => {
        let minTimeForTask = Infinity
        let bestVM = -1
        
        task.executionTime.forEach((execTime, vmIndex) => {
          const completionTime = vmLoad[vmIndex] + execTime
          if (completionTime < minTimeForTask) {
            minTimeForTask = completionTime
            bestVM = vmIndex
          }
        })

        if (minTimeForTask > maxMinTime) {
          maxMinTime = minTimeForTask
          selectedTask = task
          selectedVM = bestVM
          taskIndex = tIndex
        }
      })

      const startTime = vmLoad[selectedVM]
      const completionTime = startTime + selectedTask.executionTime[selectedVM]
      
      schedule.push({
        taskId: selectedTask.id,
        vmId: selectedVM,
        startTime,
        completionTime,
        executionTime: selectedTask.executionTime[selectedVM]
      })

      steps.push({
        step: stepNumber++,
        taskId: selectedTask.id,
        vmId: selectedVM,
        startTime,
        completionTime,
        executionTime: selectedTask.executionTime[selectedVM],
        calculation: `VM${selectedVM}: ${startTime} + ${selectedTask.executionTime[selectedVM]} = ${completionTime}`,
        vmLoads: [...vmLoad]
      })

      vmLoad[selectedVM] = completionTime
      remainingTasks.splice(taskIndex, 1)
    }

    const makespan = Math.max(...vmLoad)
    const totalExecTime = schedule.reduce((sum, s) => sum + s.executionTime, 0)
    const utilization = ((totalExecTime / (vms * makespan)) * 100).toFixed(2)

    return { schedule, steps, makespan, utilization, vmLoad }
  }

  const calculateResults = () => {
    let result
    switch (algorithm) {
      case 'minmin':
        result = minMinScheduling(tasks, numVMs)
        break
      case 'maxmin':
        result = maxMinScheduling(tasks, numVMs)
        break
      default:
        result = minMinScheduling(tasks, numVMs)
    }
    setResults(result)
  }

  const updateTask = (taskIndex, vmIndex, value) => {
    const updated = [...tasks]
    updated[taskIndex].executionTime[vmIndex] = parseInt(value) || 0
    setTasks(updated)
  }

  const addTask = () => {
    const newId = `T${tasks.length + 1}`
    setTasks([...tasks, { id: newId, executionTime: new Array(numVMs).fill(10) }])
  }

  const updateVMCount = (count) => {
    const newCount = parseInt(count) || 1
    setNumVMs(newCount)
    const updatedTasks = tasks.map(task => ({
      ...task,
      executionTime: Array.from({ length: newCount }, (_, i) => task.executionTime[i] || 10)
    }))
    setTasks(updatedTasks)
  }

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4 lg:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">Cloud Task Scheduling Simulator</h2>
        
        {/* Algorithm Selection */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Algorithm:</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex items-center text-gray-900 dark:text-white">
              <input
                type="radio"
                value="minmin"
                checked={algorithm === 'minmin'}
                onChange={(e) => setAlgorithm(e.target.value)}
                className="mr-2"
              />
              Min-Min Algorithm
            </label>
            <label className="flex items-center text-gray-900 dark:text-white">
              <input
                type="radio"
                value="maxmin"
                checked={algorithm === 'maxmin'}
                onChange={(e) => setAlgorithm(e.target.value)}
                className="mr-2"
              />
              Max-Min Algorithm
            </label>
          </div>
        </div>

        {/* VM Count */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Number of VMs:</label>
          <input
            type="number"
            value={numVMs}
            onChange={(e) => updateVMCount(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md px-3 py-2 w-20"
            min="1"
            max="5"
          />
        </div>

        {/* Task Execution Time Matrix */}
        <div className="mb-4 sm:mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Task Execution Time Matrix</h3>
            <button
              onClick={addTask}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add Task
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="border border-gray-300 dark:border-gray-600 w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2">Task</th>
                  {Array.from({ length: numVMs }, (_, i) => (
                    <th key={i} className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2">VM{i}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, taskIndex) => (
                  <tr key={task.id} className="bg-white dark:bg-gray-800">
                    <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2 font-medium">{task.id}</td>
                    {task.executionTime.map((time, vmIndex) => (
                      <td key={vmIndex} className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                        <input
                          type="number"
                          value={time}
                          onChange={(e) => updateTask(taskIndex, vmIndex, e.target.value)}
                          className="w-full text-center border-0 bg-transparent text-gray-900 dark:text-white focus:outline-none"
                          min="1"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="mb-6">
          <button
            onClick={calculateResults}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
          >
            Schedule Tasks
          </button>
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Results - {algorithm === 'minmin' ? 'Min-Min' : 'Max-Min'} Algorithm
            </h3>
            
            {/* Enhanced Visual Gantt Chart with Timeline */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-3">VM Schedule Visualization & Analysis</h4>
              
              {/* Timeline Scale */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {Array.from({ length: Math.ceil(results.makespan / 5) + 1 }, (_, i) => (
                    <span key={i}>{i * 5}</span>
                  ))}
                </div>
                <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
              </div>

              {/* VM Gantt Chart */}
              <div className="space-y-3 mb-6">
                {Array.from({ length: numVMs }, (_, vmIndex) => {
                  const vmTasks = results.schedule.filter(s => s.vmId === vmIndex)
                  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-yellow-500', 'bg-pink-500']
                  return (
                    <div key={vmIndex} className="flex items-center">
                      <div className="w-16 text-sm font-medium text-gray-700 dark:text-gray-300">VM{vmIndex}</div>
                      <div className="flex-1 relative h-10 bg-gray-200 dark:bg-gray-600 rounded border">
                        {/* Time grid lines */}
                        {Array.from({ length: Math.ceil(results.makespan / 5) }, (_, i) => (
                          <div
                            key={i}
                            className="absolute top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-500"
                            style={{ left: `${((i + 1) * 5 / results.makespan) * 100}%` }}
                          ></div>
                        ))}
                        
                        {/* Tasks */}
                        {vmTasks.map((task, index) => (
                          <div
                            key={index}
                            className={`absolute ${colors[results.schedule.findIndex(t => t.taskId === task.taskId) % colors.length]} text-white text-xs flex flex-col items-center justify-center rounded border-2 border-white font-bold`}
                            style={{
                              left: `${(task.startTime / results.makespan) * 100}%`,
                              width: `${(task.executionTime / results.makespan) * 100}%`,
                              height: '100%'
                            }}
                          >
                            <div>{task.taskId}</div>
                            <div className="text-xs opacity-90">{task.executionTime}u</div>
                          </div>
                        ))}
                      </div>
                      <div className="w-20 text-xs text-gray-600 dark:text-gray-400 ml-2 text-center">
                        <div>Load: {results.vmLoad[vmIndex]}</div>
                        <div className="text-xs opacity-75">
                          {((results.vmLoad[vmIndex] / results.makespan) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Load Distribution Chart */}
              <div className="mb-6">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">VM Load Distribution</h5>
                <div className="space-y-2">
                  {Array.from({ length: numVMs }, (_, vmIndex) => {
                    const load = results.vmLoad[vmIndex]
                    const loadPercent = (load / results.makespan) * 100
                    const colors = ['bg-blue-400', 'bg-green-400', 'bg-purple-400', 'bg-red-400', 'bg-yellow-400']
                    return (
                      <div key={vmIndex} className="flex items-center">
                        <div className="w-12 text-xs font-medium text-gray-700 dark:text-gray-300">VM{vmIndex}</div>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-600 h-6 rounded relative mx-2">
                          <div
                            className={`h-full ${colors[vmIndex % colors.length]} rounded flex items-center justify-end pr-2`}
                            style={{ width: `${loadPercent}%` }}
                          >
                            <span className="text-white text-xs font-bold">{load}</span>
                          </div>
                        </div>
                        <div className="w-16 text-xs text-gray-600 dark:text-gray-400">
                          {loadPercent.toFixed(1)}%
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Task Execution Time Matrix Heatmap */}
              <div>
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Task-VM Execution Time Heatmap</h5>
                <div className="overflow-x-auto">
                  <div className="inline-block min-w-full">
                    <div className="grid gap-1" style={{ gridTemplateColumns: `auto repeat(${numVMs}, 1fr)` }}>
                      <div></div>
                      {Array.from({ length: numVMs }, (_, i) => (
                        <div key={i} className="text-xs font-medium text-center p-1 bg-gray-200 dark:bg-gray-600 rounded">
                          VM{i}
                        </div>
                      ))}
                      {tasks.map((task, taskIndex) => {
                        const maxTime = Math.max(...task.executionTime)
                        return (
                          <React.Fragment key={taskIndex}>
                            <div className="text-xs font-medium p-1 bg-gray-200 dark:bg-gray-600 rounded flex items-center">
                              {task.id}
                            </div>
                            {task.executionTime.map((time, vmIndex) => {
                              const intensity = time / maxTime
                              const isSelected = results.schedule.some(s => s.taskId === task.id && s.vmId === vmIndex)
                              return (
                                <div
                                  key={vmIndex}
                                  className={`text-xs p-2 rounded text-center font-medium ${
                                    isSelected 
                                      ? 'bg-green-500 text-white border-2 border-green-700' 
                                      : intensity > 0.7 
                                        ? 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200'
                                        : intensity > 0.4
                                          ? 'bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200'
                                          : 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
                                  }`}
                                >
                                  {time}
                                </div>
                              )
                            })}
                          </React.Fragment>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-2 space-x-4 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-200 dark:bg-green-800 rounded mr-1"></div>
                    <span>Fast</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-200 dark:bg-yellow-800 rounded mr-1"></div>
                    <span>Medium</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-200 dark:bg-red-800 rounded mr-1"></div>
                    <span>Slow</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 border-2 border-green-700 rounded mr-1"></div>
                    <span>Selected</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2">Task</th>
                    <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2">Assigned VM</th>
                    <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2">Start Time</th>
                    <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2">Execution Time</th>
                    <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2">Completion Time</th>
                  </tr>
                </thead>
                <tbody>
                  {results.schedule.map((item, index) => (
                    <tr key={index} className="bg-white dark:bg-gray-800">
                      <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2 text-center">{item.taskId}</td>
                      <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2 text-center">VM{item.vmId}</td>
                      <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2 text-center">{item.startTime}</td>
                      <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2 text-center">{item.executionTime}</td>
                      <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2 text-center">{item.completionTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Makespan</h4>
                <p className="text-blue-700 dark:text-blue-400 text-lg">{results.makespan} units</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Resource Utilization</h4>
                <p className="text-green-700 dark:text-green-400 text-lg">{results.utilization}%</p>
              </div>
            </div>

            {/* Step-by-step Calculation - Enhanced Detail */}
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-3">Step-by-Step Calculation - {algorithm === 'minmin' ? 'Min-Min' : 'Max-Min'} Algorithm</h4>
              
              {/* Initial Setup */}
              <div className="mb-4 bg-white dark:bg-gray-800 p-4 rounded border">
                <p className="text-green-800 dark:text-green-300 font-semibold mb-2">Initial Setup:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Number of Tasks:</strong> {tasks.length}</p>
                    <p><strong>Number of VMs:</strong> {numVMs}</p>
                    <p><strong>Initial VM Loads:</strong> [{Array.from({length: numVMs}, () => 0).join(', ')}]</p>
                  </div>
                  <div>
                    <p><strong>Task Execution Matrix:</strong></p>
                    <div className="font-mono text-xs bg-gray-50 dark:bg-gray-700 p-2 rounded mt-1">
                      {tasks.map(task => (
                        <div key={task.id}>{task.id}: [{task.executionTime.join(', ')}]</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Steps */}
              <div className="space-y-4">
                {results.steps.map((step, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded border">
                    <p className="text-green-800 dark:text-green-300 font-semibold mb-3">
                      Step {step.step}: Select and Assign {step.taskId}
                    </p>
                    
                    {/* Task Analysis */}
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Task Analysis for {step.taskId}:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        {Array.from({length: numVMs}, (_, vmIndex) => {
                          const task = tasks.find(t => t.id === step.taskId)
                          const execTime = task ? task.executionTime[vmIndex] : 0
                          const currentLoad = step.vmLoads[vmIndex] - (vmIndex === step.vmId ? step.executionTime : 0)
                          const completionTime = currentLoad + execTime
                          const isSelected = vmIndex === step.vmId
                          
                          return (
                            <div key={vmIndex} className={`p-2 rounded border ${
                              isSelected 
                                ? 'bg-green-100 dark:bg-green-900/50 border-green-300 dark:border-green-600' 
                                : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                            }`}>
                              <div className="font-semibold">VM{vmIndex} {isSelected ? '✓' : ''}</div>
                              <div>Exec Time: {execTime}</div>
                              <div>Current Load: {currentLoad}</div>
                              <div>Completion: {currentLoad} + {execTime} = {completionTime}</div>
                              {isSelected && <div className="text-green-600 dark:text-green-400 font-bold">SELECTED</div>}
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Selection Logic */}
                    <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded">
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">
                        {algorithm === 'minmin' ? 'Min-Min Logic:' : 'Max-Min Logic:'}
                      </p>
                      <p className="text-xs text-blue-700 dark:text-blue-400">
                        {algorithm === 'minmin' 
                          ? `Selected ${step.taskId} → VM${step.vmId} because it has the minimum completion time among all task-VM combinations.`
                          : `Selected ${step.taskId} → VM${step.vmId} because it has the maximum of minimum completion times.`
                        }
                      </p>
                    </div>

                    {/* Calculation Details */}
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Calculation Details:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded font-mono text-xs">
                            <div>Task: {step.taskId}</div>
                            <div>Assigned VM: VM{step.vmId}</div>
                            <div>Execution Time: {step.executionTime}</div>
                          </div>
                        </div>
                        <div>
                          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded font-mono text-xs">
                            <div>Start Time: {step.startTime}</div>
                            <div>Completion: {step.startTime} + {step.executionTime} = {step.completionTime}</div>
                            <div>VM{step.vmId} Load: {step.completionTime}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Updated VM Loads */}
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded">
                      <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">Updated VM Loads:</p>
                      <div className="font-mono text-xs text-yellow-700 dark:text-yellow-400">
                        VM_Loads = [{step.vmLoads.join(', ')}]
                      </div>
                      <div className="text-xs text-yellow-600 dark:text-yellow-500 mt-1">
                        Current Makespan = max({step.vmLoads.join(', ')}) = {Math.max(...step.vmLoads)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Final Results Summary */}
              <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded border">
                <p className="text-green-800 dark:text-green-300 font-semibold mb-3">Final Results Summary:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded">
                      <p className="font-semibold text-blue-800 dark:text-blue-300">Makespan Calculation:</p>
                      <div className="font-mono text-xs mt-1">
                        Makespan = max([{results.vmLoad.join(', ')}]) = {results.makespan}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded">
                      <p className="font-semibold text-green-800 dark:text-green-300">Utilization Calculation:</p>
                      <div className="font-mono text-xs mt-1">
                        Total_Exec = {results.schedule.reduce((sum, s) => sum + s.executionTime, 0)}<br/>
                        Utilization = {results.schedule.reduce((sum, s) => sum + s.executionTime, 0)} / ({numVMs} × {results.makespan}) = {results.utilization}%
                      </div>
                    </div>
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

export default CloudTaskScheduling