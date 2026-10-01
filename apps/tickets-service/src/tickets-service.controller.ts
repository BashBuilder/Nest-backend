import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { TicketsServiceService } from './tickets-service.service.js';
import { PurchaseTicketDto } from '@app/common/dtos/index.js';

@Controller()
export class TicketsServiceController {
  constructor(private readonly ticketsServiceService: TicketsServiceService) {}

  @Post('purchase')
  purchase(
    @Body() purchaseDto: PurchaseTicketDto,
    @Headers('x-user-id') userId: string,
  ) {
    return this.ticketsServiceService.purchase(purchaseDto, userId);
  }

  @Get('my-tickets')
  findMyTickets(@Headers('x-user-id') userId: string) {
    return this.ticketsServiceService.findMyTickets(userId);
  }

  @Get(':id')
  findOne(
    @Headers('x-user-id') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.ticketsServiceService.findOne(id, userId);
  }

  @Post(':id/cancel')
  cancel(
    @Headers('x-user-id') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.ticketsServiceService.cancel(id, userId, 'USER');
  }

  @Post(':id/checkin')
  checkIn(
    @Headers('x-user-id') organizerId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.ticketsServiceService.checkIn(id, organizerId);
  }

  @Get('event/:eventId')
  findEventTickets(
    @Headers('x-user-id') userId: string,
    @Param('eventId', ParseUUIDPipe) eventId: string,
  ) {
    return this.ticketsServiceService.findEventTickets(eventId, userId);
  }
}
