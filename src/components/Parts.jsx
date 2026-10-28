import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Clock, Pencil } from 'lucide-react'
import { Cherries } from './Logo'
import { cn } from '../lib/utils'

/** Image with a brand-tint fallback if the URL is empty or broken. */
export function Thumb({ src, alt = '', className, zoom = false }) {
  const [bad, setBad] = useState(false)
  useEffect(() => setBad(false), [src])
  if (!src || bad) {
    return <div className={cn('grid place-items-center bg-brand-tint text-brand/70', className)} role="img" aria-label={alt || 'No image'}><Cherries className="h-1/3 w-1/3 max-h-12 max-w-12" /></div>
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} className={cn('object-cover', zoom && 'transition-transform duration-500 ease-out group-hover:scale-105', className)} />
}

export function StatusPill({ published }) {
  return (
    <span className={cn('pill', published ? 'bg-success/15 text-success-deep' : 'bg-brand-tint text-brand-deep')}>
      <span className={cn('h-1.5 w-1.5 rounded-full', published ? 'bg-success' : 'bg-brand')} />{published ? 'Published' : 'Draft'}
    </span>
  )
}

export const CategoryPill = ({ children }) => <span className="pill bg-brand-tint text-brand-deep">{children}</span>

export const CookTime = ({ text }) => <span className="inline-flex items-center gap-1 text-sm text-ink/70"><Clock className="h-3.5 w-3.5" />{text}</span>

/** Switch with a small bounce. */
export function Toggle({ checked, onChange, label, disabled }) {
  return (
    <button type="button" role="switch" aria-checked={checked} aria-label={label} disabled={disabled} onClick={(e) => { e.stopPropagation(); onChange(!checked) }}
      className={cn('relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300', checked ? 'bg-success' : 'bg-ink/25')}>
      <motion.span layout transition={{ type: 'spring', stiffness: 600, damping: 18 }} className={cn('absolute top-0.5 h-5 w-5 rounded-full bg-cream shadow', checked ? 'right-0.5' : 'left-0.5')} />
    </button>
  )
}

/** Click the pencil (or double-click the text) to rename in place. Enter saves, Esc cancels. */
export function InlineTitle({ value, onSave, className }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const ref = useRef(null)
  useEffect(() => { if (editing) ref.current?.select() }, [editing])

  const commit = () => {
    const v = draft.trim()
    setEditing(false)
    if (v.length >= 3 && v !== value) onSave(v)
    else setDraft(value)
  }
  if (editing) {
    return (
      <input ref={ref} value={draft} maxLength={60} aria-label="Edit name" onClick={(e) => e.stopPropagation()}
        onChange={(e) => setDraft(e.target.value)} onBlur={commit}
        onKeyDown={(e) => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') { setDraft(value); setEditing(false) } }}
        className={cn('w-full rounded-lg border border-brand bg-cream px-2 py-0.5 outline-none', className)} />
    )
  }
  return (
    <span className="group/inline inline-flex min-w-0 items-center gap-1.5">
      <span className={cn('truncate', className)} onDoubleClick={(e) => { e.stopPropagation(); setDraft(value); setEditing(true) }} title="Double-click to rename">{value}</span>
      <button type="button" aria-label={`Rename ${value}`} onClick={(e) => { e.stopPropagation(); setDraft(value); setEditing(true) }} className="shrink-0 rounded-full p-1 text-ink/40 opacity-0 transition hover:text-brand focus:opacity-100 group-hover/inline:opacity-100"><Pencil className="h-3.5 w-3.5" /></button>
    </span>
  )
}

export function Checkbox({ checked, onChange, label, indeterminate }) {
  return (
    <button type="button" role="checkbox" aria-checked={indeterminate ? 'mixed' : checked} aria-label={label} onClick={(e) => { e.stopPropagation(); onChange(!checked) }}
      className={cn('grid h-5 w-5 shrink-0 place-items-center rounded-md border transition', checked || indeterminate ? 'border-brand bg-brand text-cream' : 'border-brand/40 bg-cream hover:border-brand')}>
      {indeterminate ? <span className="h-0.5 w-2.5 rounded bg-cream" /> : checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
    </button>
  )
}
