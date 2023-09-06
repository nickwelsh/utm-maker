'use client'

import { Toaster } from 'sonner'
import { useDarkMode } from 'usehooks-ts'
import { useEffect } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
	const { isDarkMode } = useDarkMode()
	useEffect(() => {
		document.querySelector('html')?.classList.toggle('dark', isDarkMode)
	}, [isDarkMode])
	return (
		<>
			<Toaster theme='system' />
			{children}
		</>
	)
}
