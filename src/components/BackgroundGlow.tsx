import styled, { keyframes } from 'styled-components'

// Animação das esferas de luz de fundo
const floatOne = keyframes`
  0% { transform: translate(0px, 0px) scale(1); }
  50% { transform: translate(60px, 40px) scale(1.15); }
  100% { transform: translate(0px, 0px) scale(1); }
`

const floatTwo = keyframes`
  0% { transform: translate(0px, 0px) scale(1.15); }
  50% { transform: translate(-40px, 60px) scale(0.95); }
  100% { transform: translate(0px, 0px) scale(1.15); }
`

// Queda contínua e imersiva de dados (Estilo Matrix/Fintech avançado)
const techFall = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100vh);
  }
`

const GlowContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  background-color: ${props => props.theme.colors.background};
`

/* Camada da animação de tecnologia - Subimos a opacidade global para dar mais contraste */
const TechGridOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.45; /* Deixamos bem nítido para aparecer atrás do seu conteúdo */
  display: flex;
  justify-content: space-between;
  padding: 0 4%;
`

interface TechLineProps {
  delay: string;
  duration: string;
  color: string;
  glow: string;
  contentString: string;
}

const TechLine = styled.div<TechLineProps>`
  font-family: 'Courier New', Courier, monospace;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 4px;
  color: ${(props) => props.color};
  writing-mode: vertical-rl;
  text-orientation: upright; /* Garante que os caracteres fiquem perfeitamente em pé */
  text-shadow: 0 0 12px ${(props) => props.glow};
  white-space: nowrap;
  
  /* Movimento contínuo e linear de queda */
  animation: ${techFall} ${(props) => props.duration} infinite linear;
  animation-delay: ${(props) => props.delay};
  transform: translateY(-100%);

  /* Injeta blocos densos de dados e finanças */
  &::before {
    content: "${(props) => props.contentString}";
  }
`

// Esferas de luz sutilmente ajustadas para dar contraste por trás do código
const BlueBlobOne = styled.div`
  position: absolute;
  top: -5%;
  right: -5%;
  width: 600px;
  height: 600px;
  background: rgba(30, 144, 255, 0.4);
  border-radius: 50%;
  filter: blur(150px);
  animation: ${floatOne} 20s infinite ease-in-out;
`

const BlueBlobTwo = styled.div`
  position: absolute;
  bottom: 10%;
  left: -5%;
  width: 650px;
  height: 650px;
  background: rgba(0, 191, 255, 0.35);
  border-radius: 50%;
  filter: blur(170px);
  animation: ${floatTwo} 25s infinite ease-in-out;
`

export function BackgroundGlow() {
  return (
    <GlowContainer>
      {/* Esferas de luz de fundo */}
      <BlueBlobOne />
      <BlueBlobTwo />

      {/* Grid Denso de Tecnologia e Cifrões caindo em ritmos diferentes */}
      <TechGridOverlay>
        <TechLine duration="16s" delay="0s" color="#00bfff" glow="rgba(0,191,255,0.6)" contentString="101001010101010" />
        <TechLine duration="22s" delay="4s" color="#D6AF37" glow="rgba(214,175,55,0.5)" contentString="$$$$$$$$$$$$$$$" />
        <TechLine duration="14s" delay="2s" color="#00bfff" glow="rgba(0,191,255,0.6)" contentString="CODE//SCALE//PROFIT" />
        <TechLine duration="26s" delay="7s" color="rgba(255,255,255,0.3)" glow="transparent" contentString="01011100101001" />
        <TechLine duration="18s" delay="1s" color="#D6AF37" glow="rgba(214,175,55,0.5)" contentString="$100$500$10k$50k" />
        <TechLine duration="20s" delay="5s" color="#00bfff" glow="rgba(0,191,255,0.6)" contentString="000111000111000" />
        <TechLine duration="15s" delay="3s" color="#D6AF37" glow="rgba(214,175,55,0.5)" contentString="$$$$$$010101$$$$" />
        <TechLine duration="24s" delay="8s" color="#00bfff" glow="rgba(0,191,255,0.6)" contentString="DEV//SYSTEMS//GROW" />
        <TechLine duration="19s" delay="6s" color="rgba(255,255,255,0.2)" glow="transparent" contentString="111000111000111" />
      </TechGridOverlay>
    </GlowContainer>
  )
}