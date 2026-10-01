import { integer, pgEnum, pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { events, users } from './index.js';

export const ticketStatusEnum = pgEnum('ticket_status', [
  'PENDING',
  'CONFIRMED',
  'CHECKED_IN',
  'CANCELLED',
]);

export const tickets = pgTable('tickets', {
  id: uuid('id').primaryKey().defaultRandom(),
  eventId: uuid('event_id')
    .notNull()
    .references(() => events.id),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  quantity: integer('quantity').notNull().default(1),
  totalPrice: integer('total_price').notNull().default(0),
  status: ticketStatusEnum('status').notNull().default('PENDING'),
  purchasedAt: timestamp('purchased_at').notNull().defaultNow(),
  checkedInAt: timestamp('checked_in_at'),
  cancelledAt: timestamp('cancelled_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Ticket = typeof tickets.$inferSelect;
export type NewTicket = typeof tickets.$inferInsert;
