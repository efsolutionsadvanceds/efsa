import React, { useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// ==========================================
// 1. SCHEMAS DE VALIDAÇÃO ESTREITA (ZOD)
// ==========================================

const contactSchema = z.object({
  name: z.string()
    .min(3, { message: 'Por favor, insira seu nome completo.' })
    .max(60, { message: 'O limite máximo é de 60 caracteres.' }),
  email: z.string()
    .email({ message: 'Insira um endereço de e-mail corporativo válido.' }),
  phone: z.string()
    .min(14, { message: 'O número de telefone deve incluir o DDD completo.' }),
  business: z.string()
    .min(2, { message: 'Informe o nome ou razão social da sua empresa.' }),
})

type ContactFormData = z.infer<typeof contactSchema>

// ==========================================
// 2. TIMINGS E MICRO-ANIMAÇÕES
// ==========================================

const spinnerRotate = keyframes`
  to { transform: rotate(360deg); }
`

const focusPulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(214, 175, 55, 0.2); }
  70% { box-shadow: 0 0 0 6px rgba(214, 175, 55, 0); }
  100% { box-shadow: 0 0 0 0 rgba(214, 175, 55, 0); }
`

// ==========================================
// 3. ARQUITETURA VISUAL (STYLED COMPONENTS)
// ==========================================

const FormSection = styled.section`
  position: relative;
  padding: 120px 8%;
  background-color: #0A0F1D;
  display: grid;
  grid-template-columns: 1fr;
  gap: 64px;
  max-width: 1440px;
  margin: 0 auto;

  @media (min-width: 968px) {
    grid-template-columns: 1fr 1.1fr;
    gap: 96px;
    align-items: center;
  }
`

const FormInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
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

  @media (min-width: 768px) { font-size: 46px; }
`

const Description = styled.p`
  color: #94A3B8;
  font-size: 18px;
  line-height: 1.7;
  margin: 0;
`

// Pipeline Visual / Fluxograma de Etapas
const StepperPipeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 16px;
  border-left: 1px solid rgba(214, 175, 55, 0.15);
  padding-left: 24px;
`

const StepItem = styled.div`
  position: relative;
  
  .step-number {
    font-family: monospace;
    font-size: 11px;
    font-weight: 700;
    color: #D6AF37;
    margin-bottom: 4px;
    display: block;
  }

  h4 {
    font-size: 16px;
    color: #FFFFFF;
    margin: 0 0 4px 0;
    font-weight: 600;
  }

  p {
    font-size: 14px;
    color: #64748B;
    margin: 0;
  }

  &::before {
    content: '';
    position: absolute;
    left: -29px;
    top: 2px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #0A0F1D;
    border: 2px solid #D6AF37;
  }
`

// --- CONTAINER DO FORMULÁRIO ---

const FormCard = styled.div`
  background: linear-gradient(135deg, rgba(13, 19, 35, 0.7) 0%, rgba(13, 19, 35, 0.4) 100%);
  border: 1px solid rgba(255, 255, 255, 0.04);
  padding: 48px 40px;
  border-radius: 24px;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5);
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px; /* Reduzido para controlar o fluxo junto com o validador de erro fixo */
`

const FormGroup = styled.div<{ $hasError: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 13px;
    font-weight: 600;
    color: #CBD5E1;
    letter-spacing: 0.3px;
  }

  input {
    background: #060913;
    border: 1px solid ${props => props.$hasError ? '#EF4444' : 'rgba(255, 255, 255, 0.06)'};
    padding: 14px 16px;
    border-radius: 10px;
    color: #FFFFFF;
    font-size: 15px;
    transition: all 0.2s ease;

    &::placeholder { color: #334155; }

    &:focus {
      outline: none;
      border-color: ${props => props.$hasError ? '#EF4444' : '#D6AF37'};
      animation: ${props => !props.$hasError && css`${focusPulse} 1.5s infinite`};
    }
  }
`

// Prevenção de CLS: Reserva espaço fixo em pixels para a mensagem de erro
const ErrorSlot = styled.div`
  min-height: 18px; 
  display: flex;
  align-items: center;

  span {
    font-size: 12px;
    color: #EF4444;
    font-weight: 500;
  }
`

const SubmitButton = styled.button<{ $isSubmitting: boolean }>`
  position: relative;
  background: linear-gradient(135deg, #D6AF37 0%, #B89324 100%);
  color: #FFFFFF;
  font-weight: bolder;
  font-size: 16px;
  padding: 16px;
  border-radius: 10px;
  border: none;
  cursor: ${props => props.$isSubmitting ? 'not-allowed' : 'pointer'};
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    ${props => !props.$isSubmitting && css`
      transform: translateY(-2px);
      box-shadow: 0 15px 30px rgba(214, 175, 55, 0.25);
    `}
  }

  &:disabled { opacity: 0.8; }
`

const LoadingSpinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(5, 8, 16, 0.2);
  border-top-color: #050810;
  border-radius: 50%;
  animation: ${spinnerRotate} 0.6s linear infinite;
`

// ==========================================
// 4. LOGICAL ENGINE & REGEX MASKS
// ==========================================

export function ContactForm() {
  const [isSubmittingState, setIsSubmittingState] = useState(false)
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  // Máscara reativa em nível de entrada de input (Sem dependências pesadas)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '') // Remove caracteres não numéricos
    if (value.length > 11) value = value.slice(0, 11)
    
    // Aplicação da máscara dinâmica estrutural
    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`
    } else if (value.length > 0) {
      value = `(${value}`
    }
    
    setValue('phone', value, { shouldValidate: true })
  }

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmittingState(true)

    // Delay técnico simulado de 1.2s para validação de segurança visual
    await new Promise((resolve) => setTimeout(resolve, 1200))

    const message = `Olá Edgard, me chamo ${data.name} da empresa ${data.business}.\nSolicito o diagnóstico técnico estratégico para a nossa operação.\n\nE-mail: ${data.email}\nWhatsApp: ${data.phone}`
    const encodedMessage = encodeURIComponent(message)
    
    window.open(`https://api.whatsapp.com/send?phone=5511999999999&text=${encodedMessage}`, '_blank')
    
    reset()
    setIsSubmittingState(false)
  }

  return (
    <FormSection id="contato">
      
      {/* PAINEL INFORMATIVO ESQUERDO */}
      <FormInfo>
        <Title>Pronto para <span>dominar</span> o seu mercado?</Title>
        <Description>
          Submeta os dados da sua operação ao lado para darmos início à análise de engenharia de software e performance de tráfego. 
          Seus dados trafegam de forma limpa e segura.
        </Description>

        <StepperPipeline>
          <StepItem>
            <span className="step-number">01 / AUDITORIA</span>
            <h4>Triagem e Validação de Dados</h4>
            <p>Seu formulário é catalogado e inserido na esteira de prioridades.</p>
          </StepItem>
          <StepItem>
            <span className="step-number">02 / DIAGNÓSTICO</span>
            <h4>Mapeamento de Gargalos</h4>
            <p>Análise de performance de suas aplicações atuais e funil de tráfego.</p>
          </StepItem>
          <StepItem>
            <span className="step-number">03 / CONEXÃO</span>
            <h4>Reunião Estratégica</h4>
            <p>Apresentação do plano tático de engenharia para escala da sua empresa.</p>
          </StepItem>
        </StepperPipeline>
      </FormInfo>

      {/* PAINEL DE CAPTURA DIREITO */}
      <FormCard>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          
          <FormGroup $hasError={!!errors.name}>
            <label htmlFor="name">Seu Nome</label>
            <input 
              id="name"
              type="text" 
              {...register('name')} 
              placeholder="Edgard Felix"
              disabled={isSubmittingState}
            />
            <ErrorSlot>
              {errors.name && <span>{errors.name.message}</span>}
            </ErrorSlot>
          </FormGroup>

          <FormGroup $hasError={!!errors.email}>
            <label htmlFor="email">E-mail Corporativo</label>
            <input 
              id="email"
              type="email" 
              {...register('email')} 
              placeholder="contato@efsa.com"
              disabled={isSubmittingState}
            />
            <ErrorSlot>
              {errors.email && <span>{errors.email.message}</span>}
            </ErrorSlot>
          </FormGroup>

          <FormGroup $hasError={!!errors.phone}>
            <label htmlFor="phone">WhatsApp / Telefone Direto</label>
            <input 
              id="phone"
              type="tel" 
              {...register('phone')} 
              onChange={handlePhoneChange}
              placeholder="(11) 99999-9999"
              disabled={isSubmittingState}
            />
            <ErrorSlot>
              {errors.phone && <span>{errors.phone.message}</span>}
            </ErrorSlot>
          </FormGroup>

          <FormGroup $hasError={!!errors.business}>
            <label htmlFor="business">Nome da Empresa</label>
            <input 
              id="business"
              type="text" 
              {...register('business')} 
              placeholder="E.F Solutions Advanced's"
              disabled={isSubmittingState}
            />
            <ErrorSlot>
              {errors.business && <span>{errors.business.message}</span>}
            </ErrorSlot>
          </FormGroup>

          <SubmitButton type="submit" $isSubmitting={isSubmittingState} disabled={isSubmittingState}>
            {isSubmittingState ? (
              <>
                <LoadingSpinner /> Processando Criptografia...
              </>
            ) : (
              'Solicitar Diagnóstico Seguro'
            )}
          </SubmitButton>

        </StyledForm>
      </FormCard>

    </FormSection>
  )
}