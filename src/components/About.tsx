import React, { useEffect, useState, useRef } from 'react'
import styled, { keyframes, css } from 'styled-components'
import logoImg from '../assets/logomarca.png'

// ==========================================
// 1. TIMINGS E ANIMAÇÕES CORE
// ==========================================

const EASE_OUT_EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)'

const panelReveal = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`

const textReveal = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const ambientPulse = keyframes`
  0%, 100% { opacity: 0.15; }
  50% { opacity: 0.3; }
`

// ==========================================
// 2. COMPONENTES ESTRUTURAIS
// ==========================================

const AboutContainer = styled.section`
  position: relative;
  padding: 140px 8%;
  background-color: transparent;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 64px;
  border-top: 1px solid rgba(255, 255, 255, 0.03);
  overflow: hidden;

  @media (min-width: 968px) {
    grid-template-columns: 0.9fr 1.1fr;
    gap: 80px;
  }
`

// Iluminação técnica de fundo para destacar o painel da logo
const SubtleSpotlight = styled.div`
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(214, 175, 55, 0.06) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  animation: ${ambientPulse} 6s infinite ease-in-out;
`

// ==========================================
// 3. PAINEL DE MARCA (CONTRAPARTIDA VISUAL)
// ==========================================

const LogoPanel = styled.div<{ $isVisible: boolean }>`
  position: relative;
  width: 100%;
  max-width: 520px;
  /* Inteligência de Design: Mantém a proporção exata da sua imagem (1024x580) */
  aspect-ratio: 1024 / 580; 
  justify-self: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.01) 0%, rgba(255, 255, 255, 0.03) 100%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  
  opacity: 0;
  ${props => props.$isVisible && css`
    animation: ${panelReveal} 1s ${EASE_OUT_EXPO} forwards;
  `}

  /* Linhas de canto estilo "Blueprint de Engenharia" */
  &::before {
    content: '';
    position: absolute;
    inset: 12px;
    border: 1px dashed rgba(214, 175, 55, 0.15);
    border-radius: 16px;
    pointer-events: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5)) brightness(1.05);
    transition: transform 0.5s ${EASE_OUT_EXPO};
  }

  &:hover img {
    transform: scale(1.03);
  }
`

// ==========================================
// 4. CONTEÚDO E CHASSI TIPOGRÁFICO
// ==========================================

const ContentBlock = styled.div<{ $isVisible: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 28px;
  z-index: 1;
  
  opacity: 0;
  ${props => props.$isVisible && css`
    animation: ${textReveal} 0.8s ${EASE_OUT_EXPO} 0.2s forwards;
  `}
`

const DirectorBadge = styled.span`
  align-self: flex-start;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #D6AF37;
  background: rgba(214, 175, 55, 0.08);
  border: 1px solid rgba(214, 175, 55, 0.2);
  padding: 6px 14px;
  border-radius: 6px;
`

const Title = styled.h2`
  font-size: 36px;
  font-weight: 800;
  line-height: 1.15;
  color: #FFFFFF;
  letter-spacing: -0.5px;
  margin: 0;
  
  span {
    color: transparent;
    background-image: linear-gradient(135deg, #D6AF37 0%, #F5E0A3 100%);
    -webkit-background-clip: text;
    background-clip: text;
  }

  @media (min-width: 768px) {
    font-size: 46px;
  }
`

const DescriptionText = styled.p`
  font-size: 17px;
  line-height: 1.75;
  color: #94A3B8;
  margin: 0;

  strong {
    color: #F8FAFC;
    font-weight: 600;
  }
`

// ==========================================
// 5. GRID DE PERFORMANCE (MÉTRICAS)
// ==========================================

const MetricsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 32px;
`

const MetricItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .value {
    font-size: 24px;
    font-weight: 800;
    color: #FFFFFF;
    font-family: system-ui, -apple-system, sans-serif;
  }

  .label {
    font-size: 13px;
    color: #64748B;
    font-weight: 500;
  }
`

// ==========================================
// 6. ENGINE DE INTERSECÇÃO (HOOK)
// ==========================================

function useAboutReveal() {
  const [hasRevealed, setHasRevealed] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true)
          if (elementRef.current) observer.unobserve(elementRef.current)
        }
      },
      { threshold: 0.15 }
    )

    if (elementRef.current) observer.observe(elementRef.current)
    return () => observer.disconnect()
  }, [])

  return { elementRef, hasRevealed }
}

// ==========================================
// 7. COMPONENTE DE PRODUÇÃO EXPORTADO
// ==========================================

export function About() {
  const { elementRef, hasRevealed } = useAboutReveal()

  return (
    <AboutContainer ref={elementRef} id="sobre">
      <SubtleSpotlight />

      <LogoPanel $isVisible={hasRevealed}>
        <img 
          src={logoImg} 
          alt="Logomarca oficial da E.F Solutions Advanced's" 
          loading="lazy"
        />
      </LogoPanel>

      <ContentBlock $isVisible={hasRevealed}>
        <DirectorBadge>Engenharia de Direção</DirectorBadge>
        
        <Title>
          Código robusto. <br />
          <span>Estratégia agressiva.</span>
        </Title>
        
        <DescriptionText>
          Liderada por Edgard Felix, Engenheiro de Software, a <strong>E.F Solutions Advanced's</strong> nasceu para quebrar o ciclo de promessas vazias e amadorismo do mercado digital de conversão.
        </DescriptionText>
        
        <DescriptionText>
          Unimos o rigor matemático da engenharia clássica, arquiteturas de infraestrutura sob demanda inabaláveis e a inteligência preditiva de dados do tráfego pago. Não entregamos apenas páginas soltas no ecossistema; estruturamos sistemas blindados, velozes e milimetricamente calibrados para tracionar acessos e convertê-los em faturamento previsível para a sua marca.
        </DescriptionText>

        <MetricsRow>
          <MetricItem>
            <span className="value">Sub 1s</span>
            <span className="label">Tempo médio de resposta de LPs</span>
          </MetricItem>
          <MetricItem>
            <span className="value">100%</span>
            <span className="label">Engenharia orientada a dados</span>
          </MetricItem>
        </MetricsRow>
      </ContentBlock>
    </AboutContainer>
  )
}