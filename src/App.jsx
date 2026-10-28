import { useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { ToastProvider } from './components/Toast'
import { Landing } from './pages/Landing'
import { Dashboard } from './pages/Dashboard'

/** Tiny hash router: #/ = landing, #/app = dashboard, #/app/recipes, #/app/settings */
function useHash() {
  const [hash, setHash] = useState(window.location.hash || '#/')
  useEffect(() => { const f = () => setHash(window.location.hash || '#/'); window.addEventListener('hashchange', f); return () => window.removeEventListener('hashchange', f) }, [])
  return hash
}

export default function App() {
  const hash = useHash()
  const inApp = hash.startsWith('#/app')
  const page = hash.split('/')[2] || 'dashboard'

  useEffect(() => { if (inApp) window.scrollTo(0, 0) }, [inApp])

  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        {inApp
          ? <Dashboard page={['dashboard', 'recipes', 'settings'].includes(page) ? page : 'dashboard'} onNavigate={(id) => { window.location.hash = id === 'dashboard' ? '#/app' : `#/app/${id}` }} />
          : <Landing />}
      </ToastProvider>
    </MotionConfig>
  )
}
