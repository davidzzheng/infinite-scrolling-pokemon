import { useInfiniteQuery } from '@tanstack/react-query'

import { fetchPokemonList } from '../actions/pokemon'

export const usePokemonFeed = (limit: number = 20) =>
	useInfiniteQuery({
		queryKey: ['pokemon-feed', limit],
		queryFn: async ({ pageParam }) => await fetchPokemonList(pageParam, limit),
		initialPageParam: undefined as number | undefined,
		getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
	})
