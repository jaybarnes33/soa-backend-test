import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}
  @Get('user')
  @ApiResponse({ status: 200, description: 'Get current user info', schema: { example: { id: 1, username: 'test', subscriptionStatus: 'active', subscribedAt: '2024-08-01T00:00:00.000Z' } } })
  async getUser() {
    // For demo: always return user 1
    const user = this.usersService.findById(1);
    if (!user) {
      return { error: 'User not found' };
    }
    return user;
  }

  @Post('login')
  @ApiBody({ schema: { example: { username: 'test', password: 'test' } } })
  @ApiResponse({ status: 200, description: 'Login and get JWT', schema: { example: { access_token: '...' } } })
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      return { error: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }
}
