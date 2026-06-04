const localQuestions = [
  {
    question: 'What does HTML stand for?',
    options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyper Transfer Markup Language'],
    correct: 0
  },
  {
    question: 'Which CSS property is used to make a flex container?',
    options: ['flex-container', 'display: flex', 'flexbox: true', 'position: flex'],
    correct: 1
  },
  {
    question: 'What does the `===` operator in JavaScript check?',
    options: ['Value only', 'Value and type', 'Reference equality', 'Type only'],
    correct: 1
  },
  {
    question: 'Which method adds an element to the end of an array?',
    options: ['push()', 'pop()', 'shift()', 'unshift()'],
    correct: 0
  },
  {
    question: 'What is the correct way to declare a variable that cannot be reassigned?',
    options: ['let x = 5', 'var x = 5', 'const x = 5', 'static x = 5'],
    correct: 2
  },
  {
    question: 'Which HTML tag is used to include an external JavaScript file?',
    options: ['<javascript>', '<script>', '<js>', '<link>'],
    correct: 1
  },
  {
    question: 'What does CSS specificity determine?',
    options: ['Which styles are applied when conflicts occur', 'The order of @import statements', 'How quickly the page renders', 'Which fonts are loaded first'],
    correct: 0
  },
  {
    question: 'What is a Promise in JavaScript?',
    options: ['A function that runs synchronously', 'An object representing the eventual completion of an async operation', 'A type of loop', 'A debugging tool'],
    correct: 1
  },
  {
    question: 'Which HTTP method is used to send data to create a new resource?',
    options: ['GET', 'POST', 'PUT', 'DELETE'],
    correct: 1
  },
  {
    question: 'What does the `localStorage` API allow you to do?',
    options: ['Store data temporarily until the page is refreshed', 'Store data persistently in the browser across sessions', 'Store data on the server', 'Create local databases'],
    correct: 1
  }
];

function decodeHTMLEntities(text) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

function loadLocalQuestions() {
  QuizApp.quizQuestions = localQuestions.map(q => ({ ...q }));
  QuizApp.isApiMode = false;
  showSourceScreen();
}

async function loadApiQuestions() {
  try {
    const res = await fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple');
    const data = await res.json();
    if (data.response_code !== 0 || !data.results.length) {
      alert('API failed. Loading local questions.');
      loadLocalQuestions();
      return;
    }
    QuizApp.quizQuestions = data.results.map(q => {
      const options = [...q.incorrect_answers, q.correct_answer];
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      const decoded = options.map(decodeHTMLEntities);
      return {
        question: decodeHTMLEntities(q.question),
        options: decoded,
        correct: decoded.indexOf(decodeHTMLEntities(q.correct_answer))
      };
    });
    QuizApp.isApiMode = true;
    showSourceScreen();
  } catch {
    alert('Network error. Loading local questions.');
    loadLocalQuestions();
  }
}
