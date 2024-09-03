import { pgTable, serial, varchar, text, timestamp, pgEnum } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const postStatus = pgEnum("post_status", ['DRAFT', 'PUBLISHED', 'DELETED'])



export const posts = pgTable("posts", {
	id: serial("id").primaryKey().notNull(),
	title: varchar("title", { length: 255 }),
	content: text("content"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	postStatus: postStatus("post_status").default('DRAFT'),
});