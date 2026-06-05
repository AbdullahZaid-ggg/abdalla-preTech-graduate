import { useQuiz } from '../context/QuizContext'

let toastId = 0

export function showToast(dispatch, message, type = 'success') {
  const id = ++toastId
  dispatch({ type: 'ADD_TOAST', payload: { id, message, type } })
  setTimeout(() => {
    dispatch({ type: 'REMOVE_TOAST', payload: id })
  }, 3000)
}

export default function ToastContainer() {
  const { state, dispatch } = useQuiz()
  if (!state.toasts.length) return null

  return (
    <div className="toast-container">
      {state.toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          <span className="toast-icon">
            {t.type === 'success'
              ? '<svg viewBox="0 0 16 16" width="16" height="16"><circle cx="8" cy="8" r="6" fill="rgba(0,230,118,0.15)" stroke="#00e676" stroke-width="1.2"/><path d="M5 8l2 2 4-4" stroke="#00e676" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'
              : '<svg viewBox="0 0 16 16" width="16" height="16"><circle cx="8" cy="8" r="6" fill="rgba(255,68,68,0.15)" stroke="#ff4444" stroke-width="1.2"/><path d="M6 6l4 4M10 6l-4 4" stroke="#ff4444" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>'}
          </span>
          <span className="toast-message">{t.message}</span>
          <button className="toast-close" onClick={() => dispatch({ type: 'REMOVE_TOAST', payload: t.id })} aria-label="Dismiss">
            <svg viewBox="0 0 12 12" width="12" height="12"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round"/></svg>
          </button>
        </div>
      ))}
    </div>
  )
}
