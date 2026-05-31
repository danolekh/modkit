import { useId, useRef, useState, type KeyboardEvent } from 'react'
import clsx from 'clsx'
import { useCmsContent } from '../../cms/useCmsContent'
import styles from './FaqAccordion.module.css'

/**
 * FaqAccordion module. Mirrors `FaqAccordion/fields.json`.
 *
 * Accessibility (hand-built, no headless lib):
 * - Each header is a real <button> wrapped in an <h3>, with `aria-expanded` + `aria-controls`.
 * - Each panel is a `role="region"` labelled by its header (`aria-labelledby`), `hidden` when closed.
 * - Keyboard: Enter/Space toggle (native button); ArrowUp/Down + Home/End move focus between headers.
 * - Multi-open: any number of panels may be open at once (documented choice).
 */
export function FaqAccordion() {
  const fields = useCmsContent('faq')
  const baseId = useId()
  const [openItems, setOpenItems] = useState<ReadonlySet<number>>(() => new Set())
  const headerRefs = useRef<Array<HTMLButtonElement | null>>([])

  function toggle(index: number) {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  function onHeaderKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const count = fields.items.length
    if (count === 0) return

    let nextIndex: number
    switch (event.key) {
      case 'ArrowDown':
        nextIndex = (index + 1) % count
        break
      case 'ArrowUp':
        nextIndex = (index - 1 + count) % count
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = count - 1
        break
      default:
        return
    }
    event.preventDefault()
    headerRefs.current[nextIndex]?.focus()
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {fields.heading ? <h2 className={styles.heading}>{fields.heading}</h2> : null}
        <div className={styles.list}>
          {fields.items.map((item, index) => {
            const isOpen = openItems.has(index)
            const headerId = `${baseId}-header-${index}`
            const panelId = `${baseId}-panel-${index}`
            return (
              <div key={item.question} className={styles.item}>
                <h3 className={styles.headerHeading}>
                  <button
                    id={headerId}
                    type="button"
                    className={styles.headerButton}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    ref={(el) => {
                      headerRefs.current[index] = el
                    }}
                    onClick={() => {
                      toggle(index)
                    }}
                    onKeyDown={(event) => {
                      onHeaderKeyDown(event, index)
                    }}
                  >
                    <span className={styles.question}>{item.question}</span>
                    <svg
                      className={clsx(styles.chevron, isOpen && styles.chevronOpen)}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  className={styles.panel}
                  hidden={!isOpen}
                >
                  <div
                    className={styles.answer}
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
