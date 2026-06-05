import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useQuiz } from './context/QuizContext'
import Navbar from './components/Navbar'
import HomeScreen from './components/HomeScreen'
import CategoryScreen from './components/CategoryScreen'
import QuizScreen from './components/QuizScreen'
import ResultsScreen from './components/ResultsScreen'
import HistoryScreen from './components/HistoryScreen'
import AboutScreen from './components/AboutScreen'
import ContactScreen from './components/ContactScreen'
import ToastContainer from './components/ToastContainer'
import { playClick } from './utils/sound'

const routeMap = {
  '/': 'home',
  '/category': 'category',
  '/quiz': 'quiz',
  '/results': 'results',
  '/history': 'history',
  '/about': 'about',
  '/contact': 'contact',
}

export default function App() {
  const { state, dispatch } = useQuiz()
  const location = useLocation()
  const navigate = useNavigate()
  const currentRoute = routeMap[location.pathname] || 'home'
  const prevRoute = useRef(currentRoute)

  useEffect(() => {
    if (currentRoute !== prevRoute.current) {
      prevRoute.current = currentRoute
    }
  }, [currentRoute])

  const routeFromScreen = {
    home: '/', category: '/category', quiz: '/quiz',
    results: '/results', history: '/history', about: '/about', contact: '/contact',
  }

  useEffect(() => {
    if (state.screen !== currentRoute) {
      dispatch({ type: 'SET_SCREEN', payload: currentRoute })
    }
  }, [currentRoute])

  useEffect(() => {
    const target = routeFromScreen[state.screen]
    if (target && target !== location.pathname) {
      navigate(target)
    }
  }, [state.screen])

  useEffect(() => {
    function handleKey(e) {
      if (state.screen !== 'quiz') return
      if (['1', '2', '3', '4'].includes(e.key)) {
        const btns = document.querySelectorAll('.option-btn:not(:disabled)')
        const idx = parseInt(e.key) - 1
        if (btns[idx]) { btns[idx].click(); playClick() }
      }
      if (e.key === 'Enter') {
        const nextBtn = document.getElementById('next-btn') || document.querySelector('.btn-primary')
        if (nextBtn && !nextBtn.disabled) nextBtn.click()
      }
      if (e.key === 'ArrowLeft') {
        const prevBtn = document.getElementById('prev-btn')
        if (prevBtn && !prevBtn.disabled) { prevBtn.click(); playClick() }
      }
      if (e.key === 'ArrowRight') {
        const nextBtn = document.getElementById('next-btn')
        if (nextBtn && !nextBtn.disabled) { nextBtn.click(); playClick() }
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [state.screen])

  return (
    <div className="app-wrapper">
      <a href="#main-content" className="skip-link" style={{
        position: 'absolute', top: '-100px', left: 0, zIndex: 9999,
        padding: '8px 16px', background: 'var(--md-primary)', color: '#fff',
        textDecoration: 'none', borderRadius: '0 0 4px 0'
      }}>Skip to main content</a>
      <Navbar />
      <main className="main-area" id="main-content" role="main">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/category" element={<CategoryScreen />} />
          <Route path="/quiz" element={<QuizScreen />} />
          <Route path="/results" element={<ResultsScreen />} />
          <Route path="/history" element={<HistoryScreen />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/contact" element={<ContactScreen />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <p>&copy; 2026 AbdAlla Zaid. All rights reserved.</p>
        <p className="keyboard-hint">
          <svg viewBox="0 0 16 16" width="14" height="14" style={{ verticalAlign: -2 }}>
            <rect x="1" y="4" width="14" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
            <line x1="4" y1="4" x2="4" y2="12" stroke="currentColor" strokeWidth="0.5"/>
            <line x1="8" y1="4" x2="8" y2="12" stroke="currentColor" strokeWidth="0.5"/>
            <line x1="12" y1="4" x2="12" y2="12" stroke="currentColor" strokeWidth="0.5"/>
            <line x1="1" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="0.5"/>
          </svg>
          <span> Keyboard: 1-4 = answer, Enter = next,  ←  →  = navigate</span>
        </p>
      </footer>
      {state.loading && (
        <div className="loading-overlay">
          <div className="spinner" />
          <p className="loading-text">Loading questions...</p>
        </div>
      )}
      <ToastContainer />
    </div>
  )
}
