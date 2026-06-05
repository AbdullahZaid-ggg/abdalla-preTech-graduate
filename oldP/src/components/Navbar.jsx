import { useQuiz } from '../context/QuizContext'

const tabs = [
  { action: 'home', label: 'Home', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><path d="M3 10L10 3l7 7v7h-5v-5H8v5H3z" fill="currentColor"/></svg>' },
  { action: 'history', label: 'History', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><path d="M4 3h12v2H4zm0 4h12v2H4zm0 4h8v2H4zm0 4h12v2H4z" fill="currentColor"/></svg>' },
  { action: 'about', label: 'About', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M10 8v5m0-7v1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>' },
  { action: 'contact', label: 'Contact', svg: '<svg viewBox="0 0 20 20" width="16" height="16"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M2 6l8 5 8-5" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>' },
]

export default function Navbar() {
  const { state, dispatch } = useQuiz()

  function navigate(screen) {
    if (screen === 'home') {
      dispatch({ type: 'SET_SCREEN', payload: 'home' })
    } else {
      dispatch({ type: 'SET_SCREEN', payload: screen })
    }
  }

  function toggleTheme() {
    dispatch({ type: 'SET_THEME' })
  }

  return (
    <nav className="top-nav">
      <div className="nav-inner">
        <button className="nav-brand" onClick={() => navigate('home')}>
          <img className="logo-dark" src="/assets/images/hero.svg" alt="" />
          <img className="logo-light" src="/assets/images/hero-light.svg" alt="" />
          <span>Quiz Arena</span>
        </button>
        <div className="nav-tabs">
          {tabs.map(t => (
            <button
              key={t.action}
              className={`nav-tab${state.screen === t.action ? ' active' : ''}`}
              onClick={() => navigate(t.action)}
              dangerouslySetInnerHTML={{ __html: `${t.svg} <span>${t.label}</span>` }}
            />
          ))}
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
            <svg viewBox="0 0 20 20" width="18" height="18"><circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/><g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="10" y1="1" x2="10" y2="3"/><line x1="10" y1="17" x2="10" y2="19"/><line x1="1" y1="8" x2="3" y2="8"/><line x1="17" y1="8" x2="19" y2="8"/><line x1="3.5" y1="3.5" x2="5" y2="5"/><line x1="15" y1="15" x2="16.5" y2="16.5"/><line x1="3.5" y1="16.5" x2="5" y2="15"/><line x1="15" y1="5" x2="16.5" y2="3.5"/></g></svg>
          </button>
        </div>
      </div>
    </nav>
  )
}
