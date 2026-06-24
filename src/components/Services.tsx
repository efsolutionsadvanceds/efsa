import React, { useRef, useState, useEffect } from 'react'
import styled, { keyframes, css } from 'styled-components'

// ==========================================
// 1. TIPAGENS (TYPESCRIPT STRICT)
// ==========================================

interface ServiceItem {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

interface SpotlightProps {
  $mouseX: number
  $mouseY: number
}

// ==========================================
// 2. DADOS DA SEÇÃO (ESCALABILIDADE)
// ==========================================
// Separar os dados do JSX permite buscar isso de um CMS (Headless) no futuro sem alterar o componente.

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'lps-conversao',
    title: 'LPs de Alta Conversão',
    description: 'Desenvolvemos Landing Pages ultra-velozes focadas em Core Web Vitals, transformando visitantes frios em clientes qualificados.',
    icon: 'fas fa-rocket',
    features: ['Tempo de carregamento < 1s', 'Otimização SEO On-Page', 'Copywriting persuasivo integrado']
  },
  {
    id: 'sistemas-inteligentes',
    title: 'Sistemas Inteligentes',
    description: 'Engenharia de software sob medida para eliminar gargalos manuais e automatizar a operação do seu negócio de ponta a ponta.',
    icon: 'fas fa-code',
    features: ['Arquitetura escalável (Cloud)', 'Integração com APIs externas', 'Dashboards de métricas em tempo real']
  },
  {
    id: 'trafego-estrategico',
    title: 'Tráfego Estratégico',
    description: 'Gestão de mídia paga orientada a dados (Data-Driven). Colocamos o seu ecossistema perfeito na frente do comprador ideal.',
    icon: 'fas fa-chart-line',
    features: ['Gestão de Meta & Google Ads', 'Rastreamento avançado (Pixel/API)', 'Otimização de ROAS e CAC']
  }
]

// ==========================================
// 3. ANIMAÇÕES (TIMING E EASING PREMIUM)
// ==========================================

const revealUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const pulseGlow = keyframes`
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
`

// ==========================================
// 4. COMPONENTES ESTILIZADOS
// ==========================================

// Animação sutil de deslocamento para dar vida aos cubos digitais
const gridFlow = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 120px 208px; /* Sincronizado perfeitamente com o tamanho do padrão SVG */
  }
`

const SectionWrapper = styled.section`
  position: relative;
  padding: 120px 8%;
  background-color: #0A0F1D; /* Fundo base escuro e sofisticado */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* Camada do Padrão de Cubos Isométricos */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    opacity: 0.4; /* Controle fino de opacidade geral das linhas */
    
    /* SVG Isométrico matemático puro gerando a malha de cubos com linhas douradas ultra-finas */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='207.84' viewBox='0 0 120 207.84'%3E%3Cpath d='M60 0L120 34.64v69.28L60 138.56L0 103.92V34.64V34.64z M60 0v138.56 M0 34.64l60 34.64l60-34.64 M0 103.92l60-34.64l60 34.64' stroke='rgba(214, 175, 55, 0.12)' stroke-width='1' fill='none'/%3E%3Cpath d='M60 207.84L120 173.2v-69.28l-60-34.64L0 103.92v69.28z M60 207.84v-138.56 M0 173.2l60-34.64l60 34.64' stroke='rgba(214, 175, 55, 0.12)' stroke-width='1' fill='none'/%3E%3C/svg%3E");
    
    /* Máscara radial técnica: os cubos somem suavemente no centro (onde fica o texto) e aparecem nas bordas */
    mask-image: radial-gradient(circle at 50% 50%, transparent 20%, black 85%);
    -webkit-mask-image: radial-gradient(circle at 50% 50%, transparent 20%, black 85%);
    
    /* Movimento micro-controlado contínuo */
    animation: ${gridFlow} 40s linear infinite;
    pointer-events: none;
  }

  /* Ajuste de empilhamento para os elementos filhos não sumirem atrás do background */
  & > * {
    position: relative;
    z-index: 1;
  }
`

// Blob de luz de fundo para dar profundidade ao layout
const BackgroundGlow = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(214, 175, 55, 0.05) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  animation: ${pulseGlow} 8s infinite ease-in-out;
`

const ContentContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1280px;
  z-index: 1;
`

const HeaderSection = styled.header<{ $isVisible: boolean }>`
  text-align: center;
  margin-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  opacity: 0;
  ${props => props.$isVisible && css`
    animation: ${revealUp} 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  `}
`

const PreTitleBadge = styled.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: #D6AF37;
  background: rgba(214, 175, 55, 0.1);
  border: 1px solid rgba(214, 175, 55, 0.2);
  padding: 6px 16px;
  border-radius: 100px;
  margin-bottom: 24px;
`

const MainTitle = styled.h2`
  font-size: 36px;
  font-weight: 800;
  color: #FFFFFF;
  margin-bottom: 20px;
  letter-spacing: -0.5px;

  span {
    color: transparent;
    background-image: linear-gradient(135deg, #D6AF37 0%, #F3D98A 100%);
    -webkit-background-clip: text;
    background-clip: text;
  }

  @media (min-width: 768px) { font-size: 48px; }
`

const SubTitle = styled.p`
  font-size: 18px;
  color: #94A3B8;
  max-width: 600px;
  line-height: 1.6;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 32px;

  @media (min-width: 768px) { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: 1100px) { grid-template-columns: repeat(3, 1fr); }
`

// ==========================================
// ESTILOS DO CARD COM SPOTLIGHT MOUSE TRACKING
// ==========================================

const CardWrapper = styled.article<{ $isVisible: boolean; $delay: number }>`
  position: relative;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  padding: 1px; /* Espaço para o border-gradient */
  overflow: hidden;
  opacity: 0;
  
  ${props => props.$isVisible && css`
    animation: ${revealUp} 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: ${props.$delay}s;
  `}
`

const CardContent = styled.div`
  position: relative;
  background: #0D1323;
  height: 100%;
  border-radius: 19px;
  padding: 40px 32px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
`

const SpotlightBorder = styled.div<SpotlightProps>`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: radial-gradient(
    600px circle at ${props => props.$mouseX}px ${props => props.$mouseY}px,
    rgba(214, 175, 55, 0.4),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 0.3s ease;

  ${CardWrapper}:hover & {
    opacity: 1;
  }
`

const IconContainer = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: rgba(214, 175, 55, 0.1);
  border: 1px solid rgba(214, 175, 55, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 28px;
  transition: all 0.3s ease;

  i {
    font-size: 24px;
    color: #D6AF37;
  }

  ${CardWrapper}:hover & {
    transform: scale(1.1) translateY(-5px);
    background: rgba(214, 175, 55, 0.15);
    box-shadow: 0 10px 20px rgba(214, 175, 55, 0.2);
  }
`

const CardTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
`

const CardDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #94A3B8;
  margin-bottom: 32px;
  flex-grow: 1;
`

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const FeatureItem = styled.li`
  font-size: 14px;
  color: #CBD5E1;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '✓';
    color: #D6AF37;
    font-weight: 800;
    font-size: 12px;
  }
`

// ==========================================
// 5. HOOKS E LÓGICA DE COMPONENTES
// ==========================================

// Hook customizado para disparar animações apenas quando o elemento entra na tela
function useScrollReveal(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Uma vez visível, paramos de observar para não repetir a animação atoa
          if (ref.current) observer.unobserve(ref.current)
        }
      },
      { threshold }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

// Sub-componente da Carta para isolar a lógica do Mouse Tracking (Spotlight)
function ServiceCard({ item, delay, isSectionVisible }: { item: ServiceItem; delay: number; isSectionVisible: boolean }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <CardWrapper 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      $isVisible={isSectionVisible}
      $delay={delay}
    >
      <SpotlightBorder $mouseX={mousePos.x} $mouseY={mousePos.y} />
      <CardContent>
        <IconContainer>
          <i className={item.icon} aria-hidden="true"></i>
        </IconContainer>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
        
        <FeatureList>
          {item.features.map((feature, idx) => (
            <FeatureItem key={idx}>{feature}</FeatureItem>
          ))}
        </FeatureList>
      </CardContent>
    </CardWrapper>
  )
}

// ==========================================
// 6. COMPONENTE PRINCIPAL EXPORTADO
// ==========================================

export function Services() {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.15)

  return (
    <SectionWrapper ref={sectionRef} id="servicos">
      <BackgroundGlow />
      
      <ContentContainer>
        <HeaderSection $isVisible={isVisible}>
          <PreTitleBadge>Nosso Ecossistema</PreTitleBadge>
          <MainTitle>Engenharia focada em <span>Resultados</span></MainTitle>
          <SubTitle>
            Não vendemos apenas código ou cliques. Construímos infraestruturas digitais 
            feitas para escalar o faturamento da sua operação com previsibilidade.
          </SubTitle>
        </HeaderSection>
        
        <Grid>
          {SERVICES_DATA.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              item={service} 
              delay={0.2 + (index * 0.15)} // Delay progressivo para efeito "cascata"
              isSectionVisible={isVisible}
            />
          ))}
        </Grid>
      </ContentContainer>
    </SectionWrapper>
  )
}