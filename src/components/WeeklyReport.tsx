import { useState, type ReactNode } from 'react'
import { BellRing, Check, Clock3, Heart, LockKeyhole, MessageCircleHeart, Sparkles, TrendingUp } from 'lucide-react'

type View = 'pessoa' | 'psicologo'

const week = [
  { day: 'Seg', planned: 4, done: 3, mood: 3 },
  { day: 'Ter', planned: 4, done: 2, mood: 2 },
  { day: 'Qua', planned: 5, done: 2, mood: 2 },
  { day: 'Qui', planned: 3, done: 3, mood: 4 },
  { day: 'Sex', planned: 4, done: 4, mood: 4 },
  { day: 'Sáb', planned: 2, done: 2, mood: 5 },
  { day: 'Dom', planned: 2, done: 2, mood: 4 },
]

const maxPlanned = Math.max(...week.map((d) => d.planned))
const moodPoints = week
  .map((d, i) => `${(i / (week.length - 1)) * 100},${40 - ((d.mood - 1) / 4) * 34 - 3}`)
  .join(' ')

const sharedCategories = [
  { label: 'Lembretes e agenda', shared: true },
  { label: 'Humor e energia', shared: true },
  { label: 'Sessões de foco', shared: true },
  { label: 'Anotações pessoais', shared: false },
]

export function WeeklyReport() {
  const [view, setView] = useState<View>('pessoa')
  const professional = view === 'psicologo'

  return (
    <div className="mx-auto w-full max-w-[560px]">
      <div
        aria-label="Escolha a visão do relatório"
        className="mx-auto flex w-full flex-col gap-1 rounded-[22px] border border-[#dfe7f2] bg-white p-1 shadow-[0_10px_30px_-22px_rgba(23,32,51,0.6)] min-[420px]:w-fit min-[420px]:flex-row min-[420px]:gap-0 min-[420px]:rounded-full"
        role="group"
      >
        {(
          [
            ['pessoa', 'O que você vê'],
            ['psicologo', 'O que seu psicólogo vê'],
          ] as const
        ).map(([id, label]) => (
          <button
            aria-pressed={view === id}
            className={`min-h-11 rounded-2xl px-4 text-sm font-semibold transition min-[420px]:min-h-10 min-[420px]:rounded-full ${view === id ? 'bg-[#172033] text-white' : 'text-[#5f6d80] hover:text-[#172033]'}`}
            key={id}
            onClick={() => setView(id)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      <article
        aria-live="polite"
        className="mt-6 overflow-hidden rounded-[30px] border border-[#e1e9f4] bg-white shadow-[0_34px_70px_-36px_rgba(40,60,110,0.5)]"
      >
        <header className="flex flex-col items-start gap-3 border-b border-[#edf1f6] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8190a6]">
              {professional ? 'Paciente · Julia M.' : 'Seu resumo semanal'}
            </p>
            <h3 className="mt-1 text-lg font-semibold tracking-[-0.03em]">14 a 20 de setembro</h3>
          </div>
          <span
            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold ${professional ? 'bg-[#eee9ff] text-[#6046b0]' : 'bg-[#e1f5ec] text-[#27876b]'}`}
          >
            {professional ? 'Compartilhado por Julia' : 'Pronto no domingo'}
          </span>
        </header>

        <div className="grid grid-cols-3 divide-x divide-[#edf1f6] border-b border-[#edf1f6]">
          <Stat icon={<BellRing size={15} />} label="lembretes concluídos" value="18/24" />
          <Stat icon={<Clock3 size={15} />} label="em foco" value="3h40" />
          <Stat icon={<Heart size={15} />} label="check-ins" value="6" />
        </div>

        <div className="grid gap-6 px-5 py-6 sm:grid-cols-[1.25fr_1fr] sm:px-7">
          <div>
            <p className="text-xs font-semibold text-[#36435a]">Lembretes por dia</p>
            <div className="mt-4 flex h-28 items-end justify-between gap-2">
              {week.map((d) => (
                <div className="flex flex-1 flex-col items-center gap-1.5" key={d.day}>
                  <div className="relative w-full max-w-7 rounded-lg bg-[#edf1f7]" style={{ height: `${(d.planned / maxPlanned) * 88}px` }}>
                    <div
                      className="bar-grow absolute inset-x-0 bottom-0 rounded-lg bg-[#006bd6]"
                      style={{ height: `${(d.done / d.planned) * 100}%` }}
                      title={`${d.done} de ${d.planned}`}
                    />
                  </div>
                  <span className="text-[10px] text-[#738099]">{d.day}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#36435a]">Humor ao longo da semana</p>
            <svg aria-hidden="true" className="mt-4 h-28 w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
              <defs>
                <linearGradient id="mood-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#6d4de0" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#6d4de0" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon fill="url(#mood-fill)" points={`0,40 ${moodPoints} 100,40`} />
              <polyline
                fill="none"
                points={moodPoints}
                stroke="#6d4de0"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.6"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div className="flex justify-between text-[10px] text-[#738099]">
              <span>Seg</span>
              <span>Dom</span>
            </div>
          </div>
        </div>

        <div className="mx-5 mb-5 rounded-2xl bg-[#f4f7fc] p-4 sm:mx-7">
          <p className="flex items-center gap-2 text-xs font-semibold text-[#36435a]">
            <Sparkles className="text-[#006bd6]" size={14} /> Padrões da semana
          </p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-[#4d5b70]">
            <li className="flex gap-2">
              <TrendingUp className="mt-1 shrink-0 text-[#27876b]" size={15} />
              {professional
                ? 'Concluiu 75% dos lembretes; as tardes concentram a maior parte das conclusões.'
                : 'Suas tardes rendem mais: a maioria das tarefas foi concluída depois das 14h.'}
            </li>
            <li className="flex gap-2">
              <Heart className="mt-1 shrink-0 text-[#6d4de0]" size={15} />
              {professional
                ? 'Terça e quarta tiveram humor e energia mais baixos, com mais lembretes adiados.'
                : 'Terça e quarta foram mais pesadas. Vale olhar com carinho, sem cobrança.'}
            </li>
          </ul>
        </div>

        <div className="border-t border-[#edf1f6] px-5 py-5 sm:px-7">
          {professional ? (
            <>
              <p className="flex items-center gap-2 text-xs font-semibold text-[#36435a]">
                <MessageCircleHeart className="text-[#6d4de0]" size={15} /> Julia marcou para a sessão
              </p>
              <p className="mt-2 rounded-2xl border border-[#e4dcf6] bg-[#f6f3fd] px-4 py-3 text-sm leading-6 text-[#4a3d6b]">
                “Quero falar sobre a ansiedade que aparece antes das entregas.”
              </p>
              <p className="mt-4 flex items-center gap-2 text-xs text-[#738099]">
                <LockKeyhole size={13} /> Anotações pessoais não foram compartilhadas.
              </p>
            </>
          ) : (
            <>
              <p className="text-xs font-semibold text-[#36435a]">Você escolhe o que compartilhar</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {sharedCategories.map((category) => (
                  <li
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${category.shared ? 'bg-[#e4f0ff] text-[#0b5bb0]' : 'bg-[#f1f3f7] text-[#738099]'}`}
                    key={category.label}
                  >
                    {category.shared ? <Check size={13} /> : <LockKeyhole size={12} />}
                    {category.label}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </article>
      <p className="mt-4 text-center text-xs text-[#738099]">Relatório ilustrativo com dados fictícios.</p>
    </div>
  )
}

function Stat({ icon, value, label }: { icon: ReactNode; value: string; label: string }) {
  return (
    <div className="px-3 py-4 text-center sm:px-5">
      <span className="mx-auto grid size-7 place-items-center rounded-lg bg-[#f0f5fc] text-[#4f6a8e]">{icon}</span>
      <strong className="mt-2 block text-xl font-[650] tracking-[-0.04em] text-[#172033] sm:text-2xl">{value}</strong>
      <span className="block text-[10px] leading-4 text-[#738099] sm:text-[11px]">{label}</span>
    </div>
  )
}
