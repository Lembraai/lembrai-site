import { useState, type ReactNode } from 'react'
import {
  AlarmClock,
  ArrowDownRight,
  ArrowRight,
  BellRing,
  Brain,
  CalendarClock,
  ChartColumn,
  CircleCheck,
  Clock3,
  Hourglass,
  LockKeyhole,
  Menu,
  MessageCircleHeart,
  ShieldCheck,
  Split,
  Stethoscope,
  TimerReset,
  TrendingUp,
  X,
  type LucideIcon,
} from 'lucide-react'
import { Phone, type Screen } from './components/Phone'
import { ReminderTicker } from './components/ReminderTicker'
import { Reveal } from './components/Reveal'
import { SmartReminderDemo } from './components/SmartReminderDemo'
import { WaitlistForm, type Profile } from './components/WaitlistForm'
import { WeeklyReport } from './components/WeeklyReport'
import { useInView } from './hooks'

const brandLogo = `${import.meta.env.BASE_URL}brand/logo.png`
const brandSymbol = `${import.meta.env.BASE_URL}brand/symbol.png`

const navLinks = [
  ['Lembretes', '#lembretes'],
  ['Relatório semanal', '#relatorio'],
  ['Para psicólogos', '#psicologos'],
  ['Dúvidas', '#duvidas'],
] as const

const pains: { icon: LucideIcon; quote: string; answer: string }[] = [
  {
    icon: BellRing,
    quote: '“Eu sabia. Juro que sabia. E esqueci de novo.”',
    answer: 'Lembretes em etapas: antes, na hora e, se precisar, depois. Sem depender da sua memória.',
  },
  {
    icon: Hourglass,
    quote: '“Eram 14h. Pisquei e já eram 18h.”',
    answer: 'Avisos que consideram o tempo de preparo e de trajeto, para você sair sem correria.',
  },
  {
    icon: Split,
    quote: '“É tanta coisa que eu nem começo.”',
    answer: 'Tarefas grandes viram passos pequenos. Você só precisa fazer o próximo.',
  },
  {
    icon: MessageCircleHeart,
    quote: '“Chego na terapia e dá branco sobre a semana.”',
    answer: 'Um resumo semanal com o que aconteceu e o que você marcou para conversar.',
  },
]

const reminderFeatures: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: CalendarClock,
    title: 'Lembra antes, na hora e depois',
    body: 'Um aviso para se preparar, outro para começar e um toque gentil se algo ficou para trás.',
  },
  {
    icon: AlarmClock,
    title: 'Adiar sem culpa',
    body: '10 minutos, 1 hora ou amanhã. O dia se reorganiza e o prazo continua no radar.',
  },
  {
    icon: Split,
    title: 'Do “não sei por onde começar” ao primeiro passo',
    body: 'Divida qualquer tarefa em etapas curtas e veja o progresso a cada conclusão.',
  },
  {
    icon: Brain,
    title: 'Aprende o seu ritmo',
    body: 'Percebe os horários em que você mais conclui e sugere lembretes que funcionam para você.',
  },
]

const steps = [
  {
    title: 'Anote do seu jeito',
    body: 'Uma tarefa, uma consulta, um remédio. Em segundos, antes que a ideia escape.',
  },
  {
    title: 'O LembrAI lembra por você',
    body: 'Avisos no momento certo, com opção de adiar ou dividir em passos quando o dia apertar.',
  },
  {
    title: 'Toda semana, um resumo',
    body: 'Veja seus avanços e, se quiser, compartilhe com seu psicólogo antes da sessão.',
  },
]

const faqs = [
  {
    question: 'Preciso ter diagnóstico de TDAH para usar?',
    answer:
      'Não. O LembrAI foi pensado para quem convive com desatenção, esquecimento e dificuldade de organizar o tempo, com ou sem diagnóstico. Ele não faz diagnóstico nem avaliação clínica.',
  },
  {
    question: 'Quando vou poder usar o aplicativo?',
    answer:
      'O LembrAI está em desenvolvimento e validação. Quem entra na lista de espera recebe o convite para o acesso antecipado primeiro, por e-mail.',
  },
  {
    question: 'Meu psicólogo vai ver tudo o que eu registrar?',
    answer:
      'Não. O relatório só é compartilhado se você vincular seu psicólogo e autorizar. Você escolhe as categorias, como lembretes, humor ou foco, e pode deixar anotações pessoais só para você.',
  },
  {
    question: 'Os lembretes vão me encher de notificações?',
    answer:
      'A ideia é o contrário: poucos avisos, bem colocados. Você define quantas etapas quer e pode adiar ou silenciar quando precisar.',
  },
  {
    question: 'Sou psicólogo. Como funciona para mim?',
    answer:
      'Você recebe, com o consentimento do paciente, um resumo semanal com adesão aos lembretes, humor, foco e os temas que ele marcou para a sessão. Inscreva-se como profissional para participar da validação.',
  },
  {
    question: 'O LembrAI substitui terapia ou medicação?',
    answer:
      'Não. Ele apoia a rotina entre as sessões. Não substitui psicoterapia, acompanhamento médico, medicação ou atendimento de emergência.',
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [screen, setScreen] = useState<Screen>('inicio')
  const [profile, setProfile] = useState<Profile>('tdah')
  const [heroRef, heroInView] = useInView<HTMLElement>({ once: false })
  const [demoRef, demoInView] = useInView<HTMLDivElement>({ once: false, threshold: 0.2 })
  const [reminderRef, reminderInView] = useInView<HTMLDivElement>({ once: false, threshold: 0.35 })
  const [signupRef, signupInView] = useInView<HTMLElement>({ once: false })

  const goToSignup = (nextProfile?: Profile) => {
    if (nextProfile) setProfile(nextProfile)
    document.getElementById('inscricao')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const showStickyCta = !heroInView && !demoInView && !reminderInView && !signupInView

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
            <img alt="LembrAI" className="h-auto w-[118px]" height="39" src={brandLogo} width="144" />
          </a>

          <nav aria-label="Navegação principal" className="hidden items-center gap-7 text-sm font-medium text-[#526078] lg:flex">
            {navLinks.map(([label, href]) => (
              <a className="transition hover:text-[#006bd6]" href={href} key={href}>
                {label}
              </a>
            ))}
          </nav>

          <a
            className="hidden items-center gap-2 rounded-full bg-[#006bd6] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_28px_-12px_rgba(0,107,214,0.75)] transition hover:-translate-y-0.5 hover:bg-[#005bb7] lg:inline-flex"
            href="#inscricao"
          >
            Quero acesso antecipado <ArrowDownRight aria-hidden="true" size={16} />
          </a>

          <button
            aria-controls="menu-mobile"
            aria-expanded={menuOpen}
            className="grid size-11 place-items-center rounded-full text-[#172033] transition hover:bg-[#edf4ff] lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <span className="sr-only">{menuOpen ? 'Fechar menu' : 'Abrir menu'}</span>
            {menuOpen ? <X aria-hidden="true" size={21} /> : <Menu aria-hidden="true" size={21} />}
          </button>
        </div>

        {menuOpen && (
          <nav aria-label="Navegação móvel" className="max-h-[calc(100dvh-4.75rem)] overflow-y-auto border-t border-[#172033]/[0.07] bg-white px-4 py-4 lg:hidden" id="menu-mobile">
            <div className="mx-auto grid w-[min(1180px,100%)] gap-1">
              {navLinks.map(([label, href]) => (
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
                href="#inscricao"
                onClick={() => setMenuOpen(false)}
              >
                Quero acesso antecipado <ArrowDownRight aria-hidden="true" size={17} />
              </a>
            </div>
          </nav>
        )}
      </header>

      <main id="conteudo">
        <section className="relative isolate overflow-hidden pt-14 sm:pt-20 lg:pt-24" id="inicio" ref={heroRef}>
          <div className="absolute inset-x-0 top-[26rem] -z-10 h-[30rem] bg-[radial-gradient(ellipse_at_center,rgba(205,220,255,0.7),transparent_65%)]" />
          <div className="mx-auto w-[min(1180px,calc(100%-2rem))] text-center">
            <p className="fade-up inline-flex items-center gap-2 rounded-full border border-[#dce8fa] bg-white px-3.5 py-2 text-xs font-semibold text-[#526078] shadow-[0_8px_25px_-20px_rgba(23,32,51,0.7)]">
              <span className="pulse-dot size-1.5 rounded-full bg-[#006bd6]" />
              Pensado para quem vive com TDAH<span className="hidden sm:inline"> · Lista de espera aberta</span>
            </p>
            <h1 className="fade-up mx-auto text-balance mt-6 max-w-[980px] text-[clamp(2.9rem,7.6vw,6.75rem)] font-[650] leading-[0.95] tracking-[-0.07em] text-[#172033] [animation-delay:80ms]">
              Seu cérebro não precisa <span className="text-gradient">lembrar de tudo.</span>
            </h1>
            <p className="fade-up mx-auto mt-7 max-w-2xl text-base leading-7 text-[#5f6d80] sm:text-lg [animation-delay:160ms]">
              O LembrAI lembra por você na hora certa, transforma tarefas grandes em passos pequenos e prepara um
              resumo da sua semana para levar à terapia.
            </p>
            <div className="fade-up mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5 [animation-delay:240ms]">
              <button
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#006bd6] px-6 text-sm font-semibold text-white shadow-[0_15px_34px_-14px_rgba(0,107,214,0.8)] transition hover:-translate-y-0.5 hover:bg-[#005bb7] active:translate-y-0"
                onClick={() => goToSignup()}
                type="button"
              >
                Quero acesso antecipado
                <ArrowRight aria-hidden="true" className="transition group-hover:translate-x-0.5" size={18} />
              </button>
              <a
                className="inline-flex min-h-12 items-center gap-2 text-sm font-semibold text-[#006bd6] hover:underline hover:underline-offset-4"
                href="#lembretes"
              >
                Ver os lembretes em ação <ArrowDownRight aria-hidden="true" size={16} />
              </a>
            </div>
          </div>

          <div
            aria-label="Demonstração do aplicativo"
            className="relative mx-auto mt-12 flex w-full flex-col items-center px-4 sm:mt-16 lg:min-h-[690px] lg:flex-row lg:items-start lg:justify-center lg:px-0"
            id="demonstracao"
            ref={demoRef}
          >
            <div className="absolute left-1/2 top-24 -z-10 h-[320px] w-[min(94vw,980px)] -translate-x-1/2 rounded-[50%] border border-[#d9e4f6]" />
            <div className="absolute left-1/2 top-36 -z-10 h-[475px] w-[min(106vw,1220px)] -translate-x-1/2 -rotate-6 rounded-[50%] border border-[#e4ebf7]" />
            <ReminderTicker className="float-slow relative z-10 mb-6 lg:absolute lg:left-[max(1rem,calc(50%-37rem))] lg:top-40 lg:mb-0 lg:-rotate-3" />
            <FloatingNote
              className="right-[max(1rem,calc(50%-38rem))] top-20 hidden rotate-6 lg:flex"
              icon={<CircleCheck size={17} />}
              subtitle="Hoje, até agora"
              title="3 de 4 lembretes feitos."
              tone="green"
            />
            <FloatingNote
              className="right-[max(1rem,calc(50%-35rem))] top-[23rem] hidden -rotate-3 lg:flex"
              icon={<ChartColumn size={17} />}
              subtitle="Domingo, 19:00"
              title="Seu resumo semanal está pronto."
              tone="violet"
            />
            <Phone screen={screen} setScreen={setScreen} />
          </div>

          <p className="mx-auto mt-6 max-w-xs px-4 text-center text-xs leading-5 text-[#738099]">
            Toque nas abas do celular para explorar. Telas ilustrativas com dados fictícios.
          </p>

          <div className="mx-auto mt-8 grid w-[min(1180px,calc(100%-2rem))] grid-cols-1 gap-x-4 gap-y-4 border-y border-[#e4eaf2] py-6 text-left text-sm font-medium text-[#5f6d80] min-[400px]:grid-cols-2 sm:mt-10 sm:grid-cols-4 sm:py-7">
            <FeatureStrip icon={BellRing} label="Lembretes inteligentes" />
            <FeatureStrip icon={Split} label="Tarefas em passos" />
            <FeatureStrip icon={TimerReset} label="Modo foco" />
            <FeatureStrip icon={ChartColumn} label="Relatório semanal" />
          </div>
        </section>

        <section className="mx-auto w-[min(1180px,calc(100%-2rem))] py-24 sm:py-32" id="tdah">
          <Reveal className="max-w-2xl">
            <Eyebrow>Se você tem TDAH, conhece bem</Eyebrow>
            <SectionTitle>Não é falta de vontade. É que a cabeça não para.</SectionTitle>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#5f6d80] sm:text-lg">
              Lembrar de tudo, calcular o tempo e começar tarefas cansa mais quando a atenção funciona do seu jeito. O
              LembrAI assume essa parte.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pains.map((pain, index) => (
              <Reveal delay={index * 80} key={pain.quote}>
                <article className="group flex h-full flex-col rounded-[26px] border border-[#e4eaf2] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#cddcf0] hover:shadow-[0_26px_50px_-32px_rgba(40,60,110,0.5)]">
                  <span className="grid size-11 place-items-center rounded-2xl bg-[#edf4ff] text-[#006bd6] transition group-hover:bg-[#006bd6] group-hover:text-white">
                    <pain.icon size={20} />
                  </span>
                  <p className="mt-5 text-lg font-semibold leading-snug tracking-[-0.03em] text-[#172033]">{pain.quote}</p>
                  <p className="mt-auto border-t border-[#edf1f6] pt-4 text-sm leading-6 text-[#5f6d80]">
                    <strong className="font-semibold text-[#006bd6]">Com o LembrAI: </strong>
                    {pain.answer}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="bg-[#f2f6fd] py-24 sm:py-32" id="lembretes">
          <div className="mx-auto grid w-[min(1180px,calc(100%-2rem))] items-center gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow>Lembretes inteligentes</Eyebrow>
                <SectionTitle>Lembretes que entendem que a vida acontece.</SectionTitle>
                <p className="mt-6 max-w-xl text-base leading-7 text-[#5f6d80] sm:text-lg">
                  Nada de alarme que você ignora no automático. O LembrAI avisa com contexto, deixa você negociar o horário
                  e ajuda a dar o primeiro passo.
                </p>
              </Reveal>
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {reminderFeatures.map((feature, index) => (
                  <Reveal delay={index * 70} key={feature.title}>
                    <IconItem body={feature.body} icon={feature.icon} title={feature.title} />
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal delay={120}>
              <div ref={reminderRef}>
                <SmartReminderDemo />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto w-[min(1180px,calc(100%-2rem))] py-24 sm:py-32" id="como-funciona">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>Como funciona</Eyebrow>
            <SectionTitle>Três passos. Zero esforço de memória.</SectionTitle>
          </Reveal>
          <div className="relative mt-14">
            <div aria-hidden="true" className="absolute left-[16%] right-[16%] top-7 hidden border-t border-dashed border-[#c3d1e6] md:block" />
            <ol className="relative grid gap-10 md:grid-cols-3 md:gap-5">
              {steps.map((step, index) => (
                <li className="text-center" key={step.title}>
                  <Reveal delay={index * 100}>
                    <span className="mx-auto grid size-14 place-items-center rounded-full border-4 border-[#fbfcff] bg-[#006bd6] text-lg font-semibold text-white shadow-[0_12px_28px_-12px_rgba(0,107,214,0.8)]">
                      {index + 1}
                    </span>
                    <h3 className="mt-6 text-xl font-semibold tracking-[-0.03em]">{step.title}</h3>
                    <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[#5f6d80]">{step.body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
          <Reveal className="mt-16">
            <FocusFeature onOpen={() => setScreen('foco')} />
          </Reveal>
        </section>

        <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f3effc_0%,#fbfcff_100%)] py-24 sm:py-32" id="relatorio">
          <div className="mx-auto grid w-[min(1180px,calc(100%-2rem))] items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal>
              <Eyebrow>Relatório semanal</Eyebrow>
              <SectionTitle>Sua semana inteira, pronta para a sessão.</SectionTitle>
              <p className="mt-6 max-w-xl text-base leading-7 text-[#5f6d80] sm:text-lg">
                Todo domingo, o LembrAI junta lembretes cumpridos, humor, energia e tempo de foco em um resumo claro. Você
                enxerga padrões e chega à terapia sabendo o que quer conversar.
              </p>
              <ul className="mt-8 grid gap-4">
                <CheckItem>Veja o que avançou, não só o que ficou para trás.</CheckItem>
                <CheckItem>Descubra seus dias e horários mais produtivos.</CheckItem>
                <CheckItem>Marque durante a semana o que quer levar para a sessão.</CheckItem>
                <CheckItem>Compartilhe com seu psicólogo só se quiser, e só o que escolher.</CheckItem>
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <WeeklyReport />
            </Reveal>
          </div>
        </section>

        <section className="bg-[#17243c] py-24 text-white sm:py-32" id="psicologos">
          <div className="mx-auto grid w-[min(1180px,calc(100%-2rem))] gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
            <Reveal>
              <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-[#c9d7ff]">
                <Stethoscope aria-hidden="true" size={21} />
              </span>
              <p className="mt-6 text-sm font-semibold text-[#9fb2d6]">Para psicólogos</p>
              <h2 className="mt-4 text-[clamp(2.35rem,4.6vw,4.4rem)] font-[650] leading-[0.98] tracking-[-0.06em]">
                Menos “não lembro”. Mais contexto na sessão.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-7 text-[#bdc9df] sm:text-lg">
                Acompanhe pacientes com TDAH entre as sessões com um relatório semanal autorizado por eles. Menos tempo
                reconstruindo a semana, mais tempo para o que importa.
              </p>
              <button
                className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-white px-6 text-sm font-semibold text-[#17243c] transition hover:-translate-y-0.5 hover:bg-[#e8efff]"
                onClick={() => goToSignup('psicologo')}
                type="button"
              >
                Quero participar como profissional
                <ArrowRight aria-hidden="true" className="transition group-hover:translate-x-0.5" size={18} />
              </button>
            </Reveal>
            <div className="grid gap-4 self-center sm:grid-cols-2">
              {[
                { icon: TrendingUp, title: 'Adesão à rotina', body: 'Lembretes cumpridos, adiados e os dias mais difíceis da semana.' },
                { icon: MessageCircleHeart, title: 'Temas para a sessão', body: 'O que o paciente marcou para conversar, com as palavras dele.' },
                { icon: Clock3, title: 'Humor, energia e foco', body: 'Tendências simples de ler, sem planilhas nem exportações.' },
                { icon: ShieldCheck, title: 'Consentimento primeiro', body: 'Vínculo verificado e compartilhamento por categoria, revogável a qualquer momento.' },
              ].map((item, index) => (
                <Reveal delay={index * 80} key={item.title}>
                  <article className="h-full rounded-[24px] border border-white/10 bg-white/[0.04] p-6 transition hover:border-white/20 hover:bg-white/[0.07]">
                    <item.icon aria-hidden="true" className="text-[#9fb6ff]" size={22} />
                    <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#aebbd3]">{item.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          className="mx-auto grid w-[min(1180px,calc(100%-2rem))] gap-14 py-24 sm:py-32 lg:grid-cols-[0.82fr_1.18fr] lg:gap-28"
          id="privacidade"
        >
          <Reveal>
            <span className="grid size-12 place-items-center rounded-2xl bg-[#eaf4ff] text-[#006bd6]">
              <LockKeyhole aria-hidden="true" size={21} />
            </span>
            <SectionTitle>Seus dados. Suas regras.</SectionTitle>
            <p className="mt-6 max-w-sm text-base leading-7 text-[#5f6d80]">
              Sua rotina e o que você sente são pessoais. Privacidade faz parte do produto desde o primeiro dia.
            </p>
          </Reveal>
          <Reveal className="divide-y divide-[#e4eaf2] self-end" delay={100}>
            <Principle title="Um espaço só seu">
              Lembretes, check-ins, anotações e sessões de foco ficam na sua conta. Ninguém vê sem a sua autorização.
            </Principle>
            <Principle title="Compartilhar com intenção">
              O relatório só chega ao psicólogo depois de vínculo e consentimento. Você escolhe as categorias e pode
              revogar quando quiser.
            </Principle>
            <Principle title="Tecnologia com limites">
              O LembrAI apoia a rotina. Não faz diagnóstico e não substitui psicoterapia, medicação ou atendimento de
              emergência.
            </Principle>
          </Reveal>
        </section>

        <section className="border-t border-[#e4eaf2] bg-white py-24 sm:py-32" id="duvidas">
          <div className="mx-auto grid w-[min(1180px,calc(100%-2rem))] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <Reveal>
              <Eyebrow>Dúvidas frequentes</Eyebrow>
              <h2 className="mt-4 text-[clamp(2.25rem,4.1vw,3.9rem)] font-[650] leading-[0.98] tracking-[-0.06em]">
                Respostas curtas. Sem enrolação.
              </h2>
            </Reveal>
            <div className="divide-y divide-[#e4eaf2] border-t border-[#e4eaf2]">
              {faqs.map((faq) => (
                <details className="group" key={faq.question}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-left text-base font-semibold tracking-[-0.02em] marker:content-none">
                    {faq.question}
                    <span className="grid size-7 shrink-0 place-items-center rounded-full border border-[#dce5f1] text-[#65748c] transition group-open:rotate-45 group-open:border-[#006bd6] group-open:text-[#006bd6]">
                      <span className="text-xl font-light leading-none">+</span>
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-6 pr-6 text-sm leading-6 text-[#5f6d80]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          className="relative isolate overflow-hidden bg-[#f0f4fb] px-4 py-24 sm:py-32"
          id="inscricao"
          ref={signupRef}
        >
          <div className="absolute left-1/2 top-0 -z-10 h-[34rem] w-[60rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,107,214,0.12),transparent_65%)]" />
          <div className="mx-auto grid w-[min(1180px,100%)] items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <Reveal>
              <img alt="" className="h-auto w-14" height="74" src={brandSymbol} width="68" />
              <p className="mt-6 text-sm font-semibold text-[#62718a]">Acesso antecipado</p>
              <h2 className="mt-4 text-[clamp(2.5rem,5vw,4.8rem)] font-[650] leading-[0.96] tracking-[-0.07em] text-[#172033]">
                Entre na lista. A gente lembra de te chamar.
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-[#5f6d80] sm:text-lg">
                Estamos abrindo o LembrAI aos poucos. Inscreva-se para testar antes de todo mundo e ajudar a construir um
                app feito para cérebros com TDAH.
              </p>
              <ul className="mt-8 grid gap-3 text-sm text-[#36435a]">
                <CheckItem>Convite para o acesso antecipado por e-mail</CheckItem>
                <CheckItem>Sua opinião entra direto nas próximas versões</CheckItem>
                <CheckItem>Psicólogos participam da validação do relatório</CheckItem>
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <WaitlistForm onProfileChange={setProfile} profile={profile} />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="mx-auto w-[min(1180px,calc(100%-2rem))] py-10 pb-[calc(7.5rem+env(safe-area-inset-bottom))] lg:pb-10">
        <div className="flex flex-col gap-8 border-b border-[#e4eaf2] pb-8 sm:flex-row sm:items-center sm:justify-between">
          <img alt="LembrAI" className="h-auto w-[118px]" height="39" src={brandLogo} width="144" />
          <p className="text-sm leading-6 text-[#5f6d80]">
            Lembretes inteligentes para quem vive com TDAH.
            <br />
            Um resumo semanal para cuidar melhor, junto com seu psicólogo.
          </p>
          <a
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#006bd6] hover:underline hover:underline-offset-4"
            href="#inscricao"
          >
            Entrar na lista <ArrowRight aria-hidden="true" size={16} />
          </a>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-xs text-[#738099] sm:flex-row sm:justify-between">
          <p>© 2026 LembrAI</p>
          <p>Aplicativo em desenvolvimento. Não substitui acompanhamento profissional.</p>
        </div>
      </footer>

      <div
        aria-hidden={!showStickyCta}
        className={`fixed inset-x-3 z-40 transition duration-300 lg:hidden bottom-[max(0.75rem,env(safe-area-inset-bottom))] ${showStickyCta ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}
      >
        <button
          className="flex min-h-14 w-full items-center justify-between gap-3 rounded-full bg-[#172033] py-2 pl-5 pr-2 text-left text-sm font-semibold text-white shadow-[0_20px_40px_-18px_rgba(23,32,51,0.8)]"
          onClick={() => goToSignup()}
          tabIndex={showStickyCta ? 0 : -1}
          type="button"
        >
          <span>
            <span className="block text-[11px] font-medium text-[#aebbd3]">Lista de espera aberta</span>
            Quero acesso antecipado
          </span>
          <span className="grid size-10 place-items-center rounded-full bg-[#006bd6]">
            <ArrowRight aria-hidden="true" size={18} />
          </span>
        </button>
      </div>
    </div>
  )
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-sm font-semibold text-[#62718a]">{children}</p>
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-4 text-balance text-[clamp(2.35rem,4.8vw,4.5rem)] font-[650] leading-[0.98] tracking-[-0.06em] text-[#172033]">
      {children}
    </h2>
  )
}

function IconItem({ icon: Icon, title, body }: { icon: LucideIcon; title: string; body: string }) {
  return (
    <article>
      <span className="grid size-10 place-items-center rounded-xl bg-white text-[#006bd6] shadow-[0_10px_24px_-16px_rgba(0,107,214,0.7)]">
        <Icon aria-hidden="true" size={19} />
      </span>
      <h3 className="mt-4 text-base font-semibold tracking-[-0.02em]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#5f6d80]">{body}</p>
    </article>
  )
}

function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm leading-6 text-[#36435a] sm:text-base">
      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[#e1f5ec] text-[#27876b]">
        <CircleCheck aria-hidden="true" size={15} />
      </span>
      {children}
    </li>
  )
}

function FloatingNote({ className, icon, tone, title, subtitle }: { className: string; icon: ReactNode; tone: 'violet' | 'green'; title: string; subtitle: string }) {
  return <div className={`absolute z-10 items-center gap-3 rounded-2xl border border-white bg-white/90 p-4 shadow-[0_16px_40px_-15px_rgba(58,76,114,0.25)] backdrop-blur ${className}`}><span className={`grid size-9 place-items-center rounded-xl ${tone === 'violet' ? 'bg-[#eee9ff] text-[#6d4de0]' : 'bg-[#e1f5ec] text-[#27876b]'}`}>{icon}</span><span><small className="block text-[10px] text-[#728097]">{subtitle}</small><strong className="mt-1 block max-w-40 text-xs leading-5 text-[#26344a]">{title}</strong></span></div>
}

function FeatureStrip({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return <span className="flex items-center gap-2"><Icon aria-hidden="true" className="text-[#75839a]" size={18} strokeWidth={1.65} />{label}</span>
}

function FocusFeature({ onOpen }: { onOpen: () => void }) {
  return (
    <article className="relative grid overflow-hidden rounded-[28px] bg-[#17243c] text-white lg:grid-cols-2">
      <div className="relative z-10 p-8 sm:p-11">
        <span className="grid size-11 place-items-center rounded-2xl bg-white/10 text-[#c9d7ff]">
          <TimerReset aria-hidden="true" size={20} />
        </span>
        <h3 className="mt-6 text-[clamp(2rem,3.3vw,2.8rem)] font-[600] leading-[1.08] tracking-[-0.05em]">
          Quando for a hora,
          <br />
          só uma coisa na tela.
        </h3>
        <p className="mt-4 max-w-sm text-sm leading-6 text-[#bdc9df]">
          O modo foco mostra apenas o passo atual, conta o tempo por você e avisa com gentileza quando é hora de pausar.
          Ótimo para vencer a procrastinação e também para sair do hiperfoco.
        </p>
        <a
          className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#d7e5ff] hover:underline hover:underline-offset-4"
          href="#demonstracao"
          onClick={onOpen}
        >
          Ver a tela de foco <ArrowDownRight aria-hidden="true" size={17} />
        </a>
      </div>
      <div className="relative flex min-h-80 items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(85,115,185,0.45),transparent_68%)]">
        <div className="absolute size-[17rem] rounded-full border border-[#7892ec]/20" />
        <div className="spin-slow absolute size-[13rem] rounded-full border-[3px] border-[#91a6ff] border-t-transparent shadow-[0_0_70px_rgba(128,154,255,0.2)]" />
        <div className="relative z-10 text-center">
          <span className="text-xs text-[#bdcce4]">Passo 2 de 3</span>
          <strong className="mt-1 block text-6xl font-light tracking-[-0.07em]">18:24</strong>
          <span className="mt-1 block text-[10px] text-[#aebed9]">Só revisar o resumo.</span>
        </div>
      </div>
    </article>
  )
}

function Principle({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="py-6 first:pt-0">
      <h3 className="text-lg font-semibold tracking-[-0.03em]">{title}</h3>
      <p className="mt-3 max-w-xl text-sm leading-6 text-[#5f6d80]">{children}</p>
    </article>
  )
}

export default App
