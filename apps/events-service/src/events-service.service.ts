import { CreateEventDto, UpdateEventDto } from '@app/common';
import { DatabaseService } from '@app/database';
import { events } from '@app/database/schema/events.js';
import { KAFKA_TOPICS } from '@app/kafka';
import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { eq } from 'drizzle-orm';

@Injectable()
export class EventsServiceService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    private readonly dbService: DatabaseService,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  async createEvent(createEventDto: CreateEventDto, organizerId: string) {
    const [event] = await this.dbService.db
      .insert(events)
      .values({
        ...createEventDto,
        organizerId,
        date: new Date(createEventDto.date),
        price: createEventDto.price ?? 0,
      })
      .returning();

    this.kafkaClient.emit(KAFKA_TOPICS.EVENT_CREATED, {
      eventId: event.id,
      organizerId: event.organizerId,
      title: event.title,
      date: event.date,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      message: 'Event created successfully',
      eventId: event.id,
    };
  }

  async findAll() {
    return this.dbService.db
      .select()
      .from(events)
      .where(eq(events.status, 'PUBLISHED'));
  }

  async findOne(id: string) {
    const [event] = await this.dbService.db
      .select()
      .from(events)
      .where(eq(events.id, id))
      .limit(1);

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  async update(
    id: string,
    updateEventDto: UpdateEventDto,
    userId: string,
    userRole: string,
  ) {
    const event = await this.findOne(id);

    if (event.organizerId !== userId && userRole !== 'ADMIN') {
      throw new ForbiddenException(
        'You are not authorized to update this event',
      );
    }
    const updatedData: Record<string, unknown> = { ...updateEventDto };

    if (updateEventDto.date) {
      updatedData.date = new Date(updateEventDto.date);
    }

    updatedData.updatedAt = new Date();

    const [updatedEvent] = await this.dbService.db
      .update(events)
      .set(updatedData)
      .where(eq(events.id, id))
      .returning();

    this.kafkaClient.emit(KAFKA_TOPICS.EVENT_UPDATED, {
      eventId: updatedEvent.id,
      changes: Object.keys(updatedData),
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      message: 'Event updated successfully',
      eventId: updatedEvent.id,
    };
  }

  async publish(id: string, userId: string, userRole: string) {
    const event = await this.findOne(id);

    if (event.organizerId !== userId && userRole !== 'ADMIN') {
      throw new ForbiddenException(
        'You are not authorized to publish this event',
      );
    }

    const [published] = await this.dbService.db
      .update(events)
      .set({ status: 'PUBLISHED', updatedAt: new Date() })
      .where(eq(events.id, id))
      .returning();

    this.kafkaClient.emit(KAFKA_TOPICS.EVENT_PUBLISHED, {
      eventId: published.id,
      changes: ['status'],
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      message: 'Event published successfully',
      eventId: published.id,
    };
  }

  async cancel(id: string, userId: string, userRole: string) {
    const event = await this.findOne(id);

    if (event.organizerId !== userId && userRole !== 'ADMIN') {
      throw new ForbiddenException(
        'You are not authorized to cancel this event',
      );
    }

    const [cancelled] = await this.dbService.db
      .update(events)
      .set({ status: 'CANCELLED', updatedAt: new Date() })
      .where(eq(events.id, id))
      .returning();

    this.kafkaClient.emit(KAFKA_TOPICS.EVENT_CANCELLED, {
      eventId: cancelled.id,
      changes: ['status'],
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      message: 'Event cancelled successfully',
      eventId: cancelled.id,
    };
  }

  async findMyEvents(userId: string) {
    return this.dbService.db
      .select()
      .from(events)
      .where(eq(events.organizerId, userId));
  }
}
