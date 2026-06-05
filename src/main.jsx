import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { QuizProvider } from './context/QuizContext'
import ErrorBoundary from './components/ErrorBoundary'
import App from './App'
import '../style/theme.css'
import '../style/layout.css'
import '../style/components.css'
import '../style/responsive.css'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ErrorBoundary>
        <QuizProvider>
          <App />
        </QuizProvider>
      </ErrorBoundary>
    </HashRouter>
  </StrictMode>
)
