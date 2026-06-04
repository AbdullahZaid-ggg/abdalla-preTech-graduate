// ---- Screen switching ----
function showScreen(id) {
  document.querySelectorAll('.screen-main').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function showWelcome() {
  showScreen('welcome-screen');
}

function showSourceScreen() {
  const total = QuizApp.quizQuestions.length;
  const source = QuizApp.isApiMode ? '🌐 API Questions' : '📚 Local Questions';
  document.getElementById('source-label').textContent = source;
  document.getElementById('source-count').textContent = `${total} questions loaded`;

  const saved = loadState();
  const continueBtn = document.getElementById('continue-btn');
  const startBtn = document.getElementById('start-new-btn');
  continueBtn.style.display = saved ? '' : 'none';
  startBtn.textContent = saved ? '🔄 Start New' : '▶ Start';

  showScreen('source-screen');
}

function showQuizScreen() {
  showScreen('quiz-screen');
}

// ---- Sidebar navigation ----
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    item.classList.add('active');
    const action = item.dataset.action;
    if (action === 'welcome') showWelcome();
    else if (action === 'local') loadLocalQuestions();
    else if (action === 'api') loadApiQuestions();
  });
});

// ---- Buttons ----
document.getElementById('start-new-btn').addEventListener('click', startNewQuiz);
document.getElementById('continue-btn').addEventListener('click', resumeQuiz);
document.getElementById('play-again-btn').addEventListener('click', showWelcome);
document.getElementById('change-source-btn').addEventListener('click', showWelcome);

document.getElementById('prev-btn').addEventListener('click', prevQuestion);
document.getElementById('next-btn').addEventListener('click', () => {
  if (QuizApp.currentQuestionIndex === QuizApp.quizQuestions.length - 1) {
    showResults();
  } else {
    nextQuestion();
  }
});

// ---- On load: check saved state ----
(function init() {
  const saved = loadState();
  if (saved) {
    document.getElementById('resume-banner').classList.remove('hidden');
  }
})();
