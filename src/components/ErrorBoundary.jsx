import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="screen-main">
          <div className="page-card" style={{ textAlign: 'center', padding: '60px 24px' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
            <h2>Something went wrong</h2>
            <p style={{ color: 'var(--md-on-surface-variant)', margin: '12px 0 24px' }}>
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                this.setState({ hasError: false, error: null })
                window.location.hash = '#/'
                window.location.reload()
              }}
            >
              Reload App
            </button>
          </div>
        </section>
      )
    }
    return this.props.children
  }
}
