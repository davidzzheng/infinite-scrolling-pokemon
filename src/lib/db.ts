import { asc, desc, gt, lt } from 'drizzle-orm/expressions'
import type { SQLiteColumn, SQLiteSelect } from 'drizzle-orm/sqlite-core'

type DataTypeMap = {
	string: string;
	number: number;
	boolean: boolean;
	array: any[];
	json: object;
	date: Date;
	bigint: bigint;
	custom: any;
	buffer: Buffer;
};
type ConvertDataType<T extends keyof DataTypeMap> = DataTypeMap[T];

type SortOrder = 'asc' | 'desc';

type CursorConfig<T extends SQLiteColumn> = {
	cursor?: ConvertDataType<T['dataType']>;
	cursorColumn: T;
	limit: number;
	sortOrder?: SortOrder;
};

export const withCursorPagination = <
	T extends SQLiteColumn,
	U extends SQLiteSelect,
>(
	query: U,
	{ cursor, cursorColumn, limit = 20, sortOrder = 'desc' }: CursorConfig<T>,
) =>
	cursor
		? query
				.orderBy(sortOrder === 'asc' ? asc(cursorColumn) : desc(cursorColumn))
				.where(
					sortOrder === 'desc'
						? lt(cursorColumn, cursor)
						: gt(cursorColumn, cursor),
				)
				.limit(limit)
		: query
				.orderBy(sortOrder === 'asc' ? asc(cursorColumn) : desc(cursorColumn))
				.limit(limit)
