import { UtmForm } from '@/app/utm-form'

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<UtmForm />
			<footer className='fixed bottom-0 left-0 w-screen border-t bg-background/50 px-2 py-1 text-sm backdrop-blur'>
				<span>
					Made with ❤️ by{' '}
					<a className='underline' target='_blank' href='https://github.com/nickwelsh'>
						Nick Welsh
					</a>
				</span>
			</footer>
		</main>
	)
}
