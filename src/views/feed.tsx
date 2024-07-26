'use client'

import { useCallback, useMemo } from 'react'

import { usePokemonFeed } from '@/src/state/feed'
import { capitalize } from '../lib/string'

export const Feed = () => {
	const { data, error, fetchNextPage, isLoading } = usePokemonFeed()

	const feed = useMemo(() => (data ? data.pages.flat() : []), [data])

	const loadMore = useCallback(() => fetchNextPage(), [fetchNextPage])

	return (
		<div className="flex flex-col items-center gap-y-6">
			{error && <div>Error: {error.message}</div>}
			<ul className="flex flex-col gap-y-6">
				{feed.map((pokemon) => (
					<li
						key={pokemon.id}
						className="w-48 rounded-lg transition p-2 hover:shadow-slate-300 hover:shadow-lg"
					>
						<img src={pokemon.sprite!} alt={pokemon.name} className="w-full" />
						<div className="flex justify-between items-center">
							<h2 className="text-lg font-medium">
								{capitalize(pokemon.name)}
							</h2>
							<span className="text-[11px] font-semibold text-gray-500 p-1 rounded-lg bg-slate-200">
								#{String(pokemon.id).padStart(4, '0')}
							</span>
						</div>
					</li>
				))}
			</ul>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<button
					onClick={loadMore}
					className="w-full rounded-lg bg-slate-200 p-2 text-center text-lg font-medium text-slate-600 hover:bg-slate-300 transition"
				>
					Load More
				</button>
			)}
		</div>
	)
}
