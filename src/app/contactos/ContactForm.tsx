'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { Turnstile } from '@marsidev/react-turnstile'
import { submitContactForm, type ContactFormState } from './actions'

const initialState: ContactFormState = {
  success: false,
  message: '',
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  if (state.success) {
    return (
      <div className="rounded-2xl border-2 border-green-500 bg-green-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-green-800">Mensagem Enviada!</h3>
        <p className="mt-2 text-green-700">{state.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-700"
        >
          Enviar nova mensagem
        </button>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.message && !state.success && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {state.message}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="group">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-[#1a1a1a] mb-2"
          >
            Nome <span className="text-[#e72f3f]">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className={`w-full border-0 border-b-2 bg-transparent px-0 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-all focus:outline-none focus:ring-0 ${
              state.errors?.name ? 'border-red-500 focus:border-red-500' : 'border-[#e5e5e5] focus:border-[#e72f3f]'
            }`}
            placeholder="O seu nome"
          />
          {state.errors?.name && (
            <p className="mt-1 text-sm text-red-600">{state.errors.name[0]}</p>
          )}
        </div>

        <div className="group">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#1a1a1a] mb-2"
          >
            Email <span className="text-[#e72f3f]">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={`w-full border-0 border-b-2 bg-transparent px-0 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-all focus:outline-none focus:ring-0 ${
              state.errors?.email ? 'border-red-500 focus:border-red-500' : 'border-[#e5e5e5] focus:border-[#e72f3f]'
            }`}
            placeholder="email@exemplo.pt"
          />
          {state.errors?.email && (
            <p className="mt-1 text-sm text-red-600">{state.errors.email[0]}</p>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="group">
          <label
            htmlFor="organization"
            className="block text-sm font-medium text-[#1a1a1a] mb-2"
          >
            Organização
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            className="w-full border-0 border-b-2 border-[#e5e5e5] bg-transparent px-0 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-all focus:border-[#e72f3f] focus:outline-none focus:ring-0"
            placeholder="Nome da sua organização"
          />
        </div>

        <div className="group">
          <label
            htmlFor="industry"
            className="block text-sm font-medium text-[#1a1a1a] mb-2"
          >
            Tipo de organização
          </label>
          <select
            id="industry"
            name="industry"
            className="w-full border-0 border-b-2 border-[#e5e5e5] bg-transparent px-0 py-3 text-[#1a1a1a] transition-all focus:border-[#e72f3f] focus:outline-none focus:ring-0 cursor-pointer appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23737373'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0 center',
              backgroundSize: '20px'
            }}
          >
            <option value="">Selecione...</option>
            <option value="Instituição de Ensino">Instituição de Ensino</option>
            <option value="Organização de Saúde">Organização de Saúde</option>
            <option value="Setor Público">Setor Público</option>
            <option value="IPSS / Misericórdia">IPSS / Misericórdia</option>
            <option value="Empresa B2B">Empresa B2B</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
      </div>

      <div className="group">
        <label
          htmlFor="service"
          className="block text-sm font-medium text-[#1a1a1a] mb-2"
        >
          Serviço de interesse
        </label>
        <select
          id="service"
          name="service"
          className="w-full border-0 border-b-2 border-[#e5e5e5] bg-transparent px-0 py-3 text-[#1a1a1a] transition-all focus:border-[#e72f3f] focus:outline-none focus:ring-0 cursor-pointer appearance-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23737373'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0 center',
            backgroundSize: '20px'
          }}
        >
          <option value="">Selecione...</option>
          <option value="Consultoria Estratégica">Consultoria Estratégica</option>
          <option value="Desenvolvimento Web">Desenvolvimento Web</option>
          <option value="Implementação CRM">Implementação CRM</option>
          <option value="Formação Profissional">Formação Profissional</option>
          <option value="Outro">Outro</option>
        </select>
      </div>

      <div className="group">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-[#1a1a1a] mb-2"
        >
          Mensagem <span className="text-[#e72f3f]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className={`w-full border-0 border-b-2 bg-transparent px-0 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-all focus:outline-none focus:ring-0 resize-none ${
            state.errors?.message ? 'border-red-500 focus:border-red-500' : 'border-[#e5e5e5] focus:border-[#e72f3f]'
          }`}
          placeholder="Descreva brevemente o seu projeto ou necessidade..."
        />
        {state.errors?.message && (
          <p className="mt-1 text-sm text-red-600">{state.errors.message[0]}</p>
        )}
      </div>

      {/* RGPD Consent Checkbox */}
      <div className={`rounded-lg border p-4 transition-colors ${
        state.errors?.consent ? 'border-red-300 bg-red-50' : 'border-[#e5e5e5] bg-[#fafafa]'
      }`}>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-[#d1d5db] text-[#e72f3f] focus:ring-[#e72f3f] focus:ring-offset-0"
          />
          <span className="text-sm text-[#525252] leading-relaxed">
            Li e aceito a{' '}
            <Link href="/privacidade" className="text-[#e72f3f] underline hover:no-underline" target="_blank">
              Política de Privacidade
            </Link>
            . Autorizo o tratamento dos meus dados pessoais para resposta ao presente pedido de contacto, de acordo com o Regulamento Geral de Proteção de Dados (RGPD).
            <span className="text-[#e72f3f]"> *</span>
          </span>
        </label>
        {state.errors?.consent && (
          <p className="mt-2 text-sm text-red-600">{state.errors.consent[0]}</p>
        )}
      </div>

      <p className="text-xs text-[#737373]">
        Os seus dados serão utilizados exclusivamente para responder ao seu pedido de contacto e nunca serão partilhados com terceiros. Pode exercer os seus direitos de acesso, retificação ou eliminação contactando{' '}
        <a href="mailto:hello@modulardigital.pt" className="text-[#e72f3f] hover:underline">
          hello@modulardigital.pt
        </a>.
      </p>

      {/* Cloudflare Turnstile */}
      <div className="flex justify-start">
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
          onSuccess={setTurnstileToken}
          onError={() => setTurnstileToken(null)}
          onExpire={() => setTurnstileToken(null)}
          options={{
            theme: 'light',
            size: 'normal',
          }}
        />
      </div>
      <input type="hidden" name="turnstile-token" value={turnstileToken || ''} />
      {state.errors?.turnstile && (
        <p className="text-sm text-red-600">{state.errors.turnstile[0]}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="magnetic group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-[#1a1a1a] px-8 py-4 text-sm font-medium text-white transition-all hover:bg-black disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {isPending ? (
          <>
            <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>A enviar...</span>
          </>
        ) : (
          <>
            <span className="relative z-10">Enviar Mensagem</span>
            <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </>
        )}
      </button>
    </form>
  )
}
