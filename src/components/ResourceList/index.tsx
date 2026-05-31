import { lazy, Suspense } from 'react'
import { useInView } from '../../hooks/useInView'
import styles from './ResourceList.module.css'

// Code-split: the ResourceList module (and the HubDB-backed card) load in their own chunk.
const ResourceList = lazy(() => import('./ResourceList'))

// Stable options object (module scope) so useInView's effect doesn't re-run each render.
const OBSERVER_OPTIONS: IntersectionObserverInit = { rootMargin: '200px' }

/**
 * Below-the-fold wrapper: mounts (and lazy-loads) ResourceList only once it scrolls into view,
 * which justifies the code-split against the bundle budget.
 */
export function ResourceListSection() {
  const { ref, inView } = useInView<HTMLDivElement>(OBSERVER_OPTIONS)

  return (
    <div ref={ref} className={styles.boundary}>
      {inView ? (
        <Suspense fallback={<p className={styles.loading}>Loading resources…</p>}>
          <ResourceList />
        </Suspense>
      ) : (
        <div className={styles.placeholder} aria-hidden="true" />
      )}
    </div>
  )
}
