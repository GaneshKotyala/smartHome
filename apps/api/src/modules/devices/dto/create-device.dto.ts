import { IsString, IsIn, IsBoolean, IsOptional, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { DeviceType } from '@ganesh-home-hub/shared-types';

export class CreateDeviceDto {
  @ApiProperty({ example: 'Room Light', description: 'Display name of the device' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @ApiProperty({ enum: ['light', 'fan', 'outlet', 'scene'], example: 'light' })
  @IsIn(['light', 'fan', 'outlet', 'scene'])
  type: DeviceType;

  @ApiProperty({ example: 'Bedroom', description: 'Room or location name' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  location: string;

  @ApiPropertyOptional({ example: true, description: 'Whether this is a simulated device' })
  @IsBoolean()
  @IsOptional()
  isSimulated?: boolean;
}
