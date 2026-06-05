import { useQuiz } from '../context/QuizContext'

export default function AboutScreen() {
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
            <p style={{ lineHeight: 1.7, fontSize: '0.92rem' }}>Quiz Arena is an interactive quiz game that lets you test your knowledge across various topics. Answer multiple-choice questions, track your score, and challenge yourself to improve every day.</p>
          </div>
          <div className="about-section" style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-display)', marginBottom: 8, color: 'var(--md-primary)' }}>Features</h3>
            <ul className="about-features" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--shape-sm)', fontSize: '0.9rem' }}>108 Local Questions across 13 categories</li>
              <li style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--shape-sm)', fontSize: '0.9rem' }}>API Quizzes from Open Trivia Database</li>
              <li style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--shape-sm)', fontSize: '0.9rem' }}>3 Difficulty Levels per category</li>
              <li style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--shape-sm)', fontSize: '0.9rem' }}>Dark / Light Mode with theme toggle</li>
              <li style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--shape-sm)', fontSize: '0.9rem' }}>History tracking with daily comparison</li>
              <li style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--shape-sm)', fontSize: '0.9rem' }}>Streak counter, confetti, and sound effects</li>
              <li style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--shape-sm)', fontSize: '0.9rem' }}>Built with React + Vite</li>
            </ul>
          </div>
          <div className="about-section" style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-display)', marginBottom: 8, color: 'var(--md-primary)' }}>Tech Stack</h3>
            <p style={{ lineHeight: 1.7, fontSize: '0.92rem' }}>Built with React, Vite, and vanilla CSS. Styled with a custom Material Design 3 + Cyber theme. Questions powered by the Open Trivia Database API.</p>
          </div>
          <div className="about-section">
            <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-display)', marginBottom: 8, color: 'var(--md-primary)' }}>
              <svg viewBox="0 0 18 18" width="18" height="18" style={{ verticalAlign: -3 }}><circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M3 16c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
              <span> About the Developer</span>
            </h3>
            <p style={{ lineHeight: 1.7, fontSize: '0.92rem' }}>Hi! I'm <strong>AbdAlla Zaid</strong>, a passionate web developer who loves building interactive web experiences. This quiz game is built from scratch with clean code, a modern UI, and features that make learning fun.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
