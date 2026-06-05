import { shuffleArray, decodeHTMLEntities } from './utils'
import { CONFIG } from './config'

export const defaultQuestions = [
  { question: 'What is the chemical symbol for water?', options: ['H2O', 'CO2', 'NaCl', 'O2'], correct: 0, category: 'Science', difficulty: 'easy' },
  { question: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correct: 1, category: 'Science', difficulty: 'easy' },
  { question: 'What is the freezing point of water in Celsius?', options: ['0', '32', '100', '-10'], correct: 0, category: 'Science', difficulty: 'easy' },
  { question: 'Which gas makes up most of Earth\'s atmosphere?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'], correct: 2, category: 'Science', difficulty: 'medium' },
  { question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi body'], correct: 1, category: 'Science', difficulty: 'medium' },
  { question: 'What type of blood cells fight infections?', options: ['Red blood cells', 'White blood cells', 'Platelets', 'Plasma'], correct: 1, category: 'Science', difficulty: 'medium' },
  { question: 'What force keeps us on the ground?', options: ['Magnetism', 'Friction', 'Gravity', 'Inertia'], correct: 2, category: 'Science', difficulty: 'medium' },
  { question: 'Which planet is closest to the Sun?', options: ['Venus', 'Earth', 'Mercury', 'Mars'], correct: 2, category: 'Science', difficulty: 'hard' },
  { question: 'Which organ pumps blood in the human body?', options: ['Liver', 'Lungs', 'Heart', 'Brain'], correct: 2, category: 'Science', difficulty: 'hard' },
  { question: 'What is the approximate speed of light?', options: ['300,000 km/s', '150,000 km/s', '500,000 km/s', '100,000 km/s'], correct: 0, category: 'Science', difficulty: 'hard' },
  { question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyper Transfer Markup Language'], correct: 0, category: 'IT', difficulty: 'easy' },
  { question: 'What does CPU stand for?', options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility', 'Core Processing Unit'], correct: 0, category: 'IT', difficulty: 'easy' },
  { question: 'What does "www" stand for?', options: ['World Wide Web', 'Web World Wide', 'World Web Wide', 'Wide World Web'], correct: 0, category: 'IT', difficulty: 'easy' },
  { question: 'What does CSS stand for?', options: ['Cascading Style Sheets', 'Creative Style System', 'Computer Style Sheets', 'Coded Style Syntax'], correct: 0, category: 'IT', difficulty: 'medium' },
  { question: 'What does RAM stand for?', options: ['Random Access Memory', 'Read Access Memory', 'Run Application Module', 'Real Application Memory'], correct: 0, category: 'IT', difficulty: 'medium' },
  { question: 'Which company developed Windows?', options: ['Apple', 'Google', 'Microsoft', 'IBM'], correct: 2, category: 'IT', difficulty: 'medium' },
  { question: 'What does the "http" in URLs stand for?', options: ['Hyper Text Transfer Protocol', 'High Tech Transfer Process', 'Hyper Text Transmission Process', 'High Transfer Text Protocol'], correct: 0, category: 'IT', difficulty: 'medium' },
  { question: 'What does GPU stand for?', options: ['Graphics Processing Unit', 'General Processing Unit', 'Graphical Program Utility', 'Graphics Power Unit'], correct: 0, category: 'IT', difficulty: 'hard' },
  { question: 'What does SQL stand for?', options: ['Structured Query Language', 'Simple Query Language', 'Standard Query Logic', 'System Query Language'], correct: 0, category: 'IT', difficulty: 'hard' },
  { question: 'Which programming language is mainly used for iOS apps?', options: ['Java', 'Kotlin', 'Swift', 'C#'], correct: 2, category: 'IT', difficulty: 'hard' },
  { question: 'What is the square root of 144?', options: ['10', '11', '12', '13'], correct: 2, category: 'Math', difficulty: 'easy' },
  { question: 'What is 7 x 8?', options: ['48', '54', '56', '64'], correct: 2, category: 'Math', difficulty: 'easy' },
  { question: 'How many sides does a hexagon have?', options: ['4', '5', '6', '8'], correct: 2, category: 'Math', difficulty: 'easy' },
  { question: 'How many degrees are in a triangle?', options: ['90', '180', '270', '360'], correct: 1, category: 'Math', difficulty: 'medium' },
  { question: 'What is 15% of 200?', options: ['15', '20', '25', '30'], correct: 3, category: 'Math', difficulty: 'medium' },
  { question: 'What is the value of Pi to two decimal places?', options: ['3.14', '3.16', '3.12', '3.18'], correct: 0, category: 'Math', difficulty: 'medium' },
  { question: 'What is the next prime number after 7?', options: ['9', '10', '11', '13'], correct: 2, category: 'Math', difficulty: 'hard' },
  { question: 'What is 2 raised to the power of 10?', options: ['512', '1024', '2048', '256'], correct: 1, category: 'Math', difficulty: 'hard' },
  { question: 'What is the capital of France?', options: ['London', 'Berlin', 'Madrid', 'Paris'], correct: 3, category: 'General', difficulty: 'easy' },
  { question: 'How many continents are there?', options: ['5', '6', '7', '8'], correct: 2, category: 'General', difficulty: 'easy' },
  { question: 'Which gas do plants absorb from the atmosphere?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], correct: 2, category: 'General', difficulty: 'easy' },
  { question: 'What is the largest ocean on Earth?', options: ['Atlantic', 'Pacific', 'Indian', 'Arctic'], correct: 1, category: 'General', difficulty: 'medium' },
  { question: 'What color do you get by mixing red and blue?', options: ['Green', 'Purple', 'Orange', 'Yellow'], correct: 1, category: 'General', difficulty: 'medium' },
  { question: 'How many days are in a leap year?', options: ['364', '365', '366', '367'], correct: 2, category: 'General', difficulty: 'medium' },
  { question: 'What is the hardest natural substance?', options: ['Gold', 'Iron', 'Diamond', 'Platinum'], correct: 2, category: 'General', difficulty: 'hard' },
  { question: 'Which instrument measures temperature?', options: ['Barometer', 'Thermometer', 'Hygrometer', 'Speedometer'], correct: 1, category: 'General', difficulty: 'hard' },
]

export const CATEGORIES = [
  { id: 'Science', icon: '<svg viewBox="0 0 20 20" width="20" height="20"><path d="M10 2v8l-5 6h10l-5-6V2" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="4" y1="18" x2="16" y2="18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>', color: '#00e5ff' },
  { id: 'IT', icon: '<svg viewBox="0 0 20 20" width="20" height="20"><rect x="3" y="5" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><line x1="7" y1="5" x2="7" y2="15" stroke="currentColor" stroke-width="0.5"/><line x1="10" y1="5" x2="10" y2="15" stroke="currentColor" stroke-width="0.5"/><line x1="13" y1="5" x2="13" y2="15" stroke="currentColor" stroke-width="0.5"/></svg>', color: '#7c3aed' },
  { id: 'Math', icon: '<svg viewBox="0 0 20 20" width="20" height="20"><text x="10" y="15" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="currentColor">∑</text></svg>', color: '#ff00e5' },
  { id: 'General', icon: '<svg viewBox="0 0 20 20" width="20" height="20"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M3 10h14M10 3a14 14 0 000 14 14 14 0 000-14z" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>', color: '#00e676' },
  { id: 'History', icon: '<svg viewBox="0 0 20 20" width="20" height="20"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M10 6v4l3 3" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M3 4l3 3M17 4l-3 3" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round"/></svg>', color: '#ff9800' },
  { id: 'Geography', icon: '<svg viewBox="0 0 20 20" width="20" height="20"><ellipse cx="10" cy="10" rx="7" ry="5" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M3 10a7 5 0 0014 0" stroke="currentColor" stroke-width="1.5" fill="none"/><line x1="10" y1="3" x2="10" y2="17" stroke="currentColor" stroke-width="1.5"/></svg>', color: '#2196f3' },
  { id: 'Nature', icon: '<svg viewBox="0 0 20 20" width="20" height="20"><path d="M10 2C7 2 5 5 5 8c0 4 5 10 5 10s5-6 5-10c0-3-2-6-5-6z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 8c0 2 2 3 2 3s2-1 2-3" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round"/></svg>', color: '#4caf50' },
  { id: 'Sports', icon: '<svg viewBox="0 0 20 20" width="20" height="20"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M3 10h14M10 3a14 14 0 010 14" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="10" cy="10" r="2.5" stroke="currentColor" stroke-width="1.3" fill="none"/></svg>', color: '#ff5722' },
  { id: 'Music', icon: '<svg viewBox="0 0 20 20" width="20" height="20"><path d="M8 4v9" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/><circle cx="6" cy="14" r="2.5" stroke="currentColor" stroke-width="1.3" fill="none"/><circle cx="12" cy="12" r="2.5" stroke="currentColor" stroke-width="1.3" fill="none"/><line x1="8" y1="4" x2="16" y2="2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 7l8-2v7" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round"/></svg>', color: '#e91e63' },
  { id: 'Movies & TV', icon: '<svg viewBox="0 0 20 20" width="20" height="20"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><line x1="8" y1="4" x2="8" y2="16" stroke="currentColor" stroke-width="0.5"/><line x1="12" y1="4" x2="12" y2="16" stroke="currentColor" stroke-width="0.5"/><path d="M8 10l-4 3V7z" fill="currentColor"/></svg>', color: '#9c27b0' },
  { id: 'Food & Health', icon: '<svg viewBox="0 0 20 20" width="20" height="20"><circle cx="10" cy="8" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M5 17c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M10 13v4" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round"/></svg>', color: '#ff6f00' },
  { id: 'Space', icon: '<svg viewBox="0 0 20 20" width="20" height="20"><path d="M6 14C3 11 3 7 6 4s8-2 10 1-2 9-5 9-5 0-5 0z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/><circle cx="10" cy="9" r="1.5" fill="currentColor"/><path d="M3 7l4 2M17 7l-4 2M7 14L5 18M13 14l2 4" stroke="currentColor" stroke-width="1" fill="none" stroke-linecap="round"/></svg>', color: '#03a9f4' },
  { id: 'Art & Literature', icon: '<svg viewBox="0 0 20 20" width="20" height="20"><path d="M4 16V4h12v12" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/><circle cx="10" cy="10" r="2" stroke="currentColor" stroke-width="1.3" fill="none"/><path d="M4 16l4-4 3 2 5-5" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linejoin="round"/></svg>', color: '#8d6e63' },
]

export function getCategoryCount(catId) {
  return defaultQuestions.filter(q => q.category === catId).length
}

export function getDifficultyCount(catId, diff) {
  return defaultQuestions.filter(q => q.category === catId && q.difficulty === diff).length
}

export function loadLocalQuestions(category = 'All', difficulty = 'all') {
  let filtered = category === 'All'
    ? defaultQuestions
    : defaultQuestions.filter(q => q.category === category)
  if (difficulty !== 'all') {
    filtered = filtered.filter(q => q.difficulty === difficulty)
  }
  return { questions: filtered.map(q => ({ ...q })), category, difficulty }
}

let apiLoading = false

export async function loadApiQuestions(settings) {
  if (apiLoading) return null
  apiLoading = true
  try {
    let token = localStorage.getItem(CONFIG.TOKEN_KEY)
    if (!token) {
      const res = await fetch('https://opentdb.com/api_token.php?command=request')
      const data = await res.json()
      if (data.response_code === 0 && data.token) {
        token = data.token
        localStorage.setItem(CONFIG.TOKEN_KEY, data.token)
      }
    }
    const tokenParam = token ? `&token=${token}` : ''
    const url = `${CONFIG.API_BASE}?amount=${settings.amount}&category=${settings.category}&difficulty=${settings.difficulty}&type=multiple${tokenParam}`
    const res = await fetch(url)
    const data = await res.json()
    if (data.response_code === 4 && token) {
      await fetch(`https://opentdb.com/api_token.php?command=reset&token=${token}`)
      localStorage.removeItem(CONFIG.TOKEN_KEY)
      apiLoading = false
      return loadApiQuestions(settings)
    }
    if (data.response_code !== 0 || !data.results.length) {
      alert('Could not reach the question server. Using local questions instead.')
      apiLoading = false
      return null
    }
    const questions = data.results.map(q => {
      const options = shuffleArray([...q.incorrect_answers, q.correct_answer]).map(decodeHTMLEntities)
      const decodedCorrect = decodeHTMLEntities(q.correct_answer)
      return {
        question: decodeHTMLEntities(q.question),
        options,
        correct: options.indexOf(decodedCorrect),
      }
    })
    if (settings.shuffle) shuffleArray(questions)
    apiLoading = false
    return questions
  } catch {
    alert('Could not reach the question server. Using local questions instead.')
    apiLoading = false
    return null
  }
}
