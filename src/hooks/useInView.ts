import { useEffect, useRef, useState, type RefObject } from 'react'

export interface UseInViewResult<T extends Element> {
  ref: RefObject<T>
  inView: boolean
}

/**
 * Returns a ref and a boolean that flips to `true` the first time the element scrolls into view.
 * Used to defer mounting (and code-loading) of below-the-fold modules like ResourceList.
 *
 * Pass a *stable* `options` object (module scope) so the effect doesn't re-run each render.
 * In environments without IntersectionObserver (e.g. jsdom) it reports `inView` immediately.
 */
export function useInView<T extends Element>(options?: IntersectionObserverInit): UseInViewResult<T> {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (node === null) return

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry?.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
    }, options ?? {})

    observer.observe(node)
    return () => {
      observer.disconnect()
    }
  }, [options])

  return { ref, inView }
}
