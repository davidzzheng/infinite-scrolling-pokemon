"use server";

import { db } from "../db/client";
import { pokemon } from "../db/schema";
import { withCursorPagination } from "../lib/db";

export const fetchPokemonList = async (cursor: string, limit: number) => {
	const query = db.select().from(pokemon);

	return withCursorPagination(query.$dynamic(), {
		cursor,
		limit,
		cursorColumn: pokemon.id,
		sortOrder: "asc",
	});
};
