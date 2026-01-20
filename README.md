# OS Simulator - Dynamic Memory Allocation & Deadlock Simulator

A comprehensive web application for simulating key Operating System algorithms including Process Scheduling, Deadlock Avoidance, and Dynamic Memory Allocation.

## 🎯 Project Objective

This educational tool demonstrates fundamental OS concepts through interactive simulations, designed specifically for computer science students to understand and visualize operating system algorithms.

## 🚀 Features

### Module 1: Process Scheduling Simulator
- **FCFS (First Come First Serve)** - Simple scheduling based on arrival time
- **Round Robin** - Time-sliced scheduling with user-defined quantum
- **Metrics Calculated:**
  - Waiting Time
  - Turnaround Time
  - Average Waiting Time
  - Average Turnaround Time

### Module 2: Deadlock Avoidance Simulator
- **Banker's Algorithm** implementation
- **Input Support:**
  - Number of processes and resources
  - Allocation matrix
  - Maximum matrix
  - Available resources
- **Output:**
  - Safe/Unsafe state detection
  - Safe sequence (if exists)
  - Step-by-step explanation

### Module 3: Dynamic Memory Allocation Simulator
- **First Fit** - Allocates first suitable block
- **Best Fit** - Allocates smallest suitable block
- **Worst Fit** - Allocates largest suitable block
- **Analysis:**
  - Internal fragmentation calculation
  - External fragmentation analysis
  - Unallocated processes tracking

## 🛠️ Tech Stack

- **Frontend:** React 18 with Vite
- **Styling:** Tailwind CSS
- **Language:** Pure JavaScript (ES6+)
- **Architecture:** Single Page Application (SPA)
- **No Backend Required:** Fully client-side implementation

## 📋 Covered Syllabus Modules

- **CO2:** Process Scheduling Algorithms
- **CO3:** Deadlock Detection and Avoidance
- **CO4:** Memory Management Techniques

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or download the project
```bash
cd os-memory-deadlock-simulator
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## 📖 Usage Guide

### Process Scheduling
1. Select algorithm (FCFS or Round Robin)
2. Configure process details (Arrival Time, Burst Time, Priority)
3. Set Time Quantum for Round Robin
4. Click "Calculate Schedule" to see results

### Deadlock Simulator
1. Set number of processes and resources
2. Configure Allocation and Maximum matrices
3. Set Available resources
4. Click "Check Safe State" to run Banker's Algorithm

### Memory Allocation
1. Choose allocation algorithm (First/Best/Worst Fit)
2. Define memory blocks and process sizes
3. Click "Allocate Memory" to see allocation results

## 🎓 Educational Value

- **Interactive Learning:** Hands-on experience with OS algorithms
- **Visual Results:** Clear tabular presentation of results
- **Step-by-step Explanations:** Detailed algorithm walkthroughs
- **Real-time Calculations:** Immediate feedback on input changes

## 📁 Project Structure

```
src/
├── components/
│   ├── Home.jsx              # Project overview and navigation
│   ├── ProcessScheduling.jsx # FCFS and Round Robin algorithms
│   ├── DeadlockSimulator.jsx # Banker's Algorithm implementation
│   └── MemoryAllocation.jsx  # Memory allocation algorithms
├── App.jsx                   # Main application component
├── main.jsx                  # Application entry point
└── index.css                 # Tailwind CSS styles
```

## 🔧 Key Implementation Details

- **Pure JavaScript:** No external algorithm libraries
- **Responsive Design:** Works on desktop and mobile devices
- **Error Handling:** Input validation and edge case management
- **Performance Optimized:** Efficient algorithm implementations
- **Clean Code:** Well-commented and structured codebase

## 📊 Algorithm Complexities

- **FCFS:** O(n log n) - sorting by arrival time
- **Round Robin:** O(n × quantum) - time slice execution
- **Banker's Algorithm:** O(n² × m) - safety check iterations
- **Memory Allocation:** O(n × m) - process-block matching

## 🎯 Learning Outcomes

Students will understand:
- Process scheduling mechanisms and trade-offs
- Deadlock prevention and avoidance strategies
- Memory allocation techniques and fragmentation
- Algorithm analysis and performance comparison

## 🤝 Contributing

This is an educational project. Feel free to:
- Add new scheduling algorithms
- Implement additional memory allocation strategies
- Enhance the UI/UX
- Add more detailed explanations

## 📝 License

This project is created for educational purposes. Free to use and modify for academic projects.

## 👨‍💻 Author

Created as a college project for Operating Systems course.

---

**Note:** This simulator is designed for educational purposes and demonstrates simplified versions of OS algorithms for better understanding.