function startTimer() {
  stopTimer()
  QuizApp.timerRemaining = CONFIG.TIMER_DURATION
  renderTimerDisplay()
  QuizApp.timerInterval = setInterval(() => {
    QuizApp.timerRemaining--
    renderTimerDisplay()
    if (QuizApp.timerRemaining <= 0) onTimeUp()
  }, 1000)
}

function stopTimer() {
  if (QuizApp.timerInterval) {
    clearInterval(QuizApp.timerInterval)
    QuizApp.timerInterval = null
  }
}

function resetTimer() {
  stopTimer()
  QuizApp.timerRemaining = CONFIG.TIMER_DURATION
  renderTimerDisplay()
}

function renderTimerDisplay() {
  const el = document.getElementById('timer-display')
  if (!el) return
  const total = CONFIG.TIMER_DURATION
  const remaining = Math.max(0, QuizApp.timerRemaining)
  const pct = (remaining / total) * 100
  const circ = 2 * Math.PI * 18
  const offset = circ - (pct / 100) * circ
  const urgent = remaining <= 5

  el.querySelector('.timer-ring-bg').setAttribute('stroke-dashoffset', offset)
  el.querySelector('.timer-text').textContent = remaining
  el.querySelector('.timer-text').className = 'timer-text' + (urgent ? ' urgent' : '')

  el.classList.remove('urgent', 'warning')
  const ring = el.querySelector('.timer-ring')
  ring.classList.remove('urgent', 'warning')
  if (urgent) { el.classList.add('urgent'); ring.classList.add('urgent') }
  else if (remaining <= 10) { el.classList.add('warning'); ring.classList.add('warning') }
}

function onTimeUp() {
  stopTimer()
  if (QuizApp.userAnswers[QuizApp.currentQuestionIndex] !== -1) return
  const buttons = document.querySelectorAll('.option-btn')
  buttons.forEach(b => { b.disabled = true })
  QuizApp.userAnswers[QuizApp.currentQuestionIndex] = -2
  saveState()
  renderPageIndicators()
  updateNavButtons()
  setTimeout(nextQuestion, 800)
}
