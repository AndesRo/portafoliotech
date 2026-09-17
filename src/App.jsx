import { ThemeProvider } from './context/ThemeContext'
import { LangProvider } from './context/LangContext'
import ParticleBackground from './components/ParticleBackground'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Stack from './components/Stack'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <ParticleBackground />
        <Header />
        <main className="max-w-[1080px] mx-auto px-6 relative z-[1]" id="top">
          <Hero />
          <About />
          <Stack />
          <Projects />
          <Contact />
        </main>
        <div className="relative z-[1]">
          <Footer />
        </div>
      </LangProvider>
    </ThemeProvider>
  )
}
