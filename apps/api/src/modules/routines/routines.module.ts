import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutineEntity } from './routines.entity';
import { RoutinesController } from './routines.controller';
import { RoutinesService } from './routines.service';
import { DevicesModule } from '../devices/devices.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoutineEntity]),
    DevicesModule, // allows RoutinesService to call DevicesService
  ],
  controllers: [RoutinesController],
  providers: [RoutinesService],
  exports: [RoutinesService],
})
export class RoutinesModule {}
