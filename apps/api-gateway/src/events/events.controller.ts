import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service.js';
import { CreateEventDto, UpdateEventDto } from '@app/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my-events')
  findMyEvents(@Request() req: { user: { userId: string } }) {
    return this.eventService.findMyEvents(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @Body() createEventDto: CreateEventDto,
    @Headers('x-user-id') userId: string,
    @Headers('x-user-role') userRole: string,
  ) {
    return this.eventService.createEvent(createEventDto, userId, userRole);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @Request() req: { user: { userId: string; role?: string } },
  ) {
    return this.eventService.update(
      id,
      updateEventDto,
      req.user.userId,
      req.user.role ?? 'USER',
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id/publish')
  publish(
    @Param('id') id: string,
    @Request() req: { user: { userId: string; role?: string } },
  ) {
    return this.eventService.publish(
      id,
      req.user.userId,
      req.user.role ?? 'USER',
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id/cancel')
  cancel(
    @Param('id') id: string,
    @Request() req: { user: { userId: string; role?: string } },
  ) {
    return this.eventService.cancel(
      id,
      req.user.userId,
      req.user.role ?? 'USER',
    );
  }
}
