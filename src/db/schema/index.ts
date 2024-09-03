import { InferInsertModel, InferModelFromColumns, InferSelectModel } from "drizzle-orm";
import { pgTable, pgEnum, integer, varchar, text, timestamp } from "drizzle-orm/pg-core";


export const messageStatus = pgEnum('post_status', ['DRAFT', 'PUBLISHED', 'DELETED']);

export const post = pgTable('posts', {
  id: integer('id').primaryKey().notNull(),
  title: varchar('title', { length: 255 }),
  content: text('content'),
  created_at: timestamp('created_at').notNull(),
  status: messageStatus('post_status').default('DRAFT'),
})

export type Post = InferSelectModel<typeof post>;
export type NewPost = InferInsertModel<typeof post>;