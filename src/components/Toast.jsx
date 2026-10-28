import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, AlertCircle, X } from 'lucide-react'

const ToastCtx = createContext(null)
export const useToast = () => useContext(ToastCtx)

/** toast({ type: 'success' | 'error', message, action: { label, onClick }, duration }) */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const dismiss = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), [])
  const toast = useCallback((t) => {
    const id = ++idRef.current
    setToasts((prev) => [...prev, { type: 'success', duration: 4000, ...t, id }])
    return id
  }, [])

  return (
    <ToastCtx.Provider value={{ toast, dismiss }}>
      {children}
      <div className="pointer-events-none fixed bottom-20 right-4 z-[90] flex w-[min(92vw,380px)] flex-col gap-3 md:bottom-6 md:right-6" role="region" aria-label="Notifications" aria-live="polite">
        <AnimatePresence>
          {toasts.map((t) => <ToastItem key={t.id} t={t} dismiss={dismiss} />)}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  )
}

function ToastItem({ t, dismiss }) {
  const error = t.type === 'error'
  return (
    <motion.div
      layout initial={{ opacity: 0, x: 60, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 60, scale: 0.96 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      role={error ? 'alert' : 'status'}
      className={`pointer-events-auto relative overflow-hidden rounded-2xl shadow-brand ${error ? 'bg-danger text-cream' : 'bg-ink text-cream'}`}
    >
      <div className="flex items-center gap-3 px-4 py-3.5">
        {error ? <AlertCircle className="h-5 w-5 shrink-0" /> : <CheckCircle2 className="h-5 w-5 shrink-0 text-[#7FD3A0]" />}
        <p className="flex-1 text-sm font-medium">{t.message}</p>
        {t.action && (
          <button onClick={() => { t.action.onClick(); dismiss(t.id) }} className="rounded-full border border-cream/40 px-3 py-1 text-xs font-semibold transition hover:bg-cream hover:text-ink">{t.action.label}</button>
        )}
        <button onClick={() => dismiss(t.id)} aria-label="Dismiss" className="rounded-full p-1 opacity-70 transition hover:opacity-100"><X className="h-4 w-4" /></button>
      </div>
      <motion.div className={`h-1 origin-left ${error ? 'bg-cream/60' : 'bg-success'}`} initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ duration: t.duration / 1000, ease: 'linear' }} onAnimationComplete={() => dismiss(t.id)} />
    </motion.div>
  )
}
