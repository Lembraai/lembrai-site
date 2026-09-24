import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { ArrowRight, Check, LoaderCircle, Mail, PartyPopper } from 'lucide-react'

export type Profile = 'tdah' | 'psicologo' | 'outro'

const profiles: { id: Profile; label: string; hint: string }[] = [
  { id: 'tdah', label: 'Tenho TDAH ou me identifico', hint: 'Quero lembrar das coisas sem esforço.' },
  { id: 'psicologo', label: 'Sou psicólogo(a)', hint: 'Quero acompanhar pacientes entre sessões.' },
  { id: 'outro', label: 'Familiar ou curioso', hint: 'Quero apoiar alguém ou conhecer.' },
]

const interestOptions = ['Lembretes inteligentes', 'Relatório semanal', 'Tarefas em pequenos passos', 'Sessões de foco']

const endpoint = import.meta.env.VITE_WAITLIST_ENDPOINT?.trim()
const contactEmail = import.meta.env.VITE_WAITLIST_EMAIL?.trim()
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type Status = 'idle' | 'sending' | 'sent' | 'mail' | 'error'
type Errors = Partial<Record<'name' | 'email' | 'consent', string>>

export function WaitlistForm({
  profile,
  onProfileChange,
}: {
  profile: Profile
  onProfileChange: (profile: Profile) => void
}) {
  const formId = useId()
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const consentRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [interests, setInterests] = useState<string[]>(['Lembretes inteligentes', 'Relatório semanal'])
  const [consent, setConsent] = useState(false)
  const [website, setWebsite] = useState('')
  const [attempted, setAttempted] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const errors: Errors = {}
  if (name.trim().length < 2) errors.name = 'Conta pra gente como podemos te chamar.'
  if (!emailPattern.test(email.trim())) errors.email = 'Digite um e-mail válido, como voce@email.com.'
  if (!consent) errors.consent = 'Precisamos da sua autorização para enviar o convite.'
  const visibleErrors = attempted ? errors : {}

  const toggleInterest = (interest: string) =>
    setInterests((current) =>
      current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest],
    )

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setAttempted(true)

    if (errors.name) return nameRef.current?.focus()
    if (errors.email) return emailRef.current?.focus()
    if (errors.consent) return consentRef.current?.focus()
    if (website) return setStatus('sent')

    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      profile,
      interests,
      consent: true,
      source: 'site',
      createdAt: new Date().toISOString(),
    }

    setStatus('sending')
    setErrorMessage('')

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        setStatus('sent')
        return
      }

      if (contactEmail) {
        const profileLabel = profiles.find((item) => item.id === profile)?.label ?? profile
        const body = [
          `Nome: ${payload.name}`,
          `E-mail: ${payload.email}`,
          `Perfil: ${profileLabel}`,
          `Interesses: ${interests.join(', ') || 'Não informado'}`,
          'Autorizo o contato do LembrAI sobre o acesso antecipado.',
        ].join('\n')
        window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent('Quero acesso antecipado ao LembrAI')}&body=${encodeURIComponent(body)}`
        setStatus('mail')
        return
      }

      setErrorMessage('As inscrições online abrem em breve. Volte daqui a pouco para garantir sua vaga.')
      setStatus('error')
    } catch {
      setErrorMessage('Não conseguimos enviar agora. Confira sua conexão e tente de novo.')
      setStatus('error')
    }
  }

  if (status === 'sent' || status === 'mail') {
    const firstName = name.trim().split(/\s+/)[0]
    return (
      <div className="pop-in rounded-[30px] border border-[#dfe7f2] bg-white p-8 text-center shadow-[0_34px_70px_-40px_rgba(40,60,110,0.55)] sm:p-12" role="status">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#e1f5ec] text-[#27876b]">
          {status === 'sent' ? <PartyPopper size={26} /> : <Mail size={26} />}
        </span>
        <h3 className="mt-6 text-2xl font-[650] tracking-[-0.04em]">
          {status === 'sent' ? `Pronto, ${firstName}! Você está na lista.` : 'Falta só um toque.'}
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#5f6d80]">
          {status === 'sent'
            ? `Vamos avisar em ${email.trim().toLowerCase()} assim que o acesso antecipado abrir. E, claro, a gente lembra por você.`
            : 'Abrimos seu aplicativo de e-mail com a inscrição preenchida. É só enviar a mensagem.'}
        </p>
        <button
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-[#006bd6] hover:bg-[#edf4ff]"
          onClick={() => {
            setStatus('idle')
            setAttempted(false)
            setName('')
            setEmail('')
            setConsent(false)
          }}
          type="button"
        >
          Inscrever outra pessoa
        </button>
      </div>
    )
  }

  return (
    <form
      className="relative rounded-[30px] border border-[#dfe7f2] bg-white p-6 shadow-[0_34px_70px_-40px_rgba(40,60,110,0.55)] sm:p-9"
      noValidate
      onSubmit={handleSubmit}
    >
      <fieldset>
        <legend className="text-sm font-semibold text-[#172033]">Quem é você?</legend>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
          {profiles.map((item) => (
            <label className="cursor-pointer" key={item.id}>
              <input
                checked={profile === item.id}
                className="peer sr-only"
                name={`${formId}-perfil`}
                onChange={() => onProfileChange(item.id)}
                type="radio"
                value={item.id}
              />
              <span className="flex h-full flex-col rounded-2xl border border-[#e1e8f2] bg-[#f8fafd] p-3.5 transition peer-checked:border-[#006bd6] peer-checked:bg-[#eef5ff] peer-checked:shadow-[0_0_0_3px_rgba(0,107,214,0.12)] peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#006bd6] hover:border-[#c9d8ec]">
                <strong className="text-sm font-semibold text-[#172033]">{item.label}</strong>
                <span className="mt-1 text-xs leading-5 text-[#65748c]">{item.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field error={visibleErrors.name} id={`${formId}-nome`} label="Seu nome">
          <input
            aria-describedby={visibleErrors.name ? `${formId}-nome-erro` : undefined}
            aria-invalid={Boolean(visibleErrors.name)}
            autoComplete="given-name"
            className={inputClass(visibleErrors.name)}
            id={`${formId}-nome`}
            onChange={(event) => setName(event.target.value)}
            placeholder="Como quer ser chamado(a)"
            ref={nameRef}
            value={name}
          />
        </Field>
        <Field error={visibleErrors.email} id={`${formId}-email`} label="Seu melhor e-mail">
          <input
            aria-describedby={visibleErrors.email ? `${formId}-email-erro` : undefined}
            aria-invalid={Boolean(visibleErrors.email)}
            autoComplete="email"
            className={inputClass(visibleErrors.email)}
            id={`${formId}-email`}
            inputMode="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="voce@email.com"
            ref={emailRef}
            type="email"
            value={email}
          />
        </Field>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold text-[#172033]">
          O que mais te ajudaria? <span className="font-normal text-[#738099]">(opcional)</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {interestOptions.map((interest) => {
            const checked = interests.includes(interest)
            return (
              <label className="cursor-pointer" key={interest}>
                <input
                  checked={checked}
                  className="peer sr-only"
                  onChange={() => toggleInterest(interest)}
                  type="checkbox"
                />
                <span className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-[#dfe7f2] bg-white px-3.5 text-sm text-[#36435a] transition peer-checked:border-[#006bd6] peer-checked:bg-[#006bd6] peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#006bd6] hover:border-[#c6d6ec]">
                  {checked && <Check size={14} />}
                  {interest}
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <div aria-hidden="true" className="absolute left-[-9999px] top-auto size-px overflow-hidden">
        <label htmlFor={`${formId}-site`}>Não preencha este campo</label>
        <input
          autoComplete="off"
          id={`${formId}-site`}
          onChange={(event) => setWebsite(event.target.value)}
          tabIndex={-1}
          value={website}
        />
      </div>

      <div className="mt-6">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#4d5b70]">
          <input
            aria-describedby={visibleErrors.consent ? `${formId}-consent-erro` : undefined}
            aria-invalid={Boolean(visibleErrors.consent)}
            checked={consent}
            className="mt-1 size-4.5 shrink-0 accent-[#006bd6]"
            onChange={(event) => setConsent(event.target.checked)}
            ref={consentRef}
            type="checkbox"
          />
          Autorizo o LembrAI a usar meu nome e e-mail apenas para avisar sobre o acesso antecipado. Posso pedir a
          remoção a qualquer momento.
        </label>
        {visibleErrors.consent && (
          <p className="mt-1.5 pl-7 text-xs font-medium text-[#c0352b]" id={`${formId}-consent-erro`}>
            {visibleErrors.consent}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p className="mt-5 rounded-2xl bg-[#fff4e0] px-4 py-3 text-sm text-[#7a4a00]" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        className="group mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#006bd6] px-6 text-base font-semibold text-white shadow-[0_18px_36px_-16px_rgba(0,107,214,0.85)] transition hover:-translate-y-0.5 hover:bg-[#005bb7] active:translate-y-0 disabled:cursor-wait disabled:opacity-80"
        disabled={status === 'sending'}
        type="submit"
      >
        {status === 'sending' ? (
          <>
            <LoaderCircle className="animate-spin" size={18} /> Enviando…
          </>
        ) : (
          <>
            Quero acesso antecipado
            <ArrowRight className="transition group-hover:translate-x-0.5" size={18} />
          </>
        )}
      </button>
      <p className="mt-3 text-center text-xs text-[#738099]">Leva menos de um minuto. Sem spam, prometido.</p>
    </form>
  )
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label className="text-sm font-semibold text-[#172033]" htmlFor={id}>
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p className="mt-1.5 text-xs font-medium text-[#c0352b]" id={`${id}-erro`}>
          {error}
        </p>
      )}
    </div>
  )
}

function inputClass(error?: string) {
  return `min-h-12 w-full rounded-2xl border bg-[#f8fafd] px-4 text-base text-[#172033] outline-none transition placeholder:text-[#9aa6b8] focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,107,214,0.14)] ${error ? 'border-[#e0766c] focus:border-[#c0352b]' : 'border-[#e1e8f2] focus:border-[#006bd6]'}`
}
