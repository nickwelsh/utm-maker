'use client'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Code, P } from '@/components/ui/typography'
import { useState } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'
import { toast } from 'sonner'

const formSchema = z.object({
	url: z.string(),
	campaign: z.string(),
	source: z.string(),
	medium: z.string(),
	term: z.string(),
	content: z.string(),
})

export function UtmForm() {
	const [value, copy] = useCopyToClipboard()
	const [url, setUrl] = useState('')

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			url: '',
			campaign: '',
			source: '',
			medium: '',
			term: '',
			content: '',
		},
	})

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		toast.promise(copy(url), {
			loading: 'Copying...',
			success: data => {
				return `Copied to clipboard!`
			},
			error: 'Error',
		})
	}

	function onUpdate() {
		try {
			const values = form.getValues()
			let url = values.url
			// I feel like there is a better way to do this
			url = url.replace(/^h$/, '')
			url = url.replace(/^ht$/, '')
			url = url.replace(/^htt$/, '')
			url = url.replace(/^http(s)?$/, '')
			url = url.replace(/^http(s)?:$/, '')
			url = url.replace(/^http(s)?:\/$/, '')
			if (!url.startsWith('http://') && !url.startsWith('https://')) {
				url = 'https://' + url
			}
			const parsedUrl = new URL(url)
			const params = new URLSearchParams(parsedUrl.search)
			values.campaign && params.set('utm_campaign', values.campaign)
			values.source && params.set('utm_source', values.source)
			values.medium && params.set('utm_medium', values.medium)
			values.term && params.set('utm_term', values.term)
			values.content && params.set('utm_content', values.content)
			parsedUrl.search = params.toString()
			setUrl(parsedUrl.toString())
		} catch (error) {
			setUrl('')
		}
	}

	return (
		<>
			<Code>{url}</Code>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} onChange={onUpdate} className='space-y-8'>
					<TooltipProvider>
						<FormField
							control={form.control}
							name='url'
							render={({ field }) => (
								<FormItem>
									<FormLabel>URL</FormLabel>
									<FormControl>
										<Input placeholder='https://google.com' {...field} />
									</FormControl>
									<FormDescription>This is the link you want to add UTM tracking to.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='source'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='flex items-center gap-1'>
										Source
										<Tooltip>
											<TooltipTrigger>
												<QuestionMarkCircledIcon />
											</TooltipTrigger>
											<TooltipContent>
												<P className='max-w-[35ch]'>
													Where will people clicking this link be coming from? Facebook,
													LinkedIn, that other one formerly known as Twitter.
												</P>
											</TooltipContent>
										</Tooltip>
									</FormLabel>
									<FormControl>
										<Input placeholder='facebook' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='medium'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='flex items-center gap-1'>
										Medium
										<Tooltip>
											<TooltipTrigger>
												<QuestionMarkCircledIcon />
											</TooltipTrigger>
											<TooltipContent>
												<P className='max-w-[35ch]'>
													More generally, where is this link going to be? Email, social,
													banner
												</P>
											</TooltipContent>
										</Tooltip>
									</FormLabel>
									<FormControl>
										<Input placeholder='social' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='campaign'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='flex items-center gap-1'>
										Campaign
										<Tooltip>
											<TooltipTrigger>
												<QuestionMarkCircledIcon />
											</TooltipTrigger>
											<TooltipContent>
												<P className='max-w-[35ch]'>
													You can use this to identify a specific product promotion or
													strategic campaign.
												</P>
											</TooltipContent>
										</Tooltip>
									</FormLabel>
									<FormControl>
										<Input placeholder='summer-sale' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='term'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='flex items-center gap-1'>
										Term
										<Tooltip>
											<TooltipTrigger>
												<QuestionMarkCircledIcon />
											</TooltipTrigger>
											<TooltipContent>
												<P className='max-w-[35ch]'>
													You can track specific keywords for paid search campaigns.
												</P>
											</TooltipContent>
										</Tooltip>
									</FormLabel>
									<FormControl>
										<Input placeholder='keyword' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='content'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='flex items-center gap-1'>
										Content
										<Tooltip>
											<TooltipTrigger>
												<QuestionMarkCircledIcon />
											</TooltipTrigger>
											<TooltipContent>
												<P className='max-w-[35ch]'>
													You can specify what you are making a link. Is it an image, text, a
													menu? You can use this to differentiate ads or links that point to
													the same URL from the same campaign.
												</P>
											</TooltipContent>
										</Tooltip>
									</FormLabel>
									<FormControl>
										<Input placeholder='image-ad' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</TooltipProvider>
					<Button type='submit'>Copy</Button>
				</form>
			</Form>
		</>
	)
}
