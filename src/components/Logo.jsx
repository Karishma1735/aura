export function Cherries({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M12 17c1-7 5-10 10-10M21 18c0-5 1-8 1-11" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <circle cx="11" cy="22" r="5.5" fill="currentColor" />
      <circle cx="21" cy="23" r="4.5" fill="currentColor" />
    </svg>
  )
}

export function Sparkle({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0z" />
    </svg>
  )
}

export function Logo({ onClick, compact = false }) {
  return (
    <a href="#/" onClick={onClick} className="group inline-flex items-center gap-2 rounded-full" aria-label="Cherrybook home">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-cherry text-cream transition-transform duration-300 group-hover:rotate-12"><Cherries className="h-5 w-5" /></span>
      {!compact && <span className="font-display text-xl font-semibold tracking-tight">Cherry<span className="italic text-cherry">book</span></span>}
    </a>
  )
}
