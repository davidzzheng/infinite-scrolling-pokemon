import useSWRInfinite from "swr/infinite";
import { fetchPokemonList } from "../actions/pokemon";

export const usePokemonFeed = (limit: number = 20) =>
	useSWRInfinite(
		(pageIndex, previousData) => {
			if (pageIndex === 0) return [null];
			// last page
			if (previousData.length < limit) return null;

			return [previousData.at(-1)?.id];
		},
		async ([cursor]) => await fetchPokemonList(cursor, limit),
		{ revalidateAll: false, revalidateFirstPage: false },
	);
