import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/LangContext'
import { stackGroups } from '../data/profile'

export default function Stack() {
  const { t } = useLang()
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reduceMotion) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.15,
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="py-[70px] border-b border-[var(--border-soft)]"
    >
      {/* Header */}
      <div className="mb-9">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] shadow-[0_0_0_3px_rgba(0,212,255,0.12)]" />

          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
            technology_stack
          </span>
        </div>

        <h2 className="font-mono text-[22px] font-semibold mb-2">
          {t('stack_heading')}
        </h2>

        <p className="text-[var(--text-muted)] text-[15px] max-w-[560px]">
          {t('stack_sub')}
        </p>
      </div>

      {/* Groups */}
      <div className="grid gap-8">
        {stackGroups.map((group, groupIndex) => (
          <div key={group.key}>

            {/* Group title */}
            <div className="flex items-center gap-3 mb-3">
              <p className="font-mono text-xs text-[var(--violet)]">
                {t(group.key)}
              </p>

              <div className="h-px flex-1 bg-[var(--border-soft)]" />
            </div>

            {/* Technologies */}
            <div
              className="grid gap-2.5"
              style={{
                gridTemplateColumns:
                  'repeat(auto-fill, minmax(150px, 1fr))',
              }}
            >
              {group.items.map((item, itemIndex) => (
                <div
                  key={item.name}
                  className={`
                    group relative
                    flex items-center gap-2.5
                    border border-[var(--border)]
                    rounded-[10px]
                    p-3
                    bg-[var(--bg-panel)]
                    overflow-hidden
                    transition-all duration-300
                    hover:border-[var(--cyan)]
                    hover:-translate-y-1
                    hover:shadow-[0_10px_30px_rgba(0,0,0,.18)]
                    ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}
                  `}
                  style={{
                    transitionDelay: visible
                      ? `${groupIndex * 80 + itemIndex * 45}ms`
                      : '0ms',
                  }}
                >
                  {/* Hover glow */}
                  <span
                    className="
                      pointer-events-none
                      absolute
                      -top-10
                      -right-10
                      w-20
                      h-20
                      rounded-full
                      bg-[var(--cyan)]/10
                      blur-2xl
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity duration-300
                    "
                  />

                  {/* Technology code */}
                  <span
                    className="
                      relative
                      w-8
                      h-8
                      shrink-0
                      rounded-md
                      bg-[var(--bg-panel-alt)]
                      border
                      border-[var(--border)]
                      flex
                      items-center
                      justify-center
                      font-mono
                      text-[11px]
                      font-bold
                      text-[var(--cyan)]
                      group-hover:border-[var(--cyan)]
                      group-hover:text-white
                      transition-colors
                    "
                  >
                    {item.code}
                  </span>

                  {/* Name */}
                  <span className="relative text-[13.5px] font-medium">
                    {item.name}
                  </span>

                  {/* Active indicator */}
                  <span
                    className="
                      absolute
                      right-2.5
                      top-2.5
                      w-1
                      h-1
                      rounded-full
                      bg-[var(--ok)]
                      opacity-30
                      group-hover:opacity-100
                      group-hover:animate-pulse
                      transition-opacity
                    "
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}