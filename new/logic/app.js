document.querySelectorAll('.nav-tab, .nav-brand').forEach(item => {
  item.addEventListener('click', async () => {
    const action = item.dataset.action
    document.querySelectorAll('.nav-tab').forEach(n => n.classList.remove('active'))
    if (item.classList.contains('nav-tab')) item.classList.add('active')
    if (action === 'welcome') showWelcome()
    else if (action === 'local') { loadLocalQuestions(); showSourceScreen() }
    else if (action === 'api') { await loadApiQuestions(); showSourceScreen() }
    else if (action === 'history') showHistoryScreen()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
})

document.querySelector('[data-action="quick-local"]').addEventListener('click', () => {
  loadLocalQuestions()
  startNewQuiz()
})

document.querySelector('[data-action="quick-api"]').addEventListener('click', async () => {
  await loadApiQuestions()
  if (QuizApp.quizQuestions.length) startNewQuiz()
})

document.getElementById('start-new-btn').addEventListener('click', startNewQuiz)
document.getElementById('continue-btn').addEventListener('click', resumeQuiz)

document.getElementById('prev-btn').addEventListener('click', prevQuestion)
document.getElementById('next-btn').addEventListener('click', () => {
  if (QuizApp.currentQuestionIndex === QuizApp.quizQuestions.length - 1) {
    showResults()
  } else {
    nextQuestion()
  }
})

;(function init() {
  const saved = loadState()
  if (saved) document.getElementById('resume-banner').classList.remove('hidden')
  renderHomeStats()
})()
