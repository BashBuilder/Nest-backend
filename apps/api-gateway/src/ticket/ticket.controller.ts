import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TicketService } from './ticket.service.js';
import { PurchaseTicketDto } from '@app/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('purchase')
  purchase(
    @Body() purchaseDto: PurchaseTicketDto,
    @Request() req: { user: { userId: string } },
  ) {
    return this.ticketService.purchase(purchaseDto, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my-tickets')
  findMyTickets(@Request() req: { user: { userId: string } }) {
    return this.ticketService.findMyTickets(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(
    @Request() req: { user: { userId: string } },
    @Param('id') id: string,
  ) {
    return this.ticketService.findOne(id, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/cancel')
  cancel(
    @Request() req: { user: { userId: string; role?: string } },
    @Param('id') id: string,
  ) {
    return this.ticketService.cancel(
      id,
      req.user.userId,
      req.user.role ?? 'USER',
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/checkin')
  checkIn(
    @Request() req: { user: { userId: string } },
    @Param('id') id: string,
  ) {
    return this.ticketService.checkIn(id, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('event/:eventId')
  findEventTickets(
    @Request() req: { user: { userId: string } },
    @Param('eventId') eventId: string,
  ) {
    return this.ticketService.findEventTickets(eventId, req.user.userId);
  }
}
