import { createClient } from '@libsql/client'
import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/libsql'

config()

const client = createClient({
	url: process.env.TURSO_CONNECTION_URL!,
	authToken: process.env.TURSO_AUTH_TOKEN!,
})

import * as schema from './schema'

export const db = drizzle(client, { schema })
