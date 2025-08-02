import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuccessController } from './success.controller';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SessionsModule } from './sessions/sessions.module';
import { StripeModule } from './stripe/stripe.module';
import { ConfigModule } from '@nestjs/config';
import { ReflectionModule } from './reflection/reflection.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    SessionsModule,
    StripeModule,
    ReflectionModule,
  ],
  controllers: [AppController, SuccessController],
  providers: [AppService],
})
export class AppModule {}
