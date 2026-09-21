import { useState, type ReactNode } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  CircleCheck,
  Clock3,
  Heart,
  LockKeyhole,
  Menu,
  NotebookPen,
  ShieldCheck,
  Sparkles,
  TimerReset,
  X,
  type LucideIcon,
} from 'lucide-react'

type Screen = 'inicio' | 'agenda' | 'insights' | 'foco'

type Tab = { id: Screen; label: string; icon: LucideIcon }

const tabs: Tab[] = [
  { id: 'inicio', label: 'Início', icon: Sparkles },
  { id: 'agenda', label: 'Agenda', icon: CalendarDays },
  { id: 'insights', label: 'Insights', icon: NotebookPen },
  { id: 'foco', label: 'Foco', icon: TimerReset },
]

const brandLogo = `${import.meta.env.BASE_URL}brand/logo.png`
const brandSymbol = `${import.meta.env.BASE_URL}brand/symbol.png`

const faqs = [
  {
    question: 'O que já existe no aplicativo?',
    answer:
      'A experiência atual reúne agenda, tarefas e consultas, check-ins de humor e energia, insights em texto e sessões de foco. Esta página mostra essas áreas com dados de demonstração.',
  },
  {
    question: 'Posso baixar o LembrAI?',
    answer:
      'O aplicativo está em desenvolvimento e validação. Ainda não há download público nem cadastro nesta apresentação.',
  },
  {
    question: 'Meu psicólogo pode ver meus registros?',
    answer:
      'A proposta de acompanhamento profissional prevê vínculo, verificação e consentimento por categoria. Essa jornada ainda passa por implementação e validação antes de qualquer uso público.',
  },
  {
    question: 'O LembrAI substitui terapia?',
    answer:
      'Não. Ele apoia a organização da rotina e o registro pessoal. Não oferece diagnóstico, prescrição ou atendimento de emergência.',
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [screen, setScreen] = useState<Screen>('inicio')

  const openDemo = (nextScreen: Screen) => {
    setScreen(nextScreen)
    document.getElementById('demonstracao')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-[#fbfcff] text-[#172033]">
      <a
        className="absolute left-4 top-[-4rem] z-50 rounded-full bg-[#172033] px-4 py-3 text-sm font-semibold text-white transition focus:top-4"
        href="#conteudo"
      >
        Pular para o conteúdo
      </a>

      <header className="sticky top-0 z-40 border-b border-[#172033]/[0.07] bg-[#fbfcff]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] w-[min(1180px,calc(100%-2rem))] items-center justify-between gap-6">
          <a aria-label="LembrAI, início" className="shrink-0" href="#inicio">
            <img
              alt="LembrAI"
              className="h-auto w-[118px]"
              height="39"
              src={brandLogo}
              width="144"
            />
          </a>

          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-8 text-sm font-medium text-[#526078] md:flex"
          >
            <a className="transition hover:text-[#006bd6]" href="#produto">
              O aplicativo
            </a>
            <a className="transition hover:text-[#006bd6]" href="#cuidado">
              Entre sessões
            </a>
            <a className="transition hover:text-[#006bd6]" href="#privacidade">
              Privacidade
            </a>
          </nav>

          <a
            className="hidden items-center gap-2 rounded-full bg-[#006bd6] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_28px_-12px_rgba(0,107,214,0.75)] transition hover:-translate-y-0.5 hover:bg-[#005bb7] md:inline-flex"
            href="#demonstracao"
          >
            Conheça o LembrAI <ArrowDownRight aria-hidden="true" size={16} />
          </a>

          <button
            aria-controls="menu-mobile"
            aria-expanded={menuOpen}
            className="grid size-11 place-items-center rounded-full text-[#172033] transition hover:bg-[#edf4ff] md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <span className="sr-only">{menuOpen ? 'Fechar menu' : 'Abrir menu'}</span>
            {menuOpen ? <X aria-hidden="true" size={21} /> : <Menu aria-hidden="true" size={21} />}
          </button>
        </div>

        {menuOpen && (
          <nav
            aria-label="Navegação móvel"
            className="border-t border-[#172033]/[0.07] bg-white px-4 py-4 md:hidden"
            id="menu-mobile"
          >
            <div className="mx-auto grid w-[min(1180px,100%)] gap-1">
              {[
                ['O aplicativo', '#produto'],
                ['Entre sessões', '#cuidado'],
                ['Privacidade', '#privacidade'],
              ].map(([label, href]) => (
                <a
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-[#36435a] hover:bg-[#edf4ff]"
                  href={href}
                  key={href}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
              <a
                className="mt-2 flex items-center justify-between rounded-2xl bg-[#006bd6] px-4 py-3 text-sm font-semibold text-white"
                href="#demonstracao"
                onClick={() => setMenuOpen(false)}
              >
                Explore a demonstração <ArrowDownRight aria-hidden="true" size={17} />
              </a>
            </div>
          </nav>
        )}
      </header>

      <main id="conteudo">
        <section className="relative isolate overflow-hidden pt-16 sm:pt-20 lg:pt-24" id="inicio">
          <div className="absolute inset-x-0 top-[28rem] -z-10 h-[30rem] bg-[radial-gradient(ellipse_at_center,rgba(205,220,255,0.7),transparent_65%)]" />
          <div className="mx-auto w-[min(1180px,calc(100%-2rem))] text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#dce8fa] bg-white px-3.5 py-2 text-xs font-semibold text-[#526078] shadow-[0_8px_25px_-20px_rgba(23,32,51,0.7)]">
              <span className="size-1.5 rounded-full bg-[#006bd6] shadow-[0_0_0_4px_#eaf4ff]" />
              Um espaço para o seu dia a dia
            </p>
            <h1 className="mx-auto mt-6 max-w-[940px] text-[clamp(3.1rem,8.2vw,7.25rem)] font-[650] leading-[0.93] tracking-[-0.075em] text-[#172033]">
              Mais espaço para cuidar de você.
            </h1>
            <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-[#5f6d80] sm:text-lg">
              Organize a rotina, registre o que sente e reserve um momento para o que importa.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
              <a
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#006bd6] px-5 text-sm font-semibold text-white shadow-[0_15px_34px_-14px_rgba(0,107,214,0.8)] transition hover:-translate-y-0.5 hover:bg-[#005bb7] active:translate-y-0"
                href="#demonstracao"
              >
                Explore o aplicativo <ArrowDownRight aria-hidden="true" size={18} />
              </a>
              <a
                className="inline-flex min-h-12 items-center gap-2 text-sm font-semibold text-[#006bd6] hover:underline hover:underline-offset-4"
                href="#cuidado"
              >
                Conheça a proposta <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            </div>
          </div>

          <div
            aria-label="Demonstração do aplicativo"
            className="relative mx-auto mt-16 flex min-h-[690px] w-full items-start justify-center sm:mt-20"
            id="demonstracao"
          >
            <div className="absolute left-1/2 top-24 -z-10 h-[320px] w-[min(94vw,980px)] -translate-x-1/2 rounded-[50%] border border-[#d9e4f6]" />
            <div className="absolute left-1/2 top-36 -z-10 h-[475px] w-[min(106vw,1220px)] -translate-x-1/2 -rotate-6 rounded-[50%] border border-[#e4ebf7]" />
            <FloatingNote
              className="left-[max(1rem,calc(50%-37rem))] top-48 hidden -rotate-6 lg:flex"
              icon={<NotebookPen size={17} />}
              subtitle="Uma percepção de hoje"
              title="Pequenas pausas fazem diferença."
              tone="violet"
            />
            <FloatingNote
              className="right-[max(1rem,calc(50%-38rem))] top-20 hidden rotate-6 lg:flex"
              icon={<CircleCheck size={17} />}
              subtitle="No seu ritmo"
              title="Uma coisa de cada vez."
              tone="green"
            />
            <Phone screen={screen} setScreen={setScreen} />
          </div>

          <p className="-mt-8 text-center text-xs text-[#738099] sm:mt-0">
            Toque nas abas para explorar. Telas ilustrativas com dados fictícios.
          </p>

          <div className="mx-auto mt-10 grid w-[min(1180px,calc(100%-2rem))] grid-cols-2 gap-x-4 gap-y-5 border-y border-[#e4eaf2] py-7 text-left text-xs font-medium text-[#5f6d80] sm:grid-cols-4 sm:text-sm">
            <FeatureStrip icon={CalendarDays} label="Rotina organizada" />
            <FeatureStrip icon={Heart} label="Check-ins pessoais" />
            <FeatureStrip icon={NotebookPen} label="Percepções registradas" />
            <FeatureStrip icon={TimerReset} label="Tempo de foco" />
          </div>
        </section>

        <section className="mx-auto w-[min(1180px,calc(100%-2rem))] py-24 sm:py-32" id="produto">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#62718a]">Feito para a vida real</p>
            <h2 className="mt-4 text-[clamp(2.35rem,5vw,4.6rem)] font-[650] leading-[0.98] tracking-[-0.06em] text-[#172033]">
              Seu dia tem muita coisa. Comece pelo que importa.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#5f6d80] sm:text-lg">
              Um lugar para reunir compromissos, perceber como você está e guardar o que não quer deixar passar.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <AgendaFeature />
            <InsightFeature />
          </div>
          <FocusFeature onOpen={() => openDemo('foco')} />
        </section>

        <section className="bg-[#f2f6fd] py-24 sm:py-32" id="cuidado">
          <div className="mx-auto grid w-[min(1180px,calc(100%-2rem))] items-center gap-16 lg:grid-cols-[0.9fr_1fr] lg:gap-24">
            <ConnectionIllustration />
            <div>
              <p className="text-sm font-semibold text-[#62718a]">Entre uma sessão e outra</p>
              <h2 className="mt-4 text-[clamp(2.35rem,4.6vw,4.4rem)] font-[650] leading-[0.98] tracking-[-0.06em] text-[#172033]">
                O que acontece no dia também merece espaço.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-[#5f6d80] sm:text-lg">
                Uma percepção, uma dificuldade, algo que você quer conversar. Seus registros ajudam a lembrar o que faz sentido levar para a próxima sessão.
              </p>
              <div className="mt-8 border-t border-[#dbe4f0] pt-7">
                <span className="rounded-md bg-[#e9e4f8] px-2.5 py-1.5 text-xs font-semibold text-[#674ca3]">
                  Em desenvolvimento
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
                  Uma ponte com o seu psicólogo.
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-6 text-[#5f6d80]">
                  A proposta inclui vínculos com profissionais verificados e compartilhamento por categoria, com a sua autorização. Essa experiência ainda passa por implementação e validação.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="mx-auto grid w-[min(1180px,calc(100%-2rem))] gap-14 py-24 sm:py-32 lg:grid-cols-[0.82fr_1.18fr] lg:gap-28"
          id="privacidade"
        >
          <div>
            <span className="grid size-12 place-items-center rounded-2xl bg-[#eaf4ff] text-[#006bd6]">
              <LockKeyhole aria-hidden="true" size={21} />
            </span>
            <h2 className="mt-6 text-[clamp(2.35rem,4.6vw,4.4rem)] font-[650] leading-[0.98] tracking-[-0.06em] text-[#172033]">
              Seus registros. Suas escolhas.
            </h2>
            <p className="mt-6 max-w-sm text-base leading-7 text-[#5f6d80]">
              Rotina e percepções são pessoais. O cuidado com essas informações faz parte da proposta.
            </p>
          </div>
          <div className="divide-y divide-[#e4eaf2] self-end">
            <Principle title="Um espaço pessoal">
              Agenda, check-ins, insights e sessões de foco são organizados na sua conta.
            </Principle>
            <Principle title="Compartilhar com intenção">
              O acompanhamento profissional previsto depende de vínculo e consentimento. Você escolhe as categorias que quer compartilhar.
            </Principle>
            <Principle title="Tecnologia com limites">
              O LembrAI apoia a rotina. Não substitui psicoterapia, diagnóstico ou atendimento de emergência.
            </Principle>
          </div>
        </section>

        <section className="border-t border-[#e4eaf2] bg-white py-24 sm:py-32">
          <div className="mx-auto grid w-[min(1180px,calc(100%-2rem))] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="text-sm font-semibold text-[#62718a]">Para conhecer melhor</p>
              <h2 className="mt-4 text-[clamp(2.25rem,4.1vw,3.9rem)] font-[650] leading-[0.98] tracking-[-0.06em]">
                Algumas respostas. Com clareza.
              </h2>
            </div>
            <div className="divide-y divide-[#e4eaf2] border-t border-[#e4eaf2]">
              {faqs.map((faq) => (
                <details className="group" key={faq.question}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-left text-base font-semibold tracking-[-0.02em] marker:content-none">
                    {faq.question}
                    <span className="grid size-7 shrink-0 place-items-center rounded-full border border-[#dce5f1] text-[#65748c] transition group-open:rotate-45">
                      <span className="text-xl font-light leading-none">+</span>
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-6 pr-6 text-sm leading-6 text-[#5f6d80]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[#f0f4fb] px-4 py-20 text-center sm:py-28">
          <img alt="" className="mx-auto h-auto w-14" height="74" src={brandSymbol} width="68" />
          <h2 className="mx-auto mt-7 max-w-3xl text-[clamp(2.65rem,5.6vw,5.4rem)] font-[650] leading-[0.96] tracking-[-0.07em] text-[#172033]">
            Um dia de cada vez. Um espaço só seu.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-base leading-7 text-[#5f6d80] sm:text-lg">
            Conheça um jeito de reunir o que importa na sua rotina.
          </p>
          <a
            className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#006bd6] px-5 text-sm font-semibold text-white shadow-[0_15px_34px_-14px_rgba(0,107,214,0.8)] transition hover:-translate-y-0.5 hover:bg-[#005bb7]"
            href="#demonstracao"
          >
            Explore o LembrAI <ArrowDownRight aria-hidden="true" size={18} />
          </a>
          <p className="mt-5 text-xs font-medium text-[#738099]">Aplicativo em desenvolvimento.</p>
        </section>
      </main>

      <footer className="mx-auto w-[min(1180px,calc(100%-2rem))] py-10">
        <div className="flex flex-col gap-8 border-b border-[#e4eaf2] pb-8 sm:flex-row sm:items-center sm:justify-between">
          <img alt="LembrAI" className="h-auto w-[118px]" height="39" src={brandLogo} width="144" />
          <p className="text-sm leading-6 text-[#5f6d80]">
            Um espaço para a sua rotina.<br />Mais presença no seu dia.
          </p>
          <a
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#006bd6] hover:underline hover:underline-offset-4"
            href="#produto"
          >
            Voltar ao aplicativo <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-xs text-[#738099] sm:flex-row sm:justify-between">
          <p>© 2026 LembrAI</p>
          <p>Apresentação do produto em desenvolvimento.</p>
        </div>
      </footer>
    </div>
  )
}

function Phone({
  screen,
  setScreen,
}: {
  screen: Screen
  setScreen: (screen: Screen) => void
}) {
  return (
    <div className="relative w-[304px] rounded-[43px] bg-[linear-gradient(135deg,#e5ebf5_0%,#718098_24%,#f2f5fa_52%,#8794a9_100%)] p-[7px] shadow-[0_38px_65px_-28px_rgba(34,52,89,0.7),0_8px_18px_rgba(34,52,89,0.14)] sm:w-[330px]">
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
        <div className="min-h-[420px] px-4 pb-3 pt-5">
          {screen === 'inicio' && <HomeScreen />}
          {screen === 'agenda' && <AgendaScreen />}
          {screen === 'insights' && <InsightScreen />}
          {screen === 'foco' && <FocusScreen />}
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
    <section aria-label="Tela inicial de demonstração" id="painel-inicio" role="tabpanel">
      <p className="text-[10px] text-[#6b778a]">Domingo, 20 de setembro</p>
      <h3 className="mt-1 text-[25px] font-semibold tracking-[-0.05em]">Olá, Julia.</h3>
      <p className="mt-1 text-[11px] text-[#5f6d80]">Seu dia, com mais leveza.</p>
      <div className="mt-5 rounded-2xl border border-[#d8e8fb] bg-[#e8f2ff] p-4">
        <span className="flex items-center gap-1.5 text-[10px] text-[#365778]"><Sparkles size={13} /> Sua próxima ação</span>
        <h4 className="mt-4 text-[16px] font-semibold tracking-[-0.03em]">Um tempo para você</h4>
        <p className="mt-1 text-[11px] text-[#506985]">Caminhada ao ar livre</p>
        <div className="mt-4 flex items-center justify-between text-[10px] text-[#355779]">
          <span>Hoje, 17:30</span>
          <span className="grid size-6 place-items-center rounded-full bg-white"><ChevronRight size={14} /></span>
        </div>
      </div>
      <div className="mt-3 rounded-2xl border border-[#e6ecf5] bg-white p-3.5">
        <div className="flex items-center justify-between"><h4 className="text-[13px] font-semibold">Como você está?</h4><Heart className="text-[#7258c5]" size={16} /></div>
        <p className="mt-1 text-[9px] text-[#5f6d80]">Um momento para se perceber.</p>
        <div className="mt-4 flex justify-between"><MoodFace mood="difficult" /><MoodFace mood="low" /><MoodFace mood="neutral" /><MoodFace mood="good" /><MoodFace mood="great" selected /></div>
        <div className="mt-2 flex justify-between text-[8px] text-[#687489]"><span>Mais difícil</span><span>Mais leve</span></div>
      </div>
      <div className="mt-4 flex items-center justify-between text-[8px] text-[#5f6d80]"><span><span className="mr-1 inline-block size-1 rounded-full bg-[#38a985]" />Seu ritmo de hoje</span><strong className="font-medium">Um passo de cada vez</strong></div>
    </section>
  )
}

function AgendaScreen() {
  return (
    <section aria-label="Agenda de demonstração" id="painel-agenda" role="tabpanel">
      <p className="text-[10px] text-[#6b778a]">Organize o que importa</p>
      <h3 className="mt-1 text-[25px] font-semibold tracking-[-0.05em]">Sua agenda.</h3>
      <p className="mt-1 text-[11px] text-[#5f6d80]">Há espaço para pequenas pausas.</p>
      <div className="mt-6 flex justify-between text-center text-[9px] text-[#63728b]">{['D 20', 'S 21', 'T 22', 'Q 23', 'Q 24'].map((day) => <span className="flex size-9 items-center justify-center rounded-full" key={day}>{day}</span>)}</div>
      <p className="mt-5 text-[11px] font-semibold">Domingo, 20 de setembro</p>
      <AgendaItem detail="Tarefa concluída" done time="09:00" title="Planejar a semana" />
      <AgendaItem detail="Consulta" time="16:00" title="Sessão de terapia" />
      <AgendaItem detail="Tarefa" time="17:30" title="Caminhada ao ar livre" />
      <p className="mt-5 text-center text-[9px] text-[#687489]">Tarefas e consultas reunidas no seu dia.</p>
    </section>
  )
}

function InsightScreen() {
  return (
    <section aria-label="Insights de demonstração" id="painel-insights" role="tabpanel">
      <p className="text-[10px] text-[#6b778a]">Guarde suas percepções</p>
      <h3 className="mt-1 text-[25px] font-semibold tracking-[-0.05em]">Seus insights.</h3>
      <p className="mt-1 text-[11px] text-[#5f6d80]">O que você quer lembrar depois?</p>
      <InsightNote body="Hoje saí para caminhar sem pressa. Foi bom ter um tempo só para mim." date="20 de setembro · 18:10" tag="Pessoal" title="As pequenas pausas" violet />
      <InsightNote body="Quero conversar sobre como organizo minhas expectativas." date="19 de setembro · 20:30" tag="Para a próxima sessão" title="Uma coisa que percebi" />
    </section>
  )
}

function FocusScreen() {
  return (
    <section aria-label="Foco de demonstração" id="painel-foco" role="tabpanel">
      <p className="text-[10px] text-[#6b778a]">Um momento de cada vez</p>
      <h3 className="mt-1 text-[25px] font-semibold tracking-[-0.05em]">Seu tempo de foco.</h3>
      <p className="mt-1 text-[11px] text-[#5f6d80]">Escolha uma coisa para fazer agora.</p>
      <div className="mx-auto mt-7 grid size-[190px] place-items-center rounded-full border-[3px] border-[#8d78dd] text-center shadow-[0_0_0_8px_#f1edfc]"><div><span className="text-[10px] text-[#6f628d]">Sessão de foco</span><strong className="mt-1 block text-[43px] font-normal tracking-[-0.07em] text-[#513ca0]">25:00</strong><small className="block text-[8px] text-[#6f628d]">Uma pausa no resto do mundo.</small></div></div>
      <div className="mt-6 flex justify-center gap-2 text-[10px]"><span className="rounded-full bg-[#edf0f7] px-3 py-2 text-[#5a687d]">15 min</span><span className="rounded-full bg-[#e7dffc] px-3 py-2 text-[#6046b0]">25 min</span><span className="rounded-full bg-[#edf0f7] px-3 py-2 text-[#5a687d]">45 min</span></div>
      <p className="mt-6 text-center text-[9px] text-[#687489]">Defina uma duração e acompanhe sua sessão.</p>
    </section>
  )
}

function MoodFace({ mood, selected = false }: { mood: string; selected?: boolean }) {
  const mouth = mood === 'difficult' ? 'rotate-180' : mood === 'low' ? 'rotate-180 scale-y-50' : mood === 'neutral' ? 'scale-y-0' : ''
  return <span className={`relative grid size-7 place-items-center rounded-full ${selected ? 'bg-[#6d4de0] text-white shadow-[0_0_0_3px_#f0ebff]' : 'bg-[#f3f0fd] text-[#9283b5]'}`}><span className="absolute -mt-2 flex gap-[5px]"><i className="size-[3px] rounded-full bg-current" /><i className="size-[3px] rounded-full bg-current" /></span><i className={`mt-2 h-1.5 w-3 rounded-b-full border-b border-current ${mouth}`} /></span>
}

function AgendaItem({ time, title, detail, done = false }: { time: string; title: string; detail: string; done?: boolean }) {
  return <div className="flex items-center gap-3 border-b border-[#edf1f6] py-4"><time className="w-8 text-[10px] text-[#65748d]">{time}</time><span className={`grid size-5 place-items-center rounded-full ${done ? 'bg-[#e0f5ed] text-[#27876b]' : 'border border-[#c5d5e8]'}`}>{done && <Check size={13} />}</span><div><strong className="block text-[11px] font-semibold">{title}</strong><span className="mt-1 block text-[9px] text-[#65748d]">{detail}</span></div></div>
}

function InsightNote({ tag, title, body, date, violet = false }: { tag: string; title: string; body: string; date: string; violet?: boolean }) {
  return <article className={`mt-4 rounded-2xl border p-4 ${violet ? 'border-[#e4dcf6] bg-[#f0ecfb]' : 'border-[#e4eaf2] bg-white'}`}><span className="rounded-md bg-white/70 px-2 py-1 text-[8px] font-semibold text-[#7357a6]">{tag}</span><h4 className="mt-3 text-[14px] font-semibold">{title}</h4><p className="mt-2 text-[10px] leading-4 text-[#5d5373]">{body}</p><small className="mt-4 block text-[8px] text-[#72688a]">{date}</small></article>
}

function FloatingNote({ className, icon, tone, title, subtitle }: { className: string; icon: ReactNode; tone: 'violet' | 'green'; title: string; subtitle: string }) {
  return <div className={`absolute z-10 items-center gap-3 rounded-2xl border border-white bg-white/90 p-4 shadow-[0_16px_40px_-15px_rgba(58,76,114,0.25)] backdrop-blur ${className}`}><span className={`grid size-9 place-items-center rounded-xl ${tone === 'violet' ? 'bg-[#eee9ff] text-[#6d4de0]' : 'bg-[#e1f5ec] text-[#27876b]'}`}>{icon}</span><span><small className="block text-[10px] text-[#728097]">{subtitle}</small><strong className="mt-1 block max-w-36 text-xs leading-5 text-[#26344a]">{title}</strong></span></div>
}

function FeatureStrip({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return <span className="flex items-center gap-2"><Icon aria-hidden="true" className="text-[#75839a]" size={18} strokeWidth={1.65} />{label}</span>
}

function AgendaFeature() {
  return <article className="overflow-hidden rounded-[28px] bg-[#edf4fc]"><div className="p-7 sm:p-10"><span className="grid size-11 place-items-center rounded-2xl bg-[#deedff] text-[#006bd6]"><CalendarDays size={20} /></span><h3 className="mt-6 text-[clamp(1.75rem,3vw,2.35rem)] font-[650] leading-[1.06] tracking-[-0.05em]">Menos coisas na cabeça.<br />Mais clareza no dia.</h3><p className="mt-4 max-w-sm text-sm leading-6 text-[#5f6d80]">Organize tarefas e consultas na agenda. Conclua, edite ou adie quando os planos mudarem.</p></div><div className="mx-6 mt-2 rounded-t-2xl border border-[#e4eaf2] bg-white p-5 shadow-[0_14px_35px_-20px_rgba(77,112,158,0.3)] sm:mx-10"><div className="flex items-center justify-between"><strong className="text-sm">Hoje</strong><span className="text-[10px] text-[#65748d]">Seu dia, no seu ritmo</span></div><div className="mt-4 space-y-3"><MiniTask detail="10:00 · Tarefa" done title="Reservar uma pausa" /><MiniTask detail="16:00 · Consulta" title="Sessão de terapia" /><MiniTask detail="17:30 · Tarefa" title="Caminhar um pouco" /></div></div></article>
}

function InsightFeature() {
  return <article className="overflow-hidden rounded-[28px] bg-[#f1effa]"><div className="p-7 sm:p-10"><span className="grid size-11 place-items-center rounded-2xl bg-[#e9e4f8] text-[#6d4de0]"><Heart size={20} /></span><h3 className="mt-6 text-[clamp(1.75rem,3vw,2.35rem)] font-[650] leading-[1.06] tracking-[-0.05em]">Como você está.<br />Com as suas palavras.</h3><p className="mt-4 max-w-sm text-sm leading-6 text-[#5f6d80]">Registre humor e energia em check-ins e guarde percepções em texto nos seus insights.</p></div><div className="mx-10 mt-5 min-h-64 rotate-[-3deg] rounded-t-2xl bg-white p-7 shadow-[0_18px_40px_-22px_rgba(83,60,142,0.28)]"><div className="flex items-center justify-between"><span className="rounded-md bg-[#f2eef9] px-2 py-1 text-[9px] font-semibold text-[#7357a6]">Meu insight</span><NotebookPen className="text-[#c0b6de]" size={17} /></div><p className="mt-7 text-[clamp(1.6rem,3vw,2.3rem)] leading-[1.26] tracking-[-0.04em] text-[#594780]">Não preciso resolver<br />tudo hoje.</p><div className="mt-7 h-px w-4/5 bg-[#e5dff1] shadow-[0_13px_0_#eee8f6]" /><small className="mt-10 block text-[9px] text-[#857499]">Um registro. Uma percepção. Seu momento.</small></div></article>
}

function FocusFeature({ onOpen }: { onOpen: () => void }) {
  return <article className="relative mt-5 grid overflow-hidden rounded-[28px] bg-[#17243c] text-white lg:grid-cols-2"><div className="relative z-10 p-8 sm:p-11"><span className="grid size-11 place-items-center rounded-2xl bg-white/10 text-[#c9d7ff]"><Clock3 size={20} /></span><h3 className="mt-6 text-[clamp(2rem,3.3vw,2.8rem)] font-[600] leading-[1.08] tracking-[-0.05em]">Um pouco de foco.<br />No seu tempo.</h3><p className="mt-4 max-w-sm text-sm leading-6 text-[#bdc9df]">Escolha a duração, inicie o temporizador e faça uma coisa de cada vez. Suas sessões concluídas ficam registradas.</p><button className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#d7e5ff] hover:underline hover:underline-offset-4" onClick={onOpen} type="button">Conheça a tela de foco <ArrowDownRight size={17} /></button></div><div className="relative flex min-h-80 items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(85,115,185,0.45),transparent_68%)]"><div className="absolute size-[17rem] rounded-full border border-[#7892ec]/20" /><div className="absolute size-[13rem] rounded-full border-[3px] border-[#91a6ff] shadow-[0_0_0_17px_rgba(145,166,255,0.03),0_0_70px_rgba(128,154,255,0.2)]" /><div className="relative z-10 text-center"><span className="text-xs text-[#bdcce4]">Seu momento</span><strong className="mt-1 block text-6xl font-light tracking-[-0.07em]">25:00</strong><span className="mt-1 block text-[10px] text-[#aebed9]">Respire. Comece por uma coisa.</span></div></div></article>
}

function MiniTask({ title, detail, done = false }: { title: string; detail: string; done?: boolean }) {
  return <div className="flex items-center gap-3"><span className={`grid size-5 place-items-center rounded-full ${done ? 'bg-[#e0f5ed] text-[#27876b]' : 'border border-[#c5d5e8]'}`}>{done && <Check size={12} />}</span><span className="flex-1"><strong className="block text-xs">{title}</strong><small className="mt-0.5 block text-[10px] text-[#65748d]">{detail}</small></span>{done && <span className="rounded-md bg-[#edf8f3] px-1.5 py-1 text-[9px] text-[#27876b]">Feito</span>}</div>
}

function ConnectionIllustration() {
  return <div className="relative mx-auto h-[310px] w-full max-w-[460px] bg-[radial-gradient(circle_at_center,rgba(220,231,251,0.9),transparent_63%)] sm:h-[400px]"><div className="absolute left-[16%] right-[16%] top-1/2 border-t border-dashed border-[#afbed8]" /><div className="absolute left-[4%] top-[15%] grid size-36 -rotate-6 place-items-center rounded-[24px] border border-white bg-white shadow-[0_18px_48px_-15px_rgba(97,122,166,0.35)] sm:size-40"><Heart className="text-[#397bd3]" size={35} /><span className="-mt-5 text-sm font-semibold">Você</span></div><div className="absolute bottom-[15%] right-[3%] grid size-36 rotate-6 place-items-center rounded-[24px] border border-white bg-white shadow-[0_18px_48px_-15px_rgba(97,122,166,0.35)] sm:size-40"><NotebookPen className="text-[#8565d4]" size={35} /><span className="-mt-5 text-center text-sm font-semibold">Seu psicólogo</span></div><div className="absolute left-1/2 top-1/2 z-10 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#f0ebff] text-[#7258c5] shadow-[0_0_0_10px_#f2f6fd]"><ShieldCheck size={23} /></div><span className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap text-xs font-medium text-[#5f6d80]"><Check className="text-[#27876b]" size={15} />Compartilhar é uma escolha sua.</span></div>
}

function Principle({ title, children }: { title: string; children: ReactNode }) {
  return <article className="py-6 first:pt-0"><h3 className="text-lg font-semibold tracking-[-0.03em]">{title}</h3><p className="mt-3 max-w-xl text-sm leading-6 text-[#5f6d80]">{children}</p></article>
}

export default App
