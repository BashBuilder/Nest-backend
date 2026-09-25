import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthServiceService } from './auth-service.service.js';
import { LoginDto, RegisterDto } from '@app/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authServiceService.register(body);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authServiceService.login(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req: { user: { userId: string } }) {
    console.log('req.user in getProfile: ', req.user);
    return this.authServiceService.getProfile(req.user.userId);
  }
}
