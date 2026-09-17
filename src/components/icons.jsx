const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function MoonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  )
}

export function SunIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

export function ExternalLinkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

export function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  )
}

export function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M21 11.5a8.5 8.5 0 1 1-3.8-7.1" />
      <path d="M21 11.5c0 4.7-3.8 8.5-8.5 8.5a8.4 8.4 0 0 1-4.3-1.2L3 20l1.3-5a8.4 8.4 0 0 1-1.2-4.3A8.5 8.5 0 0 1 12.5 2" />
      <path d="M9 9.2c.2 2.6 2.2 4.6 4.8 4.8" />
    </svg>
  )
}

export function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 4v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.4-.4-3.1.9a10.4 10.4 0 0 0-5 0C8.9 2 7.5 2.4 7.5 2.4a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 6 8.9c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V20" />
    </svg>
  )
}

export function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
      <path d="M10 9v12M10 13a4 4 0 0 1 8 0v8" />
    </svg>
  )
}

export function TruckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="2" y="9" width="13" height="8" rx="1.5" />
      <path d="M15 12h3.5l2.5 3v2h-6z" />
      <circle cx="6.5" cy="19" r="1.6" />
      <circle cx="16.5" cy="19" r="1.6" />
    </svg>
  )
}

export function QrIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M15 15h2v2h-2zM19 15h2v2h-2zM15 19h2v2h-2zM19 19h2v2h-2z" />
    </svg>
  )
}

export function InvoiceIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M9 7h6l2 3H7z" />
      <path d="M4 10h16v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
      <path d="M9 14h6M9 17h4" />
    </svg>
  )
}

export const projectIcons = {
  truck: TruckIcon,
  qr: QrIcon,
  invoice: InvoiceIcon,
}
