import type { HubDbResourceRow } from '../../cms/hubdb'
import styles from './ResourceList.module.css'

/** Renders one HubDB row. The card link's accessible name is the resource title. */
export function ResourceCard({ row }: { row: HubDbResourceRow }) {
  return (
    <article className={styles.card}>
      <span className={styles.tag}>{row.tag}</span>
      <h3 className={styles.cardTitle}>
        <a className={styles.cardLink} href={row.url} target="_blank" rel="noopener noreferrer">
          {row.title}
        </a>
      </h3>
      <p className={styles.cardSummary}>{row.summary}</p>
    </article>
  )
}
