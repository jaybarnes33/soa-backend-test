import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';

@Module({
  imports: [UsersModule],
  providers: [SessionsService],
  controllers: [SessionsController],
})
export class SessionsModule {}
