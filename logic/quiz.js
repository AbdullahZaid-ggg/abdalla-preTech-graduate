function startNewQuiz() {
  clearState();
  QuizApp.currentQuestionIndex = 0;
  QuizApp.score = 0;
  QuizApp.userAnswers = new Array(QuizApp.quizQuestions.length).fill(-1);
  showQuizScreen();
  showQuestion();
}

function resumeQuiz() {
  const saved = loadState();
  if (saved) {
    QuizApp.quizQuestions = saved.quizQuestions;
    QuizApp.currentQuestionIndex = saved.currentQuestionIndex;
    QuizApp.score = saved.score;
    QuizApp.userAnswers = saved.userAnswers;
    QuizApp.isApiMode = saved.isApiMode;
  }
  showQuizScreen();
  showQuestion();
}

function showQuestion() {
  const q = QuizApp.quizQuestions[QuizApp.currentQuestionIndex];
  const total = QuizApp.quizQuestions.length;

  document.getElementById('progress-bar').style.width = (QuizApp.currentQuestionIndex / total) * 100 + '%';
  document.getElementById('question-counter').textContent = `Page ${QuizApp.currentQuestionIndex + 1} / ${total}`;
  document.getElementById('score-display').textContent = `Score: ${QuizApp.score}`;

  const qText = document.getElementById('question-text');
  qText.textContent = q.question;

  const container = document.getElementById('options-container');
  container.innerHTML = '';

  const answered = QuizApp.userAnswers[QuizApp.currentQuestionIndex];

  if (answered === -1) {
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => checkAnswer(idx, btn));
      container.appendChild(btn);
    });
  } else {
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.disabled = true;
      if (idx === q.correct) btn.classList.add('correct');
      if (idx === answered && answered !== q.correct) btn.classList.add('wrong');
      container.appendChild(btn);
    });
  }

  renderPageIndicators();
  updateNavButtons();
}

function checkAnswer(selectedIndex, selectedButton) {
  if (QuizApp.userAnswers[QuizApp.currentQuestionIndex] !== -1) return;

  const q = QuizApp.quizQuestions[QuizApp.currentQuestionIndex];
  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach(b => b.disabled = true);
  buttons[q.correct].classList.add('correct');

  QuizApp.userAnswers[QuizApp.currentQuestionIndex] = selectedIndex;

  if (selectedIndex === q.correct) {
    QuizApp.score++;
    document.getElementById('score-display').textContent = `Score: ${QuizApp.score}`;
  } else {
    selectedButton.classList.add('wrong');
  }

  saveState();
  renderPageIndicators();
  updateNavButtons();
}

function nextQuestion() {
  QuizApp.currentQuestionIndex++;
  if (QuizApp.currentQuestionIndex < QuizApp.quizQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function prevQuestion() {
  if (QuizApp.currentQuestionIndex > 0) {
    QuizApp.currentQuestionIndex--;
    showQuestion();
  }
}

function showResults() {
  clearState();
  document.getElementById('progress-bar').style.width = '100%';

  const total = QuizApp.quizQuestions.length;
  document.getElementById('final-score').textContent = `${QuizApp.score} / ${total}`;
  const pct = QuizApp.score / total * 100;
  document.getElementById('score-circle').style.setProperty('--score-deg', `${pct / 100 * 360}deg`);

  let msg;
  if (pct >= 80) msg = 'Excellent! You are a quiz master!';
  else if (pct >= 50) msg = 'Good job! Keep practicing!';
  else msg = "Don't worry, try again and learn more!";
  document.getElementById('result-message').textContent = msg;

  const analysis = document.getElementById('analysis-list');
  analysis.innerHTML = '';
  QuizApp.quizQuestions.forEach((q, i) => {
    const row = document.createElement('div');
    row.className = 'analysis-row';
    const icon = QuizApp.userAnswers[i] === q.correct ? '✅' : '❌';
    row.innerHTML = `
      <span class="analysis-icon">${icon}</span>
      <span class="analysis-question">${q.question}</span>
      <span class="analysis-answer">${q.options[q.correct]}</span>
    `;
    analysis.appendChild(row);
  });

  showScreen('results-screen');
  renderPageIndicators();
}
