import { CreateEventDto, SERVICES_PORTS, UpdateEventDto } from '@app/common';
import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EventService {
  private readonly eventServiceUrl: string = `http://localhost:${SERVICES_PORTS.EVENT_SERVICE}`;

  constructor(private readonly httpService: HttpService) {}

  async createEvent(
    createEventDto: CreateEventDto,
    userId: string,
    userRole: string,
  ) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(`${this.eventServiceUrl}`, createEventDto, {
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

  async findAll() {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.eventServiceUrl}`),
      );
      return data;
    } catch (error) {
      throw this.handlError(error);
    }
  }

  async findOne(id: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.eventServiceUrl}/${id}`),
      );
      return data;
    } catch (error) {
      throw this.handlError(error);
    }
  }

  async update(
    id: string,
    updateEventDto: UpdateEventDto,
    userId: string,
    userRole: string,
  ) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.put(`${this.eventServiceUrl}/${id}`, updateEventDto, {
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

  async publish(id: string, userId: string, userRole: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.put(`${this.eventServiceUrl}/${id}/publish`, null, {
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

  async cancel(id: string, userId: string, userRole: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.put(`${this.eventServiceUrl}/${id}/cancel`, null, {
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

  async findMyEvents(userId: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.eventServiceUrl}/my-events`, {
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
}
