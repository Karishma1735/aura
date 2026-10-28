import { motion } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp'

function Sparkline({ data }) {
  const max = Math.max(...data, 1)
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${28 - (v / max) * 24}`).join(' ')
  return (
    <svg viewBox="0 0 100 32" className="h-8 w-24 overflow-visible" aria-hidden="true">
      <motion.polyline points={pts} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: 'easeOut' }} />
    </svg>
  )
}

export function StatCard({ label, value, suffix = '', spark, icon: Icon, tone = 'default', index = 0 }) {
  const n = useCountUp(value)
  const hot = tone === 'brand'
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07, duration: 0.4, ease: 'easeOut' }}
      className={`rounded-card border p-5 transition duration-300 hover:-translate-y-1 hover:shadow-brand ${hot ? 'border-brand bg-brand text-cream' : 'border-brand-tint bg-cream-warm'}`}
    >
      <div className="flex items-center justify-between">
        <span className={`label-caps ${hot ? 'text-cream/80' : 'text-ink/60'}`}>{label}</span>
        {Icon && <Icon className={`h-5 w-5 ${hot ? 'text-cream' : 'text-brand'}`} />}
      </div>
      <div className="mt-3 flex items-end justify-between gap-2">
        <p className="font-display text-5xl font-semibold leading-none" aria-label={`${value}${suffix}`}>{n}<span className="text-2xl">{suffix}</span></p>
        {spark && <span className={hot ? 'text-cream' : 'text-brand'}><Sparkline data={spark} /></span>}
      </div>
    </motion.div>
  )
}
