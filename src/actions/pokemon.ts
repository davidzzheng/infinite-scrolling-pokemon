'use server'

import { db } from '../db/client'
import { pokemon } from '../db/schema'
import { withCursorPagination } from '../lib/db'

export const fetchPokemonList = async (cursor?: number, limit: number = 20) => {
	const query = db.select().from(pokemon)

	return await withCursorPagination(query.$dynamic(), {
		cursor,
		limit,
		cursorColumn: pokemon.id,
		sortOrder: 'asc',
	})
}
