import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { createPortal } from 'react-dom'

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

/**
 * Accessible overlay shell: blurred cream backdrop, Esc to close, focus trap,
 * scroll lock, focus restore. `variant` = 'drawer' (right) | 'modal' (centered).
 */
export function Overlay({ onClose, label, variant = 'drawer', children, width = 'max-w-xl', dismissable = true }) {
  const panel = useRef(null)

  useEffect(() => {
    const previous = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const first = panel.current?.querySelector('[data-autofocus]') || panel.current?.querySelector(FOCUSABLE)
    first?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape' && dismissable) { e.stopPropagation(); onClose() }
      if (e.key !== 'Tab') return
      const nodes = [...panel.current.querySelectorAll(FOCUSABLE)]
      if (!nodes.length) return
      const [a, z] = [nodes[0], nodes[nodes.length - 1]]
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus() }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prevOverflow; previous?.focus?.() }
  }, [onClose, dismissable])

  const drawer = variant === 'drawer'
  return createPortal(
    <div className="fixed inset-0 z-[80]">
      <motion.div className="absolute inset-0 bg-cream/70 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={dismissable ? onClose : undefined} />
      <div className={`absolute inset-0 flex ${drawer ? 'justify-end' : 'items-center justify-center p-4'} pointer-events-none`}>
        <motion.div
          ref={panel} role="dialog" aria-modal="true" aria-label={label}
          initial={drawer ? { x: '100%' } : { opacity: 0, scale: 0.94, y: 12 }}
          animate={drawer ? { x: 0 } : { opacity: 1, scale: 1, y: 0 }}
          exit={drawer ? { x: '100%' } : { opacity: 0, scale: 0.94, y: 12 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className={`pointer-events-auto flex w-full flex-col bg-cream shadow-brand ${width} ${drawer ? 'h-full rounded-l-[28px] border-l border-brand-tint' : 'max-h-[90vh] rounded-card border border-brand-tint'}`}
        >
          {children}
        </motion.div>
      </div>
    </div>,
    document.body,
  )
}
