import clsx from 'clsx'
import { useCmsContent } from '../../cms/useCmsContent'
import type { LinkValue } from '../../cms/types'
import styles from './Hero.module.css'

interface CtaProps {
  link: LinkValue
  kind: 'primary' | 'secondary'
}

function Cta({ link, kind }: CtaProps) {
  const isExternal = link.target === '_blank'
  return (
    <a
      className={clsx(styles.cta, kind === 'primary' ? styles.ctaPrimary : styles.ctaSecondary)}
      href={link.href}
      {...(link.target ? { target: link.target } : {})}
      {...(isExternal ? { rel: 'noopener noreferrer' } : {})}
    >
      {link.label}
    </a>
  )
}

/**
 * Hero module. Mirrors `Hero/fields.json`.
 * Optional fields (`eyebrow`, `subcopy`, `secondaryCta`) gracefully render nothing when absent.
 */
export function Hero() {
  const fields = useCmsContent('hero')

  return (
    <section className={clsx(styles.hero, fields.variant === 'centered' && styles.centered)}>
      <div className={styles.inner}>
        {fields.eyebrow ? <p className={styles.eyebrow}>{fields.eyebrow}</p> : null}
        <h1 className={styles.heading}>{fields.heading}</h1>
        {fields.subcopy ? (
          <div className={styles.subcopy} dangerouslySetInnerHTML={{ __html: fields.subcopy }} />
        ) : null}
        <div className={styles.actions}>
          <Cta link={fields.primaryCta} kind="primary" />
          {fields.secondaryCta ? <Cta link={fields.secondaryCta} kind="secondary" /> : null}
        </div>
      </div>
    </section>
  )
}
