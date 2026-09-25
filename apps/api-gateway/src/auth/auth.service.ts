import { LoginDto, RegisterDto, SERVICES_PORTS } from '@app/common';
import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  private readonly authServiceUrl = `http:localhost:${SERVICES_PORTS.AUTH_SERVICE}`;

  constructor(private readonly httpService: HttpService) {}

  async register(data: RegisterDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.authServiceUrl}/register`, data),
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async login(data: LoginDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.authServiceUrl}/login`, data),
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getProfile(token: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.authServiceUrl}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): never {
    if (error.response) {
      throw new HttpException(error.response.data, error.response.status);
    }

    throw new HttpException('Something went wrong', 500);
  }
}
