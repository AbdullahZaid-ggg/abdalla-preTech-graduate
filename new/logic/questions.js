const localQuestions = [
  { question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyper Transfer Markup Language'], correct: 0 },
  { question: 'Which CSS property creates a flex container?', options: ['flex-container', 'display: flex', 'flexbox: true', 'position: flex'], correct: 1 },
  { question: 'What does `===` check in JavaScript?', options: ['Value only', 'Value and type', 'Reference equality', 'Type only'], correct: 1 },
  { question: 'Which method adds an element to the end of an array?', options: ['push()', 'pop()', 'shift()', 'unshift()'], correct: 0 },
  { question: 'How to declare a variable that cannot be reassigned?', options: ['let x = 5', 'var x = 5', 'const x = 5', 'static x = 5'], correct: 2 },
  { question: 'Which HTML tag includes an external JS file?', options: ['<javascript>', '<script>', '<js>', '<link>'], correct: 1 },
  { question: 'What does CSS specificity determine?', options: ['Which styles apply on conflict', 'Order of @import', 'How fast the page renders', 'Which fonts load first'], correct: 0 },
  { question: 'What is a Promise in JavaScript?', options: ['A sync function', 'An async operation eventual completion', 'A loop type', 'A debug tool'], correct: 1 },
  { question: 'Which HTTP method creates a new resource?', options: ['GET', 'POST', 'PUT', 'DELETE'], correct: 1 },
  { question: 'What does localStorage allow?', options: ['Temp session data', 'Persistent browser storage', 'Server storage', 'Local databases'], correct: 1 },
]

let apiLoading = false

async function getApiToken() {
  let token = localStorage.getItem('opentdb_token')
  if (token) return token
  try {
    const res = await fetch('https://opentdb.com/api_token.php?command=request')
    const data = await res.json()
    if (data.response_code === 0 && data.token) {
      localStorage.setItem('opentdb_token', data.token)
      return data.token
    }
  } catch {}
  return null
}

async function resetApiToken(token) {
  try {
    await fetch(`https://opentdb.com/api_token.php?command=reset&token=${token}`)
  } catch {}
}

function loadLocalQuestions() {
  QuizApp.quizQuestions = localQuestions.map(q => ({ ...q }))
  QuizApp.isApiMode = false
}

async function loadApiQuestions(retries = 2) {
  if (apiLoading || retries <= 0) return
  apiLoading = true

  try {
    const token = await getApiToken()
    const tokenParam = token ? `&token=${token}` : ''
    const url = `${CONFIG.API_BASE}?${CONFIG.API_DEFAULT}${tokenParam}`
    const res = await fetch(url)
    const data = await res.json()

    if (data.response_code === 4 && token) {
      await resetApiToken(token)
      localStorage.removeItem('opentdb_token')
      apiLoading = false
      return loadApiQuestions(retries - 1)
    }

    if (data.response_code !== 0 || !data.results.length) {
      alert('Could not reach the question server. Using local questions instead.')
      loadLocalQuestions()
      apiLoading = false
      return
    }

    QuizApp.quizQuestions = data.results.map(q => {
      const options = shuffleArray([...q.incorrect_answers, q.correct_answer]).map(decodeHTMLEntities)
      const decodedCorrect = decodeHTMLEntities(q.correct_answer)
      return {
        question: decodeHTMLEntities(q.question),
        options,
        correct: options.indexOf(decodedCorrect),
      }
    })
    QuizApp.isApiMode = true
  } catch {
    alert('Could not reach the question server. Using local questions instead.')
    loadLocalQuestions()
  }

  apiLoading = false
}
