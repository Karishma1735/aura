import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { recipeApi } from '../data/recipeApi'
import { Toggle } from '../components/Parts'
import { useToast } from '../components/Toast'

export function Settings({ store }) {
  const { toast } = useToast()
  const [simulate, setSimulate] = useState(recipeApi.isErrorSimulated())

  const flip = (on) => { recipeApi.setErrorSimulated(on); setSimulate(on); if (on) toast({ type: 'error', message: 'Errors on — open Recipes and reload to see the error state.' }); else store.reload() }
  const reset = async () => { await recipeApi.reset(); await store.reload(); toast({ message: 'Demo recipes restored' }) }

  const rows = [
    ['Simulate network errors', 'Every request fails, so you can preview the error state and retry button.', <Toggle key="s" checked={simulate} onChange={flip} label="Simulate network errors" />],
    ['Reset demo data', 'Replace everything with the 12 seeded recipes.', <button key="r" className="btn btn-outline !py-2" onClick={reset}><RotateCcw className="h-4 w-4" />Reset</button>],
  ]
  return (
    <section className="max-w-2xl space-y-4" aria-label="Settings">
      <p className="text-ink/70">Data lives in your browser’s localStorage. Nothing leaves this device.</p>
      {rows.map(([t, d, c]) => (
        <div key={t} className="card flex items-center justify-between gap-6 p-5"><div><h3 className="text-xl">{t}</h3><p className="text-sm text-ink/70">{d}</p></div>{c}</div>
      ))}
    </section>
  )
}
