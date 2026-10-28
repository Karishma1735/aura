export const cn = (...c) => c.filter(Boolean).join(' ')

export const fmtDate = (iso) => new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })

export const fmtTime = (min) => (min >= 60 ? `${Math.floor(min / 60)}h${min % 60 ? ` ${min % 60}m` : ''}` : `${min} min`)

export function exportCsv(rows, filename = 'cherrybook-recipes.csv') {
  const cols = ['id', 'name', 'category', 'cookTime', 'difficulty', 'published', 'description', 'tags', 'imageUrl', 'createdAt', 'updatedAt']
  const esc = (v) => `"${String(Array.isArray(v) ? v.join('; ') : v ?? '').replace(/"/g, '""')}"`
  const csv = [cols.join(','), ...rows.map((r) => cols.map((c) => esc(c === 'imageUrl' && String(r[c]).startsWith('data:') ? '(uploaded image)' : r[c])).join(','))].join('\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
  a.download = filename
  a.click()
  URL.revokeObjectURL(a.href)
}
