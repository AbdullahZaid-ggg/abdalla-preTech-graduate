export function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function decodeHTMLEntities(text) {
  const t = document.createElement('textarea')
  t.innerHTML = text
  return t.value
}

export function getTodayKey() {
  return new Date().toISOString().slice(0, 10)
}

export function getPercentage(score, total) {
  return total ? Math.round((score / total) * 100) : 0
}
