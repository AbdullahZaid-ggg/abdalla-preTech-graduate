let confettiPieces = []
let confettiFrame

export function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas')
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  canvas.style.display = 'block'
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.pointerEvents = 'none'
  canvas.style.zIndex = '9999'

  confettiPieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    w: Math.random() * 8 + 4,
    h: Math.random() * 6 + 3,
    color: ['#00e5ff', '#ff00e5', '#00e676', '#6366f1', '#ffd700', '#ff4444'][Math.floor(Math.random() * 6)],
    vx: (Math.random() - 0.5) * 3,
    vy: Math.random() * 3 + 2,
    rot: Math.random() * 360,
    rv: (Math.random() - 0.5) * 8,
    opacity: 1,
  }))

  if (confettiFrame) cancelAnimationFrame(confettiFrame)
  renderConfetti(canvas)
}

function renderConfetti(canvas) {
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  let alive = false
  confettiPieces.forEach(p => {
    p.x += p.vx
    p.vy += 0.05
    p.y += p.vy
    p.rot += p.rv
    if (p.y > canvas.height + 20) p.opacity -= 0.02
    if (p.opacity <= 0) return
    alive = true
    ctx.save()
    ctx.translate(p.x, p.y)
    ctx.rotate((p.rot * Math.PI) / 180)
    ctx.globalAlpha = Math.max(0, p.opacity)
    ctx.fillStyle = p.color
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
    ctx.restore()
  })
  if (alive) {
    confettiFrame = requestAnimationFrame(() => renderConfetti(canvas))
  } else {
    canvas.style.display = 'none'
  }
}
