import { memo } from 'react'

export default memo(function AboutScreen() {
  const links = [
    {
      label: 'GitHub Profile',
      url: 'https://github.com/AbdullahZaid-ggg',
      icon: <svg viewBox="0 0 20 20" width="18" height="18"><path d="M10 1C5.03 1 1 5.03 1 10c0 3.98 2.58 7.35 6.16 8.54.45.08.62-.2.62-.44 0-.22-.01-.95-.01-1.73-2.51.54-3.04-1.08-3.04-1.08-.41-1.04-1-1.32-1-1.32-.82-.56.06-.55.06-.55.9.06 1.38.93 1.38.93.8 1.37 2.1.98 2.62.75.08-.58.31-.98.56-1.2-2-.22-4.1-1-4.1-4.45 0-.98.35-1.79.93-2.42-.1-.22-.4-1.14.09-2.38 0 0 .75-.24 2.47.92A8.5 8.5 0 0110 5.52c.76.01 1.53.11 2.25.33 1.72-1.16 2.46-.92 2.46-.92.5 1.24.2 2.16.1 2.38.57.63.92 1.44.92 2.42 0 3.46-2.1 4.23-4.1 4.45.32.28.6.82.6 1.66 0 1.2-.01 2.16-.01 2.46 0 .24.16.52.63.44A9.01 9.01 0 0019 10c0-4.97-4.03-9-9-9z" fill="currentColor"/></svg>,
    },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/abdalla-zaid-81926439b/',
      icon: <svg viewBox="0 0 20 20" width="18" height="18"><path d="M16 1H4a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V4a3 3 0 00-3-3zM7 15H5V8h2v7zM6 6.5A1.25 1.25 0 116 4a1.25 1.25 0 010 2.5zM16 15h-2v-4c0-.55-.45-1-1-1s-1 .45-1 1v4h-2V8h2v1.2c.38-.46.93-.7 1.5-.7 1.1 0 2 .9 2 2v4.5z" fill="currentColor"/></svg>,
    },
    {
      label: 'Source Code',
      url: 'https://github.com/AbdullahZaid-ggg/abdalla-preTech-graduate',
      icon: <svg viewBox="0 0 20 20" width="18" height="18"><path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" fill="currentColor"/><path d="M8 6h4M8 9h4M8 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>,
    },
  ]

  return (
    <section className="screen-main">
      <div className="page-card">
        <div className="page-card-header">
          <h2>
            <svg viewBox="0 0 20 20" width="20" height="20" style={{ verticalAlign: -3 }}><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M10 8v5m0-7v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span> About Quiz Arena</span>
          </h2>
          <p>Learn more about this project</p>
        </div>
        <div className="page-card-body">
          <div className="about-section" style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-display)', marginBottom: 8, color: 'var(--md-primary)' }}>What is Quiz Arena?</h3>
            <p style={{ lineHeight: 1.7, fontSize: '0.92rem' }}>Quiz Arena is a full-featured interactive quiz game built from scratch with React. Test your knowledge across 12 categories with 98 local questions, or fetch fresh questions from the <strong>Open Trivia Database API</strong>. Track every attempt, compare your performance day by day with a daily comparison chart, build streaks, and celebrate high scores with confetti — all wrapped in a sleek Material Design 3 + Cyber theme with dark and light mode support.</p>
          </div>
          <div className="about-section" style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-display)', marginBottom: 8, color: 'var(--md-primary)' }}>Features</h3>
            <ul className="about-features" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--shape-sm)', fontSize: '0.9rem' }}>98 Local Questions across 12 categories</li>
              <li style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--shape-sm)', fontSize: '0.9rem' }}>API Quizzes from Open Trivia Database</li>
              <li style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--shape-sm)', fontSize: '0.9rem' }}>3 Difficulty Levels per category</li>
              <li style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--shape-sm)', fontSize: '0.9rem' }}>Practice Mode (no timer) & True / False Mode</li>
              <li style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--shape-sm)', fontSize: '0.9rem' }}>Dark / Light Mode with theme toggle</li>
              <li style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--shape-sm)', fontSize: '0.9rem' }}>History tracking with daily comparison chart</li>
              <li style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--shape-sm)', fontSize: '0.9rem' }}>Streak counter, confetti, and sound effects</li>
              <li style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--shape-sm)', fontSize: '0.9rem' }}>Keyboard shortcuts: 1-4 = answer, Enter = next, Arrow keys = navigate</li>
              <li style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--shape-sm)', fontSize: '0.9rem' }}>Export results as PNG (html2canvas) & history as JSON</li>
              <li style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--shape-sm)', fontSize: '0.9rem' }}>PWA / offline support with service worker</li>
            </ul>
          </div>
          <div className="about-section" style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-display)', marginBottom: 8, color: 'var(--md-primary)' }}>Tech Stack</h3>
            <p style={{ lineHeight: 1.7, fontSize: '0.92rem' }}>Built with <strong>React 19</strong> + <strong>Vite 8</strong>, vanilla CSS, and a custom Material Design 3 + Cyber theme. State management via Context + useReducer. Questions powered by the Open Trivia Database API. Fully offline-ready with a service worker for PWA support.</p>
          </div>
          <div className="about-section" style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-display)', marginBottom: 12, color: 'var(--md-primary)' }}>
              <svg viewBox="0 0 20 20" width="18" height="18" style={{ verticalAlign: -3 }}><path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M8 8h4M8 11h4M8 14h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none"/></svg>
              <span> Built With</span>
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {[
                'React 19', 'Vite 8', 'React Router 6', 'html2canvas',
                'Vanilla CSS', 'CSS Custom Properties', 'Web Audio API',
                'Canvas API', 'Context + useReducer', 'PWA / Service Worker',
                'Open Trivia DB API', 'Vitest', 'Testing Library', 'ESLint',
              ].map(tech => (
                <span key={tech} style={{
                  padding: '5px 12px',
                  borderRadius: 'var(--shape-sm)',
                  background: 'rgba(99, 102, 241, 0.1)',
                  border: '1px solid rgba(99, 102, 241, 0.15)',
                  fontSize: '0.8rem',
                  color: 'var(--md-primary)',
                }}>{tech}</span>
              ))}
            </div>
          </div>
          <div className="about-section" style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-display)', marginBottom: 8, color: 'var(--md-primary)' }}>
              <svg viewBox="0 0 18 18" width="18" height="18" style={{ verticalAlign: -3 }}><circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M3 16c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
              <span> About the Developer</span>
            </h3>
            <p style={{ lineHeight: 1.7, fontSize: '0.92rem', marginBottom: 16 }}>
              Hey! I'm <strong>AbdAlla Zaid</strong> — a high school graduate in Electronics, CS, and Physics, headed to <strong>Technion University</strong> next year to study Computer Science. I'm passionate about low-level systems, frontend engineering, and everything in between. My toolkit spans <strong>microcontrollers, Linux (Arch btw), frontend dev, cybersecurity, and OS-level tinkering</strong>.
              <br /><br />
              I completed the <strong>PreTech course</strong> and <strong>Dr. Angela Yu's Full-Stack Web Development Bootcamp</strong> on Udemy. Outside of code, I'm a <strong>WCA speedcuber</strong> — competing in 3x3, 2x2, and one-handed events. My ultimate goal is to become a <strong>full-stack developer or OS engineer</strong>, building things that live both close to the metal and on the web.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {links.map(link => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 16px',
                    borderRadius: 'var(--shape-sm)',
                    background: 'rgba(255,255,255,0.03)',
                    color: 'var(--md-primary)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                >
                  {link.icon}
                  {link.label}
                  <svg viewBox="0 0 16 16" width="12" height="12" style={{ marginLeft: 'auto', opacity: 0.5 }}><path d="M5 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})
