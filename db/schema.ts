import {sqliteTable,text,integer} from 'drizzle-orm/sqlite-core';
export const content=sqliteTable('content',{id:integer('id').primaryKey(),draft:text('draft').notNull(),published:text('published').notNull(),revision:integer('revision').notNull().default(0),updatedAt:text('updated_at').notNull()});
export const followups=sqliteTable('followups',{id:text('id').primaryKey(),customer:text('customer').notNull(),body:text('body').notNull(),createdAt:text('created_at').notNull()});
