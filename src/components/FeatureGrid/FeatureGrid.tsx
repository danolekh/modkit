import clsx from 'clsx'
import { useCmsContent } from '../../cms/useCmsContent'
import type { FeatureColumns, FeatureIcon } from '../../cms/types'
import styles from './FeatureGrid.module.css'

/** Simple line-icon set keyed by the `choice` field value. */
const ICON_PATHS: Record<FeatureIcon, string> = {
  bolt: 'M13 2 4 14h6l-1 8 9-12h-6z',
  shield: 'M12 3l7 3v5c0 4.2-3 7.4-7 9-4-1.6-7-4.8-7-9V6z',
  spark: 'M12 3v6m0 6v6m9-9h-6m-6 0H3m13.5-6.5-4 4m-5 5-4 4m13 0-4-4m-5-5-4-4',
  layers: 'M12 3 3 8l9 5 9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5',
  gauge: 'M5 19a9 9 0 1 1 14 0M12 13l4-4',
  plug: 'M9 2v6m6-6v6M6 8h12v3a6 6 0 0 1-12 0zM12 17v5',
}

const COLUMN_CLASS: Record<FeatureColumns, string | undefined> = {
  2: styles.cols2,
  3: styles.cols3,
  4: styles.cols4,
}

function Icon({ name }: { name: FeatureIcon }) {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={ICON_PATHS[name]} />
    </svg>
  )
}

/**
 * FeatureGrid module. Mirrors `FeatureGrid/fields.json`.
 * Demonstrates a HubSpot repeater (`group` with occurrence) mapped to a typed array.
 * Empty `items` renders an empty state rather than a broken grid.
 */
export function FeatureGrid() {
  const fields = useCmsContent('featureGrid')

  return (
    <section id="features" className={styles.section}>
      <div className={styles.inner}>
        {fields.heading ? <h2 className={styles.heading}>{fields.heading}</h2> : null}
        {fields.items.length === 0 ? (
          <p className={styles.empty}>No features to show yet.</p>
        ) : (
          <ul className={clsx(styles.grid, COLUMN_CLASS[fields.columns])}>
            {fields.items.map((item) => (
              <li key={item.title} className={styles.card}>
                <span className={styles.iconWrap}>
                  <Icon name={item.icon} />
                </span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <div className={styles.cardBody} dangerouslySetInnerHTML={{ __html: item.body }} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
