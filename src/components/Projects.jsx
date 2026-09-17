import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/LangContext'
import { projects } from '../data/profile'
import { projectIcons, ExternalLinkIcon } from './icons'

export default function Projects() {
  const { t, tp } = useLang()
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
        threshold: 0.12,
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-[70px] border-b border-[var(--border-soft)]"
    >
      {/* Header */}
      <div className="mb-9">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--violet)] shadow-[0_0_0_3px_rgba(139,92,246,0.12)]" />

          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
            selected_projects
          </span>
        </div>

        <h2 className="font-mono text-[22px] font-semibold mb-2">
          {t('projects_heading')}
        </h2>

        <p className="text-[var(--text-muted)] text-[15px] max-w-[560px]">
          {t('projects_sub')}
        </p>
      </div>

      {/* Projects */}
      <div className="grid gap-5">
        {projects.map((project, index) => {
          const Icon = projectIcons[project.icon]

          return (
            <article
              key={project.id}
              className={`
                group
                relative
                grid
                grid-cols-1
                sm:grid-cols-[220px_1fr]
                border
                border-[var(--border)]
                rounded-2xl
                overflow-hidden
                bg-[var(--bg-panel)]
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-[var(--cyan)]
                hover:shadow-[0_20px_60px_rgba(0,0,0,.25)]
                ${
                  visible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }
              `}
              style={{
                transitionDelay: visible
                  ? `${index * 140}ms`
                  : '0ms',
                boxShadow: 'var(--shadow)',
              }}
            >
              {/* Glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -top-32
                  -right-32
                  w-72
                  h-72
                  rounded-full
                  bg-[var(--cyan)]/5
                  blur-3xl
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-500
                "
              />

              {/* Project number */}
              <span
                className="
                  absolute
                  top-4
                  right-5
                  z-10
                  font-mono
                  text-[10px]
                  tracking-widest
                  text-[var(--text-faint)]
                "
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Visual */}
              <div
                className="
                  relative
                  flex
                  items-center
                  justify-center
                  p-7
                  min-h-[190px]
                  border-b
                  sm:border-b-0
                  sm:border-r
                  border-[var(--border)]
                  overflow-hidden
                "
                style={{
                  background:
                    'radial-gradient(circle at 30% 20%, var(--cyan-dim), transparent 60%), radial-gradient(circle at 80% 80%, var(--violet-dim), transparent 60%), var(--bg-panel-alt)',
                }}
              >
                {/* Decorative grid */}
                <div
                  className="
                    absolute
                    inset-0
                    opacity-20
                    pointer-events-none
                  "
                  style={{
                    backgroundImage:
                      'linear-gradient(var(--border-soft) 1px, transparent 1px), linear-gradient(90deg, var(--border-soft) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                    maskImage:
                      'radial-gradient(circle at center, black, transparent 75%)',
                    WebkitMaskImage:
                      'radial-gradient(circle at center, black, transparent 75%)',
                  }}
                />

                {/* Icon */}
                <div
                  className="
                    relative
                    flex
                    items-center
                    justify-center
                    w-24
                    h-24
                    rounded-2xl
                    border
                    border-[var(--border)]
                    bg-[var(--bg-panel)]/70
                    backdrop-blur-sm
                    transition-all
                    duration-500
                    group-hover:scale-110
                    group-hover:border-[var(--cyan)]
                    group-hover:rotate-1
                  "
                >
                  <Icon
                    className="
                      w-16
                      h-16
                      text-[var(--cyan)]
                      transition-all
                      duration-500
                      group-hover:drop-shadow-[0_0_14px_var(--cyan)]
                    "
                  />
                </div>

                {/* Active dot */}
                <span
                  className="
                    absolute
                    bottom-4
                    left-5
                    flex
                    items-center
                    gap-2
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-wider
                    text-[var(--text-faint)]
                  "
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--ok)] animate-pulse" />
                  live project
                </span>
              </div>

              {/* Content */}
              <div className="relative p-7">
                <p className="font-mono text-[11.5px] uppercase tracking-wider text-[var(--violet)] mb-2">
                  {tp(project.id, 'tag')}
                </p>

                <h3 className="font-mono text-[19px] font-bold mb-2.5">
                  {tp(project.id, 'title')}
                </h3>

                <p className="text-[var(--text-muted)] text-[14.5px] leading-relaxed mb-5 max-w-[520px]">
                  {tp(project.id, 'desc')}
                </p>

                {/* Link */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    font-mono
                    text-[13px]
                    font-semibold
                    text-[var(--cyan)]
                    group/link
                  "
                >
                  <span className="group-hover/link:underline">
                    {t('proj_link')}
                  </span>

                  <ExternalLinkIcon
                    className="
                      w-3.5
                      h-3.5
                      transition-transform
                      duration-300
                      group-hover/link:translate-x-1
                      group-hover/link:-translate-y-0.5
                    "
                  />
                </a>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}