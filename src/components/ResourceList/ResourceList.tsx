import { useId } from 'react'
import { useCmsContent, useHubDb } from '../../cms/useCmsContent'
import { ResourceCard } from './ResourceCard'
import styles from './ResourceList.module.css'

/**
 * ResourceList module. Mirrors `ResourceList/fields.json`.
 * Reads the simulated HubDB table via context and renders up to `pageSize` rows.
 *
 * Default export so it can be `React.lazy`-loaded into its own chunk (see `index.tsx`).
 */
export default function ResourceList() {
  const fields = useCmsContent('resourceList')
  const rows = useHubDb()
  const headingId = useId()
  const visible = rows.slice(0, fields.pageSize)

  return (
    <section
      className={styles.section}
      {...(fields.heading ? { 'aria-labelledby': headingId } : { 'aria-label': 'Resources' })}
    >
      <div className={styles.inner}>
        {fields.heading ? (
          <h2 id={headingId} className={styles.heading}>
            {fields.heading}
          </h2>
        ) : null}
        <ul className={styles.grid}>
          {visible.map((row) => (
            <li key={row.id}>
              <ResourceCard row={row} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
