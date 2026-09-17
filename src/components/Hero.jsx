import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/LangContext'
import Terminal from './Terminal'

export default function Hero() {
  const { lang, t } = useLang()
  const [typed, setTyped] = useState('')
  const [done, setDone] = useState(false)
  const [clock, setClock] = useState('--:--')
  const timeoutRef = useRef(null)

  // Typing effect
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const full = t('hero_role_sub')

    setDone(false)

    if (reduceMotion) {
      setTyped(full)
      setDone(true)
      return
    }

    let i = 0

    setTyped('')

    function step() {
      if (i <= full.length) {
        setTyped(full.slice(0, i))
        i++

        timeoutRef.current = setTimeout(step, 28)
      } else {
        setDone(true)
      }
    }

    step()

    return () => clearTimeout(timeoutRef.current)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  // Santiago clock
  useEffect(() => {
    function update() {
      try {
        const fmt = new Intl.DateTimeFormat(
          lang === 'en' ? 'en-US' : 'es-CL',
          {
            timeZone: 'America/Santiago',
            hour: '2-digit',
            minute: '2-digit',
          }
        )

        setClock(fmt.format(new Date()))
      } catch (e) {
        /* ignore */
      }
    }

    update()

    const id = setInterval(update, 30000)

    return () => clearInterval(id)
  }, [lang])

  return (
    <section className="pt-[86px] pb-[70px] border-b border-[var(--border-soft)]">

      <div className="grid lg:grid-cols-[1fr_460px] gap-12 lg:gap-16 items-center">

        {/* LEFT */}
        <div>

          {/* Availability */}
          <div className="flex items-center gap-2 font-mono text-[13px] text-[var(--cyan)] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--ok)] shadow-[0_0_0_3px_rgba(95,216,143,0.25)]" />

            <span>
              {t('status_available')}
            </span>
          </div>

          {/* Name */}
          <h1 className="font-mono font-bold leading-[1.05] tracking-tight mb-2.5 text-[clamp(32px,5.4vw,54px)]">
            Andrés Romero
          </h1>

          {/* Role */}
          <p className="font-semibold text-[var(--text-muted)] mb-5 text-[clamp(17px,2.4vw,21px)]">

            <span>
              {t('hero_role')}
            </span>

            {' — '}

            <span className="text-[var(--violet)]">

              <span
                id="typed-cursor"
                className={done ? 'done' : ''}
              >
                {typed}
              </span>

            </span>
          </p>

          {/* Description */}
          <p className="max-w-[620px] text-base leading-relaxed text-[var(--text-muted)] mb-8">
            {t('hero_desc')}
          </p>

          {/* CTAs */}
          <div className="flex gap-3 flex-wrap mb-8">

            <a
              href="#projects"
              className="font-mono text-[13px] font-semibold px-[18px] py-[11px] rounded-md bg-[var(--cyan)] text-[#04141a] hover:-translate-y-0.5 transition-transform"
            >
              {t('cta_projects')}
            </a>

            <a
              href="#contact"
              className="font-mono text-[13px] font-semibold px-[18px] py-[11px] rounded-md border border-[var(--border)] hover:border-[var(--cyan)] hover:text-[var(--cyan)] hover:-translate-y-0.5 transition-all"
            >
              {t('cta_contact')}
            </a>

          </div>

          {/* Meta */}
          <div className="flex gap-6 flex-wrap font-mono text-[12.5px] text-[var(--text-faint)]">

            <span className="flex items-center gap-1.5">
              📍

              <b className="text-[var(--text-muted)] font-medium">
                {t('status_location')}
              </b>
            </span>

            <span className="flex items-center gap-1.5">
              🕒

              <b className="text-[var(--text-muted)] font-medium">
                {clock}
              </b>
            </span>

            <span className="flex items-center gap-1.5">
              ⌥

              <b className="text-[var(--text-muted)] font-medium">
                React · Supabase · Power Automate
              </b>
            </span>

          </div>

        </div>

        {/* RIGHT */}
        <div className="hidden lg:block">
          <Terminal />
        </div>

      </div>

      {/* Mobile terminal */}
      <div className="lg:hidden mt-12">
        <Terminal />
      </div>

    </section>
  )
}