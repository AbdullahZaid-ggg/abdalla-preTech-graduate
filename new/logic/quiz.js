function startNewQuiz() {
  clearState()
  QuizApp.currentQuestionIndex = 0
  QuizApp.score = 0
  QuizApp.userAnswers = new Array(QuizApp.quizQuestions.length).fill(-1)
  showQuizScreen()
  showQuestion()
}

function resumeQuiz() {
  const saved = loadState()
  if (saved) {
    QuizApp.quizQuestions = saved.quizQuestions
    QuizApp.currentQuestionIndex = saved.currentQuestionIndex
    QuizApp.score = saved.score
    QuizApp.userAnswers = saved.userAnswers
    QuizApp.isApiMode = saved.isApiMode
  }
  showQuizScreen()
  showQuestion()
}

function showQuestion() {
  const q = QuizApp.quizQuestions[QuizApp.currentQuestionIndex]
  const total = QuizApp.quizQuestions.length
  const idx = QuizApp.currentQuestionIndex

  document.getElementById('progress-bar').style.width = `${(idx / total) * 100}%`
  document.getElementById('question-counter').textContent = `Question ${idx + 1} / ${total}`
  document.getElementById('score-display').textContent = `Score: ${QuizApp.score}`
  document.getElementById('question-text').textContent = q.question

  const answered = QuizApp.userAnswers[idx]
  const container = document.getElementById('options-container')
  container.innerHTML = ''

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button')
    btn.className = 'option-btn'
    btn.textContent = opt
    btn.addEventListener('click', () => checkAnswer(i, btn))
    if (answered !== -1) {
      btn.disabled = true
      if (i === q.correct) btn.classList.add('correct')
      if (i === answered && answered !== q.correct) btn.classList.add('wrong')
    }
    container.appendChild(btn)
  })

  if (answered === -1) {
    startTimer()
  } else {
    stopTimer()
    QuizApp.timerRemaining = CONFIG.TIMER_DURATION
    renderTimerDisplay()
  }

  renderPageIndicators()
  updateNavButtons()
}

function checkAnswer(selectedIndex, selectedButton) {
  if (QuizApp.userAnswers[QuizApp.currentQuestionIndex] !== -1) return
  stopTimer()

  const q = QuizApp.quizQuestions[QuizApp.currentQuestionIndex]
  const buttons = document.querySelectorAll('.option-btn')
  buttons.forEach(b => { b.disabled = true })
  buttons[q.correct].classList.add('correct')

  QuizApp.userAnswers[QuizApp.currentQuestionIndex] = selectedIndex

  if (selectedIndex === q.correct) {
    QuizApp.score++
    document.getElementById('score-display').textContent = `Score: ${QuizApp.score}`
  } else {
    selectedButton.classList.add('wrong')
  }

  saveState()
  renderPageIndicators()
  updateNavButtons()
}

function nextQuestion() {
  QuizApp.currentQuestionIndex++
  if (QuizApp.currentQuestionIndex < QuizApp.quizQuestions.length) {
    showQuestion()
  } else {
    showResults()
  }
}

function prevQuestion() {
  if (QuizApp.currentQuestionIndex > 0) {
    QuizApp.currentQuestionIndex--
    showQuestion()
  }
}

function showResults() {
  stopTimer()
  clearState()

  const total = QuizApp.quizQuestions.length
  const pct = getPercentage(QuizApp.score, total)
  document.getElementById('final-score').textContent = `${QuizApp.score} / ${total}`
  document.getElementById('score-circle').style.setProperty('--score-deg', `${(pct / 100) * 360}deg`)

  const msgs = [
    [80, 'Excellent! You are a quiz master!'],
    [50, 'Good job! Keep practicing!'],
    [0, 'Keep trying! You will improve!'],
  ]
  document.getElementById('result-message').textContent = msgs.find(([t]) => pct >= t)?.[1] ?? msgs[2][1]

  const analysis = document.getElementById('analysis-list')
  analysis.innerHTML = QuizApp.quizQuestions.map((q, i) => {
    const icon = QuizApp.userAnswers[i] === q.correct ? '✅' : '❌'
    return `<div class="analysis-row"><span class="analysis-icon">${icon}</span><span class="analysis-question">${q.question}</span><span class="analysis-answer">${q.options[q.correct]}</span></div>`
  }).join('')

  saveQuizAttempt(QuizApp.score, total, QuizApp.isApiMode ? 'api' : 'local')
  showScreen('results-screen')
}

function renderPageIndicators() {
  const container = document.getElementById('page-indicators')
  if (!container) return
  const total = QuizApp.quizQuestions.length
  container.innerHTML = total ? Array.from({ length: total }, (_, i) =>
    `<button class="page-dot${i === QuizApp.currentQuestionIndex ? ' active' : ''}${QuizApp.userAnswers[i] !== -1 ? ' answered' : ''}" data-index="${i}">${i + 1}</button>`
  ).join('') : ''

  container.querySelectorAll('.page-dot').forEach(btn => {
    btn.addEventListener('click', () => {
      QuizApp.currentQuestionIndex = Number(btn.dataset.index)
      showQuestion()
    })
  })
}

function updateNavButtons() {
  document.getElementById('prev-btn').disabled = QuizApp.currentQuestionIndex === 0
  const isLast = QuizApp.currentQuestionIndex === QuizApp.quizQuestions.length - 1
  document.getElementById('next-btn').textContent = isLast ? 'Finish Quiz' : 'Next →'
}
