import { Pencil, Trash2, X } from 'lucide-react'
import { Overlay } from './Overlay'
import { Thumb, StatusPill, CategoryPill, CookTime, Toggle } from './Parts'
import { fmtDate, fmtTime } from '../lib/utils'

export function DetailPanel({ item, onClose, onEdit, onDelete, onToggle }) {
  return (
    <Overlay label={`${item.name} details`} onClose={onClose} width="max-w-lg">
      <div className="scroll-thin flex-1 overflow-y-auto">
        <div className="relative">
          <Thumb src={item.imageUrl} alt={item.name} className="aspect-[4/3] w-full rounded-tl-[28px]" />
          <button data-autofocus aria-label="Close" onClick={onClose} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-cream/95 shadow transition hover:bg-brand hover:text-cream"><X className="h-5 w-5" /></button>
        </div>
        <div className="space-y-6 p-7">
          <div className="flex flex-wrap items-center gap-2"><CategoryPill>{item.category}</CategoryPill><StatusPill published={item.published} /></div>
          <h2 className="text-4xl leading-[1.05]">{item.name}</h2>
          <p className="text-ink/80">{item.description}</p>
          <dl className="grid grid-cols-2 gap-4">
            {[['Cook time', <CookTime key="t" text={fmtTime(item.cookTime)} />], ['Difficulty', item.difficulty], ['Added', fmtDate(item.createdAt)], ['Updated', fmtDate(item.updatedAt)]].map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-brand-tint bg-cream-warm p-4"><dt className="label-caps text-ink/60">{k}</dt><dd className="mt-1 font-semibold">{v}</dd></div>
            ))}
          </dl>
          {item.tags.length > 0 && (
            <div><p className="label-caps mb-2 text-ink/60">Tags</p><div className="flex flex-wrap gap-2">{item.tags.map((t) => <span key={t} className="rounded-full border border-brand/30 px-3 py-1 text-xs font-medium text-brand-deep">#{t}</span>)}</div></div>
          )}
          <div className="flex items-center justify-between rounded-2xl border border-brand-tint bg-cream-warm p-4">
            <span className="text-sm font-semibold">{item.published ? 'Published' : 'Draft'}</span>
            <Toggle checked={item.published} label="Toggle published" onChange={(v) => onToggle(item, v)} />
          </div>
          <p className="text-xs text-ink/50">ID {item.id}</p>
        </div>
      </div>
      <div className="flex gap-3 border-t border-brand-tint p-5">
        <button className="btn btn-primary flex-1" onClick={() => onEdit(item)}><Pencil className="h-4 w-4" />Edit</button>
        <button className="btn btn-outline" onClick={() => onDelete(item)}><Trash2 className="h-4 w-4" />Delete</button>
      </div>
    </Overlay>
  )
}
