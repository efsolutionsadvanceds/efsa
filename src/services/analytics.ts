import ReactGA from 'react-ga4'

// Substitua pelo seu ID de Medição real do Google Analytics quando o tiver
const GA_TRACKING_ID = 'G-XXXXXXXXXX' 

export const initAnalytics = () => {
  // import.meta.env.PROD verifica se o projeto está rodando em produção no Vite
  if (import.meta.env.PROD && GA_TRACKING_ID !== 'G-XXXXXXXXXX') {
    ReactGA.initialize(GA_TRACKING_ID)
  }
}

export const trackPageView = (path: string) => {
  if (import.meta.env.PROD) {
    ReactGA.send({ hitType: 'pageview', page: path })
  }
}

export const trackCTAEvent = (buttonName: string) => {
  if (import.meta.env.PROD) {
    ReactGA.event({
      category: 'Conversão',
      action: `Clique: ${buttonName}`,
      label: 'Tráfego LP',
    })
  }
}