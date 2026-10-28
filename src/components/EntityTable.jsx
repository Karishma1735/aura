import { AnimatePresence, motion } from 'framer-motion'
import { Pencil, Trash2 } from 'lucide-react'
import { Thumb, StatusPill, CategoryPill, Toggle, InlineTitle, Checkbox } from './Parts'
import { fmtDate, fmtTime } from '../lib/utils'

const TH = 'label-caps sticky top-0 z-10 bg-cream-warm px-4 py-3.5 text-left text-ink/60 border-b border-cherry/30'

export function EntityTable({ items, selected, freshId, allChecked, someChecked, onSelectAll, onSelect, onOpen, onEdit, onDelete, onToggle, onRename }) {
  return (
    <div className="card overflow-hidden">
      <div className="scroll-thin max-h-[640px] overflow-auto">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr>
              <th className={`${TH} w-12`}><Checkbox checked={allChecked} indeterminate={!allChecked && someChecked} onChange={onSelectAll} label="Select all on this page" /></th>
              <th className={TH}>Recipe</th><th className={TH}>Cuisine</th><th className={TH}>Cook time</th>
              <th className={TH}>Status</th><th className={`${TH} hidden xl:table-cell`}>Added</th><th className={`${TH} text-right`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {items.map((r) => (
                <motion.tr key={r.id} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scaleY: 0.2, transition: { duration: 0.25 } }}
                  onClick={() => onOpen(r)}
                  className={`group cursor-pointer border-b border-cherry-tint/60 transition-colors odd:bg-cream even:bg-cream-warm/70 hover:bg-cherry-tint/60 ${selected.has(r.id) ? '!bg-cherry-tint' : ''} ${freshId === r.id ? 'fresh' : ''}`}>
                  <td className="px-4 py-3"><Checkbox checked={selected.has(r.id)} onChange={() => onSelect(r.id)} label={`Select ${r.name}`} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Thumb src={r.imageUrl} alt="" className="h-11 w-11 shrink-0 overflow-hidden rounded-xl" />
                      <div className="min-w-0"><InlineTitle value={r.name} onSave={(n) => onRename(r, n)} className="font-semibold" /><p className="text-xs text-ink/60">{r.difficulty}</p></div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><CategoryPill>{r.category}</CategoryPill></td>
                  <td className="px-4 py-3 text-ink/80">{fmtTime(r.cookTime)}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-3"><StatusPill published={r.published} /><Toggle checked={r.published} label={`Toggle ${r.name} status`} onChange={(v) => onToggle(r, v)} /></div></td>
                  <td className="hidden px-4 py-3 text-ink/70 xl:table-cell">{fmtDate(r.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button aria-label={`Edit ${r.name}`} onClick={(e) => { e.stopPropagation(); onEdit(r) }} className="btn-ghost grid h-9 w-9 place-items-center rounded-full transition"><Pencil className="h-4 w-4" /></button>
                      <button aria-label={`Delete ${r.name}`} onClick={(e) => { e.stopPropagation(); onDelete(r) }} className="btn-ghost grid h-9 w-9 place-items-center rounded-full transition"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  )
}
