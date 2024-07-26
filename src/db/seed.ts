import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'

import * as schema from './schema'

// Initialize the database
const sqlite = new Database('pokemon.db')
const db = drizzle(sqlite, { schema })

async function fetchPokemonData(id: number) {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
	return await response.json()
}

async function populateDatabase() {
	for (let i = 1; i <= 151; i++) {
		// Fetch first 151 Pokémon
		const pokemonData = await fetchPokemonData(i)

		// Insert Pokemon
		await db.insert(schema.pokemon).values({
			id: pokemonData.id,
			name: pokemonData.name,
			height: pokemonData.height,
			weight: pokemonData.weight,
			baseExperience: pokemonData.base_experience,
			sprite: pokemonData.sprites.front_default,
		})

		// Insert Types
		for (const typeData of pokemonData.types) {
			await db
				.insert(schema.types)
				.values({
					id: parseInt(typeData.type.url.split('/').slice(-2, -1)[0]),
					name: typeData.type.name,
				})
				.onConflictDoNothing()

			await db.insert(schema.pokemonTypes).values({
				pokemonId: pokemonData.id,
				typeId: parseInt(typeData.type.url.split('/').slice(-2, -1)[0]),
			})
		}

		// Insert Abilities
		for (const abilityData of pokemonData.abilities) {
			await db
				.insert(schema.abilities)
				.values({
					id: parseInt(abilityData.ability.url.split('/').slice(-2, -1)[0]),
					name: abilityData.ability.name,
				})
				.onConflictDoNothing()

			await db.insert(schema.pokemonAbilities).values({
				pokemonId: pokemonData.id,
				abilityId: parseInt(
					abilityData.ability.url.split('/').slice(-2, -1)[0],
				),
			})
		}

		// Insert Moves
		for (const moveData of pokemonData.moves) {
			const moveResponse = await fetch(moveData.move.url)
			const moveDetails = await moveResponse.json()

			await db
				.insert(schema.moves)
				.values({
					id: moveDetails.id,
					name: moveDetails.name,
					power: moveDetails.power,
					accuracy: moveDetails.accuracy,
					pp: moveDetails.pp,
				})
				.onConflictDoNothing()

			await db.insert(schema.pokemonMoves).values({
				pokemonId: pokemonData.id,
				moveId: moveDetails.id,
			})
		}

		console.log(`Inserted data for ${pokemonData.name}`)
	}
}

populateDatabase().then(() => console.log('Database population complete'))
