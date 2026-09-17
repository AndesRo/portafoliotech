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

// Escapa contenido enviado por el usuario antes de insertarlo
// dentro del correo HTML.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export default async function handler(req, res) {
  // Solo permitimos POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')

    return res.status(405).json({
      error: 'method_not_allowed',
    })
  }

  // IP para rate limit
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
  // Los bots suelen completar este campo oculto.
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

    // Escapamos los datos antes de insertarlos en HTML
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message)

    await transporter.sendMail({
      from: `"Andrés Romero — Portafolio" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,

      subject: `Nuevo contacto — ${name}`,

      // Versión de texto plano.
      // Gmail/clientes que no soporten HTML utilizarán esta versión.
      text: `
Nuevo mensaje desde el portafolio

Nombre: ${name}
Correo: ${email}

Mensaje:
${message}
      `.trim(),

      // Versión HTML
      html: `
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Nuevo contacto — Andrés Romero</title>
</head>

<body style="
  margin:0;
  padding:0;
  background-color:#080d12;
  font-family:Arial,Helvetica,sans-serif;
  color:#eaeef2;
">

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    role="presentation"
    style="
      width:100%;
      background-color:#080d12;
      padding:32px 16px;
    "
  >

    <tr>
      <td align="center">

        <!-- CONTENEDOR PRINCIPAL -->

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          role="presentation"
          style="
            width:100%;
            max-width:620px;
            background-color:#101820;
            border:1px solid #24313d;
            border-radius:14px;
            overflow:hidden;
          "
        >

          <!-- HEADER -->

          <tr>
            <td style="
              padding:28px 30px;
              background-color:#0d151c;
              border-bottom:1px solid #24313d;
            ">

              <div style="
                font-size:20px;
                line-height:1.2;
                font-weight:700;
                letter-spacing:1px;
                color:#ffffff;
              ">
                ANDRÉS ROMERO
              </div>

              <div style="
                margin-top:7px;
                font-size:11px;
                line-height:1.4;
                letter-spacing:2px;
                color:#6ee7ff;
                text-transform:uppercase;
              ">
                PORTAFOLIO · CONTACTO
              </div>

            </td>
          </tr>


          <!-- CONTENIDO -->

          <tr>
            <td style="
              padding:30px;
            ">

              <!-- LABEL -->

              <div style="
                margin-bottom:9px;
                font-size:10px;
                line-height:1.4;
                font-weight:700;
                letter-spacing:2px;
                color:#a78bfa;
                text-transform:uppercase;
              ">
                NUEVO MENSAJE
              </div>


              <!-- TITULO -->

              <div style="
                margin-bottom:28px;
                font-size:25px;
                line-height:1.25;
                font-weight:700;
                color:#ffffff;
              ">
                Alguien quiere contactarte
              </div>


              <!-- NOMBRE -->

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                role="presentation"
                style="
                  width:100%;
                  margin-bottom:16px;
                  background-color:#0b1218;
                  border:1px solid #24313d;
                  border-radius:10px;
                "
              >

                <tr>
                  <td style="
                    padding:16px;
                  ">

                    <div style="
                      margin-bottom:6px;
                      font-size:10px;
                      line-height:1.4;
                      letter-spacing:1.5px;
                      color:#71808d;
                      text-transform:uppercase;
                    ">
                      Nombre
                    </div>

                    <div style="
                      font-size:15px;
                      line-height:1.5;
                      font-weight:700;
                      color:#ffffff;
                    ">
                      ${safeName}
                    </div>

                  </td>
                </tr>

              </table>


              <!-- EMAIL -->

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                role="presentation"
                style="
                  width:100%;
                  margin-bottom:16px;
                  background-color:#0b1218;
                  border:1px solid #24313d;
                  border-radius:10px;
                "
              >

                <tr>
                  <td style="
                    padding:16px;
                  ">

                    <div style="
                      margin-bottom:6px;
                      font-size:10px;
                      line-height:1.4;
                      letter-spacing:1.5px;
                      color:#71808d;
                      text-transform:uppercase;
                    ">
                      Correo
                    </div>

                    <div style="
                      font-size:15px;
                      line-height:1.5;
                      color:#6ee7ff;
                      word-break:break-word;
                    ">
                      ${safeEmail}
                    </div>

                  </td>
                </tr>

              </table>


              <!-- MENSAJE -->

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                role="presentation"
                style="
                  width:100%;
                  background-color:#0b1218;
                  border:1px solid #24313d;
                  border-radius:10px;
                "
              >

                <tr>
                  <td style="
                    padding:20px;
                  ">

                    <div style="
                      margin-bottom:12px;
                      font-size:10px;
                      line-height:1.4;
                      letter-spacing:1.5px;
                      color:#71808d;
                      text-transform:uppercase;
                    ">
                      Mensaje
                    </div>

                    <div style="
                      font-size:15px;
                      line-height:1.7;
                      color:#d7dee5;
                      white-space:pre-line;
                      word-break:break-word;
                    ">
                      ${safeMessage}
                    </div>

                  </td>
                </tr>

              </table>


              <!-- BOTÓN -->

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                role="presentation"
              >

                <tr>
                  <td
                    align="center"
                    style="
                      padding-top:28px;
                    "
                  >

                    <a
                      href="mailto:${safeEmail}"
                      style="
                        display:inline-block;
                        padding:13px 22px;
                        background-color:#6ee7ff;
                        color:#061017;
                        text-decoration:none;
                        font-size:12px;
                        line-height:1.4;
                        font-weight:700;
                        letter-spacing:.5px;
                        border-radius:7px;
                      "
                    >
                      RESPONDER AL MENSAJE
                    </a>

                  </td>
                </tr>

              </table>

            </td>
          </tr>


          <!-- FOOTER -->

          <tr>
            <td style="
              padding:22px 30px;
              background-color:#0d151c;
              border-top:1px solid #24313d;
            ">

              <div style="
                font-size:12px;
                line-height:1.5;
                font-weight:700;
                color:#ffffff;
              ">
                ANDRÉS ROMERO
              </div>

              <div style="
                margin-top:5px;
                font-size:11px;
                line-height:1.5;
                color:#71808d;
              ">
                Desarrollo Web · Automatización de Procesos
              </div>

              <div style="
                margin-top:12px;
                font-size:10px;
                line-height:1.5;
                color:#4f5d68;
              ">
                Mensaje recibido desde el formulario de contacto.
              </div>

            </td>
          </tr>

        </table>

      </td>
    </tr>

  </table>

</body>
</html>
      `,
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