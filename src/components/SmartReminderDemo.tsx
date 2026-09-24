import { useState, type ReactNode } from 'react'
import { AlarmClock, BellRing, Check, PartyPopper, RotateCcw, Split } from 'lucide-react'

type State = 'pending' | 'snoozing' | 'snoozed' | 'split' | 'done'

const snoozeOptions = [
  { label: '10 min', message: 'Combinado. Te lembro às 14:10.' },
  { label: '1 hora', message: 'Sem problema. Volto a lembrar às 15:00.' },
  { label: 'Amanhã', message: 'Movido para amanhã às 09:00. Sem culpa.' },
]

const initialSteps = [
  { label: 'Abrir o arquivo e ler o que já existe', done: false },
  { label: 'Escrever o resumo em 3 frases', done: false },
  { label: 'Revisar e enviar', done: false },
]

export function SmartReminderDemo() {
  const [state, setState] = useState<State>('pending')
  const [snoozeMessage, setSnoozeMessage] = useState('')
  const [steps, setSteps] = useState(initialSteps)

  const reset = () => {
    setState('pending')
    setSnoozeMessage('')
    setSteps(initialSteps)
  }

  const toggleStep = (index: number) => {
    const next = steps.map((step, i) => (i === index ? { ...step, done: !step.done } : step))
    setSteps(next)
    if (next.every((step) => step.done)) setState('done')
  }

  const completed = steps.filter((step) => step.done).length

  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      <div className="absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(circle_at_30%_20%,rgba(0,107,214,0.14),transparent_60%),radial-gradient(circle_at_80%_90%,rgba(109,77,224,0.14),transparent_55%)]" />
      <div className="rounded-[30px] border border-[#e1e9f4] bg-white p-5 shadow-[0_30px_60px_-30px_rgba(40,60,110,0.45)] sm:p-7">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#fff4e0] px-3 py-1.5 text-[11px] font-semibold text-[#9a5b00]">
            <BellRing className="bell-ring" size={13} /> Lembrete · 14:00
          </span>
          <span className="text-[11px] text-[#8190a6]">Experimente</span>
        </div>

        <h3 className="mt-5 text-2xl font-[650] tracking-[-0.04em] text-[#172033]">Enviar o relatório do trabalho</h3>
        <p className="mt-1.5 text-sm text-[#5f6d80]">Prazo hoje às 18:00 · você costuma render mais à tarde</p>

        <div aria-live="polite" className="mt-6 min-h-[168px]">
          {state === 'pending' && (
            <div className="fade-in grid gap-2.5">
              <DemoButton onClick={() => setState('done')} primary>
                <Check size={17} /> Feito
              </DemoButton>
              <div className="grid gap-2.5 sm:grid-cols-2">
                <DemoButton onClick={() => setState('snoozing')}>
                  <AlarmClock size={17} /> Adiar
                </DemoButton>
                <DemoButton onClick={() => setState('split')}>
                  <Split size={17} /> Dividir em passos
                </DemoButton>
              </div>
              <p className="mt-2 text-center text-xs text-[#738099]">Toque em uma opção para ver o que acontece.</p>
            </div>
          )}

          {state === 'snoozing' && (
            <div className="fade-in">
              <p className="text-sm font-semibold text-[#36435a]">Quando devo lembrar de novo?</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {snoozeOptions.map((option) => (
                  <DemoButton
                    key={option.label}
                    onClick={() => {
                      setSnoozeMessage(option.message)
                      setState('snoozed')
                    }}
                  >
                    {option.label}
                  </DemoButton>
                ))}
              </div>
              <p className="mt-4 text-xs leading-5 text-[#738099]">
                Adiar faz parte. O LembrAI reorganiza o resto do dia para você não perder o prazo.
              </p>
            </div>
          )}

          {state === 'snoozed' && (
            <Result icon={<AlarmClock size={20} />} onReset={reset} title={snoozeMessage} tone="blue">
              Nenhuma bronca, nenhum alarme em sequência. Só um lembrete gentil na hora combinada.
            </Result>
          )}

          {state === 'split' && (
            <div className="fade-in">
              <div className="flex items-center justify-between text-sm">
                <p className="font-semibold text-[#36435a]">Um passo de cada vez</p>
                <span className="text-xs text-[#738099]">{completed} de {steps.length}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#edf1f7]">
                <div
                  className="h-full rounded-full bg-[#6d4de0] transition-[width] duration-500"
                  style={{ width: `${(completed / steps.length) * 100}%` }}
                />
              </div>
              <ul className="mt-3 grid gap-2">
                {steps.map((step, index) => (
                  <li key={step.label}>
                    <button
                      aria-pressed={step.done}
                      className={`flex w-full items-center gap-3 rounded-2xl border px-3.5 py-3 text-left text-sm transition ${step.done ? 'border-[#d9f0e6] bg-[#f1faf6] text-[#5f6d80] line-through' : 'border-[#e4eaf2] bg-white text-[#26344a] hover:border-[#c9d8ec]'}`}
                      onClick={() => toggleStep(index)}
                      type="button"
                    >
                      <span
                        className={`grid size-5 shrink-0 place-items-center rounded-full ${step.done ? 'bg-[#27876b] text-white' : 'border border-[#c5d5e8]'}`}
                      >
                        {step.done && <Check size={12} />}
                      </span>
                      {step.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {state === 'done' && (
            <Result icon={<PartyPopper size={20} />} onReset={reset} title="Mandou bem! Mais uma na sua semana." tone="green">
              Cada conclusão entra no seu resumo semanal. Você enxerga o progresso, não só o que ficou para trás.
            </Result>
          )}
        </div>
      </div>
    </div>
  )
}

function DemoButton({
  children,
  onClick,
  primary = false,
}: {
  children: ReactNode
  onClick: () => void
  primary?: boolean
}) {
  return (
    <button
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-3 text-sm font-semibold transition active:scale-[0.98] ${primary ? 'bg-[#006bd6] text-white shadow-[0_12px_26px_-14px_rgba(0,107,214,0.9)] hover:bg-[#005bb7]' : 'border border-[#dfe7f2] bg-[#f7f9fd] text-[#26344a] hover:border-[#c6d6ec] hover:bg-white'}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}

function Result({
  icon,
  title,
  children,
  tone,
  onReset,
}: {
  icon: ReactNode
  title: string
  children: ReactNode
  tone: 'blue' | 'green'
  onReset: () => void
}) {
  return (
    <div className="pop-in text-center">
      <span
        className={`mx-auto grid size-12 place-items-center rounded-2xl ${tone === 'green' ? 'bg-[#e1f5ec] text-[#27876b]' : 'bg-[#e4f0ff] text-[#006bd6]'}`}
      >
        {icon}
      </span>
      <p className="mt-4 text-base font-semibold tracking-[-0.02em] text-[#172033]">{title}</p>
      <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[#5f6d80]">{children}</p>
      <button
        className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold text-[#006bd6] hover:bg-[#edf4ff]"
        onClick={onReset}
        type="button"
      >
        <RotateCcw size={15} /> Ver de novo
      </button>
    </div>
  )
}
