import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/LangContext'

export default function About() {
  const { t } = useLang()
  const facts = [1, 2, 3]

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
      id="about"
      ref={sectionRef}
      className="py-[70px] border-b border-[var(--border-soft)]"
    >
      {/* Encabezado */}
      <div
        className={`mb-9 transition-all duration-700 ease-out ${
          visible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-5'
        }`}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] shadow-[0_0_12px_var(--cyan)]" />

          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
            about_me
          </span>
        </div>

        <h2 className="font-mono text-[22px] font-semibold mb-2">
          {t('about_heading')}
        </h2>

        <p className="text-[var(--text-muted)] text-[15px] max-w-[560px]">
          {t('about_sub')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-7">
        {/* Texto */}
        <div
          className={`transition-all duration-700 delay-150 ease-out ${
            visible
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-5'
          }`}
        >
          <p className="text-[var(--text-muted)] text-[15px] leading-[1.75] mb-3.5">
            {t('about_p1')}
          </p>

          <p className="text-[var(--text-muted)] text-[15px] leading-[1.75]">
            {t('about_p2')}
          </p>
        </div>

        {/* Facts */}
        <div className="grid gap-2.5 content-start">
          {facts.map((n, index) => (
            <div
              key={n}
              className={`
                group
                relative
                overflow-hidden
                border border-[var(--border)]
                rounded-[10px]
                px-4 py-3.5
                bg-[var(--bg-panel)]
                transition-all
                duration-700
                ease-out
                hover:border-[var(--cyan)]
                hover:-translate-y-1
              `}
              style={{
                transitionDelay: `${250 + index * 120}ms`,
                opacity: visible ? 1 : 0,
                transform: visible
                  ? 'translateX(0)'
                  : 'translateX(25px)',
              }}
            >
              {/* Línea de brillo */}
              <span
                className="
                  absolute
                  left-0
                  top-0
                  h-full
                  w-px
                  bg-[var(--cyan)]
                  opacity-0
                  transition-opacity
                  duration-300
                  group-hover:opacity-100
                "
              />

              <p className="font-mono text-[11px] text-[var(--violet)] mb-1">
                {t(`about_fact${n}_label`)}
              </p>

              <p className="text-sm font-medium">
                {t(`about_fact${n}_value`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}