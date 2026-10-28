import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Download, LayoutGrid, Rows3, Trash2, X } from 'lucide-react'
import { useDebounce } from '../hooks/useDebounce'
import { useToast } from './Toast'
import { EntityCard } from './EntityCard'
import { EntityTable } from './EntityTable'
import { EntityForm } from './EntityForm'
import { DetailPanel } from './DetailPanel'
import { ConfirmDialog } from './ConfirmDialog'
import { EmptyState } from './EmptyState'
import { CardSkeleton, RowSkeleton } from './Skeleton'
import { CATEGORIES, ENTITY } from '../data/schema'
import { exportCsv } from '../lib/utils'

const PAGE = 9
const SORTS = {
  newest: ['Newest first', (a, b) => new Date(b.createdAt) - new Date(a.createdAt)],
  az: ['A → Z', (a, b) => a.name.localeCompare(b.name)],
  time: ['Cook time (quickest)', (a, b) => a.cookTime - b.cookTime],
}
const Select = ({ label, value, onChange, children }) => (
  <label className="relative">
    <span className="sr-only">{label}</span>
    <select value={value} onChange={(e) => onChange(e.target.value)} className="cursor-pointer appearance-none rounded-full border border-cherry-tint bg-cream py-2.5 pl-4 pr-9 text-sm font-medium transition hover:border-cherry focus:border-cherry">{children}</select>
    <svg className="pointer-events-none absolute right-3.5 top-1/2 h-3 w-3 -translate-y-1/2 text-cherry" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"><path d="m2 4 4 4 4-4" /></svg>
  </label>
)

/** The whole CRUD surface: toolbar, grid/table, form drawer, detail panel, confirm dialog. */
export function RecipeManager({ store, query, addRequested, onAddHandled }) {
  const { items, status, error, freshId, reload, create, update, optimisticUpdate, remove, restore } = store
  const { toast } = useToast()

  const [view, setView] = useState(() => localStorage.getItem('cherrybook:view') || 'grid')
  const [category, setCategory] = useState('all')
  const [state, setState] = useState('all')
  const [sort, setSort] = useState('newest')
  const [visible, setVisible] = useState(PAGE)
  const [selected, setSelected] = useState(new Set())
  const [form, setForm] = useState(null)      // null | { item?: Recipe }
  const [detail, setDetail] = useState(null)  // recipe id
  const [confirm, setConfirm] = useState(null) // Recipe[]

  const q = useDebounce(query, 300).trim().toLowerCase()
  useEffect(() => { localStorage.setItem('cherrybook:view', view) }, [view])
  useEffect(() => setVisible(PAGE), [q, category, state, sort])
  useEffect(() => { if (addRequested) { setForm({}); onAddHandled() } }, [addRequested, onAddHandled]) // "+ Add" in the top bar

  const filtered = useMemo(() => items
    .filter((r) => (category === 'all' || r.category === category)
      && (state === 'all' || (state === 'published') === r.published)
      && (!q || [r.name, r.category, r.description, ...r.tags].join(' ').toLowerCase().includes(q)))
    .sort(SORTS[sort][1]), [items, q, category, state, sort])
  const shown = filtered.slice(0, visible)
  const detailItem = items.find((r) => r.id === detail)
  const filtersOn = q || category !== 'all' || state !== 'all'
  const clearFilters = () => { setCategory('all'); setState('all') }

  // drop selections that no longer exist
  useEffect(() => setSelected((s) => new Set([...s].filter((id) => items.some((r) => r.id === id)))), [items])

  const toggleSelect = (id) => setSelected((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })
  const allChecked = shown.length > 0 && shown.every((r) => selected.has(r.id))
  const selectAll = () => setSelected(allChecked ? new Set() : new Set(shown.map((r) => r.id)))

  const fail = (e) => toast({ type: 'error', message: e.message || 'Something went wrong.' })

  const submit = async (data) => {
    try {
      if (form.item) { await update(form.item.id, data); toast({ message: 'Saved' }) }
      else { await create(data); toast({ message: `${ENTITY.singular} added — ${data.name}` }) }
      setForm(null)
    } catch (e) { fail(e) }
  }
  const toggle = (r, published) => optimisticUpdate(r.id, { published }).then(() => toast({ message: 'Saved', duration: 2200 })).catch(fail)
  const rename = (r, name) => optimisticUpdate(r.id, { name }).then(() => toast({ message: 'Saved', duration: 2200 })).catch(fail)

  const doDelete = async () => {
    const victims = confirm
    try {
      await remove(victims.map((v) => v.id))
      setConfirm(null); setDetail(null); setSelected(new Set())
      toast({
        message: victims.length === 1 ? `Deleted “${victims[0].name}”` : `Deleted ${victims.length} ${ENTITY.lower}s`, duration: 5000,
        action: { label: 'Undo', onClick: () => restore(victims).then(() => toast({ message: 'Restored' })).catch(fail) },
      })
    } catch (e) { setConfirm(null); fail(e) }
  }

  const common = { onOpen: (r) => setDetail(r.id), onEdit: (r) => { setDetail(null); setForm({ item: r }) }, onDelete: (r) => setConfirm([r]), onToggle: toggle, onRename: rename, onSelect: toggleSelect }

  return (
    <section aria-labelledby="manager-title" className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="manager-title" className="text-3xl sm:text-4xl">Your <span className="italic-accent">{ENTITY.plural.toLowerCase()}</span>
          <span className="ml-2 align-middle text-base font-sans font-medium text-ink/50">{filtered.length}</span></h2>
        <div className="flex items-center gap-2">
          <button className="btn btn-outline !py-2.5" onClick={() => exportCsv(filtered)} disabled={!filtered.length}><Download className="h-4 w-4" /><span className="hidden sm:inline">Export CSV</span></button>
          <div className="flex rounded-full border border-cherry-tint bg-cream-warm p-1" role="group" aria-label="View">
            {[['grid', LayoutGrid, 'Grid view'], ['table', Rows3, 'Table view']].map(([v, Icon, label]) => (
              <button key={v} aria-label={label} aria-pressed={view === v} onClick={() => setView(v)} className={`grid h-9 w-9 place-items-center rounded-full transition ${view === v ? 'bg-cherry text-cream' : 'text-ink/60 hover:text-cherry'}`}><Icon className="h-4 w-4" /></button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <Select label="Filter by cuisine" value={category} onChange={setCategory}><option value="all">All cuisines</option>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</Select>
        <Select label="Filter by status" value={state} onChange={setState}><option value="all">Any status</option><option value="published">Published</option><option value="draft">Draft</option></Select>
        <Select label="Sort" value={sort} onChange={setSort}>{Object.entries(SORTS).map(([k, [l]]) => <option key={k} value={k}>{l}</option>)}</Select>
        {filtersOn && <button onClick={() => { clearFilters() }} className="btn-ghost inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium"><X className="h-3.5 w-3.5" />Reset</button>}
      </div>

      <AnimatePresence>
        {selected.size > 0 && (
          <div className="flex items-center justify-between rounded-full bg-ink px-5 py-2.5 text-cream" role="status">
            <span className="text-sm font-medium">{selected.size} selected</span>
            <div className="flex gap-2">
              <button className="rounded-full px-3 py-1.5 text-sm hover:bg-cream/15" onClick={() => setSelected(new Set())}>Clear</button>
              <button className="inline-flex items-center gap-1.5 rounded-full bg-cherry px-4 py-1.5 text-sm font-semibold hover:bg-cherry-deep" onClick={() => setConfirm(items.filter((r) => selected.has(r.id)))}><Trash2 className="h-4 w-4" />Delete</button>
            </div>
          </div>
        )}
      </AnimatePresence>

      {status === 'loading' && (view === 'grid'
        ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }, (_, i) => <CardSkeleton key={i} />)}</div>
        : <div className="card overflow-hidden">{Array.from({ length: 7 }, (_, i) => <RowSkeleton key={i} />)}</div>)}

      {status === 'error' && <EmptyState kind="error" message={error} onAction={reload} />}
      {status === 'ready' && items.length === 0 && <EmptyState kind="empty" onAction={() => setForm({})} />}
      {status === 'ready' && items.length > 0 && filtered.length === 0 && <EmptyState kind="filtered" onClear={() => { clearFilters() }} />}

      {status === 'ready' && shown.length > 0 && (view === 'grid' ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((r) => <EntityCard key={r.id} item={r} selected={selected.has(r.id)} fresh={freshId === r.id} {...common} />)}
          </AnimatePresence>
        </div>
      ) : (
        <EntityTable items={shown} selected={selected} freshId={freshId} allChecked={allChecked} someChecked={selected.size > 0} onSelectAll={selectAll} {...common} />
      ))}

      {status === 'ready' && filtered.length > visible && (
        <div className="pt-2 text-center">
          <button className="btn btn-outline" onClick={() => setVisible((v) => v + PAGE)}>Load more · {filtered.length - visible} left</button>
        </div>
      )}

      <AnimatePresence>{form && <EntityForm key={form.item?.id || 'new'} item={form.item} onSubmit={submit} onClose={() => setForm(null)} />}</AnimatePresence>
      <AnimatePresence>{detailItem && !form && <DetailPanel item={detailItem} onClose={() => setDetail(null)} onEdit={common.onEdit} onDelete={common.onDelete} onToggle={toggle} />}</AnimatePresence>
      <AnimatePresence>
        {confirm && <ConfirmDialog
          title={confirm.length === 1 ? `Delete “${confirm[0].name}”?` : `Delete ${confirm.length} ${ENTITY.lower}s?`}
          body="This can't be undone — though you'll have 5 seconds to change your mind."
          onConfirm={doDelete} onCancel={() => setConfirm(null)} />}
      </AnimatePresence>
    </section>
  )
}
