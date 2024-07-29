import { defineConfig } from 'drizzle-kit'
import { config } from 'dotenv'

config({ path: '.env' })

export default defineConfig({
	schema: './src/db/schema.ts',
	dialect: 'sqlite',
	dbCredentials: {
		url: process.env.TURSO_CONNECTION_URL!,
		authToken: process.env.TURSO_AUTH_TOKEN,
	},
	driver: 'turso',
	verbose: true,
	strict: true,
})
