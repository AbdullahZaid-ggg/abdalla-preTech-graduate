import { useNavigate } from 'react-router-dom'

export default function NotFoundScreen() {
  const navigate = useNavigate()
  return (
    <section className="screen-main">
      <div className="page-card" style={{ textAlign: 'center' }}>
        <div className="page-card-body">
          <svg viewBox="0 0 64 64" width="80" height="80" style={{ color: 'var(--md-on-surface-variant)', opacity: 0.4, marginBottom: 16 }}>
            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M24 24l16 16M40 24l-16 16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          </svg>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: 8 }}>404 — Page Not Found</h2>
          <p style={{ color: 'var(--md-on-surface-variant)', marginBottom: 24 }}>The page you're looking for doesn't exist.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            <svg viewBox="0 0 16 16" width="16" height="16"><path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back to Home
          </button>
        </div>
      </div>
    </section>
  )
}
