/**
 * DATA LAYER — the only file that knows about localStorage.
 * Every method is async and returns plain objects, so swapping this file for
 * fetch() calls to a REST API (or Supabase/Firebase) needs no UI changes.
 */
import { seedRecipes } from './seed'

const KEY = 'cherrybook:recipes:v1'
const FAIL_KEY = 'cherrybook:simulate-error'
const LATENCY = 450

const wait = (ms = LATENCY) => new Promise((r) => setTimeout(r, ms))
const uid = () => `rcp_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`

function read() {
  try {
    const stored = localStorage.getItem(KEY)
    if (stored) return JSON.parse(stored)
  } catch { /* fall through to seed */ }
  write(seedRecipes)
  return [...seedRecipes]
}
function write(items) {
  try { localStorage.setItem(KEY, JSON.stringify(items)) } catch { throw new Error('Storage is full or unavailable.') }
}
async function guard() {
  await wait()
  if (localStorage.getItem(FAIL_KEY) === '1') throw new Error('Could not reach the kitchen (simulated network error).')
}

export const recipeApi = {
  async list() { await guard(); return read() },

  async create(data) {
    await guard()
    const ts = new Date().toISOString()
    const item = { ...data, id: uid(), createdAt: ts, updatedAt: ts }
    write([item, ...read()])
    return item
  },

  async update(id, patch) {
    await guard()
    let updated
    const next = read().map((r) => (r.id === id ? (updated = { ...r, ...patch, updatedAt: new Date().toISOString() }) : r))
    if (!updated) throw new Error('That recipe no longer exists.')
    write(next)
    return updated
  },

  async remove(ids) {
    await guard()
    const set = new Set(ids)
    write(read().filter((r) => !set.has(r.id)))
  },

  /** Used by Undo: puts deleted items back exactly as they were. */
  async restore(items) {
    await guard()
    write([...items, ...read()])
  },

  async reset() { write(seedRecipes) },
  isErrorSimulated: () => localStorage.getItem(FAIL_KEY) === '1',
  setErrorSimulated: (on) => (on ? localStorage.setItem(FAIL_KEY, '1') : localStorage.removeItem(FAIL_KEY)),
}
