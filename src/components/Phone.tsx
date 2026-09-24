import { AlarmClock, BellRing, CalendarClock, ChartColumn, Check, ChevronRight, Sparkles, Split, TimerReset, type LucideIcon } from 'lucide-react'

export type Screen = 'inicio' | 'lembretes' | 'foco' | 'semana'

const tabs: { id: Screen; label: string; icon: LucideIcon }[] = [
  { id: 'inicio', label: 'Hoje', icon: Sparkles },
  { id: 'lembretes', label: 'Lembretes', icon: BellRing },
  { id: 'foco', label: 'Foco', icon: TimerReset },
  { id: 'semana', label: 'Semana', icon: ChartColumn },
]

const brandLogo = `${import.meta.env.BASE_URL}brand/logo.png`

export function Phone({ screen, setScreen }: { screen: Screen; setScreen: (screen: Screen) => void }) {
  return (
    <div className="relative w-[min(304px,100%)] rounded-[43px] bg-[linear-gradient(135deg,#e5ebf5_0%,#718098_24%,#f2f5fa_52%,#8794a9_100%)] p-[7px] shadow-[0_38px_65px_-28px_rgba(34,52,89,0.7),0_8px_18px_rgba(34,52,89,0.14)] sm:w-[330px]">
      <div className="overflow-hidden rounded-[37px] border-[3px] border-[#1e2634] bg-[#f8faff]">
        <div className="relative flex h-9 items-center justify-between px-5 text-[10px] font-bold text-[#1e2634]">
          <span>9:41</span>
          <span className="absolute left-1/2 top-1 h-5 w-20 -translate-x-1/2 rounded-full bg-[#202735]" />
          <span>▮▮▮</span>
        </div>
        <div className="flex items-center justify-between border-b border-[#e8edf5] px-4 pb-3 pt-1">
          <img alt="LembrAI" className="h-auto w-[99px]" height="28" src={brandLogo} width="103" />
          <span className="grid size-7 place-items-center rounded-full bg-[#e4eafe] text-[11px] text-[#4b48a4]">J</span>
        </div>
        <div className="min-h-[430px] px-4 pb-3 pt-5">
          <div className="fade-in" key={screen}>
            {screen === 'inicio' && <HomeScreen />}
            {screen === 'lembretes' && <RemindersScreen />}
            {screen === 'foco' && <FocusScreen />}
            {screen === 'semana' && <WeekScreen />}
          </div>
        </div>
        <div className="grid grid-cols-4 border-t border-[#e4eaf2] bg-white px-1 py-2 pb-4" role="tablist">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const active = tab.id === screen
            return (
              <button
                aria-controls={`painel-${tab.id}`}
                aria-selected={active}
                className={`flex min-h-11 flex-col items-center justify-center gap-1 rounded-lg text-[9px] font-medium transition ${active ? 'bg-[#f0f6ff] text-[#006bd6]' : 'text-[#728097] hover:bg-[#f5f7fa]'}`}
                key={tab.id}
                onClick={() => setScreen(tab.id)}
                role="tab"
                type="button"
              >
                <Icon aria-hidden="true" size={17} strokeWidth={active ? 2 : 1.6} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function HomeScreen() {
  return (
    <section aria-label="Tela Hoje de demonstração" id="painel-inicio" role="tabpanel">
      <p className="text-[10px] text-[#6b778a]">Domingo, 20 de setembro</p>
      <h3 className="mt-1 text-[25px] font-semibold tracking-[-0.05em]">Olá, Julia.</h3>
      <p className="mt-1 text-[11px] text-[#5f6d80]">4 lembretes hoje · 1 já feito. Deixa o resto comigo.</p>
      <div className="mt-5 rounded-2xl border border-[#d8e8fb] bg-[#e8f2ff] p-4">
        <span className="flex items-center gap-1.5 text-[10px] text-[#365778]">
          <CalendarClock size={13} /> Próximo lembrete · em 30 min
        </span>
        <h4 className="mt-3 text-[16px] font-semibold tracking-[-0.03em]">Sair para a terapia</h4>
        <p className="mt-1 text-[11px] text-[#506985]">Sessão às 16:00. Saindo às 15:30 você chega sem correria.</p>
        <div className="mt-4 flex items-center justify-between text-[10px] text-[#355779]">
          <span className="rounded-full bg-white px-2 py-1">Aviso em 3 etapas</span>
          <span className="grid size-6 place-items-center rounded-full bg-white">
            <ChevronRight size={14} />
          </span>
        </div>
      </div>
      <div className="mt-3 rounded-2xl border border-[#e6ecf5] bg-white p-3.5">
        <div className="flex items-center justify-between">
          <h4 className="text-[13px] font-semibold">Como está a energia?</h4>
          <span className="text-[9px] text-[#687489]">10 segundos</span>
        </div>
        <div className="mt-3 grid grid-cols-5 gap-1.5">
          {['😣', '😕', '😐', '🙂', '😄'].map((face, i) => (
            <span
              className={`grid h-8 place-items-center rounded-xl text-[15px] ${i === 3 ? 'bg-[#6d4de0] shadow-[0_0_0_3px_#f0ebff]' : 'bg-[#f3f0fd]'}`}
              key={face}
            >
              {face}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-[9px] text-[#5f6d80]">
        <span>
          <span className="mr-1 inline-block size-1.5 rounded-full bg-[#38a985]" />
          Sequência de check-ins
        </span>
        <strong className="font-medium">5 dias seguidos</strong>
      </div>
    </section>
  )
}

function RemindersScreen() {
  return (
    <section aria-label="Lembretes de demonstração" id="painel-lembretes" role="tabpanel">
      <p className="text-[10px] text-[#6b778a]">A gente lembra por você</p>
      <h3 className="mt-1 text-[25px] font-semibold tracking-[-0.05em]">Lembretes.</h3>
      <p className="mt-1 text-[11px] text-[#5f6d80]">Na hora certa, do jeito certo.</p>
      <div className="mt-4">
        <ReminderRow detail="Feito às 09:04" done icon={Check} time="09:00" title="Remédio da manhã" />
        <ReminderRow detail="Adiado para 11:30" icon={AlarmClock} time="11:00" title="Responder a faculdade" tone="amber" />
        <ReminderRow detail="Passo 1 de 3 concluído" icon={Split} time="14:00" title="Relatório do trabalho" tone="violet" />
        <ReminderRow detail="Aviso 30 min antes" icon={CalendarClock} time="15:30" title="Sair para a terapia" tone="blue" />
      </div>
      <p className="mt-4 text-center text-[9px] text-[#687489]">Adiar, dividir ou concluir com um toque.</p>
    </section>
  )
}

function ReminderRow({
  time,
  title,
  detail,
  icon: Icon,
  done = false,
  tone = 'green',
}: {
  time: string
  title: string
  detail: string
  icon: LucideIcon
  done?: boolean
  tone?: 'green' | 'amber' | 'violet' | 'blue'
}) {
  const toneClass = {
    green: 'bg-[#e0f5ed] text-[#27876b]',
    amber: 'bg-[#fff1d9] text-[#a3620a]',
    violet: 'bg-[#eee9ff] text-[#6d4de0]',
    blue: 'bg-[#e4f0ff] text-[#006bd6]',
  }[tone]
  return (
    <div className="flex items-center gap-3 border-b border-[#edf1f6] py-3">
      <time className="w-8 text-[10px] text-[#65748d]">{time}</time>
      <span className={`grid size-7 shrink-0 place-items-center rounded-full ${toneClass}`}>
        <Icon size={13} />
      </span>
      <div className="min-w-0">
        <strong className={`block text-[11px] font-semibold ${done ? 'text-[#65748d] line-through' : ''}`}>{title}</strong>
        <span className="mt-0.5 block text-[9px] text-[#65748d]">{detail}</span>
      </div>
    </div>
  )
}

function FocusScreen() {
  return (
    <section aria-label="Foco de demonstração" id="painel-foco" role="tabpanel">
      <p className="text-[10px] text-[#6b778a]">Só uma coisa agora</p>
      <h3 className="mt-1 text-[25px] font-semibold tracking-[-0.05em]">Modo foco.</h3>
      <p className="mt-1 text-[11px] text-[#5f6d80]">Relatório do trabalho · passo 2 de 3</p>
      <div className="mx-auto mt-6 grid size-[180px] place-items-center rounded-full border-[3px] border-[#8d78dd] text-center shadow-[0_0_0_8px_#f1edfc]">
        <div>
          <span className="text-[10px] text-[#6f628d]">Faltam</span>
          <strong className="mt-1 block text-[43px] font-normal tracking-[-0.07em] text-[#513ca0]">18:24</strong>
          <small className="block text-[8px] text-[#6f628d]">Notificações pausadas</small>
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-2 text-[10px]">
        <span className="rounded-full bg-[#edf0f7] px-3 py-2 text-[#5a687d]">15 min</span>
        <span className="rounded-full bg-[#e7dffc] px-3 py-2 text-[#6046b0]">25 min</span>
        <span className="rounded-full bg-[#edf0f7] px-3 py-2 text-[#5a687d]">45 min</span>
      </div>
      <p className="mt-5 text-center text-[9px] text-[#687489]">Um aviso gentil quando o tempo acabar.</p>
    </section>
  )
}

function WeekScreen() {
  const bars = [75, 50, 40, 100, 100, 100, 100]
  return (
    <section aria-label="Resumo semanal de demonstração" id="painel-semana" role="tabpanel">
      <p className="text-[10px] text-[#6b778a]">14 a 20 de setembro</p>
      <h3 className="mt-1 text-[25px] font-semibold tracking-[-0.05em]">Sua semana.</h3>
      <p className="mt-1 text-[11px] text-[#5f6d80]">18 de 24 lembretes concluídos. Bonito de ver.</p>
      <div className="mt-5 rounded-2xl border border-[#e6ecf5] bg-white p-3.5">
        <div className="flex h-20 items-end justify-between gap-1.5">
          {bars.map((height, i) => (
            <span className="flex h-full w-full items-end rounded-md bg-[#edf1f7]" key={i}>
              <span className="block w-full rounded-md bg-[#006bd6]" style={{ height: `${height}%` }} />
            </span>
          ))}
        </div>
        <div className="mt-1.5 flex justify-between text-[8px] text-[#738099]">
          {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((d, i) => (
            <span className="w-full text-center" key={i}>
              {d}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-3 rounded-2xl border border-[#e4dcf6] bg-[#f6f3fd] p-3.5">
        <p className="text-[10px] font-semibold text-[#6046b0]">Para levar à sessão</p>
        <p className="mt-1 text-[10px] leading-4 text-[#4a3d6b]">Ansiedade antes das entregas na terça e quarta.</p>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-2xl border border-[#e6ecf5] bg-white p-3">
        <span className="text-[10px] font-semibold">Compartilhar com Dra. Ana</span>
        <span className="flex h-5 w-9 items-center justify-end rounded-full bg-[#27876b] p-0.5">
          <span className="size-4 rounded-full bg-white" />
        </span>
      </div>
    </section>
  )
}
