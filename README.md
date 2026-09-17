# Portafolio — Andrés Romero

Portafolio personal construido con **React + Vite + Tailwind CSS**. Incluye:

- Toggle de tema día/noche (persistido en `localStorage`)
- Traducción ES/EN en vivo (persistida en `localStorage`)
- Fondo animado tipo red de partículas (respeta `prefers-reduced-motion`)
- Sección "Sobre mí", stack técnico agrupado, 3 proyectos destacados
- Contacto con email, WhatsApp, GitHub, LinkedIn y un formulario que **envía
  el mensaje directo a tu Gmail** vía una función serverless de Vercel
  (`api/contact.js`) usando una contraseña de aplicación de Gmail
- Fondo de partículas interactivo: reaccionan al pasar el mouse (o el dedo
  en móvil)

## Antes de desplegar

**1. WhatsApp.** Edita `src/data/profile.js` y reemplaza el número de ejemplo:

```js
whatsapp: '56900000000',        // <- tu número real, sin +, sin espacios
whatsappDisplay: '+56 9 0000 0000', // <- cómo se muestra en pantalla
```

**2. Contraseña de aplicación de Gmail (para recibir los mensajes del formulario).**

El formulario de contacto envía el correo desde una función serverless
(`api/contact.js`), no desde el navegador — así tu contraseña nunca queda
expuesta en el código público del sitio.

1. Activa la verificación en dos pasos en tu cuenta de Google (requisito).
2. Ve a [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   y genera una contraseña de aplicación (elige "Otra" y ponle un nombre
   como "Portafolio").
3. Copia el código de 16 caracteres que te entrega Google.
4. En Vercel → tu proyecto → **Settings → Environment Variables**, agrega:
   - `GMAIL_USER` = tu correo de Gmail (ej. `andespart.ar@gmail.com`)
   - `GMAIL_APP_PASSWORD` = el código de 16 caracteres (sin espacios)
5. Vuelve a desplegar el proyecto para que tome las variables nuevas.

**Nunca** pongas estas credenciales directamente en el código ni las subas
a GitHub — solo van como variables de entorno.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`. El formulario de contacto necesita la función
serverless, que Vite por sí solo no ejecuta. Para probarlo localmente:

```bash
npm install -g vercel
cp .env.example .env.local   # y completa tus credenciales reales ahí
vercel dev
```

`vercel dev` sirve tanto el frontend como `api/contact.js` en un solo
servidor local.

## Build de producción

```bash
npm run build
npm run preview   # para probar el build localmente
```

## Desplegar en Vercel

**Opción A — desde la web de Vercel:**
1. Sube esta carpeta a un repositorio de GitHub.
2. En [vercel.com](https://vercel.com) → "Add New Project" → importa el repo.
3. Vercel detecta Vite automáticamente (Build Command: `vite build`, Output
   Directory: `dist`). Solo confirma y despliega.

**Opción B — desde la terminal:**
```bash
npm install -g vercel
vercel
```
Sigue las instrucciones; en despliegues siguientes usa `vercel --prod`.

## Estructura

```
src/
  components/   Header, Hero, About, Stack, Projects, Contact, Footer, icons, fondo animado
  context/      ThemeContext (día/noche), LangContext (ES/EN)
  data/         profile.js — stack técnico, proyectos y datos de contacto
  i18n/         translations.js — diccionario ES/EN
```

Para agregar un proyecto nuevo: añade una entrada en `projects` (en
`src/data/profile.js`) y su texto correspondiente en
`src/i18n/translations.js` (bajo `projects.<id>`).
