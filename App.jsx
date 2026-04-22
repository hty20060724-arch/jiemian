import React, { useEffect, useMemo, useState } from 'react'
import {
  BarChart3,
  Brain,
  ChevronRight,
  CircleDollarSign,
  Cpu,
  Database,
  Gauge,
  Globe2,
  HeartPulse,
  Hospital,
  LineChart,
  MonitorDot,
  MoveRight,
  Radar,
  ShieldCheck,
  Sparkles,
  Target,
  TimerReset,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const navItems = [
  { id: 'hero', label: '首页' },
  { id: 'products', label: '产品模块' },
  { id: 'tech', label: '核心技术' },
  { id: 'dashboard', label: '数据大屏' },
  { id: 'validation', label: '临床验证' },
  { id: 'barriers', label: '竞争壁垒' },
  { id: 'finance', label: '融资规划' },
]

const productCards = [
  {
    id: '眠安',
    title: '眠安',
    subtitle: '硬件层 · 便携睡眠脑电监测系统',
    icon: MonitorDot,
    desc: '≤16导柔性干电极，面向床旁与基层筛查场景，快速完成睡眠脑电采集与AI自动分期。',
    points: ['便携式脑电监测', 'AI自动分期 ≥85%', '床旁即测即传', '低成本基层部署'],
    accent: 'from-cyan-400 to-teal-400',
  },
  {
    id: '眠枢',
    title: '眠枢',
    subtitle: '算法层 · AI精准分型云平台',
    icon: Cpu,
    desc: '图神经网络 + 多模态融合，构建 NeuroCloud 神经调控云平台，完成失眠分型、风险评估与治疗推荐。',
    points: ['图神经网络', '多模态融合', 'NeuroCloud 平台', '云端持续迭代'],
    accent: 'from-emerald-400 to-cyan-400',
  },
  {
    id: '觉晓',
    title: '觉晓',
    subtitle: '治疗层 · 个性化神经调控方案',
    icon: Target,
    desc: '基于 rTMS 靶向治疗，通过脑电特征定位个体靶点，实现精准干预与随访管理闭环。',
    points: ['rTMS 靶向治疗', '脑电特征定位', '个体化方案', '疗效随访管理'],
    accent: 'from-sky-400 to-indigo-400',
  },
]

const processSteps = [
  { label: '监测', detail: '床旁脑电采集', icon: MonitorDot },
  { label: '分型', detail: '云端 AI 解析', icon: Database },
  { label: '干预', detail: '个性化 rTMS', icon: Target },
  { label: '随访', detail: '疗效闭环管理', icon: TimerReset },
]

const metrics = [
  { label: '目标人群', value: 380000000, suffix: '人', color: '#1D9E75' },
  { label: '准确率', value: 85, suffix: '%', color: '#2F80ED' },
  { label: '医院协作', value: 14, suffix: '家', color: '#7C3AED' },
  { label: '参与人数', value: 23700, suffix: '人', color: '#F59E0B' },
]

const techCards = [
  {
    title: '便携脑电 + AI 分期',
    icon: MonitorDot,
    desc: '将睡眠监测从重型 PSG 向轻量床旁系统升级，支持基层筛查与高频随访。',
  },
  {
    title: '图神经网络分型',
    icon: Brain,
    desc: '融合临床、脑电与行为多模态数据，完成失眠表型识别与疗效预测。',
  },
  {
    title: 'rTMS 个性化调控',
    icon: Zap,
    desc: '依据脑电特征定位刺激靶点，让治疗从标准化迈向精准化、可迭代。',
  },
]

const financeData = [
  { year: '2027', revenue: 199, margin: 50.8, netProfit: -134, installations: 17 },
  { year: '2028', revenue: 545, margin: 64.6, netProfit: -85, installations: 52 },
  { year: '2029', revenue: 1315, margin: 71.9, netProfit: 306, installations: 122 },
  { year: '2030', revenue: 2879, margin: 76.1, netProfit: 1189, installations: 252 },
]

const businessLayers = [
  { name: '设备销售', value: 10, margin: '50-55%', desc: '获客入口' },
  { name: 'SaaS 订阅', value: 32, margin: '88-92%', desc: '核心利润引擎' },
  { name: '治疗授权', value: 26, margin: '92-95%', desc: '收入放大器' },
  { name: '数据服务', value: 18, margin: '75-85%', desc: '远期估值支撑' },
]

const barrierItems = [
  'NMPA 二类医疗器械注册壁垒',
  '装机量驱动的数据网络效应',
  '临床 SOP 路径锁定',
  '顶尖学者 KOL 网络壁垒',
  '区域独家代理先发优势',
]

const fundingTimeline = [
  { stage: '政府支持', amount: '500万', note: '政策背书与临床验证起步' },
  { stage: '天使轮', amount: '250万', note: '产品化与试点扩张' },
  { stage: 'A轮', amount: '1000万', note: '规模化复制与商业落地' },
]

function formatNumber(num) {
  return new Intl.NumberFormat('zh-CN').format(num)
}

function useCountUp(target, duration = 1400) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let frame
    const start = performance.now()
    const tick = now => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration])

  return value
}

function AnimatedMetric({ label, value, suffix, color }) {
  const animated = useCountUp(value)
  const display = value >= 1000000 ? formatNumber(animated) : animated
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur">
      <div className="text-sm text-slate-300">{label}</div>
      <div className="mt-2 flex items-end gap-2 font-mono text-3xl font-bold text-white md:text-4xl" style={{ color }}>
        <span>{display}</span>
        <span className="text-base font-semibold text-slate-300">{suffix}</span>
      </div>
    </div>
  )
}

function CountUpMetric({ label, value, suffix, icon: Icon }) {
  const animated = useCountUp(value)
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center transition hover:-translate-y-1">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-400/10 text-emerald-300">
        <Icon className="h-8 w-8" />
      </div>
      <div className="mt-6 font-mono text-5xl font-bold text-white">{animated}</div>
      <div className="mt-2 text-lg text-slate-300">{suffix} {label}</div>
    </div>
  )
}


function SectionHeader({ kicker, title, desc }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
        <Sparkles className="h-4 w-4" />
        {kicker}
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-8 text-slate-300 md:text-lg">{desc}</p>
    </div>
  )
}

export default function App() {
  const [activeProduct, setActiveProduct] = useState('眠安')
  const [financeView, setFinanceView] = useState('revenue')

  const activeCard = productCards.find(item => item.id === activeProduct) || productCards[0]

  const chartData = useMemo(() => financeData.map(item => ({
    ...item,
    revenueDisplay: item.revenue,
    installationsDisplay: item.installations,
    marginDisplay: item.margin,
  })), [])

  const revenueBarData = businessLayers.map((item, index) => ({
    ...item,
    fill: ['#1D9E75', '#2F80ED', '#7C3AED', '#F59E0B'][index],
  }))

  const scrollTo = id => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-[#071827] text-white selection:bg-emerald-400 selection:text-slate-950">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(29,158,117,0.18),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(47,128,237,0.14),_transparent_24%),linear-gradient(180deg,#0A2540_0%,#071827_60%,#05121d_100%)]" />
      <header className="sticky top-0 z-50 border-b border-white/8 bg-slate-950/65 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-3 text-left">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 text-slate-950 shadow-lg shadow-emerald-500/20">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xl font-bold tracking-[0.2em]">眠鼎</div>
              <div className="text-xs text-slate-400">BCI 精准失眠诊疗系统</div>
            </div>
          </button>
          <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 lg:flex">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button onClick={() => scrollTo('finance')} className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:scale-[1.02] hover:bg-emerald-300">
            获取商业价值 <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main>
        <section id="hero" className="relative overflow-hidden">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
                <Hospital className="h-4 w-4" />
                蚌埠医科大学团队研发 · 面向医院与睡眠机构的 To B 平台
              </div>
              <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
                从经验驱动，
                <span className="block bg-gradient-to-r from-white via-cyan-100 to-emerald-300 bg-clip-text text-transparent">
                  走向数据驱动的精准失眠诊疗
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                眠鼎整合床旁脑电监测、云端 AI 分型与个性化 rTMS 干预，打造从筛查、分型、治疗到随访的闭环系统，推动中国失眠诊疗升级。
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button onClick={() => scrollTo('products')} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5">
                  了解产品模块 <MoveRight className="h-4 w-4" />
                </button>
                <button onClick={() => scrollTo('validation')} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                  查看临床验证 <Radar className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
                <AnimatedMetric label="目标人群" value={380000000} suffix="人" color="#1D9E75" />
                <AnimatedMetric label="AI 准确率" value={85} suffix="%" color="#2F80ED" />
                <AnimatedMetric label="联合医院" value={14} suffix="家" color="#7C3AED" />
                <AnimatedMetric label="参与样本" value={23700} suffix="人" color="#F59E0B" />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-emerald-400/20 to-cyan-500/10 blur-3xl" />
              <div className="rounded-[2rem] border border-white/10 bg-slate-950/65 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-slate-400">诊疗闭环</div>
                    <div className="text-2xl font-semibold text-white">监测 → 分型 → 干预 → 随访</div>
                  </div>
                  <div className="rounded-2xl bg-emerald-400/10 p-3 text-emerald-300">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-8 space-y-4">
                  {processSteps.map((step, index) => {
                    const Icon = step.icon
                    return (
                      <div key={step.label} className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/5 p-4">
                        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-emerald-300">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-white">{step.label}</h3>
                            <span className="text-xs text-slate-400">0{index + 1}</span>
                          </div>
                          <p className="mt-1 text-sm text-slate-300">{step.detail}</p>
                        </div>
                        {index < processSteps.length - 1 && <ChevronRight className="h-5 w-5 text-slate-500" />}
                      </div>
                    )
                  })}
                </div>
                <div className="mt-6 rounded-3xl border border-emerald-400/20 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 p-5">
                  <div className="flex items-center gap-3 text-emerald-200">
                    <TrendingUp className="h-5 w-5" />
                    <span className="font-semibold">核心转化逻辑</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    通过低成本筛查与高准确度分型，把睡眠诊疗从单点判断升级为标准化、可复制、可扩张的闭环服务。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="px-4 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              kicker="三大产品模块"
              title="从硬件、算法到治疗，形成完整闭环"
              desc="点击切换三大模块，查看眠安、眠枢、觉晓在精准睡眠诊疗链条中的角色与价值。"
            />
            <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="grid gap-4">
                {productCards.map(card => {
                  const Icon = card.icon
                  const active = activeProduct === card.id
                  return (
                    <button
                      key={card.id}
                      onClick={() => setActiveProduct(card.id)}
                      className={`group rounded-3xl border p-6 text-left transition duration-300 hover:-translate-y-1 ${active ? 'border-emerald-400/40 bg-white/10 shadow-2xl shadow-emerald-500/10' : 'border-white/10 bg-white/5 hover:bg-white/8'}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${card.accent} text-slate-950 shadow-lg`}>
                          <Icon className="h-7 w-7" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <h3 className="text-2xl font-semibold text-white">{card.title}</h3>
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">{card.subtitle}</span>
                          </div>
                          <p className="mt-3 leading-7 text-slate-300">{card.desc}</p>
                        </div>
                      </div>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {card.points.map(point => (
                          <span key={point} className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs text-slate-200">
                            {point}
                          </span>
                        ))}
                      </div>
                    </button>
                  )
                })}
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/25 md:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-slate-400">当前模块</div>
                    <h3 className="text-3xl font-semibold text-white">{activeCard.title}</h3>
                  </div>
                  <div className="rounded-2xl bg-emerald-400/10 p-3 text-emerald-300">
                    <activeCard.icon className="h-6 w-6" />
                  </div>
                </div>
                <p className="mt-4 max-w-xl leading-7 text-slate-300">{activeCard.desc}</p>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-2 text-emerald-300">
                      <HeartPulse className="h-4 w-4" />
                      <span className="text-sm font-semibold">闭环流程</span>
                    </div>
                    <div className="mt-4 space-y-4">
                      {processSteps.map((step, idx) => (
                        <div key={step.label} className="flex items-center gap-3">
                          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/8 text-white">
                            <step.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">{idx + 1}. {step.label}</div>
                            <div className="text-xs text-slate-400">{step.detail}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 p-5">
                    <div className="flex items-center gap-2 text-cyan-200">
                      <Globe2 className="h-4 w-4" />
                      <span className="text-sm font-semibold">市场与价值</span>
                    </div>
                    <div className="mt-4 text-sm leading-7 text-slate-300">
                      中国约 3.8 亿失眠人群，就诊率仅 5%。眠鼎以 To B 模式切入医院与睡眠健康机构，用标准化设备 + 云端 SaaS + 治疗授权持续放大价值。
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="tech" className="px-4 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              kicker="核心技术区"
              title="三大技术突破，构建不可替代的临床竞争力"
              desc="技术不仅提升诊断效率，也决定商业化扩张速度与长期壁垒。"
            />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {techCards.map(card => {
                const Icon = card.icon
                return (
                  <div key={card.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/8">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-400/10 text-emerald-300">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold text-white">{card.title}</h3>
                    <p className="mt-4 leading-7 text-slate-300">{card.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section id="dashboard" className="px-4 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              kicker="数据大屏"
              title="财务趋势与商业模式一屏呈现"
              desc="支持切换营收 / 毛利率 / 装机量维度，辅助理解规模化路径与利润弹性。"
            />
            <div className="mt-12 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
              <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-black/20 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-sm text-slate-400">财务预测趋势</div>
                    <h3 className="text-2xl font-semibold text-white">2027-2030</h3>
                  </div>
                  <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
                    {[
                      { id: 'revenue', label: '营收' },
                      { id: 'margin', label: '毛利率' },
                      { id: 'installations', label: '装机量' },
                    ].map(btn => (
                      <button
                        key={btn.id}
                        onClick={() => setFinanceView(btn.id)}
                        className={`rounded-full px-4 py-2 text-sm transition ${financeView === btn.id ? 'bg-emerald-400 text-slate-950' : 'text-slate-300 hover:text-white'}`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-8 h-[420px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData}>
                      <defs>
                        <linearGradient id="revenueLine" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1D9E75" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#1D9E75" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="installLine" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2F80ED" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#2F80ED" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                      <XAxis dataKey="year" stroke="rgba(255,255,255,0.45)" />
                      <YAxis stroke="rgba(255,255,255,0.45)" />
                      <Tooltip
                        contentStyle={{ background: '#081725', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, color: '#fff' }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="revenue" name="营收(万元)" stroke="#1D9E75" fillOpacity={1} fill="url(#revenueLine)" opacity={financeView === 'revenue' ? 1 : 0.2} />
                      <Area type="monotone" dataKey="installations" name="装机量(台)" stroke="#2F80ED" fillOpacity={1} fill="url(#installLine)" opacity={financeView === 'installations' ? 1 : 0.2} />
                      <Bar dataKey="margin" name="毛利率(%)" fill="#7C3AED" opacity={financeView === 'margin' ? 0.95 : 0.18} radius={[10, 10, 0, 0]} />
                      {financeView === 'revenue' && <Line type="monotone" dataKey="revenue" stroke="#6EE7B7" strokeWidth={3} dot={{ r: 4 }} />}
                      {financeView === 'installations' && <Line type="monotone" dataKey="installations" stroke="#93C5FD" strokeWidth={3} dot={{ r: 4 }} />}
                      {financeView === 'margin' && <Line type="monotone" dataKey="margin" stroke="#C4B5FD" strokeWidth={3} dot={{ r: 4 }} />}
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-8">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <CircleDollarSign className="h-5 w-5" />
                    <span className="font-semibold">四层商业模式收益对比</span>
                  </div>
                  <div className="mt-6 h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueBarData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                        <XAxis type="number" stroke="rgba(255,255,255,0.45)" />
                        <YAxis type="category" dataKey="name" stroke="rgba(255,255,255,0.45)" width={80} />
                        <Tooltip contentStyle={{ background: '#081725', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, color: '#fff' }} />
                        <Bar dataKey="value" radius={[0, 12, 12, 0]}>
                          {revenueBarData.map(entry => <Cell key={entry.name} fill={entry.fill} />)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center gap-2 text-cyan-200">
                    <LineChart className="h-5 w-5" />
                    <span className="font-semibold">利润结构重点</span>
                  </div>
                  <div className="mt-5 space-y-4">
                    {businessLayers.map(layer => (
                      <div key={layer.name}>
                        <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                          <span>{layer.name}</span>
                          <span>{layer.margin}</span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" style={{ width: `${layer.value * 4}%` }} />
                        </div>
                        <div className="mt-1 text-xs text-slate-500">{layer.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="validation" className="px-4 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              kicker="临床验证"
              title="以真实医院数据建立可信增长"
              desc="合作医院、参与样本与准确率共同构成临床验证的三重证据。"
            />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <CountUpMetric label="联合医院" value={14} suffix="家" icon={Hospital} />
              <CountUpMetric label="参与人数" value={23700} suffix="人" icon={Users} />
              <CountUpMetric label="准确率" value={85} suffix="%" icon={Gauge} />
            </div>
            <div className="mt-8 rounded-[2rem] border border-emerald-400/20 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 p-6 text-slate-200">
              安徽 7 所机构基层试点已完成超 6,000 人次筛查，设备成本较传统 PSG 降低 70% 以上，为后续规模化复制提供了明确路径。
            </div>
          </div>
        </section>

        <section id="barriers" className="px-4 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              kicker="竞争壁垒"
              title="五层壁垒叠加，形成长期护城河"
              desc="从注册、数据、临床路径到渠道先发，构成复合型竞争壁垒。"
            />
            <div className="mt-12 grid gap-4 md:grid-cols-5">
              {barrierItems.map((item, index) => (
                <div key={item} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6">
                  <div className="absolute right-4 top-4 text-6xl font-black text-white/5">{index + 1}</div>
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400/10 text-emerald-300">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="finance" className="px-4 py-20 md:px-8 pb-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              kicker="融资规划"
              title="资金路径清晰，支持产品化与规模化"
              desc="以政府项目验证为起点，完成天使轮孵化，再进入 A 轮扩大临床与商业落地。"
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {fundingTimeline.map((item, idx) => (
                <div key={item.stage} className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-400">阶段 {idx + 1}</div>
                    <div className="rounded-full bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">{item.amount}</div>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{item.stage}</h3>
                  <p className="mt-3 leading-7 text-slate-300">{item.note}</p>
                  <div className="mt-6 h-2 rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" style={{ width: `${(idx + 1) * 33}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-6 text-center text-slate-300">
              结合设备销售、SaaS 订阅、治疗授权与临床数据服务，眠鼎具备清晰的收入分层与估值放大逻辑。
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-slate-500 md:px-8">
        眠鼎 · 面向失眠障碍的脑机接口精准诊疗系统
      </footer>
    </div>
  )
}
