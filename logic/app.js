document.querySelectorAll('.nav-tab, .nav-brand').forEach(item => {
  item.addEventListener('click', () => {
    const action = item.dataset.action
    document.querySelectorAll('.nav-tab').forEach(n => n.classList.remove('active'))
    if (item.classList.contains('nav-tab')) item.classList.add('active')
    if (action === 'home') showHome()
    else if (action === 'history') showHistoryScreen()
    else if (action === 'about') showAbout()
    else if (action === 'contact') showContact()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
})

document.querySelector('[data-action="choose-category"]').addEventListener('click', showCategoryScreen)

document.querySelector('[data-action="quick-api"]').addEventListener('click', async () => {
  await loadApiQuestions()
  if (QuizApp.quizQuestions.length) startNewQuiz()
})

document.getElementById('start-new-btn').addEventListener('click', startNewQuiz)
document.getElementById('continue-btn').addEventListener('click', resumeQuiz)
document.getElementById('theme-toggle').addEventListener('click', toggleTheme)
document.getElementById('export-history-btn')?.addEventListener('click', exportHistory)

document.getElementById('refresh-local-btn').addEventListener('click', () => {
  loadLocalQuestions(getActiveCategory())
  showSourceScreen()
})

document.getElementById('refresh-api-btn').addEventListener('click', async () => {
  await loadApiQuestions()
  showSourceScreen()
})

document.getElementById('prev-btn').addEventListener('click', prevQuestion)
document.getElementById('next-btn').addEventListener('click', () => {
  if (QuizApp.currentQuestionIndex === QuizApp.quizQuestions.length - 1) {
    showResults()
  } else {
    nextQuestion()
  }
})

document.getElementById('filter-wrong-btn')?.addEventListener('click', () => {
  analysisFilterWrong = !analysisFilterWrong
  const btn = document.getElementById('filter-wrong-btn')
  btn.textContent = analysisFilterWrong ? 'Show all' : 'Show wrong only'
  renderAnalysis()
})

document.querySelectorAll('.toggle-group').forEach(group => {
  group.addEventListener('click', (e) => {
    const btn = e.target.closest('.toggle-btn')
    if (!btn) return
    group.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
  })
})

function handleShortcut(e) {
  const quizScreen = document.getElementById('quiz-screen')
  if (quizScreen.classList.contains('hidden')) return

  if (['1', '2', '3', '4'].includes(e.key)) {
    const btns = document.querySelectorAll('.option-btn:not(:disabled)')
    const idx = parseInt(e.key) - 1
    if (btns[idx]) { btns[idx].click(); playClick() }
  }

  if (e.key === 'Enter') {
    const nextBtn = document.getElementById('next-btn')
    if (!nextBtn.disabled) nextBtn.click()
  }

  if (e.key === 'ArrowLeft') {
    const prevBtn = document.getElementById('prev-btn')
    if (!prevBtn.disabled) { prevBtn.click(); playClick() }
  }

  if (e.key === 'ArrowRight') {
    const nextBtn = document.getElementById('next-btn')
    if (!nextBtn.disabled) { nextBtn.click(); playClick() }
  }
}

document.addEventListener('keydown', handleShortcut)

;(function init() {
  loadTheme()
  const saved = loadState()
  if (saved) document.getElementById('resume-banner').classList.remove('hidden')
  renderHomeStats()
})()
