import { useCallback, useEffect, useState } from 'react'
import { recipeApi } from '../data/recipeApi'

/** All CRUD state + actions. UI components never touch the data layer directly. */
export function useRecipes() {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [error, setError] = useState('')
  const [freshId, setFreshId] = useState(null) // newest item, gets a highlight

  const load = useCallback(async () => {
    setStatus('loading'); setError('')
    try { setItems(await recipeApi.list()); setStatus('ready') }
    catch (e) { setError(e.message); setStatus('error') }
  }, [])

  useEffect(() => { load() }, [load])

  const create = useCallback(async (data) => {
    const item = await recipeApi.create(data)
    setItems((prev) => [item, ...prev]); setFreshId(item.id)
    setTimeout(() => setFreshId((id) => (id === item.id ? null : id)), 2200)
    return item
  }, [])

  const update = useCallback(async (id, patch) => {
    const item = await recipeApi.update(id, patch)
    setItems((prev) => prev.map((r) => (r.id === id ? item : r)))
    return item
  }, [])

  /** Optimistic: flips instantly, rolls back if the save fails. */
  const optimisticUpdate = useCallback(async (id, patch) => {
    let before
    setItems((prev) => prev.map((r) => (r.id === id ? ((before = r), { ...r, ...patch }) : r)))
    try { return await update(id, patch) }
    catch (e) { setItems((prev) => prev.map((r) => (r.id === id ? before : r))); throw e }
  }, [update])

  const remove = useCallback(async (ids) => {
    await recipeApi.remove(ids)
    setItems((prev) => prev.filter((r) => !ids.includes(r.id)))
  }, [])

  const restore = useCallback(async (removed) => {
    await recipeApi.restore(removed)
    setItems((prev) => [...removed, ...prev])
  }, [])

  return { items, status, error, freshId, reload: load, create, update, optimisticUpdate, remove, restore }
}
