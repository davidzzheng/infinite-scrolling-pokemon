'use client'

import { useMemo, useCallback } from 'react'
import { usePokemonFeed } from '../state/feed'
import { Feed } from '../components/feed'

export const HomeView = () => {
	const { data, error, fetchNextPage, isLoading } = usePokemonFeed()

	const feed = useMemo(() => (data ? data.pages.flat() : []), [data])

	const loadMore = useCallback(() => fetchNextPage(), [fetchNextPage])

	return (
		<div className="flex flex-col items-center gap-y-6">
			{error && <div>Error: {error.message}</div>}
			<Feed items={feed} isLoading={isLoading} loadMore={loadMore} />
		</div>
	)
}
