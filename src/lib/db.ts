import { asc, desc, gt, lt } from "drizzle-orm";
import type { SQLiteColumn, SQLiteSelect } from "drizzle-orm/sqlite-core";

type SortOrder = "asc" | "desc";

type CursorConfig = {
	cursor: any;
	limit: number;
	cursorColumn: SQLiteColumn;
	sortOrder?: SortOrder;
};

export const withCursorPagination = <T extends SQLiteSelect>(
	query: T,
	// default sort order is descending, i.e. newest first
	{ cursor, limit = 20, cursorColumn, sortOrder = "desc" }: CursorConfig,
) =>
	cursor
		? query
				.orderBy(sortOrder === "asc" ? asc(cursorColumn) : desc(cursorColumn))
				.where(
					sortOrder === "desc"
						? lt(cursorColumn, cursor)
						: gt(cursorColumn, cursor),
				)
				.limit(limit)
		: query
				.orderBy(sortOrder === "asc" ? asc(cursorColumn) : desc(cursorColumn))
				.limit(limit);
