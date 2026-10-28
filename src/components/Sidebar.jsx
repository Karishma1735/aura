import { motion } from 'framer-motion'
import { ChefHat, LayoutDashboard, Settings, ArrowUpRight } from 'lucide-react'
import { Logo } from './Logo'
import { ENTITY } from '../data/schema'

export const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'recipes', label: ENTITY.plural, icon: ChefHat },
  { id: 'settings', label: 'Settings', icon: Settings },
]

/** Desktop/tablet: left rail (icons only on md, full on lg). Mobile: bottom bar. */
export function Sidebar({ page, onNavigate }) {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[84px] flex-col border-r border-cherry-tint bg-cream-warm px-3 py-6 md:flex lg:w-64 lg:px-5">
        <div className="flex justify-center lg:justify-start">
          <span className="lg:hidden"><Logo compact /></span>
          <span className="hidden lg:block"><Logo /></span>
        </div>
        <nav className="mt-10 flex flex-col gap-1.5" aria-label="Main">
          {NAV.map(({ id, label, icon: Icon }) => {
            const active = page === id
            return (
              <button key={id} onClick={() => onNavigate(id)} aria-current={active ? 'page' : undefined} title={label}
                className={`relative flex items-center justify-center gap-3 rounded-full px-4 py-3 text-sm font-semibold transition-colors duration-300 lg:justify-start ${active ? 'text-cream' : 'text-ink/70 hover:text-cherry'}`}>
                {active && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-cherry shadow-soft" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                <Icon className="relative h-5 w-5 shrink-0" strokeWidth={1.9} />
                <span className="relative hidden lg:inline">{label}</span>
              </button>
            )
          })}
        </nav>
        <div className="mt-auto space-y-4">
          <a href="#/" className="group hidden items-center justify-between rounded-full border border-cherry-tint px-4 py-2.5 text-sm font-medium transition hover:bg-cherry hover:text-cream lg:flex">Back to site <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
          <div className="flex items-center justify-center gap-3 rounded-full bg-cream p-2 lg:justify-start lg:pr-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cherry font-display font-semibold text-cream">P</span>
            <div className="hidden leading-tight lg:block"><p className="text-sm font-semibold">Prashant</p><p className="text-xs text-ink/60">Head cook</p></div>
          </div>
        </div>
      </aside>

      <nav className="fixed inset-x-3 bottom-3 z-40 flex justify-around rounded-full border border-cherry-tint bg-cream-warm/95 p-1.5 shadow-cherry backdrop-blur md:hidden" aria-label="Main">
        {NAV.map(({ id, label, icon: Icon }) => {
          const active = page === id
          return (
            <button key={id} onClick={() => onNavigate(id)} aria-current={active ? 'page' : undefined} className={`relative flex flex-1 flex-col items-center gap-0.5 rounded-full py-2 text-[11px] font-semibold ${active ? 'text-cream' : 'text-ink/70'}`}>
              {active && <motion.span layoutId="nav-pill-m" className="absolute inset-0 rounded-full bg-cherry" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
              <Icon className="relative h-5 w-5" strokeWidth={1.9} /><span className="relative">{label}</span>
            </button>
          )
        })}
      </nav>
    </>
  )
}
