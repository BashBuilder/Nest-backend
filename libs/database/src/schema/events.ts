import { users } from './users';
import { pgTable, uuid, varchar, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const eventStatusEnum = pgEnum('event_status', [
  'DRAFT',
  'PUBLISHED',
  'CANCELLED',
]);

export const events = pgTable('events', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }),
  status: eventStatusEnum('status').notNull().default('DRAFT'),
  date: timestamp('date').notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  capacity: varchar('capacity', { length: 255 }).notNull(),
  price: varchar('price', { length: 255 }).notNull(),
  organizerId: uuid('organizer_id')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
