import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function P({ children, className }: { children: ReactNode; className?: string }) {
	return <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>{children}</p>
}

export function Code({ children, className }: { children: ReactNode; className?: string }) {
	return (
		<code
			className={cn(
				'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
				className,
			)}
		>
			{children}
		</code>
	)
}
