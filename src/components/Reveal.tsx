import type { ReactNode } from 'react'
import { useInView } from '../hooks'

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const [ref, visible] = useInView<HTMLDivElement>({ rootMargin: '0px 0px -8% 0px', threshold: 0.12 })

  return (
    <div
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
