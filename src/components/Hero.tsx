import React from 'react'
import styled, { keyframes } from 'styled-components'
import { trackCTAEvent } from '../services/analytics'
import heroAnimation from '../assets/hero-animation.json'
import LottieRaw from 'lottie-react'

const Lottie = (LottieRaw as any).default || LottieRaw

// ==========================================
// ANIMAÇÕES E KEYFRAMES
// ==========================================

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

// Efeito sênior: a letra rotaciona levemente e sobe limpando a opacidade
const charReveal = keyframes`
  from {
    transform: translateY(110%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const textGlow = keyframes`
  0%, 100% {
    text-shadow: 0 0 0px rgba(214, 175, 55, 0);
    filter: brightness(1);
  }
  50% {
    text-shadow: 0 0 15px rgba(214, 175, 55, 0.2);
    filter: brightness(1.05);
  }
`

const floatingButton = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
`

const shimmerEffect = keyframes`
  0% { left: -150%; }
  50%, 100% { left: 150%; }
`

// ==========================================
// COMPONENTES ESTILIZADOS
// ==========================================

const HeroContainer = styled.section`
  min-height: 90vh;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  padding: 40px 8%;
  gap: 40px;

  @media (min-width: 968px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const Tag = styled.span`
  position: relative; 
  overflow: hidden;   
  align-self: flex-start;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.border};
  padding: 6px 16px;
  border-radius: 20px;
  background: rgba(214, 175, 55, 0.05);
  
  animation: ${fadeInUp} 0.6s ease forwards;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -150%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.25) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-20deg); 
    animation: ${shimmerEffect} 4s infinite linear 1s; 
  }
`

const Headline = styled.h2`
  font-size: 38px;
  font-weight: 800;
  line-height: 1.2;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease 0.2s forwards;

  @media (min-width: 576px) {
    font-size: 54px;
  }
`

// Estruturas de controle para o efeito das letras
const WordBlock = styled.span`
  display: inline-block;
  white-space: nowrap;
`

const CharMask = styled.span`
  display: inline-block;
  overflow: hidden; /* Garante que a letra suba mascarada pelo limite da linha */
  vertical-align: bottom;
`

const HighlightedChar = styled.span<{ $delay: number }>`
  display: inline-block;
  color: ${props => props.theme.colors.primary};
  font-weight: 850;
  transform: translateY(110%);
  opacity: 0;
  animation: 
    ${charReveal} 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards,
    ${textGlow} 3s infinite ease-in-out 1.5s;
  animation-delay: ${props => props.$delay}s, 1.5s;
`

const Subheadline = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: ${props => props.theme.colors.textSecondary};
  max-width: 540px;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease 0.4s forwards;
`

const CTAButton = styled.a`
  align-self: flex-start;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, #B89324 100%);
  color: #FFFFFF;
  font-weight: 900;
  font-size: 20px;
  letter-spacing: 0.5px;
  padding: 20px 44px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(214, 175, 55, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  
  transition: 
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
    box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
    filter 0.3s ease;
  
  opacity: 0;
  position: relative;
  overflow: hidden;

  animation: 
    ${fadeInUp} 0.6s ease 0.6s forwards,
    ${floatingButton} 5s infinite ease-in-out 1.2s;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transition: left 0.6s ease;
  }

  &:hover {
    animation-play-state: paused; 
    transform: translateY(-8px); 
    transition: easy 0.3s;
    filter: brightness(1.1);
    box-shadow: 0 12px 25px rgba(214, 175, 55, 0.45);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 15px rgba(214, 175, 55, 0.3);
  }
`

const VisualBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  opacity: 0;
  animation: ${fadeInUp} 0.8s ease 0.5s forwards;
`

// ==========================================
// ENGINE DE SPLIT TEXT
// ==========================================

const renderSplitText = (targetText: string, delayOffset: number = 0.4) => {
  const words = targetText.split(' ')
  let charCounter = 0

  return words.map((word, wordIdx) => (
    <WordBlock key={wordIdx}>
      {word.split('').map((char, charIdx) => {
        charCounter++
        return (
          <CharMask key={charIdx}>
            {/* Transient prop '$delay' usada corretamente para evitar problemas no DOM */}
            <HighlightedChar $delay={delayOffset + charCounter * 0.03}>
              {char}
            </HighlightedChar>
          </CharMask>
        )
      })}
      {/* Insere o espaçamento correto entre blocos de palavras */}
      {wordIdx < words.length - 1 && <span>&nbsp;</span>}
    </WordBlock>
  ))
}

// ==========================================
// COMPONENTE PRINCIPAL RENDER
// ==========================================

export function Hero() {
  return (
    <HeroContainer>
      <TextBlock>
        <Tag>E.F Solutions Advanced's</Tag>
        <Headline>
          Transformamos linhas de código em {renderSplitText("lucro e escala")} para o seu negócio.
        </Headline>
        <Subheadline>
          Engenharia de Software de alta performance aliada ao Tráfego Pago estratégico. Criamos sistemas inteligentes que economizam seu tempo e Landing Pages que vendem por você.
        </Subheadline>
        <CTAButton 
          href="https://api.whatsapp.com/send?phone=5511967873507" 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={() => trackCTAEvent('Hero CTA')}
        >
          Quero Escalar Meu Negócio
        </CTAButton>
      </TextBlock>

      <VisualBlock>
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <Lottie 
            animationData={heroAnimation} 
            loop={true} 
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </VisualBlock>
    </HeroContainer>
  )
}