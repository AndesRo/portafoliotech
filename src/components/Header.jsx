import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LangContext'
import { MoonIcon, SunIcon } from './icons'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const { lang, setLang, t } = useLang()

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border-soft)] backdrop-blur-md bg-[color:var(--bg)]/90">
      <div className="max-w-[1080px] mx-auto px-6 py-3.5 flex items-center gap-5">

        {/* Marca */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 font-mono font-semibold text-sm tracking-wide whitespace-nowrap"
        >
          {/* Imagen / avatar tecnológico */}
          <span
            className="
              relative
              w-9 h-9
              shrink-0
              rounded-full
              overflow-hidden
              border border-[var(--border)]
              bg-[var(--bg-panel)]
              transition-all duration-300
              group-hover:border-[var(--cyan)]
              group-hover:shadow-[0_0_16px_var(--cyan-dim)]
            "
          >
            <img
              src="/perfil.png"
              alt="Andrés Romero"
              className="
                w-full h-full
                object-cover
                object-center
                transition-transform duration-500
                group-hover:scale-105
              "
            />

            {/* Scan line */}
            <span
              className="
                absolute
                left-0
                right-0
                top-0
                h-px
                bg-[var(--cyan)]
                opacity-0
                shadow-[0_0_8px_var(--cyan)]
                group-hover:opacity-100
                group-hover:animate-[logoScan_1.4s_ease-in-out_infinite]
              "
            />

            {/* Brillo */}
            <span
              className="
                absolute
                inset-0
                rounded-full
                bg-[var(--cyan)]
                opacity-0
                mix-blend-screen
                transition-opacity duration-300
                group-hover:opacity-[0.08]
              "
            />
          </span>

          <span className="transition-colors duration-300 group-hover:text-[var(--cyan)]">
            ANDRÉS ROMERO
          </span>
        </a>

        {/* Navegación */}
        <nav className="hidden sm:flex gap-5 ml-2 font-mono text-[13px] text-[var(--text-muted)]">
          <a
            href="#about"
            className="hover:text-[var(--cyan)] transition-colors"
          >
            {t('nav_about')}
          </a>

          <a
            href="#stack"
            className="hover:text-[var(--cyan)] transition-colors"
          >
            {t('nav_stack')}
          </a>

          <a
            href="#projects"
            className="hover:text-[var(--cyan)] transition-colors"
          >
            {t('nav_projects')}
          </a>

          <a
            href="#contact"
            className="hover:text-[var(--cyan)] transition-colors"
          >
            {t('nav_contact')}
          </a>
        </nav>

        {/* Controles */}
        <div className="ml-auto flex items-center gap-2.5">

          {/* Idioma */}
          <div className="flex border border-[var(--border)] rounded-md overflow-hidden font-mono text-xs font-semibold">
            <button
              type="button"
              onClick={() => setLang('es')}
              className={`px-2.5 py-1.5 transition-colors ${
                lang === 'es'
                  ? 'bg-[var(--cyan-dim)] text-[var(--cyan)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--cyan)]'
              }`}
            >
              ES
            </button>

            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2.5 py-1.5 transition-colors ${
                lang === 'en'
                  ? 'bg-[var(--cyan-dim)] text-[var(--cyan)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--cyan)]'
              }`}
            >
              EN
            </button>
          </div>

          {/* Tema */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="
              w-[34px] h-[34px]
              rounded-md
              border border-[var(--border)]
              bg-[var(--bg-panel)]
              text-[var(--text-muted)]
              hover:text-[var(--cyan)]
              hover:border-[var(--cyan)]
              flex items-center justify-center
              transition-all
            "
          >
            {theme === 'dark' ? (
              <MoonIcon className="w-4 h-4" />
            ) : (
              <SunIcon className="w-4 h-4" />
            )}
          </button>

        </div>
      </div>
    </header>
  )
}