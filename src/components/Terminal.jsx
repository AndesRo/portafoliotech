import { useEffect, useState } from 'react'

const lines = [
  '$ init andres-tech',
  '> Analizando necesidad...',
  '> Diseñando solución...',
  '> Automatizando proceso...',
  '> Deploying production...',
]

export default function Terminal() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reduceMotion) {
      setVisibleLines(lines.length)
      setProgress(100)
      return
    }

    let line = 0

    const lineTimer = setInterval(() => {
      line++

      setVisibleLines(line)

      if (line >= lines.length) {
        clearInterval(lineTimer)
      }
    }, 700)

    const progressTimer = setInterval(() => {
      setProgress((value) => {
        if (value >= 100) {
          clearInterval(progressTimer)
          return 100
        }

        return value + 2
      })
    }, 80)

    return () => {
      clearInterval(lineTimer)
      clearInterval(progressTimer)
    }
  }, [])

  return (
    <div className="relative w-full max-w-[460px] ml-auto">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-panel)]/90 backdrop-blur-md shadow-[0_20px_70px_rgba(0,0,0,.35)] overflow-hidden">

        {/* Terminal header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-soft)]">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
          </div>

          <span className="font-mono text-[10px] text-[var(--text-faint)]">
            andes-tech / production
          </span>
        </div>

        {/* Terminal body */}
        <div className="p-5 min-h-[260px] font-mono text-[12px] sm:text-[13px]">
          <div className="space-y-3">
            {lines.slice(0, visibleLines).map((line, index) => (
              <div
                key={line}
                className="flex gap-2 animate-[fadeIn_.35s_ease-out]"
              >
                <span className="text-[var(--cyan)]">
                  {index === 0 ? '' : '✓'}
                </span>

                <span
                  className={
                    index === lines.length - 1
                      ? 'text-[var(--ok)]'
                      : 'text-[var(--text-muted)]'
                  }
                >
                  {line}
                </span>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="mt-8">
            <div className="flex justify-between mb-2 text-[10px] text-[var(--text-faint)]">
              <span>deployment</span>
              <span>{progress}%</span>
            </div>

            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--cyan)] to-[var(--violet)] transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Status */}
          <div className="mt-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--ok)] animate-pulse" />

            <span className="text-[var(--text-faint)]">
              system_status:
            </span>

            <span className="text-[var(--ok)]">
              operational
            </span>
          </div>
        </div>
      </div>

      {/* Glow */}
      <div className="absolute -inset-8 -z-10 bg-[var(--cyan)]/5 blur-3xl rounded-full" />
    </div>
  )
}