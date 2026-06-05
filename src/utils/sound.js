let audioCtx
export let isMuted = false

export function setMuted(val) {
  isMuted = val
}

function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  if (audioCtx.state === 'suspended') audioCtx.resume()
  return audioCtx
}

function playTone(freq, duration, type = 'sine', volume = 0.08) {
  try {
    const ctx = getAudioCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.value = freq
    gain.gain.setValueAtTime(volume, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + duration)
  } catch {}
}

export function playCorrect() {
  if (isMuted) return
  playTone(523, 0.12)
  setTimeout(() => playTone(659, 0.12), 100)
  setTimeout(() => playTone(784, 0.15), 200)
}

export function playWrong() {
  if (isMuted) return
  playTone(300, 0.15, 'sawtooth', 0.06)
  setTimeout(() => playTone(200, 0.2, 'sawtooth', 0.06), 120)
}

export function playComplete() {
  if (isMuted) return
  const notes = [523, 659, 784, 1047]
  notes.forEach((n, i) => setTimeout(() => playTone(n, 0.2), i * 150))
}

export function playClick() {
  if (isMuted) return
  playTone(1200, 0.03, 'square', 0.02)
}
