import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { ReflectionService } from './reflection.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Reflection')
@ApiBearerAuth()
@Controller('user/:id/reflection')
export class ReflectionController {
  constructor(private reflectionService: ReflectionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiBody({ schema: { example: { text: 'I feel happy today' } } })
  @ApiResponse({
    status: 200,
    description: 'Detect emotion from reflection text',
    schema: { example: { emotion: 'joy' } },
  })
  async reflect(@Param('id') id: string, @Body() body: any) {
    if (!body || typeof body.text !== 'string') {
      return { error: 'Missing or invalid "text" in request body.' };
    }
    return this.reflectionService.analyzeText(body.text);
  }
}
