"use client";

import { usePokemonFeed } from "@/src/state/feed";
import { useMemo } from "react";

export const Feed = () => {
	const { data, error, size, setSize } = usePokemonFeed();

	const feed = useMemo(() => (data ? data.flat() : []), [data]);

	return (
		<div>
			{error && <div>Error: {error.message}</div>}
			{feed.map((pokemon) => (
				<div key={pokemon.id}>
					<img src={pokemon.sprite!} alt={pokemon.name} />
					<p>{pokemon.name}</p>
					<div>Weight: {pokemon.weight}</div>
				</div>
			))}
			<button onClick={() => setSize(size + 1)}>Load More</button>
		</div>
	);
};
