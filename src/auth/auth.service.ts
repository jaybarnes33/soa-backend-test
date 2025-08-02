import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // Mock validate user
  async validateUser(username: string, password: string) {
    // Replace with real logic
    if (username === 'test' && password === 'test') {
      return {
        id: 1,
        username: 'test',
        subscriptionStatus: 'inactive',
        subscribedAt: null,
      };
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
