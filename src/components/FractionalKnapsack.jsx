import { useState } from 'react'

function FractionalKnapsack() {
  const [items, setItems] = useState([
    { id: 'Item1', value: 30, weight: 18 },
    { id: 'Item2', value: 21, weight: 15 },
    { id: 'Item3', value: 18, weight: 10 }
  ])
  const [capacity, setCapacity] = useState(20)
  const [results, setResults] = useState(null)

  // Fractional Knapsack Algorithm with detailed step-by-step like handwritten format
  const fractionalKnapsack = (items, capacity) => {
    const steps = []
    let stepNumber = 1

    // Step 1: Calculate profit/weight ratio
    steps.push({
      step: stepNumber++,
      type: 'calculation',
      title: 'To calculate profit/weight ratio',
      description: 'Ai = Pi/Wi',
      details: items.map(item => ({
        id: item.id,
        calculation: `${item.value}/${item.weight}`,
        ratio: (item.value / item.weight).toFixed(2)
      }))
    })

    // Calculate ratios and create array
    const itemsWithRatio = items.map(item => ({
      ...item,
      ratio: item.value / item.weight
    }))

    const ratioArray = itemsWithRatio.map(item => item.ratio.toFixed(2))
    steps.push({
      step: stepNumber++,
      type: 'array',
      title: 'Ratio Array',
      description: `A = [${ratioArray.join(', ')}]`,
      ratioArray
    })

    // Step 2: Sort in descending order
    const sortedItems = itemsWithRatio.sort((a, b) => b.ratio - a.ratio)
    const sortedRatios = sortedItems.map(item => item.ratio.toFixed(2))
    const sortedOrder = sortedItems.map(item => item.id)
    
    steps.push({
      step: stepNumber++,
      type: 'sorting',
      title: 'Arrange objects in descending order',
      description: `A = [${sortedRatios.join(', ')}]`,
      order: sortedOrder.join(' > ')
    })

    // Step 3: Initialize solution vector
    const solutionVector = new Array(items.length).fill(0)
    steps.push({
      step: stepNumber++,
      type: 'initialization',
      title: 'Solution vector',
      description: `X = [${solutionVector.map((_, i) => `x${i+1}`).join(', ')}]`,
      initialVector: `X = [${solutionVector.join(', ')}]`
    })

    // Step 4: Initialize variables
    steps.push({
      step: stepNumber++,
      type: 'initialization',
      title: 'Current weight = 0, Current profit = 0',
      description: `Available capacity = ${capacity}`
    })

    // Step 5: Greedy selection process
    const solution = []
    let remainingCapacity = capacity
    let totalProfit = 0
    let currentWeight = 0

    sortedItems.forEach((item, index) => {
      const originalIndex = items.findIndex(original => original.id === item.id)
      
      if (remainingCapacity >= item.weight) {
        // Take full item
        const fraction = 1
        const profit = item.value
        solutionVector[originalIndex] = fraction
        
        solution.push({
          ...item,
          fraction,
          profit,
          weightTaken: item.weight
        })

        steps.push({
          step: stepNumber++,
          type: 'selection',
          title: `Select ${item.id} (Full item)`,
          itemId: item.id,
          weight: item.weight,
          value: item.value,
          fraction: 1,
          calculation: `Profit = ${item.value} × 1 = ${profit}`,
          weightCalculation: `Weight = ${item.weight} × 1 = ${item.weight}`,
          remainingCapacity: remainingCapacity - item.weight,
          currentWeight: currentWeight + item.weight,
          totalProfit: totalProfit + profit,
          solutionVector: [...solutionVector]
        })

        remainingCapacity -= item.weight
        currentWeight += item.weight
        totalProfit += profit
      } else if (remainingCapacity > 0) {
        // Take fractional item
        const fraction = remainingCapacity / item.weight
        const profit = item.value * fraction
        const weightTaken = remainingCapacity
        solutionVector[originalIndex] = fraction

        solution.push({
          ...item,
          fraction,
          profit,
          weightTaken
        })

        steps.push({
          step: stepNumber++,
          type: 'selection',
          title: `Select ${item.id} (Fractional)`,
          itemId: item.id,
          weight: item.weight,
          value: item.value,
          fraction: fraction,
          calculation: `Profit = ${item.value} × ${fraction.toFixed(3)} = ${profit.toFixed(2)}`,
          weightCalculation: `Weight = ${remainingCapacity} (remaining capacity)`,
          remainingCapacity: 0,
          currentWeight: currentWeight + weightTaken,
          totalProfit: totalProfit + profit,
          solutionVector: [...solutionVector]
        })

        remainingCapacity = 0
        currentWeight += weightTaken
        totalProfit += profit
      } else {
        // Cannot take item
        steps.push({
          step: stepNumber++,
          type: 'rejection',
          title: `Cannot select ${item.id}`,
          reason: 'No remaining capacity',
          solutionVector: [...solutionVector]
        })
      }
    })

    // Final solution vector
    steps.push({
      step: stepNumber++,
      type: 'final',
      title: 'Final Solution Vector',
      description: `X = [${solutionVector.map(x => x === 1 ? '1' : x === 0 ? '0' : x.toFixed(3)).join(', ')}]`,
      totalProfit: totalProfit.toFixed(2),
      totalWeight: currentWeight.toFixed(2)
    })

    return {
      solution: solution.filter(item => item.fraction > 0),
      steps,
      totalProfit: totalProfit.toFixed(2),
      totalWeight: currentWeight.toFixed(2),
      solutionVector,
      sortedItems
    }
  }

  const calculateResults = () => {
    const result = fractionalKnapsack(items, capacity)
    setResults(result)
  }

  const updateItem = (index, field, value) => {
    const updated = [...items]
    updated[index][field] = parseFloat(value) || 0
    setItems(updated)
  }

  const addItem = () => {
    const newId = `Item${items.length + 1}`
    setItems([...items, { id: newId, value: 50, weight: 10 }])
  }

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index))
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4 lg:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">Fractional Knapsack Problem Simulator</h2>
        
        {/* Knapsack Capacity */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Knapsack Capacity:</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(parseFloat(e.target.value) || 0)}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md px-3 py-2 w-32"
            min="1"
          />
        </div>

        {/* Items Input */}
        <div className="mb-4 sm:mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Items</h3>
            <button
              onClick={addItem}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add Item
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="border border-gray-300 dark:border-gray-600 w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2">Item</th>
                  <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2">Value</th>
                  <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2">Weight</th>
                  <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2">Value/Weight</th>
                  <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id} className="bg-white dark:bg-gray-800">
                    <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2 font-medium">{item.id}</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                      <input
                        type="number"
                        value={item.value}
                        onChange={(e) => updateItem(index, 'value', e.target.value)}
                        className="w-full text-center border-0 bg-transparent text-gray-900 dark:text-white focus:outline-none"
                        min="0"
                      />
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                      <input
                        type="number"
                        value={item.weight}
                        onChange={(e) => updateItem(index, 'weight', e.target.value)}
                        className="w-full text-center border-0 bg-transparent text-gray-900 dark:text-white focus:outline-none"
                        min="0.1"
                        step="0.1"
                      />
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2 text-center">
                      {(item.value / item.weight).toFixed(2)}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 text-center px-4 py-2">
                      <button
                        onClick={() => removeItem(index)}
                        className="text-red-500 hover:text-red-700"
                        disabled={items.length <= 1}
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
        <div className="mb-6">
          <button
            onClick={calculateResults}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
          >
            Solve Knapsack
          </button>
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Results - Fractional Knapsack Solution</h3>
            
            {/* Visual Knapsack Representation with Ratio Chart */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Knapsack Visualization & Ratio Analysis</h4>
              
              {/* Ratio Bar Chart */}
              <div className="mb-6">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Value/Weight Ratio Comparison</h5>
                <div className="space-y-2">
                  {results.sortedItems.map((item, index) => {
                    const maxRatio = Math.max(...results.sortedItems.map(i => i.ratio))
                    const widthPercent = (item.ratio / maxRatio) * 100
                    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500']
                    return (
                      <div key={index} className="flex items-center">
                        <div className="w-16 text-xs font-medium text-gray-700 dark:text-gray-300">{item.id}</div>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-600 h-6 rounded relative mx-2">
                          <div
                            className={`h-full ${colors[index % colors.length]} rounded flex items-center justify-end pr-2`}
                            style={{ width: `${widthPercent}%` }}
                          >
                            <span className="text-white text-xs font-bold">{item.ratio.toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="w-20 text-xs text-gray-600 dark:text-gray-400">
                          {item.value}/{item.weight}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Knapsack Packing Visualization */}
              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Knapsack Packing (Capacity: {capacity})</h5>
                <div className="flex items-center mb-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mr-4">Empty</div>
                  <div className="flex-1 bg-gray-300 dark:bg-gray-600 h-12 rounded relative overflow-hidden border-2 border-gray-400">
                    {results.solution.map((item, index) => {
                      const widthPercent = (item.weightTaken / capacity) * 100
                      const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-yellow-500']
                      return (
                        <div
                          key={index}
                          className={`absolute h-full ${colors[index % colors.length]} flex items-center justify-center text-white text-xs font-bold border-r border-white`}
                          style={{
                            left: `${results.solution.slice(0, index).reduce((sum, prev) => sum + (prev.weightTaken / capacity) * 100, 0)}%`,
                            width: `${widthPercent}%`
                          }}
                        >
                          <div className="text-center">
                            <div>{item.id}</div>
                            <div className="text-xs">
                              {item.fraction < 1 ? `${(item.fraction * 100).toFixed(1)}%` : 'Full'}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 ml-4">Full</div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Used: {results.totalWeight} / {capacity} ({((results.totalWeight / capacity) * 100).toFixed(1)}% filled)
                </div>
              </div>

              {/* Profit Contribution Chart */}
              <div>
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profit Contribution by Item</h5>
                <div className="space-y-2">
                  {results.solution.map((item, index) => {
                    const profitPercent = (item.profit / results.totalProfit) * 100
                    const colors = ['bg-green-400', 'bg-blue-400', 'bg-purple-400', 'bg-red-400', 'bg-yellow-400']
                    return (
                      <div key={index} className="flex items-center">
                        <div className="w-16 text-xs font-medium text-gray-700 dark:text-gray-300">{item.id}</div>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-600 h-5 rounded relative mx-2">
                          <div
                            className={`h-full ${colors[index % colors.length]} rounded flex items-center justify-end pr-2`}
                            style={{ width: `${profitPercent}%` }}
                          >
                            <span className="text-white text-xs font-bold">{item.profit.toFixed(1)}</span>
                          </div>
                        </div>
                        <div className="w-16 text-xs text-gray-600 dark:text-gray-400">
                          {profitPercent.toFixed(1)}%
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Solution Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2">Item</th>
                    <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2">Value</th>
                    <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2">Weight</th>
                    <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2">Ratio</th>
                    <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2">Fraction Taken</th>
                    <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2">Weight Taken</th>
                    <th className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2">Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {results.solution.map((item, index) => (
                    <tr key={index} className="bg-white dark:bg-gray-800">
                      <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2 text-center">{item.id}</td>
                      <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2 text-center">{item.value}</td>
                      <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2 text-center">{item.weight}</td>
                      <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2 text-center">{item.ratio.toFixed(2)}</td>
                      <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2 text-center">
                        {item.fraction === 1 ? 'Full' : `${(item.fraction * 100).toFixed(1)}%`}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2 text-center">{item.weightTaken.toFixed(2)}</td>
                      <td className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2 text-center">{item.profit.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Total Profit</h4>
                <p className="text-green-700 dark:text-green-400 text-lg">{results.totalProfit}</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Total Weight</h4>
                <p className="text-blue-700 dark:text-blue-400 text-lg">{results.totalWeight} / {capacity}</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Efficiency</h4>
                <p className="text-purple-700 dark:text-purple-400 text-lg">{((results.totalWeight / capacity) * 100).toFixed(1)}%</p>
              </div>
            </div>

            {/* Step-by-step Calculation - Handwritten Format */}
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-3">Step-by-Step Solution (W = {capacity})</h4>
              <div className="space-y-4">
                {results.steps.map((step, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded border">
                    {step.type === 'calculation' && (
                      <div>
                        <p className="text-green-800 dark:text-green-300 font-semibold mb-2">
                          Step {step.step}: {step.title}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">{step.description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                          {step.details.map((detail, i) => (
                            <div key={i} className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                              <span className="font-medium">{detail.id}:</span> {detail.calculation} = {detail.ratio}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {step.type === 'array' && (
                      <div>
                        <p className="text-green-800 dark:text-green-300 font-semibold mb-2">
                          {step.title}
                        </p>
                        <div className="font-mono text-lg bg-blue-50 dark:bg-blue-900/30 p-3 rounded border">
                          {step.description}
                        </div>
                      </div>
                    )}
                    
                    {step.type === 'sorting' && (
                      <div>
                        <p className="text-green-800 dark:text-green-300 font-semibold mb-2">
                          Step {step.step}: {step.title}
                        </p>
                        <div className="font-mono text-lg bg-blue-50 dark:bg-blue-900/30 p-3 rounded border mb-2">
                          {step.description}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Order: {step.order}
                        </p>
                      </div>
                    )}
                    
                    {step.type === 'initialization' && (
                      <div>
                        <p className="text-green-800 dark:text-green-300 font-semibold mb-2">
                          Step {step.step}: {step.title}
                        </p>
                        <div className="text-gray-700 dark:text-gray-300">
                          {step.description}
                          {step.initialVector && (
                            <div className="font-mono text-lg bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded border mt-2">
                              {step.initialVector}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {step.type === 'selection' && (
                      <div>
                        <p className="text-green-800 dark:text-green-300 font-semibold mb-2">
                          Step {step.step}: {step.title}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                          <div>
                            <p><strong>Item:</strong> {step.itemId}</p>
                            <p><strong>Value:</strong> {step.value}</p>
                            <p><strong>Weight:</strong> {step.weight}</p>
                            <p><strong>Fraction:</strong> {step.fraction === 1 ? '1 (Full)' : step.fraction.toFixed(3)}</p>
                          </div>
                          <div>
                            <p><strong>Calculation:</strong></p>
                            <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded font-mono text-xs">
                              {step.calculation}
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded font-mono text-xs mt-1">
                              {step.weightCalculation}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <p className="text-xs"><strong>Current Weight:</strong> {step.currentWeight} | <strong>Remaining:</strong> {step.remainingCapacity} | <strong>Total Profit:</strong> {step.totalProfit.toFixed(2)}</p>
                          <p className="text-xs font-mono mt-1"><strong>Solution Vector:</strong> X = [{step.solutionVector.map(x => x === 1 ? '1' : x === 0 ? '0' : x.toFixed(3)).join(', ')}]</p>
                        </div>
                      </div>
                    )}
                    
                    {step.type === 'rejection' && (
                      <div>
                        <p className="text-red-800 dark:text-red-300 font-semibold mb-2">
                          Step {step.step}: {step.title}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">{step.reason}</p>
                        <p className="text-xs font-mono mt-2"><strong>Solution Vector:</strong> X = [{step.solutionVector.map(x => x === 1 ? '1' : x === 0 ? '0' : x.toFixed(3)).join(', ')}]</p>
                      </div>
                    )}
                    
                    {step.type === 'final' && (
                      <div>
                        <p className="text-green-800 dark:text-green-300 font-semibold mb-2">
                          Step {step.step}: {step.title}
                        </p>
                        <div className="font-mono text-lg bg-green-100 dark:bg-green-900/50 p-3 rounded border mb-2">
                          {step.description}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded">
                            <p className="font-semibold text-blue-800 dark:text-blue-300">Total Profit: {step.totalProfit}</p>
                          </div>
                          <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded">
                            <p className="font-semibold text-purple-800 dark:text-purple-300">Total Weight: {step.totalWeight}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Algorithm Explanation */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Fractional Knapsack Algorithm</h4>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <p><strong>Greedy Strategy:</strong> Always select the item with the highest value-to-weight ratio first.</p>
                <p><strong>Steps:</strong></p>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>Calculate value/weight ratio for each item</li>
                  <li>Sort items by ratio in descending order</li>
                  <li>Take items greedily until knapsack is full</li>
                  <li>If an item doesn't fit completely, take a fraction of it</li>
                </ol>
                <p><strong>Time Complexity:</strong> O(n log n) due to sorting</p>
                <p><strong>Optimality:</strong> This greedy approach gives the optimal solution for fractional knapsack</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FractionalKnapsack