import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';
import { SessionsService } from './sessions.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Sessions')
@ApiBearerAuth()
@Controller('user')
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  @Get(':id/session-of-the-day')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'Get session of the day',
    schema: {
      example: {
        dayOfWeek: 'Saturday',
        date: '2025-08-02',
        activity: 'Guided Meditation',
        completed: false,
      },
    },
  })
  getSession(@Param('id') id: string) {
    // Optionally, check req.user.userId === id
    return this.sessionsService.getSessionOfTheDay(Number(id));
  }
}
