import React from 'react'
import styled, { keyframes } from 'styled-components'
import founderImg from '../assets/founder.png' // Adicione sua foto aqui

// ==========================================
// 1. ANIMAÇÕES VISUAIS
// ==========================================

const pulseStatus = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.4; }
`

// ==========================================
// 2. COMPONENTES ESTRUTURAIS
// ==========================================

const FooterContainer = styled.footer`
  background-color: #050811; /* Sutilmente mais escuro que as seções principais */
  border-top: 1px solid rgba(255, 255, 255, 0.03);
  padding: 80px 8% 40px 8%;
  display: flex;
  flex-direction: column;
  gap: 48px;
  position: relative;
  overflow: hidden;
`

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  align-items: flex-start;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;

  @media (min-width: 968px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`

// --- BLOCO ESQUERDO: FOUNDER PROFILE ARCHITECTURE ---

const FounderProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const AvatarWrapper = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #D6AF37 0%, #0A0F1D 100%);
  padding: 2px; /* Moldura fina dourada */
  flex-shrink: 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    background-color: #0A0F1D;
  }
`

const FounderMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .name {
    font-size: 18px;
    font-weight: 700;
    color: #FFFFFF;
    letter-spacing: -0.3px;
  }

  .role {
    font-family: monospace;
    font-size: 13px;
    color: #64748B;
    
    span {
      color: #D6AF37;
      font-weight: bold;
    }
  }
`

// --- BLOCO DIREITO: STATUS DA OPERAÇÃO & LINKS ---

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: 968px) {
    align-items: flex-end;
    text-align: right;
  }
`

const SystemStatus = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(52, 211, 153, 0.04);
  border: 1px solid rgba(52, 211, 153, 0.15);
  padding: 8px 16px;
  border-radius: 100px;
  font-family: monospace;
  font-size: 12px;
  color: #34D399;

  .dot-container {
    position: relative;
    width: 8px;
    height: 8px;
  }

  .dot {
    width: 8px;
    height: 8px;
    background-color: #34D399;
    border-radius: 50%;
    position: absolute;
    inset: 0;
  }

  .pulse {
    background-color: #34D399;
    border-radius: 50%;
    position: absolute;
    inset: 0;
    animation: ${pulseStatus} 2s infinite ease-in-out;
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;

  a {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #94A3B8;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

    &:hover {
      color: #050811;
      background: #D6AF37;
      border-color: #D6AF37;
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(214, 175, 55, 0.2);
    }
  }
`

// --- LINHA INFERIOR DE COPYRIGHT ---

const BottomBar = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.03);
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

const Copyright = styled.p`
  font-size: 13px;
  color: #475569;
  margin: 0;

  span {
    color: #94A3B8;
    font-weight: 500;
  }
`

const TechnicalNotes = styled.span`
  font-family: monospace;
  font-size: 11px;
  color: #334155;
  letter-spacing: 0.5px;
`

// ==========================================
// 3. EXPORT DO COMPONENTE RENDER
// ==========================================

export function Footer() {
  const currentYear = new Date().getFullYear() // Retorna dinamicamente o ano vigente

  return (
    <FooterContainer>
      <MainGrid>
        
        {/* ASSINATURA E IDENTIDADE DO FUNDADOR */}
        <FounderProfile>
          <AvatarWrapper>
            <img 
              src={founderImg} 
              alt="Edgard Felix - Diretor de Engenharia" 
              loading="lazy"
            />
          </AvatarWrapper>
          <FounderMeta>
            <div className="name">Edgard Felix</div>
            <div className="role">Founded <span>EFSA</span> | Software Engineer</div>
          </FounderMeta>
        </FounderProfile>

        {/* STATUS OPERACIONAL E CANAIS SOCIAIS */}
        <RightColumn>
          <SystemStatus title="Monitoramento de infraestrutura ativo">
            <div className="dot-container">
              <div className="dot" />
              <div className="pulse" />
            </div>
            ALL SYSTEMS OPERATIONAL
          </SystemStatus>
          
          <SocialLinks>
            <a href="https://github.com/SEU_USER_GITHUB" target="_blank" rel="noopener noreferrer" title="GitHub">
              <i className="fab fa-github" />
            </a>
            <a href="https://instagram.com/SEU_USER_INSTAGRAM" target="_blank" rel="noopener noreferrer" title="Instagram">
              <i className="fab fa-instagram" />
            </a>
            <a href="https://tiktok.com/@SEU_USER_TIKTOK" target="_blank" rel="noopener noreferrer" title="TikTok">
              <i className="fab fa-tiktok" />
            </a>
            <a href="mailto:seu-email@dominio.com" title="E-mail Corporativo">
              <i className="fas fa-envelope" />
            </a>
          </SocialLinks>
        </RightColumn>

      </MainGrid>

      {/* FOOTER BOTTOM LEGAL MATURITY */}
      <BottomBar>
        <Copyright>
          © {currentYear} <span>E.F Solutions Advanced's</span>. Todos os direitos reservados.
        </Copyright>
        <TechnicalNotes>
          BUILT WITH REACT + TS + STYLED_COMPONENTS // SECURE PORTFOLIO v2.4
        </TechnicalNotes>
      </BottomBar>
    </FooterContainer>
  )
}