const STORAGE_KEY = 'quizState';

function saveState() {
  const state = {
    quizQuestions: QuizApp.quizQuestions,
    currentQuestionIndex: QuizApp.currentQuestionIndex,
    score: QuizApp.score,
    userAnswers: QuizApp.userAnswers,
    isApiMode: QuizApp.isApiMode
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}
