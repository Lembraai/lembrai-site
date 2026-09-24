import { useEffect, useState } from 'react'
import { CalendarClock, Split, Undo2, type LucideIcon } from 'lucide-react'
import { usePrefersReducedMotion } from '../hooks'

type Tone = 'blue' | 'violet' | 'green'

const reminders: { icon: LucideIcon; when: string; title: string; detail: string; tone: Tone }[] = [
  {
    icon: CalendarClock,
    when: 'agora',
    title: 'Hora de sair para a terapia',
    detail: 'Sessão às 16:00 · 30 min de trajeto',
    tone: 'blue',
  },
  {
    icon: Split,
    when: 'há 1 min',
    title: 'Relatório: passo 2 de 3',
    detail: 'Só revisar o resumo. Uns 10 minutinhos.',
    tone: 'violet',
  },
  {
    icon: Undo2,
    when: 'há 3 min',
    title: 'Tudo bem adiar',
    detail: 'Te lembro de novo às 14:10, sem drama.',
    tone: 'green',
  },
]

const toneClasses: Record<Tone, string> = {
  blue: 'bg-[#e4f0ff] text-[#006bd6]',
  violet: 'bg-[#eee9ff] text-[#6d4de0]',
  green: 'bg-[#e1f5ec] text-[#27876b]',
}

export function ReminderTicker({ className = '' }: { className?: string }) {
  const reducedMotion = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reducedMotion) return
    const id = window.setInterval(() => setIndex((current) => (current + 1) % reminders.length), 3600)
    return () => window.clearInterval(id)
  }, [reducedMotion])

  const reminder = reminders[index]
  const Icon = reminder.icon

  return (
    <div aria-hidden="true" className={`w-[min(320px,calc(100vw-2rem))] ${className}`}>
      <div
        className="toast-in flex items-start gap-3 rounded-[22px] border border-white bg-white/90 p-3.5 text-left shadow-[0_22px_45px_-18px_rgba(40,60,110,0.38)] backdrop-blur-xl"
        key={index}
      >
        <span className={`grid size-10 shrink-0 place-items-center rounded-[14px] ${toneClasses[reminder.tone]}`}>
          <Icon size={19} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8190a6]">
            LembrAI <span className="font-medium normal-case tracking-normal">{reminder.when}</span>
          </span>
          <strong className="mt-0.5 block text-[13px] font-semibold text-[#172033]">{reminder.title}</strong>
          <span className="mt-0.5 block text-[11px] leading-4 text-[#5f6d80]">{reminder.detail}</span>
        </span>
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        {reminders.map((item, dot) => (
          <span
            className={`h-1.5 rounded-full transition-all duration-500 ${dot === index ? 'w-5 bg-[#006bd6]' : 'w-1.5 bg-[#c9d6e8]'}`}
            key={item.title}
          />
        ))}
      </div>
    </div>
  )
}
