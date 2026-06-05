function startNewQuiz() {
  clearState()
  QuizApp.currentQuestionIndex = 0
  QuizApp.score = 0
  QuizApp.streak = 0
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
  document.getElementById('question-counter').textContent = `Q ${idx + 1} / ${total}`
  document.getElementById('score-display').textContent = `Score: ${QuizApp.score}`
  const badge = document.getElementById('diff-badge')
  if (badge) {
    const d = q.difficulty
    if (d) {
      const icons = { easy: '<svg viewBox="0 0 14 14" width="14" height="14"><circle cx="7" cy="7" r="5" fill="#00e676"/></svg>', medium: '<svg viewBox="0 0 14 14" width="14" height="14"><circle cx="7" cy="7" r="5" fill="#ff9800"/></svg>', hard: '<svg viewBox="0 0 14 14" width="14" height="14"><circle cx="7" cy="7" r="5" fill="#ff4444"/></svg>' }
      badge.innerHTML = `${icons[d] || ''} ${d}`
      badge.className = 'diff-badge ' + d
    } else {
      badge.textContent = ''
      badge.className = 'diff-badge'
    }
  }
  updateStreakDisplay()
  document.getElementById('question-text').textContent = q.question

  const answered = QuizApp.userAnswers[idx]
  const container = document.getElementById('options-container')
  container.innerHTML = ''

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button')
    btn.className = 'option-btn'
    btn.textContent = opt
    btn.dataset.index = i
    btn.addEventListener('click', () => checkAnswer(i, btn))
    if (answered !== -1) {
      btn.disabled = true
      if (i === q.correct) btn.classList.add('correct')
      if (i === answered && answered !== q.correct) btn.classList.add('wrong')
    }
    container.appendChild(btn)
  })

  renderPageIndicators()
  updateNavButtons()
}

function checkAnswer(selectedIndex, selectedButton) {
  if (QuizApp.userAnswers[QuizApp.currentQuestionIndex] !== -1) return

  const q = QuizApp.quizQuestions[QuizApp.currentQuestionIndex]
  const buttons = document.querySelectorAll('.option-btn')
  buttons.forEach(b => { b.disabled = true })
  buttons[q.correct].classList.add('correct')

  QuizApp.userAnswers[QuizApp.currentQuestionIndex] = selectedIndex

  if (selectedIndex === q.correct) {
    QuizApp.score++
    QuizApp.streak++
    document.getElementById('score-display').textContent = `Score: ${QuizApp.score}`
    playCorrect()
  } else {
    QuizApp.streak = 0
    selectedButton.classList.add('wrong')
    playWrong()
  }

  updateStreakDisplay()
  saveState()
  renderPageIndicators()
  updateNavButtons()
}

function updateStreakDisplay() {
  const el = document.getElementById('streak-display')
  const countEl = document.getElementById('streak-count')
  if (!el || !countEl) return
  if (QuizApp.streak >= 2) {
    el.classList.remove('hidden')
    countEl.textContent = QuizApp.streak
  } else {
    el.classList.add('hidden')
  }
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

  renderAnalysis()
  saveQuizAttempt(QuizApp.score, total, QuizApp.isApiMode ? 'api' : 'local')
  showScreen('results-screen')

  if (pct >= 80) {
    setTimeout(launchConfetti, 300)
    playComplete()
  }
}

let analysisFilterWrong = false

function renderAnalysis() {
  const list = document.getElementById('analysis-list')
  const countEl = document.getElementById('analysis-count')
  const total = QuizApp.quizQuestions.length

  const rows = QuizApp.quizQuestions.map((q, i) => {
    const correct = QuizApp.userAnswers[i] === q.correct
    return {
      html: `<div class="analysis-row${correct ? '' : ' wrong'}">
        <span class="analysis-icon">${correct ? '<svg viewBox="0 0 18 18" width="18" height="18"><circle cx="9" cy="9" r="7" fill="rgba(0,230,118,0.15)" stroke="#00e676" stroke-width="1.5"/><path d="M5 9l3 3 5-5" stroke="#00e676" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' : '<svg viewBox="0 0 18 18" width="18" height="18"><circle cx="9" cy="9" r="7" fill="rgba(255,68,68,0.15)" stroke="#ff4444" stroke-width="1.5"/><path d="M6 6l6 6M12 6l-6 6" stroke="#ff4444" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>'}</span>
        <span class="analysis-question">${q.question}</span>
        <span class="analysis-answer">${q.options[q.correct]}</span>
      </div>`,
      correct,
    }
  })

  const filtered = analysisFilterWrong ? rows.filter(r => !r.correct) : rows
  list.innerHTML = filtered.map(r => r.html).join('')
  if (countEl) countEl.textContent = `${analysisFilterWrong ? filtered.length : total} / ${total}`
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
  const nb = document.getElementById('next-btn')
  if (isLast) {
    nb.innerHTML = 'Finish Quiz'
  } else {
    nb.innerHTML = 'Next <svg viewBox="0 0 16 16" width="16" height="16"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  }
}
