import { motion } from 'framer-motion'
import { Pencil, Trash2, Eye } from 'lucide-react'
import { Thumb, StatusPill, CategoryPill, CookTime, Toggle, InlineTitle, Checkbox } from './Parts'
import { fmtTime } from '../lib/utils'

export function EntityCard({ item, selected, fresh, onSelect, onOpen, onEdit, onDelete, onToggle, onRename }) {
  const act = (fn) => (e) => { e.stopPropagation(); fn(item) }
  return (
    <motion.article
      layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.25 } }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`card group relative cursor-pointer overflow-hidden transition duration-300 hover:-translate-y-1.5 hover:shadow-brand ${selected ? 'ring-2 ring-brand' : ''} ${fresh ? 'fresh' : ''}`}
      onClick={() => onOpen(item)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Thumb src={item.imageUrl} alt={item.name} zoom className="h-full w-full" />
        <div className={`absolute left-3 top-3 transition-opacity ${selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 focus-within:opacity-100'}`}><Checkbox checked={selected} onChange={() => onSelect(item.id)} label={`Select ${item.name}`} /></div>
        <div className="absolute right-3 top-3 flex gap-1.5 opacity-0 transition duration-300 group-hover:opacity-100 focus-within:opacity-100">
          {[[Eye, 'View', onOpen], [Pencil, 'Edit', onEdit], [Trash2, 'Delete', onDelete]].map(([Icon, label, fn]) => (
            <button key={label} aria-label={`${label} ${item.name}`} onClick={act(fn)} className="grid h-9 w-9 translate-y-1 place-items-center rounded-full bg-cream/95 text-ink shadow transition duration-300 hover:bg-brand hover:text-cream group-hover:translate-y-0">
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="min-w-0 text-2xl leading-tight"><InlineTitle value={item.name} onSave={(name) => onRename(item, name)} /></h3>
        </div>
        <p className="line-clamp-2 text-sm text-ink/70">{item.description}</p>
        <div className="flex flex-wrap items-center gap-2">
          <CategoryPill>{item.category}</CategoryPill>
          <StatusPill published={item.published} />
        </div>
        <div className="flex items-center justify-between border-t border-brand-tint pt-3">
          <div className="flex items-center gap-3"><CookTime text={fmtTime(item.cookTime)} /><span className="label-caps text-brand">{item.difficulty}</span></div>
          <Toggle checked={item.published} label={`${item.published ? 'Unpublish' : 'Publish'} ${item.name}`} onChange={(v) => onToggle(item, v)} />
        </div>
      </div>
    </motion.article>
  )
}
