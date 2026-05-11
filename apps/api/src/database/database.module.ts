import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DeviceEntity } from '../modules/devices/devices.entity';
import { RoutineEntity } from '../modules/routines/routines.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'better-sqlite3',
        database: config.get<string>('DATABASE_PATH', './data/ganesh-home-hub.sqlite'),
        entities: [DeviceEntity, RoutineEntity],
        synchronize: true, // auto-creates tables in dev — disable before prod migration
        logging: config.get('NODE_ENV') === 'development',
      }),
    }),
  ],
})
export class DatabaseModule {}
