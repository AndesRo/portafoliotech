import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LangContext'
import { MoonIcon, SunIcon } from './icons'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const { lang, setLang, t } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-soft)] backdrop-blur-md bg-[color:var(--bg)]/90">
      <div className="max-w-[1080px] mx-auto px-6 py-3.5">

        {/* Barra principal */}
        <div className="flex items-center gap-5">

          {/* Logo */}
          <a
            href="#top"
            onClick={closeMenu}
            className="group flex items-center gap-2.5 font-mono font-semibold text-sm tracking-wide whitespace-nowrap"
          >
            <span className="relative w-9 h-9 shrink-0 rounded-full overflow-hidden border border-[var(--border)] bg-[var(--bg-panel)] transition-all duration-300 group-hover:border-[var(--cyan)] group-hover:shadow-[0_0_16px_var(--cyan-dim)]">
              <img
                src="/perfil.png"
                alt="Andrés Romero"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />

              <span className="absolute left-0 right-0 top-0 h-px bg-[var(--cyan)] opacity-0 shadow-[0_0_8px_var(--cyan)] group-hover:opacity-100 group-hover:animate-[logoScan_1.4s_ease-in-out_infinite]" />

              <span className="absolute inset-0 rounded-full bg-[var(--cyan)] opacity-0 mix-blend-screen transition-opacity duration-300 group-hover:opacity-[0.08]" />
            </span>

            <span className="transition-colors duration-300 group-hover:text-[var(--cyan)]">
              ANDRÉS ROMERO
            </span>
          </a>

          {/* Navegación desktop */}
          <nav className="hidden sm:flex gap-5 ml-2 font-mono text-[13px] text-[var(--text-muted)]">
            <a href="#about" className="hover:text-[var(--cyan)] transition-colors">
              {t('nav_about')}
            </a>

            <a href="#stack" className="hover:text-[var(--cyan)] transition-colors">
              {t('nav_stack')}
            </a>

            <a href="#projects" className="hover:text-[var(--cyan)] transition-colors">
              {t('nav_projects')}
            </a>

            <a href="#contact" className="hover:text-[var(--cyan)] transition-colors">
              {t('nav_contact')}
            </a>
          </nav>

          {/* Controles desktop */}
          <div className="hidden sm:flex ml-auto items-center gap-2.5">

            <LanguageSwitch
              lang={lang}
              setLang={setLang}
            />

            <ThemeButton
              theme={theme}
              toggleTheme={toggleTheme}
            />

          </div>

          {/* Botón menú móvil */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            className="sm:hidden ml-auto relative w-10 h-10 rounded-md border border-[var(--border)] bg-[var(--bg-panel)] hover:border-[var(--cyan)] transition-all flex items-center justify-center"
          >
            <span className="sr-only">
              {menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            </span>

            <span className="relative w-5 h-4">
              <span
                className={`absolute left-0 top-0 w-5 h-px bg-[var(--text-muted)] transition-all duration-300 ${
                  menuOpen ? 'top-2 rotate-45 bg-[var(--cyan)]' : ''
                }`}
              />

              <span
                className={`absolute left-0 top-2 w-5 h-px bg-[var(--text-muted)] transition-all duration-300 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />

              <span
                className={`absolute left-0 top-4 w-5 h-px bg-[var(--text-muted)] transition-all duration-300 ${
                  menuOpen ? 'top-2 -rotate-45 bg-[var(--cyan)]' : ''
                }`}
              />
            </span>
          </button>
        </div>

        {/* Menú móvil */}
        <div
          className={`sm:hidden overflow-hidden transition-all duration-300 ${
            menuOpen
              ? 'max-h-[420px] opacity-100'
              : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="pt-4 pb-2 border-t border-[var(--border-soft)] mt-3 font-mono text-sm">

            <MobileLink
              href="#about"
              label={t('nav_about')}
              onClick={closeMenu}
            />

            <MobileLink
              href="#stack"
              label={t('nav_stack')}
              onClick={closeMenu}
            />

            <MobileLink
              href="#projects"
              label={t('nav_projects')}
              onClick={closeMenu}
            />

            <MobileLink
              href="#contact"
              label={t('nav_contact')}
              onClick={closeMenu}
            />

            {/* Controles */}
            <div className="flex items-center justify-between mt-3 pt-4 border-t border-[var(--border-soft)]">

              <LanguageSwitch
                lang={lang}
                setLang={setLang}
              />

              <ThemeButton
                theme={theme}
                toggleTheme={toggleTheme}
              />

            </div>
          </nav>
        </div>

      </div>
    </header>
  )
}

function MobileLink({ href, label, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="flex items-center justify-between py-3 px-2 rounded-md text-[var(--text-muted)] hover:text-[var(--cyan)] hover:bg-[var(--cyan-dim)] transition-all"
    >
      <span>{label}</span>
      <span className="text-[var(--text-faint)]">→</span>
    </a>
  )
}

function LanguageSwitch({ lang, setLang }) {
  return (
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
  )
}

function ThemeButton({ theme, toggleTheme }) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Cambiar tema"
      className="w-[34px] h-[34px] rounded-md border border-[var(--border)] bg-[var(--bg-panel)] text-[var(--text-muted)] hover:text-[var(--cyan)] hover:border-[var(--cyan)] flex items-center justify-center transition-all"
    >
      {theme === 'dark' ? (
        <MoonIcon className="w-4 h-4" />
      ) : (
        <SunIcon className="w-4 h-4" />
      )}
    </button>
  )
}