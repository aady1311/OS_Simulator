import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  Cpu, 
  Trophy, 
  Target, 
  Zap, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  RotateCcw,
  Sparkles,
  Timer,
  Star
} from "lucide-react";

const quizzes = {
  os: {
    title: "Operating Systems",
    icon: Cpu,
    color: "from-blue-500 via-cyan-400 to-teal-400",
    bgGradient: "from-slate-900 via-blue-900 to-slate-900",
    questions: [
      {question:"Which scheduling algorithm is non-preemptive?",options:["Round Robin","FCFS","SRTF","Multilevel Queue"],answer:"FCFS",hint:"First Come, First Served never interrupts"},
      {question:"Which algorithm prevents deadlock?",options:["Banker's Algorithm","FIFO","LRU","Best Fit"],answer:"Banker's Algorithm",hint:"Think of a cautious banker checking resources"},
      {question:"Which scheduling uses time quantum?",options:["Round Robin","FCFS","SJF","Priority"],answer:"Round Robin",hint:"Like a circular queue with time slices"},
      {question:"Which memory allocation searches entire memory?",options:["Best Fit","First Fit","Next Fit","Worst Fit"],answer:"Best Fit",hint:"Finds the smallest sufficient block"},
      {question:"Which OS component manages memory?",options:["Memory Manager","Scheduler","Compiler","Loader"],answer:"Memory Manager",hint:"Directly responsible for RAM allocation"},
      {question:"What causes deadlock?",options:["Circular wait","Interrupt","Paging","Context switch"],answer:"Circular wait",hint:"One of the four Coffman conditions"},
      {question:"What does CPU scheduling select?",options:["Next process for CPU","Memory size","Disk sector","File type"],answer:"Next process for CPU",hint:"Decides which process runs next"},
      {question:"What is a process?",options:["Program in execution","Stored file","Disk block","Compiler"],answer:"Program in execution",hint:"Dynamic vs static concept"},
      {question:"Which memory technique divides memory into pages?",options:["Paging","Segmentation","Swapping","Fragmentation"],answer:"Paging",hint:"Fixed-size blocks of memory"},
      {question:"What does thrashing affect?",options:["CPU performance","Keyboard","Monitor","Printer"],answer:"CPU performance",hint:"Excessive paging kills performance"}
    ]
  },
  aoa: {
    title: "Algorithms Analysis",
    icon: Brain,
    color: "from-purple-500 via-pink-500 to-rose-400",
    bgGradient: "from-slate-900 via-purple-900 to-slate-900",
    questions: [
      {question:"Which algorithm uses greedy strategy?",options:["Fractional Knapsack","Merge Sort","Binary Search","DFS"],answer:"Fractional Knapsack",hint:"Take the best immediate choice"},
      {question:"Time complexity of Binary Search?",options:["O(n)","O(log n)","O(n log n)","O(1)"],answer:"O(log n)",hint:"Halving the search space each time"},
      {question:"Which algorithm uses divide and conquer?",options:["Merge Sort","Bubble Sort","Selection Sort","Insertion Sort"],answer:"Merge Sort",hint:"Split, conquer, then merge"},
      {question:"Which sorting algorithm is fastest average?",options:["Quick Sort","Bubble Sort","Insertion Sort","Selection Sort"],answer:"Quick Sort",hint:"O(n log n) average with partitioning"},
      {question:"Which algorithm finds shortest path?",options:["Dijkstra","Prim","Kruskal","DFS"],answer:"Dijkstra",hint:"Edge relaxation from source"},
      {question:"Which paradigm uses overlapping subproblems?",options:["Dynamic Programming","Greedy","Divide & Conquer","Brute Force"],answer:"Dynamic Programming",hint:"Memoization is key here"},
      {question:"What is worst case of Quick Sort?",options:["O(n²)","O(log n)","O(n)","O(n log n)"],answer:"O(n²)",hint:"Happens with poor pivot selection"},
      {question:"Which algorithm builds Minimum Spanning Tree?",options:["Prim","Binary Search","Knapsack","Merge"],answer:"Prim",hint:"Grow tree from arbitrary node"},
      {question:"Which search works on sorted array?",options:["Binary Search","Linear Search","DFS","BFS"],answer:"Binary Search",hint:"Requires random access and ordering"},
      {question:"Which algorithm selects locally optimal choice?",options:["Greedy","Dynamic Programming","Divide & Conquer","Backtracking"],answer:"Greedy",hint:"Myopic strategy without looking ahead"}
    ]
  }
};

const confettiColors = ["#60A5FA", "#34D399", "#F472B6", "#FBBF24", "#A78BFA"];

function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: confettiColors[i % confettiColors.length],
            left: `${Math.random() * 100}%`,
            top: -10,
          }}
          animate={{
            y: [0, window.innerHeight + 100],
            x: [0, (Math.random() - 0.5) * 200],
            rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function ProgressBar({ current, total, colorClass }) {
  const progress = ((current + 1) / total) * 100;
  
  return (
    <div className="w-full h-3 bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm">
      <motion.div
        className={`h-full bg-gradient-to-r ${colorClass}`}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
}

function ScoreRing({ score, total, colorClass, isDarkMode }) {
  const percentage = (score / total) * 100;
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="relative w-64 h-64 mx-auto">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="128"
          cy="128"
          r="120"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-gray-700/30"
        />
        <motion.circle
          cx="128"
          cy="128"
          r="120"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeLinecap="round"
          className={`text-transparent bg-gradient-to-r ${colorClass}`}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: circumference,
          }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          className={`text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          {score}/{total}
        </motion.span>
        <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>Score</span>
      </div>
    </div>
  );
}

export default function CreativeQuiz({ isDarkMode = true }) {
  const [quizType, setQuizType] = useState(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (quizType && !showResult && !showReview) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [quizType, showResult, showReview]);

  if (!quizType) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${isDarkMode ? 'from-slate-900 via-slate-800 to-slate-900' : 'from-blue-50 via-white to-blue-50'} flex items-center justify-center p-4`}>
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Quiz Arena
            </h1>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xl`}>Test your knowledge. Beat the clock.</p>
          </motion.div>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            {Object.entries(quizzes).map(([key, quiz], index) => (
              <motion.button
                key={key}
                onClick={() => setQuizType(key)}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`group relative overflow-hidden bg-gradient-to-br ${isDarkMode ? quiz.bgGradient : 'from-white via-gray-50 to-white'} p-8 rounded-3xl border ${isDarkMode ? 'border-white/10' : 'border-gray-300'} shadow-2xl w-80`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${quiz.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                <quiz.icon className={`w-16 h-16 ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 mx-auto`} />
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{quiz.title}</h2>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{quiz.questions.length} Questions</p>
                <div className={`mt-4 flex items-center justify-center gap-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Target className="w-4 h-4" />
                  <span>Challenge Mode</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const quiz = quizzes[quizType];
  const questions = quiz.questions;
  const question = questions[current];
  const Icon = quiz.icon;

  function handleOption(option) {
    if (selected) return;

    setSelected(option);
    const isCorrect = option === question.answer;
    
    if (isCorrect) {
      setScore(s => s + 1);
      setStreak(s => {
        const newStreak = s + 1;
        setMaxStreak(m => Math.max(m, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }

    setAnswers([...answers, {
      question: question.question,
      selected: option,
      correct: question.answer,
      hint: question.hint,
      time: timer
    }]);
  }

  function nextQuestion() {
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowHint(false);
    } else {
      setShowResult(true);
    }
  }

  function resetQuiz() {
    setQuizType(null);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setAnswers([]);
    setShowResult(false);
    setShowReview(false);
    setStreak(0);
    setMaxStreak(0);
    setTimer(0);
    setShowHint(false);
  }

  if (showResult && !showReview) {
    const percentage = (score / questions.length) * 100;
    const isPerfect = score === questions.length;
    const isGood = percentage >= 70;
    
    return (
      <div className={`min-h-screen bg-gradient-to-br ${isDarkMode ? quiz.bgGradient : 'from-blue-50 via-white to-blue-50'} flex items-center justify-center p-4 relative overflow-hidden`}>
        {isPerfect && <Confetti />}
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`bg-${isDarkMode ? 'white/10' : 'white'} backdrop-blur-xl rounded-3xl p-8 md:p-12 max-w-2xl w-full border ${isDarkMode ? 'border-white/20' : 'border-gray-300'} shadow-2xl text-center relative z-10`}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="mb-6"
          >
            {isPerfect ? (
              <Trophy className="w-24 h-24 text-yellow-400 mx-auto" />
            ) : isGood ? (
              <Star className="w-24 h-24 text-purple-400 mx-auto" />
            ) : (
              <Target className="w-24 h-24 text-blue-400 mx-auto" />
            )}
          </motion.div>

          <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            {isPerfect ? "Perfect Score! 🎉" : isGood ? "Great Job! ⭐" : "Quiz Complete!"}
          </h2>
          
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
            You mastered {score} out of {questions.length} challenges
          </p>

          <ScoreRing score={score} total={questions.length} colorClass={quiz.color} isDarkMode={isDarkMode} />

          <div className="grid grid-cols-3 gap-4 mt-8 mb-8">
            <div className={`bg-${isDarkMode ? 'white/5' : 'gray-100'} rounded-2xl p-4 border ${isDarkMode ? 'border-white/10' : 'border-gray-300'}`}>
              <Zap className={`w-6 h-6 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'} mx-auto mb-2`} />
              <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{maxStreak}</p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Best Streak</p>
            </div>
            <div className={`bg-${isDarkMode ? 'white/5' : 'gray-100'} rounded-2xl p-4 border ${isDarkMode ? 'border-white/10' : 'border-gray-300'}`}>
              <Timer className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'} mx-auto mb-2`} />
              <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Time</p>
            </div>
            <div className={`bg-${isDarkMode ? 'white/5' : 'gray-100'} rounded-2xl p-4 border ${isDarkMode ? 'border-white/10' : 'border-gray-300'}`}>
              <Brain className={`w-6 h-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-500'} mx-auto mb-2`} />
              <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{Math.round(percentage)}%</p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Accuracy</p>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowReview(true)}
              className={`bg-gradient-to-r ${quiz.color} text-white px-8 py-4 rounded-xl font-semibold shadow-lg flex items-center gap-2`}
            >
              <Sparkles className="w-5 h-5" />
              Review Answers
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetQuiz}
              className={`bg-${isDarkMode ? 'white/10' : 'gray-200'} text-${isDarkMode ? 'white' : 'gray-900'} px-8 py-4 rounded-xl font-semibold border ${isDarkMode ? 'border-white/20' : 'border-gray-300'} flex items-center gap-2`}
            >
              <RotateCcw className="w-5 h-5" />
              Try Again
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (showReview) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${isDarkMode ? quiz.bgGradient : 'from-blue-50 via-white to-blue-50'} p-4 md:p-8`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} flex items-center gap-3`}>
              <Icon className="w-8 h-8" />
              Detailed Review
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetQuiz}
              className={`bg-${isDarkMode ? 'white/10' : 'gray-200'} text-${isDarkMode ? 'white' : 'gray-900'} px-6 py-3 rounded-xl border ${isDarkMode ? 'border-white/20' : 'border-gray-300'} flex items-center gap-2`}
            >
              <RotateCcw className="w-5 h-5" />
              New Quiz
            </motion.button>
          </div>

          <div className="space-y-4">
            {answers.map((a, i) => {
              const correct = a.selected === a.correct;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-2xl p-6 border-2 ${correct ? 'bg-green-500/10 border-green-500/50' : 'bg-red-500/10 border-red-500/50'} backdrop-blur-sm`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${correct ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                      {correct ? <CheckCircle2 className="w-6 h-6 text-green-400" /> : <XCircle className="w-6 h-6 text-red-400" />}
                    </div>
                    <div className="flex-1">
                      <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-semibold text-lg mb-3`}>
                        <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mr-2`}>#{i + 1}</span>
                        {a.question}
                      </p>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className={`p-3 rounded-lg ${correct ? `bg-green-500/20 ${isDarkMode ? 'text-green-300' : 'text-green-800'}` : `bg-red-500/20 ${isDarkMode ? 'text-red-300' : 'text-red-800'}`}`}>
                          <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} block mb-1`}>Your Answer</span>
                          {a.selected}
                        </div>
                        {!correct && (
                          <div className={`p-3 rounded-lg bg-green-500/20 ${isDarkMode ? 'text-green-300' : 'text-green-800'}`}>
                            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} block mb-1`}>Correct Answer</span>
                            {a.correct}
                          </div>
                        )}
                      </div>
                      <p className={`mt-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm italic`}>
                        💡 {a.hint}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${isDarkMode ? quiz.bgGradient : 'from-blue-50 via-white to-blue-50'} p-4 md:p-8 flex items-center justify-center`}>
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className={`mb-6 flex items-center justify-between ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl bg-gradient-to-r ${quiz.color}`}>
              <Icon className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
            </div>
            <div>
              <h2 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{quiz.title}</h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Question {current + 1} of {questions.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 bg-${isDarkMode ? 'white/10' : 'gray-100'} px-4 py-2 rounded-full border ${isDarkMode ? 'border-white/10' : 'border-gray-300'}`}>
              <Zap className={`w-5 h-5 ${streak > 2 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} />
              <span className="font-bold">{streak}x</span>
            </div>
            <div className={`flex items-center gap-2 bg-${isDarkMode ? 'white/10' : 'gray-100'} px-4 py-2 rounded-full border ${isDarkMode ? 'border-white/10' : 'border-gray-300'} text-sm`}>
              <Timer className="w-4 h-4 text-gray-400" />
              {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
            </div>
          </div>
        </div>

        {/* Progress */}
        <ProgressBar current={current} total={questions.length} colorClass={quiz.color} />

        {/* Question Card */}
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`mt-8 bg-${isDarkMode ? 'white/10' : 'white'} backdrop-blur-xl rounded-3xl p-8 border ${isDarkMode ? 'border-white/20' : 'border-gray-300'} shadow-2xl`}
        >
          <h3 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-8 leading-relaxed`}>
            {question.question}
          </h3>

          {/* Hint Toggle */}
          {!selected && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setShowHint(!showHint)}
              className="mb-6 text-sm text-gray-400 hover:text-white flex items-center gap-2 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              {showHint ? "Hide Hint" : "Need a Hint?"}
            </motion.button>
          )}

          <AnimatePresence>
            {showHint && !selected && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-200 text-sm"
              >
                💡 {question.hint}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Options */}
          <div className="grid gap-4">
            {question.options.map((option, i) => {
              const isSelected = selected === option;
              const isCorrect = option === question.answer;
              const showCorrect = selected && isCorrect;
              const showWrong = selected && isSelected && !isCorrect;
              
              let buttonClass = `p-5 rounded-xl border-2 text-left transition-all duration-300 flex items-center justify-between group `;
              
              if (!selected) {
                buttonClass += `bg-${isDarkMode ? 'white/5' : 'gray-100'} border-${isDarkMode ? 'white/10' : 'gray-300'} hover:bg-${isDarkMode ? 'white/10' : 'gray-200'} hover:border-${isDarkMode ? 'white/30' : 'gray-400'} text-${isDarkMode ? 'white' : 'gray-900'}`;
              } else if (showCorrect) {
                buttonClass += `bg-green-500/20 border-green-500 text-green-${isDarkMode ? '300' : '800'}`;
              } else if (showWrong) {
                buttonClass += `bg-red-500/20 border-red-500 text-red-${isDarkMode ? '300' : '800'}`;
              } else {
                buttonClass += `bg-${isDarkMode ? 'white/5' : 'gray-100'} border-${isDarkMode ? 'white/10' : 'gray-300'} text-gray-400`;
              }

              return (
                <motion.button
                  key={i}
                  onClick={() => handleOption(option)}
                  disabled={!!selected}
                  whileHover={!selected ? { scale: 1.02, x: 5 } : {}}
                  whileTap={!selected ? { scale: 0.98 } : {}}
                  className={buttonClass}
                >
                  <span className="font-semibold text-lg">{option}</span>
                  {showCorrect && <CheckCircle2 className="w-6 h-6 text-green-400" />}
                  {showWrong && <XCircle className="w-6 h-6 text-red-400" />}
                  {!selected && <ArrowRight className={`w-5 h-5 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity`} />}
                </motion.button>
              );
            })}
          </div>

          {/* Next Button */}
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 flex justify-end"
              >
                <motion.button
                  onClick={nextQuestion}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-gradient-to-r ${quiz.color} text-white px-8 py-4 rounded-xl font-bold shadow-lg flex items-center gap-3`}
                >
                  {current + 1 === questions.length ? "Finish Quiz" : "Next Question"}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Score Footer */}
        <div className="mt-6 text-center text-gray-400 text-sm">
          Current Score: <span className="text-white font-bold text-lg">{score}</span> / {questions.length}
        </div>
      </div>
    </div>
  );
}