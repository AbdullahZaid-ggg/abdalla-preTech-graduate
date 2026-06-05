import { useState, memo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'
import { setMuted } from '../utils/sound'

const tabs = [
  { path: '/', label: 'Home', svg: '<svg viewBox="0 0 20 20" width="18" height="18"><path d="M3 10L10 3l7 7v7h-5v-5H8v5H3z" fill="currentColor"/></svg>' },
  { path: '/history', label: 'History', svg: '<svg viewBox="0 0 20 20" width="18" height="18"><path d="M4 3h12v2H4zm0 4h12v2H4zm0 4h8v2H4zm0 4h12v2H4z" fill="currentColor"/></svg>' },
  { path: '/about', label: 'About', svg: '<svg viewBox="0 0 20 20" width="18" height="18"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M10 8v5m0-7v1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>' },
  { path: '/contact', label: 'Contact', svg: '<svg viewBox="0 0 20 20" width="18" height="18"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M2 6l8 5 8-5" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>' },
]

export default memo(function Navbar() {
  const { state, dispatch } = useQuiz()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function navigateTo(path) {
    navigate(path)
    setSidebarOpen(false)
  }

  function toggleTheme() {
    dispatch({ type: 'SET_THEME' })
  }

  const currentPath = location.pathname

  return (
    <>
      <nav className="top-nav">
        <div className="nav-inner">
          <button className="nav-brand" onClick={() => navigateTo('/')}>
            <img className="logo-dark" src="/assets/images/hero.svg" alt="Quiz Arena" />
            <img className="logo-light" src="/assets/images/hero-light.svg" alt="Quiz Arena" />
            <span>Quiz Arena</span>
          </button>
          <div className="nav-tabs">
            {tabs.map(t => (
              <button
                key={t.path}
                className={`nav-tab${currentPath === t.path ? ' active' : ''}`}
                onClick={() => navigateTo(t.path)}
                dangerouslySetInnerHTML={{ __html: `${t.svg} <span>${t.label}</span>` }}
              />
            ))}
            <button className="theme-toggle" onClick={() => { dispatch({ type: 'TOGGLE_MUTED' }); setMuted(!state.muted) }} title={state.muted ? 'Unmute sounds' : 'Mute sounds'}>
              {state.muted ? (
                <svg viewBox="0 0 20 20" width="18" height="18"><path d="M8 4l-4 4H2v4h2l4 4V4z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/><line x1="12" y1="8" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="16" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              ) : (
                <svg viewBox="0 0 20 20" width="18" height="18"><path d="M8 4l-4 4H2v4h2l4 4V4z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/><path d="M12 7a5 5 0 010 6M14 4a8 8 0 010 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
              )}
            </button>
            <button className="theme-toggle" onClick={toggleTheme} title={state.theme === 'dark' ? 'Light mode' : 'Dark mode'}>
              {state.theme === 'dark' ? (
                <svg viewBox="0 0 20 20" width="18" height="18"><circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/><g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="10" y1="1" x2="10" y2="3"/><line x1="10" y1="17" x2="10" y2="19"/><line x1="1" y1="8" x2="3" y2="8"/><line x1="17" y1="8" x2="19" y2="8"/><line x1="3.5" y1="3.5" x2="5" y2="5"/><line x1="15" y1="15" x2="16.5" y2="16.5"/><line x1="3.5" y1="16.5" x2="5" y2="15"/><line x1="15" y1="5" x2="16.5" y2="3.5"/></g></svg>
              ) : (
                <svg viewBox="0 0 20 20" width="18" height="18"><path d="M10 2a8 8 0 000 16 6 6 0 010-12 8 8 0 000-4z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
            </button>
          </div>
          <button
            className={`hamburger${sidebarOpen ? ' open' : ''}`}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
      <div className={`sidebar-overlay${sidebarOpen ? ' visible' : ''}`} onClick={() => setSidebarOpen(false)} />
      <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-title">Menu</span>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <svg viewBox="0 0 20 20" width="22" height="22"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div className="sidebar-items">
          {tabs.map(t => (
            <button
              key={t.path}
              className={`sidebar-item${currentPath === t.path ? ' active' : ''}`}
              onClick={() => navigateTo(t.path)}
              dangerouslySetInnerHTML={{ __html: `${t.svg} <span>${t.label}</span>` }}
            />
          ))}
        </div>
        <div className="sidebar-footer">
          <button className="sidebar-theme-btn" onClick={() => { dispatch({ type: 'TOGGLE_MUTED' }); setMuted(!state.muted) }}>
            {state.muted ? (
              <svg viewBox="0 0 20 20" width="18" height="18"><path d="M8 4l-4 4H2v4h2l4 4V4z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/><line x1="12" y1="8" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="16" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            ) : (
              <svg viewBox="0 0 20 20" width="18" height="18"><path d="M8 4l-4 4H2v4h2l4 4V4z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/><path d="M12 7a5 5 0 010 6M14 4a8 8 0 010 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
            )}
            <span>{state.muted ? 'Unmute' : 'Mute sounds'}</span>
          </button>
          <button className="sidebar-theme-btn" onClick={toggleTheme}>
            {state.theme === 'dark' ? (
              <svg viewBox="0 0 20 20" width="18" height="18"><circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/><g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="10" y1="1" x2="10" y2="3"/><line x1="10" y1="17" x2="10" y2="19"/><line x1="1" y1="8" x2="3" y2="8"/><line x1="17" y1="8" x2="19" y2="8"/><line x1="3.5" y1="3.5" x2="5" y2="5"/><line x1="15" y1="15" x2="16.5" y2="16.5"/><line x1="3.5" y1="16.5" x2="5" y2="15"/><line x1="15" y1="5" x2="16.5" y2="3.5"/></g></svg>
            ) : (
              <svg viewBox="0 0 20 20" width="18" height="18"><path d="M10 2a8 8 0 000 16 6 6 0 010-12 8 8 0 000-4z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            )}
            <span>{state.theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
          </button>
        </div>
      </aside>
    </>
  )
})
