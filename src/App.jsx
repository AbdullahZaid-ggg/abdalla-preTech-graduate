import { useEffect } from 'react'
import { useQuiz } from './context/QuizContext'
import Navbar from './components/Navbar'
import HomeScreen from './components/HomeScreen'
import CategoryScreen from './components/CategoryScreen'
import QuizScreen from './components/QuizScreen'
import ResultsScreen from './components/ResultsScreen'
import HistoryScreen from './components/HistoryScreen'
import AboutScreen from './components/AboutScreen'
import ContactScreen from './components/ContactScreen'
import { playClick } from './utils/sound'

const screens = {
  home: HomeScreen,
  category: CategoryScreen,
  quiz: QuizScreen,
  results: ResultsScreen,
  history: HistoryScreen,
  about: AboutScreen,
  contact: ContactScreen,
}

export default function App() {
  const { state, dispatch } = useQuiz()
  const Screen = screens[state.screen] || HomeScreen

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

  useEffect(() => {
    const src = state.theme === 'dark' ? '/assets/images/hero.svg' : '/assets/images/hero-light.svg'
    document.querySelectorAll('.nav-brand img, #hero-logo').forEach(img => { if (img) img.src = src })
  }, [state.theme])

  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-area">
        <div className="main-content">
          <Screen />
        </div>
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
    </div>
  )
}
