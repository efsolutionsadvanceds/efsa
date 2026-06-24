import React, { useState, useEffect, useRef } from 'react'
import styled, { keyframes, css } from 'styled-components'

// ==========================================
// 1. DATA E SCHEMA SEGURO
// ==========================================

interface SecurityPillar {
  id: string
  title: string
  code: string // Código de identificação estilo log técnico
  description: string
  icon: string
  badge: string
}

const SECURITY_DATA: SecurityPillar[] = [
  {
    id: 'sec-lgpd',
    title: 'Proteção de Dados Sensíveis',
    code: 'ISO-27001 / LGPD',
    description: 'Tratamento rígido e armazenamento com hashes criptográficos fortes para credenciais, PIX, CPFs e contatos.',
    icon: 'fas fa-user-shield',
    badge: 'AES-256'
  },
  {
    id: 'sec-owasp',
    title: 'Sanitização contra Injeções',
    code: 'OWASP TOP-10 MITIGATION',
    description: 'Camada de validação estrutural rígida via Zod no Frontend e sanitização estrita no Backend. Imunidade total contra XSS e SQLi.',
    icon: 'fas fa-filter',
    badge: 'ZOD VALIDATED'
  },
  {
    id: 'sec-tls',
    title: 'Criptografia em Trânsito',
    code: 'TLS 1.3 PROTOCOL',
    description: 'Tráfego de payloads blindado de ponta a ponta. Zero brechas para ataques do tipo Man-in-the-Middle interceptarem sua operação.',
    icon: 'fas fa-lock',
    badge: 'SSL ENFORCED'
  }
]

// Lista de mensagens simuladas para o terminal
const LOG_MESSAGES = [
  'INITIALIZING SYSTEM SECURITY AUDIT...',
  'SCANNING FOR VULNERABILITIES [OWASP TOP 10]... CLEAN',
  'ENFORCING TLS 1.3 ENCRYPTION ON ALL ENDPOINTS...',
  'ZOD PARSING SCHEMAS VALIDATED SUCCESSFULLY.',
  'XSS FILTERS: ACTIVE [100% BLINDED]',
  'HONEYPOT TRIGGERS ARMED FOR INTEL...',
  'DATA PIPELINES ENCRYPTED VIA AES-256-GCM.'
]

// ==========================================
// 2. TIMINGS E ANIMAÇÕES
// ==========================================

const scanlineMove = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`

const textPulse = keyframes`
  0%, 100% { opacity: 0.8; text-shadow: 0 0 4px rgba(220, 38, 38, 0); }
  50% { opacity: 1; text-shadow: 0 0 8px rgba(214, 175, 55, 0.4); }
`

// ==========================================
// 3. COMPONENTES ESTILIZADOS
// ==========================================

const SecurityContainer = styled.section`
  position: relative;
  padding: 120px 8%;
  background-color: #060913;
  border-top: 1px solid rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  overflow: hidden;
`

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 56px;
  max-width: 1280px;
  margin: 0 auto;

  @media (min-width: 1024px) {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: center;
  }
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const TechBadge = styled.span`
  align-self: flex-start;
  font-family: monospace;
  font-size: 11px;
  font-weight: 700;
  color: #D6AF37;
  border: 1px solid rgba(214, 175, 55, 0.2);
  background: rgba(214, 175, 55, 0.04);
  padding: 4px 12px;
  border-radius: 4px;
  letter-spacing: 1.5px;
`

const Title = styled.h2`
  font-size: 34px;
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

  @media (min-width: 768px) { font-size: 44px; }
`

const Subtitle = styled.p`
  font-size: 17px;
  color: #94A3B8;
  line-height: 1.7;
  margin: 0 0 16px 0;
`

const CardsStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const SecurityCard = styled.div`
  background: rgba(13, 19, 35, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.03);
  padding: 24px 28px;
  border-radius: 14px;
  display: flex;
  gap: 20px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    border-color: rgba(214, 175, 55, 0.25);
    background: rgba(13, 19, 35, 0.7);
    transform: translateX(6px);
  }
`

const IconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: rgba(214, 175, 55, 0.05);
  border: 1px solid rgba(214, 175, 55, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  i {
    font-size: 20px;
    color: #D6AF37;
  }
`

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  .meta {
    font-family: monospace;
    font-size: 11px;
    color: #64748B;
    letter-spacing: 1px;
  }

  h3 {
    font-size: 19px;
    font-weight: 700;
    color: #FFFFFF;
    margin: 0;
  }

  p {
    font-size: 14px;
    line-height: 1.6;
    color: #94A3B8;
    margin: 0;
  }
`

// ==========================================
// 4. TERMINAL DE OPERAÇÕES (SOC VISUAL)
// ==========================================

const TerminalWrapper = styled.div`
  background: #070B15;
  border: 1px solid rgba(214, 175, 55, 0.15);
  border-radius: 16px;
  padding: 24px;
  font-family: 'Courier New', Courier, monospace;
  height: 380px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(0, 0, 0, 0.8);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(rgba(214, 175, 55, 0.05) 0%, transparent 100%);
    pointer-events: none;
    z-index: 2;
  }
`

const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 12px;
  margin-bottom: 16px;

  .dots {
    display: flex;
    gap: 6px;
    span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
    }
    span:first-child { background: #EF4444; }
  }

  .status {
    font-size: 11px;
    color: #D6AF37;
    font-weight: 700;
    animation: ${textPulse} 2s infinite;
  }
`

const LogViewport = styled.div`
  flex-grow: 1;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const LogLine = styled.div`
  font-size: 12px;
  line-height: 1.4;
  color: #34D399; /* Verde limpo estilo terminal estável */
  display: flex;
  gap: 8px;

  .prefix {
    color: #64748B;
    user-select: none;
  }

  .success-tag {
    color: #D6AF37;
    font-weight: bold;
  }
`

// ==========================================
// 5. IMPLEMENTAÇÃO DO MÓDULO RENDER
// ==========================================

export function Security() {
  const [logs, setLogs] = useState<string[]>([LOG_MESSAGES[0], LOG_MESSAGES[1]])

  // Efeito simulador de log assíncrono em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => {
        const nextLog = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)]
        const timestamp = new Date().toLocaleTimeString()
        // Mantém a esteira limpa mostrando apenas os últimos 9 logs na tela
        return [...prev, `[${timestamp}] ${nextLog}`].slice(-9)
      })
    }, 3500)

    return () => clearInterval(interval)
  }, [])

  return (
    <SecurityContainer id="seguranca">
      <MainGrid>
        
        {/* CONTEÚDO PRINCIPAL (ESQUERDA) */}
        <TextWrapper>
          <TechBadge>SECURE CORE ARCHITECTURE</TechBadge>
          <Title>
            Sua operação com <br />
            <span>Segurança Absoluta</span>
          </Title>
          <Subtitle>
            Como Engenheiro de Software, sei que dados não são apenas bytes; são os ativos mais valiosos do seu negócio. 
            Blindamos toda a infraestrutura contra vulnerabilidades conhecidas e imprevisíveis do ecossistema web moderno.
          </Subtitle>

          <CardsStack>
            {SECURITY_DATA.map((pillar) => (
              <SecurityCard key={pillar.id}>
                <IconBox>
                  <i className={pillar.icon} aria-hidden="true" />
                </IconBox>
                <CardContent>
                  <div className="meta">{pillar.code}</div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </CardContent>
              </SecurityCard>
            ))}
          </CardsStack>
        </TextWrapper>

        {/* TRACKER TERMINAL REAL-TIME (DIREITA) */}
        <TerminalWrapper>
          <TerminalHeader>
            <div className="dots">
              <span />
              <span />
              <span />
            </div>
            <div className="status">
              <i className="fas fa-shield-alt" /> CORE SECURE
            </div>
          </TerminalHeader>
          
          <LogViewport>
            {logs.map((log, index) => (
              <LogLine key={index}>
                <span className="prefix">&gt;_</span>
                <span>
                  {log.includes('CLEAN') || log.includes('SUCCESSFULLY') || log.includes('ACTIVE') ? (
                    <>
                      {log.split(' ').map((word, i) => 
                        ['CLEAN', 'SUCCESSFULLY', 'ACTIVE', '[100%', 'BLINDED]'].includes(word) ? (
                          <span key={i} className="success-tag">{word} </span>
                        ) : (
                          word + ' '
                        )
                      )}
                    </>
                  ) : (
                    log
                  )}
                </span>
              </LogLine>
            ))}
          </LogViewport>
        </TerminalWrapper>

      </MainGrid>
    </SecurityContainer>
  )
}