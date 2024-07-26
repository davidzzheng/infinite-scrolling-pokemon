import {
	sqliteTable,
	text,
	integer,
	primaryKey,
} from 'drizzle-orm/sqlite-core'

// Pokemon table
export const pokemon = sqliteTable('pokemon', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	height: integer('height'),
	weight: integer('weight'),
	baseExperience: integer('base_experience'),
	sprite: text('sprite'),
})

// Types table
export const types = sqliteTable('types', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
})

// Pokemon-Type relationship table
export const pokemonTypes = sqliteTable(
	'pokemon_types',
	{
		pokemonId: integer('pokemon_id')
			.notNull()
			.references(() => pokemon.id),
		typeId: integer('type_id')
			.notNull()
			.references(() => types.id),
	},
	(table) => ({
		pk: primaryKey({ columns: [table.pokemonId, table.typeId] }),
	}),
)

// Abilities table
export const abilities = sqliteTable('abilities', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
})

// Pokemon-Ability relationship table
export const pokemonAbilities = sqliteTable(
	'pokemon_abilities',
	{
		pokemonId: integer('pokemon_id')
			.notNull()
			.references(() => pokemon.id),
		abilityId: integer('ability_id')
			.notNull()
			.references(() => abilities.id),
	},
	(table) => ({
		pk: primaryKey({ columns: [table.pokemonId, table.abilityId] }),
	}),
)

// Moves table
export const moves = sqliteTable('moves', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	power: integer('power'),
	accuracy: integer('accuracy'),
	pp: integer('pp'),
})

// Pokemon-Move relationship table
export const pokemonMoves = sqliteTable(
	'pokemon_moves',
	{
		pokemonId: integer('pokemon_id')
			.notNull()
			.references(() => pokemon.id),
		moveId: integer('move_id')
			.notNull()
			.references(() => moves.id),
	},
	(table) => ({
		pk: primaryKey({ columns: [table.pokemonId, table.moveId] }),
	}),
)
