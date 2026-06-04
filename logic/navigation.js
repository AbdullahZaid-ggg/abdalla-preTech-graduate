function renderPageIndicators() {
  const container = document.getElementById('page-indicators');
  container.innerHTML = '';
  const total = QuizApp.quizQuestions.length;
  if (!total) return;
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.className = 'page-dot';
    dot.textContent = i + 1;
    if (i === QuizApp.currentQuestionIndex) dot.classList.add('active');
    if (QuizApp.userAnswers[i] !== -1) dot.classList.add('answered');
    dot.addEventListener('click', () => {
      QuizApp.currentQuestionIndex = i;
      showQuestion();
    });
    container.appendChild(dot);
  }
}

function updateNavButtons() {
  document.getElementById('prev-btn').disabled = QuizApp.currentQuestionIndex === 0;
  const isLast = QuizApp.currentQuestionIndex === QuizApp.quizQuestions.length - 1;
  document.getElementById('next-btn').textContent = isLast ? 'Finish Quiz' : 'Next →';
}
