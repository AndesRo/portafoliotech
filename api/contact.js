import nodemailer from 'nodemailer'

// Rate limit simple por instancia serverless.
// Ayuda a reducir abusos casuales del formulario.
const hits = new Map()

const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 5

function isRateLimited(ip) {
  const now = Date.now()
  const entry = hits.get(ip) || {
    count: 0,
    start: now,
  }

  if (now - entry.start > WINDOW_MS) {
    entry.count = 0
    entry.start = now
  }

  entry.count += 1
  hits.set(ip, entry)

  return entry.count > MAX_PER_WINDOW
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({
      error: 'method_not_allowed',
    })
  }

  const ip =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    'unknown'

  if (isRateLimited(ip)) {
    return res.status(429).json({
      error: 'rate_limited',
    })
  }

  const {
    name,
    email,
    message,
    honeypot,
  } = req.body || {}

  // Honeypot anti-spam
  if (honeypot) {
    return res.status(200).json({
      ok: true,
    })
  }

  // Validaciones
  if (
    !name ||
    !email ||
    !message ||
    !isValidEmail(email)
  ) {
    return res.status(400).json({
      error: 'invalid_fields',
    })
  }

  if (String(name).length > 100) {
    return res.status(400).json({
      error: 'name_too_long',
    })
  }

  if (String(email).length > 254) {
    return res.status(400).json({
      error: 'email_too_long',
    })
  }

  if (String(message).length > 5000) {
    return res.status(400).json({
      error: 'message_too_long',
    })
  }

  // Variables de entorno
  const gmailUser = process.env.GMAIL_USER
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD

  if (!gmailUser || !gmailAppPassword) {
    console.error(
      'Missing GMAIL_USER or GMAIL_APP_PASSWORD env vars'
    )

    return res.status(500).json({
      error: 'server_not_configured',
    })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    })

    await transporter.sendMail({
      from: `"Portafolio — ${name}" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject: `Contacto desde portafolio — ${name}`,
      text: `${message}\n\n---\n${name} <${email}>`,
    })

    return res.status(200).json({
      ok: true,
    })
  } catch (err) {
    console.error(
      'contact form send failed',
      err
    )

    return res.status(500).json({
      error: 'send_failed',
    })
  }
}