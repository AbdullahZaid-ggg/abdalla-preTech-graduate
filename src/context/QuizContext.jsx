import { createContext, useContext, useReducer, useEffect } from 'react'
import { saveState, loadState, clearState } from '../utils/storage'
import { CONFIG } from '../utils/config'

const QuizContext = createContext()

const initialState = {
  screen: 'home',
  quizQuestions: [],
  currentQuestionIndex: 0,
  score: 0,
  userAnswers: [],
  isApiMode: false,
  streak: 0,
  timerRemaining: CONFIG.TIMER_DURATION,
  timerInterval: null,
  localCategory: 'All',
  localDifficulty: 'all',
  theme: 'dark',
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, screen: action.payload }

    case 'LOAD_QUESTIONS':
      return {
        ...state,
        quizQuestions: action.payload.questions,
        isApiMode: action.payload.isApiMode,
        localCategory: action.payload.category || 'All',
        localDifficulty: action.payload.difficulty || 'all',
      }

    case 'START_QUIZ': {
      const total = (action.payload || state.quizQuestions).length
      return {
        ...state,
        quizQuestions: action.payload || state.quizQuestions,
        currentQuestionIndex: 0,
        score: 0,
        streak: 0,
        userAnswers: new Array(total).fill(-1),
        timerRemaining: CONFIG.TIMER_DURATION * total,
        screen: 'quiz',
      }
    }

    case 'RESUME_QUIZ': {
      const saved = action.payload
      const total = saved.quizQuestions.length
      const remainingTime = CONFIG.TIMER_DURATION * total - Math.floor((Date.now() - (saved.timestamp || Date.now())) / 1000)
      return {
        ...state,
        quizQuestions: saved.quizQuestions,
        currentQuestionIndex: saved.currentQuestionIndex,
        score: saved.score,
        userAnswers: saved.userAnswers,
        isApiMode: saved.isApiMode,
        timerRemaining: Math.max(0, remainingTime),
        screen: 'quiz',
      }
    }

    case 'ANSWER_QUESTION': {
      const { index } = action.payload
      const newAnswers = [...state.userAnswers]
      newAnswers[state.currentQuestionIndex] = index
      const isCorrect = index === state.quizQuestions[state.currentQuestionIndex].correct
      return {
        ...state,
        userAnswers: newAnswers,
        score: isCorrect ? state.score + 1 : state.score,
        streak: isCorrect ? state.streak + 1 : 0,
      }
    }

    case 'NEXT_QUESTION': {
      const nextIdx = state.currentQuestionIndex + 1
      if (nextIdx >= state.quizQuestions.length) {
        return { ...state, screen: 'results' }
      }
      return { ...state, currentQuestionIndex: nextIdx }
    }

    case 'PREV_QUESTION':
      return { ...state, currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1) }

    case 'GO_TO_QUESTION':
      return { ...state, currentQuestionIndex: action.payload }

    case 'SHOW_RESULTS':
      return { ...state, screen: 'results' }

    case 'TICK_TIMER':
      return { ...state, timerRemaining: state.timerRemaining - 1 }

    case 'RESET_TIMER':
      return { ...state, timerRemaining: CONFIG.TIMER_DURATION }

    case 'SET_THEME':
      return { ...state, theme: 'dark' }

    default:
      return state
  }
}

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme)
  }, [state.theme])

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (!context) throw new Error('useQuiz must be used within QuizProvider')
  return context
}
