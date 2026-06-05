import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QuizProvider } from './context/QuizContext'
import App from './App'
import '../style/theme.css'
import '../style/layout.css'
import '../style/components.css'
import '../style/responsive.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </StrictMode>
)
