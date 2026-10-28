import { useCallback, useMemo, useState } from 'react'
import { Plus, Search, X, ChefHat, CheckCircle2, Sparkles, Timer } from 'lucide-react'
import { Sidebar, NAV } from '../components/Sidebar'
import { StatCard } from '../components/StatCard'
import { StatSkeleton } from '../components/Skeleton'
import { RecipeManager } from '../components/RecipeManager'
import { Settings } from './Settings'
import { useRecipes } from '../hooks/useRecipes'
import { ENTITY } from '../data/schema'

/** Builds a 7-bucket "created per day" series for sparklines. */
const weekSeries = (items, pick = () => true) => {
  const out = Array(7).fill(0)
  items.filter(pick).forEach((r) => { const d = Math.floor((Date.now() - new Date(r.createdAt)) / 864e5); if (d < 7) out[6 - d]++ })
  return out.map((v, i, a) => a.slice(0, i + 1).reduce((s, x) => s + x, 0)) // cumulative → always rising
}

export function Dashboard({ page, onNavigate }) {
  const store = useRecipes()
  const { items, status } = store
  const [query, setQuery] = useState('')
  const [addRequested, setAddRequested] = useState(false)
  const onAddHandled = useCallback(() => setAddRequested(false), [])

  const stats = useMemo(() => {
    const week = items.filter((r) => Date.now() - new Date(r.createdAt) < 7 * 864e5)
    const avg = items.length ? Math.round(items.reduce((s, r) => s + r.cookTime, 0) / items.length) : 0
    return { total: items.length, published: items.filter((r) => r.published).length, week: week.length, avg }
  }, [items])

  const title = NAV.find((n) => n.id === page)?.label
  const addNew = () => { onNavigate('recipes'); setAddRequested(true) }

  return (
    <div className="min-h-screen md:pl-[84px] lg:pl-64">
      <Sidebar page={page} onNavigate={onNavigate} />
      <main className="mx-auto max-w-[1180px] px-4 pb-28 pt-5 sm:px-8 md:pb-12">
        <header className="sticky top-0 z-30 -mx-4 flex flex-wrap items-center gap-3 bg-cream/90 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8">
          <h1 className="mr-auto text-4xl sm:text-5xl">{page === 'dashboard' ? <>Good <span className="italic-accent">day,</span> chef</> : title}</h1>
          {page !== 'settings' && (
            <label className="relative order-3 w-full sm:order-none sm:w-72">
              <span className="sr-only">Search recipes</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search recipes, tags…" className="w-full rounded-full border border-brand-tint bg-cream-warm py-3 pl-11 pr-10 text-sm transition placeholder:text-ink/50 focus:border-brand" />
              {query && <button type="button" aria-label="Clear search" onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-brand-tint"><X className="h-4 w-4" /></button>}
            </label>
          )}
          <button className="btn btn-primary group" onClick={addNew}><Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />Add {ENTITY.singular}</button>
        </header>

        {page === 'dashboard' && (
          <section aria-label="Overview" className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {status === 'loading' ? Array.from({ length: 4 }, (_, i) => <StatSkeleton key={i} />) : (
              <>
                <StatCard index={0} tone="brand" label={`Total ${ENTITY.plural.toLowerCase()}`} value={stats.total} icon={ChefHat} spark={weekSeries(items)} />
                <StatCard index={1} label="Published" value={stats.published} icon={CheckCircle2} spark={weekSeries(items, (r) => r.published)} />
                <StatCard index={2} label="Added this week" value={stats.week} icon={Sparkles} spark={weekSeries(items, (r) => Date.now() - new Date(r.createdAt) < 7 * 864e5)} />
                <StatCard index={3} label="Avg. cook time" value={stats.avg} suffix="m" icon={Timer} spark={[2, 4, 3, 5, 4, 6, 5]} />
              </>
            )}
          </section>
        )}

        <div className="mt-8">
          {page === 'settings' ? <Settings store={store} /> : <RecipeManager store={store} query={query} addRequested={addRequested} onAddHandled={onAddHandled} />}
        </div>
      </main>
    </div>
  )
}
