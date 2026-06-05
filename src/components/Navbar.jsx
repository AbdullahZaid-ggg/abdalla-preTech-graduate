import { useState, memo, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'
import { setMuted } from '../utils/sound'

const tabs = [
  { path: '/', label: 'Home', svg: '<svg viewBox="0 0 20 20" width="18" height="18"><path d="M3 10L10 3l7 7v7h-5v-5H8v5H3z" fill="currentColor"/></svg>' },
  { path: '/history', label: 'History', svg: '<svg viewBox="0 0 20 20" width="18" height="18"><path d="M4 3h12v2H4zm0 4h12v2H4zm0 4h8v2H4zm0 4h12v2H4z" fill="currentColor"/></svg>' },
  { path: '/sets', label: 'My Sets', svg: '<svg viewBox="0 0 20 20" width="18" height="18"><path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M8 8h4M8 11h4M8 14h2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" fill="none"/></svg>' },
  { path: '/about', label: 'About', svg: '<svg viewBox="0 0 20 20" width="18" height="18"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M10 8v5m0-7v1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>' },
  { path: '/contact', label: 'Contact', svg: '<svg viewBox="0 0 20 20" width="18" height="18"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M2 6l8 5 8-5" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>' },
]

const themeOptions = [
  { id: 'cyber', label: 'Cyber', color: '#00e5ff', mode: 'dark' },
  { id: 'ocean', label: 'Ocean', color: '#0ea5e9', mode: 'dark' },
  { id: 'sunset', label: 'Sunset', color: '#f97316', mode: 'dark' },
  { id: 'midnight', label: 'Midnight', color: '#a78bfa', mode: 'dark' },
  { id: 'forest', label: 'Forest', color: '#22c55e', mode: 'dark' },
  { id: 'nord', label: 'Nord', color: '#81a1c1', mode: 'dark' },
  { id: 'light', label: 'Light', color: '#2563eb', mode: 'light' },
  { id: 'dawn', label: 'Dawn', color: '#ea580c', mode: 'light' },
  { id: 'mint', label: 'Mint', color: '#059669', mode: 'light' },
  { id: 'rose', label: 'Rose', color: '#e11d48', mode: 'light' },
  { id: 'sky', label: 'Sky', color: '#0284c7', mode: 'light' },
]

export default memo(function Navbar() {
  const { state, dispatch } = useQuiz()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)
  const themeRef = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (themeRef.current && !themeRef.current.contains(e.target)) {
        setThemeOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function navigateTo(path) {
    navigate(path)
    setSidebarOpen(false)
  }

  const currentPath = location.pathname
  const currentTheme = themeOptions.find(t => t.id === state.theme) || themeOptions[0]

  return (
    <>
      <nav className="top-nav">
        <div className="nav-inner">
          <button className="nav-brand" onClick={() => navigateTo('/')}>
            <img className="logo-dark" src="/assets/images/hero.svg" alt="Z-Fahm" />
            <img className="logo-light" src="/assets/images/hero-light.svg" alt="Z-Fahm" />
            <span>Z-Fahm</span>
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
            <div className="theme-selector" ref={themeRef}>
              <button className="theme-toggle theme-palette-btn" onClick={() => setThemeOpen(!themeOpen)} title="Select theme" style={{ '--theme-color': currentTheme.color }}>
                <svg viewBox="0 0 20 20" width="18" height="18">
                  <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.08"/>
                  <path d="M6 6h3v3H6zm5 0h3v3h-3zM6 11h3v3H6zm5-1h3v4h-3z" fill="currentColor" opacity="0.6"/>
                  <circle cx="6.5" cy="7.5" r="1.5" fill="var(--theme-color)"/>
                  <circle cx="13.5" cy="7.5" r="1.5" fill="var(--theme-color)" opacity="0.7"/>
                  <circle cx="6.5" cy="14.5" r="1.5" fill="var(--theme-color)" opacity="0.5"/>
                  <circle cx="13.5" cy="13" r="1.5" fill="var(--theme-color)" opacity="0.85"/>
                </svg>
              </button>
              {themeOpen && (
                <div className="theme-dropdown">
                  {themeOptions.map(t => (
                    <button
                      key={t.id}
                      className={`theme-option${t.id === state.theme ? ' active' : ''}`}
                      onClick={() => { dispatch({ type: 'SET_THEME', payload: t.id }); setThemeOpen(false) }}
                    >
                      <span className="theme-dot" style={{ background: t.color }} />
                      <span>{t.label}</span>
                      {t.id === state.theme && (
                        <svg viewBox="0 0 16 16" width="14" height="14" style={{ marginLeft: 'auto' }}>
                          <path d="M3 8l3 4 7-8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
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
          <div className="sidebar-themes-section">
            <span className="sidebar-themes-label">Theme</span>
            <div className="sidebar-themes-grid">
              {themeOptions.map(t => (
                <button
                  key={t.id}
                  className={`sidebar-theme-opt${t.id === state.theme ? ' active' : ''}`}
                  onClick={() => dispatch({ type: 'SET_THEME', payload: t.id })}
                  title={t.label}
                >
                  <span className="theme-dot" style={{ background: t.color }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
})
