import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    let w = 0
    let h = 0
    let particles = []
    let rafId = null
    let dpr = 1

    const mouse = {
      x: null,
      y: null,
      active: false,
    }

    const MOUSE_RADIUS = 140
    const CONNECTION_DISTANCE = 130

    function handleMove(e) {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }

    function handleLeave() {
      mouse.active = false
      mouse.x = null
      mouse.y = null
    }

    function handleTouch(e) {
      if (e.touches && e.touches[0]) {
        mouse.x = e.touches[0].clientX
        mouse.y = e.touches[0].clientY
        mouse.active = true
      }
    }

    function resize() {
      w = window.innerWidth
      h = window.innerHeight

      dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = w * dpr
      canvas.height = h * dpr

      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(
        65,
        Math.max(30, Math.floor((w * h) / 26000))
      )

      particles = new Array(count).fill(null).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,

        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,

        violet: Math.random() > 0.65,

        size: Math.random() * 1.2 + 1.1,
      }))
    }

    function draw() {
      ctx.clearRect(0, 0, w, h)

      const root = document.documentElement

      const cyan =
        getComputedStyle(root)
          .getPropertyValue('--cyan-rgb')
          .trim() || '0, 255, 255'

      const violet =
        getComputedStyle(root)
          .getPropertyValue('--violet-rgb')
          .trim() || '139, 92, 246'

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        if (!reduceMotion) {
          if (mouse.active) {
            const dx = p.x - mouse.x
            const dy = p.y - mouse.y

            const distSq = dx * dx + dy * dy

            if (distSq < MOUSE_RADIUS * MOUSE_RADIUS) {
              const dist = Math.sqrt(distSq)

              if (dist > 0.01) {
                const force =
                  (1 - dist / MOUSE_RADIUS) * 0.45

                p.x += (dx / dist) * force
                p.y += (dy / dist) * force
              }
            }
          }

          p.x += p.vx
          p.y += p.vy

          if (p.x < 0 || p.x > w) {
            p.vx *= -1
          }

          if (p.y < 0 || p.y > h) {
            p.vy *= -1
          }
        }

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]

          const dx = p.x - q.x
          const dy = p.y - q.y

          const distSq = dx * dx + dy * dy

          if (
            distSq < CONNECTION_DISTANCE * CONNECTION_DISTANCE
          ) {
            const dist = Math.sqrt(distSq)

            const opacity =
              0.12 * (1 - dist / CONNECTION_DISTANCE)

            ctx.strokeStyle = `rgba(${cyan},${opacity})`
            ctx.lineWidth = 0.7

            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
      }

      for (const p of particles) {
        ctx.fillStyle = `rgba(${
          p.violet ? violet : cyan
        },0.55)`

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      if (!reduceMotion) {
        rafId = requestAnimationFrame(draw)
      }
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseleave', handleLeave)
    window.addEventListener('touchmove', handleTouch, {
      passive: true,
    })
    window.addEventListener('touchend', handleLeave)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseleave', handleLeave)
      window.removeEventListener('touchmove', handleTouch)
      window.removeEventListener('touchend', handleLeave)

      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      />

      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(var(--border-soft) 1px, transparent 1px), linear-gradient(90deg, var(--border-soft) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(circle at 50% 0%, rgba(0,0,0,0.9), transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(circle at 50% 0%, rgba(0,0,0,0.9), transparent 75%)',
        }}
        aria-hidden="true"
      />
    </>
  )
}