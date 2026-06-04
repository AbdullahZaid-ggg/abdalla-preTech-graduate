const QuizApp = {
  quizQuestions: [],
  currentQuestionIndex: 0,
  score: 0,
  userAnswers: [],
  isApiMode: false,
  timerRemaining: CONFIG.TIMER_DURATION,
  timerInterval: null,
}
