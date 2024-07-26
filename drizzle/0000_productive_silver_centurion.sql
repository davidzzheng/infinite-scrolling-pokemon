CREATE TABLE `abilities` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `moves` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`power` integer,
	`accuracy` integer,
	`pp` integer
);
--> statement-breakpoint
CREATE TABLE `pokemon` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`height` integer,
	`weight` integer,
	`base_experience` integer,
	`sprite` text
);
--> statement-breakpoint
CREATE TABLE `pokemon_abilities` (
	`pokemon_id` integer NOT NULL,
	`ability_id` integer NOT NULL,
	PRIMARY KEY(`ability_id`, `pokemon_id`),
	FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ability_id`) REFERENCES `abilities`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `pokemon_moves` (
	`pokemon_id` integer NOT NULL,
	`move_id` integer NOT NULL,
	PRIMARY KEY(`move_id`, `pokemon_id`),
	FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`move_id`) REFERENCES `moves`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `pokemon_types` (
	`pokemon_id` integer NOT NULL,
	`type_id` integer NOT NULL,
	PRIMARY KEY(`pokemon_id`, `type_id`),
	FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`type_id`) REFERENCES `types`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `types` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
