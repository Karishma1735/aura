import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowRight, Heart, LayoutGrid, Search, Undo2, Download, Sparkles, Star, Menu, X } from 'lucide-react'
import { Cherries, Logo, Sparkle } from '../components/Logo'
import { Thumb } from '../components/Parts'

const go = () => { window.location.hash = '#/app' }
const fade = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.6, ease: 'easeOut' } }

function CursorDot() {
  const [pos, setPos] = useState({ x: -50, y: -50 })
  const [big, setBig] = useState(false)
  useEffect(() => {
    const move = (e) => { setPos({ x: e.clientX, y: e.clientY }); setBig(!!e.target.closest?.('a,button')) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return <div aria-hidden="true" className={`cursor-dot pointer-events-none fixed left-0 top-0 z-[95] rounded-full bg-cherry mix-blend-multiply transition-[width,height,margin] duration-200 ${big ? '-ml-5 -mt-5 h-10 w-10 opacity-60' : '-ml-1.5 -mt-1.5 h-3 w-3'}`} style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }} />
}

function Nav() {
  const [open, setOpen] = useState(false)
  const links = [['Features', '#features'], ['Loved by cooks', '#love'], ['Start', '#start']]
  return (
    <header className="sticky top-0 z-50 border-b border-cherry-tint/70 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-3.5 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex" aria-label="Site">
          {links.map(([l, h]) => <a key={l} href={h} className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-cherry after:transition-all hover:text-cherry hover:after:w-full">{l}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={go} className="btn btn-primary group !px-5 !py-2.5">Open Dashboard <ArrowRight className="arrow h-4 w-4" /></button>
          <button className="grid h-10 w-10 place-items-center rounded-full md:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && <div className="flex flex-col gap-1 border-t border-cherry-tint px-5 py-3 md:hidden">{links.map(([l, h]) => <a key={l} href={h} onClick={() => setOpen(false)} className="rounded-full px-3 py-2 font-medium hover:bg-cherry-tint">{l}</a>)}</div>}
    </header>
  )
}

const heroCards = [
  ['Cherry Clafoutis', 'French · 45 min', 'photo-1488477181946-6428a0291777', 'rotate-[-6deg] left-0 top-6'],
  ['Butter Chicken', 'Indian · 60 min', 'photo-1603894584373-5ac82b2ae398', 'rotate-[4deg] right-0 top-0'],
  ['Strawberry Shortcake', 'Dessert · 35 min', 'photo-1464349095431-e9a21285b5f3', 'rotate-[-2deg] left-16 bottom-0'],
]

function Hero() {
  return (
    <section className="relative mx-auto grid max-w-[1280px] items-center gap-12 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-12 lg:pt-24">
      <div className="lg:col-span-7">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="label-caps inline-flex items-center gap-2 rounded-full border border-cherry/40 px-4 py-2 text-cherry"><Sparkle className="h-3 w-3" />The recipe box, reimagined</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mt-6 text-[clamp(3.2rem,9vw,7.2rem)] font-semibold leading-[0.92] tracking-[-0.035em]">
          Every great meal <span className="italic-accent font-normal">starts</span> with a well-kept page.
        </motion.h1>
        <p className="mt-7 max-w-xl text-lg text-ink/75">Cherrybook is a warm, fast home for every recipe you love. Add, edit, search and share them in seconds — no spreadsheets, no sticky notes.</p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <button onClick={go} className="btn btn-primary group !px-8 !py-4 text-base">Open Dashboard <ArrowRight className="arrow h-5 w-5" /></button>
          <a href="#features" className="btn btn-outline !px-8 !py-4 text-base">See how it works</a>
        </div>
        <p className="mt-6 flex items-center gap-2 text-sm text-ink/70"><span className="flex text-cherry">{Array.from({ length: 5 }, (_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</span>Loved by 12,000+ home cooks</p>
      </div>
      <div className="relative mx-auto h-[420px] w-full max-w-md lg:col-span-5 lg:h-[520px]" aria-hidden="true">
        <div className="absolute inset-6 rounded-[48px] bg-cherry-tint" />
        <Sparkle className="absolute -right-2 top-1/2 h-10 w-10 text-cherry" /><Sparkle className="absolute -left-3 top-1/3 h-6 w-6 text-cherry-deep" />
        {heroCards.map(([n, m, p, pos], i) => (
          <motion.div key={n} animate={{ y: [0, i % 2 ? 8 : -8, 0] }} transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }} className={`absolute w-56 overflow-hidden rounded-card border border-cherry-tint bg-cream shadow-cherry ${pos}`}>
            <Thumb src={`https://images.unsplash.com/${p}?auto=format&fit=crop&w=500&q=70`} className="h-36 w-full" />
            <div className="p-4"><p className="font-display text-lg leading-tight">{n}</p><p className="mt-0.5 text-xs text-ink/60">{m}</p></div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Marquee() {
  const words = ['Create', 'Search', 'Organize', 'Edit', 'Export', 'Undo', 'Share', 'Savor']
  const row = words.concat(words)
  return (
    <div className="overflow-hidden border-y border-cherry bg-cherry py-4 text-cream" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {row.map((w, i) => <span key={i} className="flex items-center gap-8 font-display text-3xl italic">{w}<Sparkle className="h-4 w-4" /></span>)}
      </div>
    </div>
  )
}

const features = [
  [LayoutGrid, 'Grid or table, your call', 'Flip between photo-first cards and a dense, sortable table. Both are keyboard friendly.'],
  [Search, 'Find anything instantly', 'Debounced search across names, tags and notes, plus filters for cuisine and status.'],
  [Undo2, 'Delete without fear', 'Every delete comes with a five-second Undo — bulk deletes too.'],
  [Download, 'Yours to take along', 'Export your whole collection to CSV whenever you like. No lock-in.'],
  [Heart, 'Drafts & favourites', 'Keep works-in-progress as drafts, then publish with one smooth toggle.'],
  [Sparkles, 'Joyful details', 'Gentle motion, cherry-tinted shadows, and a paper-grain finish. Reduced motion respected.'],
]

function Features() {
  return (
    <section id="features" className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8">
      <motion.div {...fade} className="max-w-2xl"><p className="label-caps text-cherry">Features</p><h2 className="mt-3 text-5xl leading-none sm:text-6xl">Everything a kitchen <span className="italic-accent">needs,</span> nothing it doesn't.</h2></motion.div>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(([Icon, t, d], i) => (
          <motion.article key={t} {...fade} transition={{ ...fade.transition, delay: (i % 3) * 0.08 }} className="card group p-7 transition duration-300 hover:-translate-y-1.5 hover:shadow-cherry">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-cherry text-cream transition duration-300 group-hover:rotate-[-8deg] group-hover:scale-110"><Icon className="h-5 w-5" strokeWidth={1.8} /></span>
            <h3 className="mt-6 text-2xl">{t}</h3><p className="mt-2 text-ink/70">{d}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

function Testimonial() {
  return (
    <section id="love" className="relative overflow-hidden bg-cherry py-24 text-cream">
      <Cherries className="absolute -right-10 -top-10 h-64 w-64 text-cream/10" />
      <motion.div {...fade} className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Sparkle className="mx-auto h-8 w-8" />
        <blockquote className="mt-6 font-display text-3xl font-normal leading-tight sm:text-5xl">“I finally retired the shoebox of recipe cards. Cherrybook is the first tool that <em>feels</em> like a kitchen.”</blockquote>
        <figcaption className="mt-8 flex items-center justify-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-full bg-cream font-display text-xl text-cherry">M</span><span className="text-left"><span className="block font-semibold">Marguerite Dubois</span><span className="text-sm text-cream/80">Pastry chef & home baker</span></span></figcaption>
      </motion.div>
    </section>
  )
}

function Cta() {
  return (
    <section id="start" className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8">
      <motion.div {...fade} className="rounded-[40px] border border-cherry-tint bg-cream-warm px-6 py-16 text-center sm:py-20">
        <h2 className="mx-auto max-w-3xl text-5xl leading-none sm:text-7xl">Ready to cook up your <span className="italic-accent">first page?</span></h2>
        <p className="mx-auto mt-5 max-w-lg text-ink/70">Twelve demo recipes are waiting. Add, edit and delete freely — it all stays on your device.</p>
        <button onClick={go} className="btn btn-primary group mt-9 !px-9 !py-4 text-base">Open Dashboard <ArrowRight className="arrow h-5 w-5" /></button>
      </motion.div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="overflow-hidden bg-cherry-deep text-cream">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-5 pt-12 text-sm sm:px-8">
        <span className="inline-flex items-center gap-2 font-display text-xl"><Cherries className="h-6 w-6" />Cherrybook</span>
        <nav className="flex gap-6 text-cream/80" aria-label="Footer"><a className="hover:text-cream" href="#features">Features</a><a className="hover:text-cream" href="#love">Reviews</a><a className="hover:text-cream" href="#/app">Dashboard</a></nav>
        <span className="text-cream/70">© {new Date().getFullYear()} Cherrybook. Made with butter.</span>
      </div>
      <p aria-hidden="true" className="select-none whitespace-nowrap pt-6 text-center font-display text-[clamp(5rem,23vw,20rem)] font-semibold leading-[0.8] tracking-[-0.05em] text-cream/95">Cherry<span className="italic font-normal">book</span></p>
    </footer>
  )
}

export function Landing() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <div>
      <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-cherry" aria-hidden="true" />
      <CursorDot />
      <Nav /><main><Hero /><Marquee /><Features /><Testimonial /><Cta /></main><Footer />
    </div>
  )
}
