export function CardSkeleton() {
  return (
    <div className="card overflow-hidden" aria-hidden="true">
      <div className="shimmer aspect-[4/3]" />
      <div className="space-y-3 p-5">
        <div className="shimmer h-5 w-3/4 rounded-full" />
        <div className="shimmer h-3 w-1/2 rounded-full" />
        <div className="flex gap-2 pt-2"><div className="shimmer h-6 w-20 rounded-full" /><div className="shimmer h-6 w-16 rounded-full" /></div>
      </div>
    </div>
  )
}

export function RowSkeleton() {
  return (
    <div className="flex items-center gap-4 border-b border-brand-tint/60 px-5 py-4" aria-hidden="true">
      <div className="shimmer h-5 w-5 rounded-md" /><div className="shimmer h-11 w-11 rounded-xl" />
      <div className="shimmer h-4 flex-1 rounded-full" /><div className="shimmer hidden h-4 w-24 rounded-full sm:block" /><div className="shimmer h-6 w-20 rounded-full" />
    </div>
  )
}

export function StatSkeleton() {
  return <div className="shimmer h-36 rounded-card" aria-hidden="true" />
}
