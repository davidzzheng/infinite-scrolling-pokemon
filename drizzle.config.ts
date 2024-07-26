import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/db/schema.ts",
	dialect: "sqlite",
	dbCredentials: {
		url: "./pokemon.db",
	},
	verbose: true,
	strict: true,
});
