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
    border: 1px solid rgba(214, 175, 55, 0.2); /* Borda sutil dourada por padrão */
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

    svg {
      width: 18px;
      height: 18px;
      fill: #D6AF37; /* Ícones dourados puros */
      transition: all 0.2s ease;
    }

    &:hover {
      background: #D6AF37;
      border-color: #D6AF37;
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(214, 175, 55, 0.3);

      svg {
        fill: #050811; /* Contraste escuro ao passar o mouse */
      }
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
  const currentYear = new Date().getFullYear()

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

        {/* STATUS OPERACIONAL E CANAIS SOCIAIS ATUALIZADOS */}
        <RightColumn>
          <SystemStatus title="Monitoramento de infraestrutura ativo">
            <div className="dot-container">
              <div className="dot" />
              <div className="pulse" />
            </div>
            ALL SYSTEMS OPERATIONAL
          </SystemStatus>
          
          <SocialLinks>
            <a href="https://www.facebook.com/profile.php?id=61586727273708" target="_blank" rel="noopener noreferrer" title="Facebook">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/efsolutionsadvanceds/" target="_blank" rel="noopener noreferrer" title="Instagram">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@e.f.solutions.adv" target="_blank" rel="noopener noreferrer" title="TikTok">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.525.02c1.31.01 2.61.1 3.86.31v4.29c-.74-.23-1.52-.35-2.31-.36v5.13c0 2.45-1.01 4.54-2.91 5.61a5.178 5.178 0 01-5.32.06c-1.83-1.12-2.81-3.23-2.63-5.36.19-2.22 1.83-4.06 4.05-4.43.34-.06.69-.09 1.04-.09v4.29c-.11 0-.23.01-.34.02-1.04.14-1.81.99-1.85 2.04-.05 1.25.9 2.33 2.15 2.41.97.06 1.86-.55 2.15-1.48.06-.21.09-.43.09-.65V0h3.06zm4.81 5.3c.75.54 1.6 1.13 2.5 1.47V2.4c-.66-.18-1.3-.47-1.87-.87-.63-.44-1.14-.99-1.51-1.64h-3.32c.16 1.83.99 3.51 2.36 4.71.56.49 1.2.91 1.84 1.22z"/>
              </svg>
            </a>
            <a href="mailto:efsolutionsadvanceds@gmail.com" target="_blank" rel="noopener noreferrer" title="E-mail Corporativo">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
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