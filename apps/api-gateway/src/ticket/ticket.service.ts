import { PurchaseTicketDto, SERVICES_PORTS } from '@app/common';
import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TicketService {
  private readonly ticketServiceUrl: string = `http://localhost:${SERVICES_PORTS.TICKETS_SERVICE}`;

  constructor(private readonly httpService: HttpService) {}

  private handlError(error: unknown): never {
    const err = error as {
      response?: {
        data: string | object;
        status: number;
      };
    };
    if (err.response) {
      throw new HttpException(err.response.data, err.response.status);
    }
    throw new HttpException('Something went wrong', 500);
  }

  async purchase(
    purchaseTicketDto: PurchaseTicketDto,
    userId: string,
  ): Promise<any> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(
          `${this.ticketServiceUrl}/purchase`,
          purchaseTicketDto,
          {
            headers: {
              'x-user-id': userId,
            },
          },
        ),
      );
      return data;
    } catch (error) {
      throw this.handlError(error);
    }
  }

  async findMyTickets(userId: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.ticketServiceUrl}/my-tickets`, {
          headers: {
            'x-user-id': userId,
          },
        }),
      );
      return data;
    } catch (error) {
      throw this.handlError(error);
    }
  }

  async findOne(id: string, userId: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.ticketServiceUrl}/${id}`, {
          headers: {
            'x-user-id': userId,
          },
        }),
      );
      return data;
    } catch (error) {
      throw this.handlError(error);
    }
  }

  async cancel(id: string, userId: string, userRole: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.put(`${this.ticketServiceUrl}/${id}/cancel`, null, {
          headers: {
            'x-user-id': userId,
            'x-user-role': userRole,
          },
        }),
      );
      return data;
    } catch (error) {
      throw this.handlError(error);
    }
  }

  async checkIn(id: string, organizerId: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.put(`${this.ticketServiceUrl}/${id}/checkin`, null, {
          headers: {
            'x-user-id': organizerId,
          },
        }),
      );
      return data;
    } catch (error) {
      throw this.handlError(error);
    }
  }

  async findEventTickets(eventId: string, organizerId: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.ticketServiceUrl}/event/${eventId}`, {
          headers: {
            'x-user-id': organizerId,
          },
        }),
      );
      return data;
    } catch (error) {
      throw this.handlError(error);
    }
  }
}
