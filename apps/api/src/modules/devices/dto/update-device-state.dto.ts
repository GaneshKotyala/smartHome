import { IsObject, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { DeviceState } from '@ganesh-home-hub/shared-types';

export class UpdateDeviceStateDto {
  @ApiPropertyOptional({
    description: 'Partial device state — merged with existing state',
    example: { on: true, brightness: 80 },
  })
  @IsObject()
  @IsOptional()
  state?: Partial<DeviceState>;
}
