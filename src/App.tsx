import { Hero } from './components/Hero'
import { FeatureGrid } from './components/FeatureGrid'
import { FaqAccordion } from './components/FaqAccordion'
import { ResourceListSection } from './components/ResourceList'
import styles from './App.module.css'

/**
 * Composes the demo landing page by listing modules in render order.
 * No content props are passed — each module reads its own field group via `useCmsContent`.
 */
export function App() {
  return (
    <div className={styles.page}>
      <header className={styles.siteHeader}>
        <div className={styles.bar}>
          <span className={styles.brand}>ModKit</span>
          <span className={styles.kicker}>HubSpot-ready component system</span>
        </div>
      </header>

      <main>
        <Hero />
        <FeatureGrid />
        <FaqAccordion />
        <ResourceListSection />
      </main>

      <footer className={styles.siteFooter}>
        <div className={styles.bar}>
          <span>© 2026 Daniil Olekh</span>
          <span>MIT Licensed</span>
        </div>
      </footer>
    </div>
  )
}
