import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, pgEnum, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";


export const messageStatus = pgEnum('post_status', ['DRAFT', 'PUBLISHED', 'DELETED']);

export const post = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }),
  content: text('content'),
  created_at: timestamp('created_at').notNull().defaultNow(),
  status: messageStatus('post_status').default('DRAFT'),
})

export type PostType = InferInsertModel<typeof post>;