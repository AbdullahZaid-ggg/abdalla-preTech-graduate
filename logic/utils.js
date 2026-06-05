function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function decodeHTMLEntities(text) {
  const t = document.createElement('textarea')
  t.innerHTML = text
  return t.value
}

function getTodayKey() {
  return new Date().toISOString().slice(0, 10)
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function getPercentage(score, total) {
  return total ? Math.round((score / total) * 100) : 0
}
