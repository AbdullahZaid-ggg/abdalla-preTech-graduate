import { memo } from 'react'

export default memo(function ContactScreen() {
  return (
    <section className="screen-main">
      <div className="page-card">
        <div className="page-card-header">
          <h2>
            <svg viewBox="0 0 20 20" width="20" height="20" style={{ verticalAlign: -3 }}><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M2 6l8 5 8-5" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
            <span> Contact Us</span>
          </h2>
          <p>Get in touch with the developer</p>
        </div>
        <div className="page-card-body">
          <div className="contact-info" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12, marginBottom: 28 }}>
            <a href="mailto:abdallazeed3@gmail.com" className="contact-item" target="_blank" rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--shape-md)', textDecoration: 'none', color: 'inherit', cursor: 'pointer', transition: 'background 0.2s, transform 0.15s' }}>
              <span className="contact-icon" style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><img src="/assets/icons/gmail.svg" alt="Email" style={{ width: 28, height: 28, filter: 'invert(1)' }} /></span>
              <div><strong style={{ display: 'block', fontSize: '0.88rem' }}>Email</strong><p style={{ fontSize: '0.85rem', color: 'var(--md-on-surface-variant)' }}>abdallazeed3@gmail.com</p></div>
            </a>
            <a href="https://www.linkedin.com/in/abdalla-zaid-81926439b" className="contact-item" target="_blank" rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--shape-md)', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
              <span className="contact-icon" style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><img src="/assets/icons/linkedin.svg" alt="LinkedIn" style={{ width: 28, height: 28, filter: 'invert(1)' }} /></span>
              <div><strong style={{ display: 'block', fontSize: '0.88rem' }}>LinkedIn</strong><p style={{ fontSize: '0.85rem', color: 'var(--md-on-surface-variant)' }}>abdalla-zaid-81926439b</p></div>
            </a>
            <a href="https://github.com/AbdullahZaid-ggg" className="contact-item" target="_blank" rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--shape-md)', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
              <span className="contact-icon" style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><img src="/assets/icons/github.svg" alt="GitHub" style={{ width: 28, height: 28, filter: 'invert(1)' }} /></span>
              <div><strong style={{ display: 'block', fontSize: '0.88rem' }}>GitHub Account</strong><p style={{ fontSize: '0.85rem', color: 'var(--md-on-surface-variant)' }}>AbdullahZaid-ggg</p></div>
            </a>
            <a href="https://github.com/AbdullahZaid-ggg/abdalla-preTech-graduate" className="contact-item" target="_blank" rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--shape-md)', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
              <span className="contact-icon" style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><img src="/assets/icons/repo.svg" alt="Repo" style={{ width: 28, height: 28, filter: 'invert(1)' }} /></span>
              <div><strong style={{ display: 'block', fontSize: '0.88rem' }}>GitHub Repo</strong><p style={{ fontSize: '0.85rem', color: 'var(--md-on-surface-variant)' }}>abdalla-preTech-graduate</p></div>
            </a>
            <a href="https://wa.me/972524228456" className="contact-item" target="_blank" rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--shape-md)', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
              <span className="contact-icon" style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><img src="/assets/icons/whatsapp.svg" alt="WhatsApp" style={{ width: 28, height: 28, filter: 'invert(1)' }} /></span>
              <div><strong style={{ display: 'block', fontSize: '0.88rem' }}>WhatsApp</strong><p style={{ fontSize: '0.85rem', color: 'var(--md-on-surface-variant)' }}>052-4228456</p></div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
})
