import { useLang } from '../context/LangContext'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="max-w-[1080px] mx-auto px-6 py-8 pb-11">
      <div className="flex justify-between items-center flex-wrap gap-4 font-mono text-xs text-[var(--text-faint)]">

        {/* Logo + descripción */}
        <div className="flex items-center gap-3">
          <a
            href="#top"
            className="group relative w-11 h-11 shrink-0 rounded-lg overflow-hidden border border-[var(--border)] bg-[var(--bg-panel)] transition-all duration-300 hover:border-[var(--cyan)] hover:shadow-[0_0_18px_var(--cyan-dim)]"
            aria-label="Volver al inicio"
          >
            <img
              src="/perfil.png"
              alt="Andrés Romero"
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />

            {/* Línea de escaneo */}
            <span
              className="
                absolute
                left-0
                right-0
                top-0
                h-px
                bg-[var(--cyan)]
                shadow-[0_0_8px_var(--cyan)]
                opacity-0
                group-hover:opacity-100
                group-hover:animate-[logoScan_1.4s_ease-in-out_infinite]
              "
            />

            {/* Brillo */}
            <span
              className="
                absolute
                inset-0
                bg-[var(--cyan)]
                opacity-0
                mix-blend-screen
                transition-opacity duration-300
                group-hover:opacity-[0.08]
              "
            />
          </a>

          <span className="text-[10px] text-[var(--text-faint)]">
            {t('footer_note')}
          </span>
        </div>

        {/* Estado + año */}
        <div className="flex items-center gap-4">

          <span className="hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--ok)] shadow-[0_0_0_3px_rgba(95,216,143,0.12)]" />

            <span>
              production
            </span>
          </span>

          <span className="text-[var(--border)]">
            /
          </span>

          <span>
            © {new Date().getFullYear()}
          </span>

        </div>

      </div>
    </footer>
  )
}