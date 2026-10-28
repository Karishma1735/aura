import { motion } from 'framer-motion'
import { Plus, RotateCcw, SearchX } from 'lucide-react'
import { Cherries, Sparkle } from './Logo'
import { ENTITY } from '../data/schema'

function Illustration() {
  return (
    <div className="relative mx-auto h-40 w-40">
      <div className="absolute inset-0 rounded-full bg-brand-tint/70" />
      <motion.div className="absolute inset-0 grid place-items-center text-brand" animate={{ y: [0, -6, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}>
        <Cherries className="h-24 w-24" />
      </motion.div>
      <Sparkle className="absolute -right-1 top-3 h-6 w-6 text-brand" />
      <Sparkle className="absolute bottom-4 -left-3 h-4 w-4 text-brand-deep" />
    </div>
  )
}

/** kind: 'empty' (no data yet) | 'filtered' (no matches) | 'error' */
export function EmptyState({ kind = 'empty', message, onAction, onClear }) {
  const copy = {
    empty: { title: <>No {ENTITY.lower}s <span className="italic-accent">yet.</span></>, text: `Your cookbook is a blank page. Add your first ${ENTITY.lower} and watch it fill up.`, cta: `Add your first ${ENTITY.lower}`, icon: Plus },
    filtered: { title: <>Nothing <span className="italic-accent">matches.</span></>, text: 'Try a different search or clear the filters.', cta: 'Clear filters', icon: SearchX },
    error: { title: <>Something <span className="italic-accent">burned.</span></>, text: message || 'We could not load your recipes.', cta: 'Try again', icon: RotateCcw },
  }[kind]
  const Icon = copy.icon
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card px-6 py-14 text-center" role={kind === 'error' ? 'alert' : undefined}>
      <Illustration />
      <h3 className="mt-6 text-3xl sm:text-4xl">{copy.title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-ink/70">{copy.text}</p>
      <button className="btn btn-primary group mt-6" onClick={kind === 'filtered' ? onClear : onAction}><Icon className="h-4 w-4" />{copy.cta}</button>
    </motion.div>
  )
}
