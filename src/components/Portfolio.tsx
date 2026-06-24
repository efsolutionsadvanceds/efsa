import React, { useState, useEffect, useCallback } from 'react'
import styled, { keyframes, css } from 'styled-components'

// ==========================================
// 1. BANCO DE DADOS DOS "LUTADORES" (PROJETOS)
// ==========================================

interface ProjectStats {
  speed: number;      // 0 a 100
  conversion: number; // 0 a 100
  power: number;      // 0 a 100
}

interface ProjectData {
  id: string;
  name: string;
  alias: string; // Subtítulo estilo jogo
  description: string;
  techs: string[];
  stats: ProjectStats;
}

const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'p1',
    name: 'Landing Page Premium',
    alias: 'The Conversion Machine',
    description: 'Arquitetura de alta conversão focada no mercado corporativo e infoprodutos. Estruturada para capturar leads com eficiência implacável.',
    techs: ['React', 'Next.js', 'Framer Motion'],
    stats: { speed: 95, conversion: 98, power: 85 }
  },
  {
    id: 'p2',
    name: 'Dashboard Automatizado',
    alias: 'The Data Controller',
    description: 'Sistema interno web que centraliza dados operacionais, gerando relatórios em tempo real e poupando centenas de horas manuais.',
    techs: ['TypeScript', 'Node.js', 'PostgreSQL'],
    stats: { speed: 85, conversion: 80, power: 100 }
  },
  {
    id: 'p3',
    name: 'E-commerce High Performance',
    alias: 'The Revenue Engine',
    description: 'Plataforma de vendas ultraveloz, integrada com gateways de pagamento seguros e conciliação de PIX totalmente automatizada.',
    techs: ['Stripe', 'React', 'AWS'],
    stats: { speed: 90, conversion: 95, power: 90 }
  },
  {
    id: 'p4',
    name: 'SaaS Multi-tenant',
    alias: 'The Scalable Titan',
    description: 'Infraestrutura em nuvem preparada para receber milhares de usuários simultâneos com isolamento de banco de dados.',
    techs: ['Docker', 'Kubernetes', 'Prisma'],
    stats: { speed: 88, conversion: 85, power: 98 }
  }
]

// ==========================================
// 2. ANIMAÇÕES (VFX ARCADE)
// ==========================================

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`

const scanlines = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 0 100%; }
`

const fillBar = (percent: number) => keyframes`
  from { width: 0%; }
  to { width: ${percent}%; }
`

const glitch = keyframes`
  0% { transform: translate(0) }
  20% { transform: translate(-2px, 2px) }
  40% { transform: translate(-2px, -2px) }
  60% { transform: translate(2px, 2px) }
  80% { transform: translate(2px, -2px) }
  100% { transform: translate(0) }
`

// ==========================================
// 3. COMPONENTES ESTILIZADOS
// ==========================================

const ArcadeContainer = styled.section`
  position: relative;
  padding: 80px 8%;
  background-color: #050810;
  border-top: 1px solid rgba(255, 255, 255, 0.03);
  font-family: 'Courier New', Courier, monospace; /* Trazendo o ar retro/terminal */
  overflow: hidden;

  /* Efeito Global de Tela CRT */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%);
    background-size: 100% 4px;
    z-index: 10;
    pointer-events: none;
    animation: ${scanlines} 10s linear infinite;
    opacity: 0.15;
  }
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  z-index: 2;
`

const SelectTitle = styled.h2`
  font-size: 32px;
  font-weight: 900;
  text-transform: uppercase;
  color: #FFFFFF;
  letter-spacing: 4px;
  text-shadow: 0 0 10px rgba(214, 175, 55, 0.5);

  span {
    color: #D6AF37;
  }

  /* Efeito de "Insert Coin" piscando embaixo do título */
  &::after {
    content: 'ESCOLHA UMA SOLUÇÃO';
    display: block;
    font-size: 14px;
    color: #D6AF37;
    margin-top: 12px;
    animation: ${blink} 1.5s infinite;
  }
`

const GameEngineLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  position: relative;
  z-index: 2;

  @media (min-width: 968px) {
    grid-template-columns: 1.2fr 0.8fr;
    align-items: end;
  }
`

// --- ÁREA ESQUERDA: O "LUTADOR" (DETALHES DO PROJETO) ---

const FighterStage = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 2px solid #2A2F42;
  border-radius: 8px;
  padding: 40px;
  position: relative;
  height: 100%;
  box-shadow: inset 0 0 40px rgba(0,0,0,0.8);
`

const FighterName = styled.h3`
  font-size: 36px;
  font-weight: 900;
  color: #FFFFFF;
  margin-bottom: 4px;
  text-transform: uppercase;
`

const FighterAlias = styled.h4`
  font-size: 16px;
  color: #D6AF37;
  margin-bottom: 24px;
  letter-spacing: 2px;
`

const FighterDesc = styled.p`
  font-size: 16px;
  color: #94A3B8;
  line-height: 1.6;
  margin-bottom: 32px;
  min-height: 80px;
`

const TechTags = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 40px;

  span {
    background: rgba(214, 175, 55, 0.1);
    border: 1px solid rgba(214, 175, 55, 0.3);
    color: #D6AF37;
    padding: 6px 12px;
    font-size: 12px;
    font-weight: bold;
    border-radius: 4px;
    text-transform: uppercase;
  }
`

const StatsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const StatRow = styled.div<{ $val: number }>`
  display: flex;
  align-items: center;
  gap: 16px;

  .label {
    width: 100px;
    font-size: 14px;
    color: #FFFFFF;
    font-weight: bold;
    text-transform: uppercase;
  }

  .bar-bg {
    flex: 1;
    height: 12px;
    background: #1A1F32;
    border: 1px solid #2A2F42;
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: linear-gradient(90deg, #B89324 0%, #D6AF37 100%);
      width: ${props => props.$val}%;
      animation: ${props => fillBar(props.$val)} 0.5s ease-out forwards;
    }
  }
`

// --- ÁREA DIREITA: O ROSTER (GRADE DE SELEÇÃO) ---

const RosterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (min-width: 576px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const RosterCard = styled.button<{ $isActive: boolean }>`
  background: ${props => props.$isActive ? 'rgba(214, 175, 55, 0.1)' : '#0D1323'};
  border: 2px solid ${props => props.$isActive ? '#D6AF37' : '#1A1F32'};
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 16px;

  h5 {
    color: ${props => props.$isActive ? '#FFFFFF' : '#64748B'};
    font-size: 14px;
    font-weight: 700;
  }

  &:hover {
    border-color: #D6AF37;
    background: rgba(214, 175, 55, 0.05);
  }

  ${props => props.$isActive && css`
    box-shadow: 0 0 20px rgba(214, 175, 55, 0.3), inset 0 0 10px rgba(214, 175, 55, 0.2);
    
    /* Etiqueta P1 piscando no item selecionado */
    &::before {
      content: '1P';
      position: absolute;
      top: -12px;
      left: -12px;
      background: #E11D48;
      color: white;
      font-size: 12px;
      font-weight: 900;
      padding: 4px 8px;
      border: 2px solid #FFFFFF;
      animation: ${blink} 1s infinite;
      z-index: 5;
    }
  `}
`

// ==========================================
// 4. COMPONENTE PRINCIPAL (MOTOR DO JOGO)
// ==========================================

export function Portfolio() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const activeProject = PROJECTS_DATA[selectedIndex]

  // Controle de Navegação Estilo Arcade (Teclado)
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % PROJECTS_DATA.length)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <ArcadeContainer id="portfolio">
      <Header>
        <SelectTitle>
          Soluções validadas no <span>Mercado</span>
        </SelectTitle>
      </Header>

      <GameEngineLayout>
        
        {/* LADO ESQUERDO: O PROJETO (LUTADOR) SELECIONADO */}
        <FighterStage key={activeProject.id}> {/* O key força a re-animação ao trocar */}
          <FighterName>{activeProject.name}</FighterName>
          <FighterAlias>{activeProject.alias}</FighterAlias>
          <FighterDesc>{activeProject.description}</FighterDesc>
          
          <TechTags>
            {activeProject.techs.map(tech => (
              <span key={tech}>{tech}</span>
            ))}
          </TechTags>

          <StatsGrid>
            <StatRow $val={activeProject.stats.speed}>
              <div className="label">SPEED</div>
              <div className="bar-bg"></div>
            </StatRow>
            <StatRow $val={activeProject.stats.conversion}>
              <div className="label">CONVERSION</div>
              <div className="bar-bg"></div>
            </StatRow>
            <StatRow $val={activeProject.stats.power}>
              <div className="label">POWER</div>
              <div className="bar-bg"></div>
            </StatRow>
          </StatsGrid>
        </FighterStage>

        {/* LADO DIREITO: A GRADE DE SELEÇÃO (ROSTER) */}
        <RosterGrid>
          {PROJECTS_DATA.map((project, index) => (
            <RosterCard 
              key={project.id}
              $isActive={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
            >
              <h5>{project.name}</h5>
            </RosterCard>
          ))}
        </RosterGrid>

      </GameEngineLayout>
    </ArcadeContainer>
  )
}