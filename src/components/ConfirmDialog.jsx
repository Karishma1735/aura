import { useState } from 'react'
import { Loader2, Trash2 } from 'lucide-react'
import { Overlay } from './Overlay'

export function ConfirmDialog({ title, body, confirmLabel = 'Delete', onConfirm, onCancel }) {
  const [busy, setBusy] = useState(false)
  const run = async () => { setBusy(true); try { await onConfirm() } finally { setBusy(false) } }
  return (
    <Overlay variant="modal" width="max-w-md" label={title} onClose={onCancel} dismissable={!busy}>
      <div className="p-7 text-center sm:p-9">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-cherry-tint text-cherry"><Trash2 className="h-6 w-6" /></span>
        <h2 className="mt-5 text-3xl leading-tight">{title}</h2>
        <p className="mt-2 text-ink/70">{body}</p>
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <button data-autofocus className="btn btn-outline" onClick={onCancel} disabled={busy}>Cancel</button>
          <button className="btn btn-primary" onClick={run} disabled={busy}>
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}{busy ? 'Deleting…' : confirmLabel}
          </button>
        </div>
      </div>
    </Overlay>
  )
}
