'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Escape HTML to prevent XSS in email templates
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Sanitize string for use in email subject (remove newlines, limit length)
function sanitizeSubject(str: string): string {
  return str.replace(/[\r\n]/g, ' ').substring(0, 100)
}

export type ContactFormState = {
  success: boolean
  message: string
  errors?: {
    name?: string[]
    email?: string[]
    message?: string[]
    consent?: string[]
    turnstile?: string[]
  }
}

// Verify Turnstile token with Cloudflare
async function verifyTurnstile(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY
  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY is not configured')
    return false
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    })

    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error('Turnstile verification error:', error)
    return false
  }
}

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Extract form data
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const organization = formData.get('organization') as string
  const industry = formData.get('industry') as string
  const service = formData.get('service') as string
  const message = formData.get('message') as string
  const consent = formData.get('consent') as string
  const turnstileToken = formData.get('turnstile-token') as string

  // Validation
  const errors: ContactFormState['errors'] = {}

  if (!name || name.trim().length < 2) {
    errors.name = ['Por favor, introduza o seu nome.']
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = ['Por favor, introduza um email válido.']
  }

  if (!message || message.trim().length < 10) {
    errors.message = ['Por favor, descreva o seu projeto ou necessidade (mínimo 10 caracteres).']
  }

  if (consent !== 'on') {
    errors.consent = ['Deve aceitar a política de privacidade para enviar o formulário.']
  }

  if (!turnstileToken) {
    errors.turnstile = ['Por favor, complete a verificação de segurança.']
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Por favor, corrija os erros no formulário.',
      errors,
    }
  }

  // Verify Turnstile token
  const isTurnstileValid = await verifyTurnstile(turnstileToken)
  if (!isTurnstileValid) {
    return {
      success: false,
      message: 'Verificação de segurança falhou. Por favor, tente novamente.',
      errors: { turnstile: ['Verificação de segurança inválida.'] },
    }
  }

  // Check if Resend API key is configured
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured')
    return {
      success: false,
      message: 'Erro de configuração. Por favor, contacte-nos por telefone.',
    }
  }

  try {
    // Escape all user inputs for safe HTML rendering
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeOrganization = organization ? escapeHtml(organization) : ''
    const safeIndustry = industry ? escapeHtml(industry) : ''
    const safeService = service ? escapeHtml(service) : ''
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')

    // Send email notification
    await resend.emails.send({
      from: 'Modular Digital <contacto@modulardigital.pt>',
      to: ['hello@modulardigital.pt'],
      replyTo: email,
      subject: sanitizeSubject(`Novo contacto: ${name}${organization ? ` - ${organization}` : ''}`),
      html: `
        <h2>Novo pedido de contacto</h2>

        <p><strong>Nome:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        ${safeOrganization ? `<p><strong>Organização:</strong> ${safeOrganization}</p>` : ''}
        ${safeIndustry ? `<p><strong>Tipo de organização:</strong> ${safeIndustry}</p>` : ''}
        ${safeService ? `<p><strong>Serviço de interesse:</strong> ${safeService}</p>` : ''}

        <h3>Mensagem:</h3>
        <p>${safeMessage}</p>

        <hr>
        <p style="color: #666; font-size: 12px;">
          Consentimento RGPD registado em ${new Date().toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon' })}
        </p>
      `,
    })

    // Send confirmation email to user
    await resend.emails.send({
      from: 'Modular Digital <contacto@modulardigital.pt>',
      to: [email],
      subject: 'Recebemos o seu contacto - Modular Digital',
      html: `
        <h2>Olá ${safeName},</h2>

        <p>Obrigado por entrar em contacto com a Modular Digital.</p>

        <p>Recebemos o seu pedido e iremos responder dentro de 24 horas úteis.</p>

        <h3>Resumo do seu pedido:</h3>
        <p>${safeMessage}</p>

        <p>Se tiver alguma questão urgente, pode contactar-nos diretamente:</p>
        <ul>
          <li>📞 <a href="tel:+351914663553">+351 914 663 553</a></li>
          <li>📧 <a href="mailto:hello@modulardigital.pt">hello@modulardigital.pt</a></li>
        </ul>

        <p>Cumprimentos,<br>Equipa Modular Digital</p>

        <hr>
        <p style="color: #666; font-size: 12px;">
          Esta é uma mensagem automática. Por favor, não responda diretamente a este email.
        </p>
      `,
    })

    return {
      success: true,
      message: 'Mensagem enviada com sucesso! Entraremos em contacto dentro de 24 horas.',
    }
  } catch (error) {
    console.error('Error sending email:', error)
    return {
      success: false,
      message: 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente ou contacte-nos por telefone.',
    }
  }
}
