import { ThemeProvider } from 'styled-components'
import { Helmet } from 'react-helmet-async'
import { theme } from './styles/theme'
import { GlobalStyle } from './styles/global'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { About } from './components/About'
import { Portfolio } from './components/Portfolio'
import { Security } from './components/Security'
import { ContactForm } from './components/ContactForm'
import { Footer } from './components/Footer'
import { BackgroundGlow } from './components/BackgroundGlow'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      
      <Helmet>
        <title>EFSA | Engenharia de Software & LPs de Alta Conversão</title>
        <meta name="description" content="Transformamos processos manuais em sistemas inteligentes e cliques em clientes. LPs de alta performance e tráfego pago estratégico com Edgard Felix." />
        <meta property="og:title" content="E.F Solutions Advanced's | Engenharia de Software" />
        <meta property="og:description" content="Sistemas inteligentes que economizam horas de trabalho e Landing Pages de alto impacto." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </Helmet>

      <BackgroundGlow />

      <main>
        <Hero />
        <Services />
        <About />
        <Portfolio />
        <Security />
        <ContactForm />
      </main>

      <Footer />
    </ThemeProvider>
  )
}