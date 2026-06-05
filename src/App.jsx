import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { useQuiz } from './context/QuizContext'
import Navbar from './components/Navbar'
import HomeScreen from './components/HomeScreen'
import CategoryScreen from './components/CategoryScreen'
import QuizScreen from './components/QuizScreen'
import ResultsScreen from './components/ResultsScreen'
import HistoryScreen from './components/HistoryScreen'
import AboutScreen from './components/AboutScreen'
import ContactScreen from './components/ContactScreen'
import NotFoundScreen from './components/NotFoundScreen'
import QuestionSetsScreen from './components/QuestionSetsScreen'
import QuestionSetEditor from './components/QuestionSetEditor'
import ToastContainer from './components/ToastContainer'
import { playClick } from './utils/sound'

const routeMap = {
  '/': 'home',
  '/category': 'category',
  '/quiz': 'quiz',
  '/results': 'results',
  '/history': 'history',
  '/sets': 'sets',
  '/about': 'about',
  '/contact': 'contact',
}

export default function App() {
  const { state, dispatch } = useQuiz()
  const location = useLocation()
  const navigate = useNavigate()
  const currentRoute = routeMap[location.pathname] || (location.pathname.startsWith('/sets/') ? 'sets' : 'home')
  const prevRoute = useRef(currentRoute)

  useEffect(() => {
    if (currentRoute !== prevRoute.current) {
      prevRoute.current = currentRoute
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentRoute])

  const routeFromScreen = {
    home: '/', category: '/category', quiz: '/quiz',
    results: '/results', history: '/history', sets: '/sets',
    about: '/about', contact: '/contact',
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
          <Route path="/sets" element={<QuestionSetsScreen />} />
          <Route path="/sets/:setId" element={<QuestionSetEditor />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/contact" element={<ContactScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="footer-left">
          <div className="footer-social">
            <a href="https://github.com/AbdullahZaid-ggg" target="_blank" rel="noopener noreferrer" title="GitHub" className="footer-icon-link">
              <svg viewBox="0 0 20 20" width="16" height="16"><path d="M10 1C5.03 1 1 5.03 1 10c0 3.98 2.58 7.35 6.16 8.54.45.08.62-.2.62-.44 0-.22-.01-.95-.01-1.73-2.51.54-3.04-1.08-3.04-1.08-.41-1.04-1-1.32-1-1.32-.82-.56.06-.55.06-.55.9.06 1.38.93 1.38.93.8 1.37 2.1.98 2.62.75.08-.58.31-.98.56-1.2-2-.22-4.1-1-4.1-4.45 0-.98.35-1.79.93-2.42-.1-.22-.4-1.14.09-2.38 0 0 .75-.24 2.47.92A8.5 8.5 0 0110 5.52c.76.01 1.53.11 2.25.33 1.72-1.16 2.46-.92 2.46-.92.5 1.24.2 2.16.1 2.38.57.63.92 1.44.92 2.42 0 3.46-2.1 4.23-4.1 4.45.32.28.6.82.6 1.66 0 1.2-.01 2.16-.01 2.46 0 .24.16.52.63.44A9.01 9.01 0 0019 10c0-4.97-4.03-9-9-9z" fill="currentColor"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/abdalla-zaid-81926439b/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="footer-icon-link">
              <svg viewBox="0 0 20 20" width="16" height="16"><path d="M16 1H4a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V4a3 3 0 00-3-3zM7 15H5V8h2v7zM6 6.5A1.25 1.25 0 116 4a1.25 1.25 0 010 2.5zM16 15h-2v-4c0-.55-.45-1-1-1s-1 .45-1 1v4h-2V8h2v1.2c.38-.46.93-.7 1.5-.7 1.1 0 2 .9 2 2v4.5z" fill="currentColor"/></svg>
            </a>
          </div>
          <span className="footer-tagline">Built with React + Vite</span>
        </div>
        <p className="footer-copy">&copy; 2026 AbdAlla Zaid</p>
        <div className="footer-right">
          <p className="keyboard-hint">
            <svg viewBox="0 0 16 16" width="14" height="14" style={{ verticalAlign: -2 }}>
              <rect x="1" y="4" width="14" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
              <line x1="4" y1="4" x2="4" y2="12" stroke="currentColor" strokeWidth="0.5"/>
              <line x1="8" y1="4" x2="8" y2="12" stroke="currentColor" strokeWidth="0.5"/>
              <line x1="12" y1="4" x2="12" y2="12" stroke="currentColor" strokeWidth="0.5"/>
              <line x1="1" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="0.5"/>
            </svg>
            <span> 1-4 answer, Enter next,  ←  →  navigate</span>
          </p>
          <button className="footer-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} title="Back to top">
            <svg viewBox="0 0 16 16" width="14" height="14"><path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </footer>
      {state.loading && (
        <div className="loading-overlay">
          <div className="spinner" />
          <p className="loading-text">Loading questions...</p>
        </div>
      )}
      <ToastContainer />
      <Analytics />
    </div>
  )
}
