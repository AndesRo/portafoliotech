import { useState } from 'react'
import { useLang } from '../context/LangContext'
import { contact } from '../data/profile'
import { MailIcon, WhatsAppIcon, GithubIcon, LinkedinIcon } from './icons'

export default function Contact() {
  const { t } = useLang()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  // idle | sending | success | error
  const [status, setStatus] = useState('idle')

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function mailtoFallback() {
    const subject = encodeURIComponent(`Contacto desde portafolio — ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n---\n${form.name} (${form.email})`)
    return `mailto:${contact.email}?subject=${subject}&body=${body}`
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const honeypot = e.target.elements.honeypot?.value || ''
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, honeypot }),
      })
      if (!res.ok) throw new Error('request_failed')
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus('error')
    }
  }

  const items = [
    {
      href: `mailto:${contact.email}`,
      icon: MailIcon,
      label: t('contact_email_label'),
      value: contact.email,
      external: false,
    },
 {
  href: `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    contact.whatsappMessage
  )}`,
  icon: WhatsAppIcon,
  label: t('contact_whatsapp_label'),
  value: contact.whatsappDisplay,
  external: true,
},
    {
      href: contact.github.url,
      icon: GithubIcon,
      label: t('contact_github_label'),
      value: contact.github.handle,
      external: true,
    },
    {
      href: contact.linkedin.url,
      icon: LinkedinIcon,
      label: t('contact_linkedin_label'),
      value: contact.linkedin.handle,
      external: true,
    },
  ]

  return (
    <section id="contact" className="py-[70px]">
      <div className="mb-9">
        <h2 className="font-mono text-[22px] font-semibold mb-2">{t('contact_heading')}</h2>
        <p className="text-[var(--text-muted)] text-[15px] max-w-[560px]">{t('contact_sub')}</p>
      </div>

      <div className="grid md:grid-cols-[1fr_1.1fr] gap-7">
        <div className="grid gap-3 content-start">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-3 border border-[var(--border)] rounded-[10px] px-[18px] py-3.5 bg-[var(--bg-panel)] hover:border-[var(--violet)] hover:-translate-y-0.5 transition-all"
            >
              <span className="w-[34px] h-[34px] rounded-lg bg-[var(--violet-dim)] text-[var(--violet)] flex items-center justify-center shrink-0">
                <item.icon className="w-[17px] h-[17px]" />
              </span>
              <span>
                <p className="font-mono text-[11px] text-[var(--text-faint)] mb-0.5">{item.label}</p>
                <p className="text-sm font-semibold break-words">{item.value}</p>
              </span>
            </a>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="border border-[var(--border)] rounded-2xl bg-[var(--bg-panel)] p-[22px] grid gap-3.5"
          style={{ boxShadow: 'var(--shadow)' }}
        >
          {/* honeypot — hidden from real users, catches basic bots */}
          <input
            type="text"
            name="honeypot"
            tabIndex={-1}
            autoComplete="off"
            className="absolute -left-[9999px] w-px h-px opacity-0"
            aria-hidden="true"
          />
          <div>
            <label htmlFor="cf-name" className="block font-mono text-[11.5px] text-[var(--text-faint)] mb-1.5">
              {t('form_name_label')}
            </label>
            <input
              id="cf-name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full bg-[var(--bg-panel-alt)] border border-[var(--border)] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--cyan)]"
            />
          </div>
          <div>
            <label htmlFor="cf-email" className="block font-mono text-[11.5px] text-[var(--text-faint)] mb-1.5">
              {t('form_email_label')}
            </label>
            <input
              id="cf-email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full bg-[var(--bg-panel-alt)] border border-[var(--border)] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--cyan)]"
            />
          </div>
          <div>
            <label htmlFor="cf-message" className="block font-mono text-[11.5px] text-[var(--text-faint)] mb-1.5">
              {t('form_message_label')}
            </label>
            <textarea
              id="cf-message"
              name="message"
              required
              value={form.message}
              onChange={handleChange}
              rows={4}
              className="w-full bg-[var(--bg-panel-alt)] border border-[var(--border)] rounded-md px-3 py-2.5 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[var(--cyan)]"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="font-mono text-[13px] font-semibold px-[18px] py-[11px] rounded-md bg-[var(--cyan)] text-[#04141a] hover:-translate-y-0.5 transition-transform disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {status === 'sending' ? t('form_submitting') : t('form_submit')}
          </button>

          {status === 'success' && (
            <p className="text-xs text-[var(--ok)]">{t('form_success')}</p>
          )}
          {status === 'error' && (
            <p className="text-xs text-[var(--text-faint)]">
              {t('form_error')}{' '}
              <a href={mailtoFallback()} className="text-[var(--cyan)] hover:underline">
                {t('form_error_link')}
              </a>
            </p>
          )}
          {status === 'idle' && <p className="text-xs text-[var(--text-faint)]">{t('form_note')}</p>}
        </form>
      </div>
    </section>
  )
}
