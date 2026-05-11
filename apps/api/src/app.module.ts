import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DevicesModule } from './modules/devices/devices.module';
import { RoutinesModule } from './modules/routines/routines.module';
import { AssistantModule } from './modules/assistant/assistant.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    // Load .env globally — must be first
    ConfigModule.forRoot({ isGlobal: true }),

    // Database — must be before feature modules
    DatabaseModule,

    // Feature modules
    DevicesModule,
    RoutinesModule,
    AssistantModule,
    NotificationsModule,

    // Stubbed — ready for JWT implementation
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
