import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from '../i18n/translations'

const LangContext = createContext(null)

function getInitialLang() {
  try {
    const stored = localStorage.getItem('ar_lang')
    if (stored === 'es' || stored === 'en') return stored
  } catch (e) {
    /* ignore */
  }
  return 'es'
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('ar_lang', lang)
    } catch (e) {
      /* ignore */
    }
  }, [lang])

  const t = (key) => translations[lang]?.[key] ?? translations.es[key] ?? key
  const tp = (id, field) => translations[lang]?.projects?.[id]?.[field] ?? translations.es.projects[id][field]

  return <LangContext.Provider value={{ lang, setLang, t, tp }}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
