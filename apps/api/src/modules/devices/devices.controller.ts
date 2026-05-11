import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceStateDto } from './dto/update-device-state.dto';
import { DeviceEntity } from './devices.entity';

// Phase 2: Add @UseGuards(JwtAuthGuard) here to protect all routes
@ApiTags('devices')
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  // ─── GET /devices ─────────────────────────────────────────────────────────
  @Get()
  @ApiOperation({ summary: 'List all devices with current state' })
  @ApiResponse({ status: 200, description: 'Array of devices', type: [DeviceEntity] })
  findAll(): Promise<DeviceEntity[]> {
    return this.devicesService.findAll();
  }

  // ─── GET /devices/:id ──────────────────────────────────────────────────────
  @Get(':id')
  @ApiOperation({ summary: 'Get a single device by ID' })
  @ApiParam({ name: 'id', description: 'Device UUID' })
  @ApiResponse({ status: 200, type: DeviceEntity })
  @ApiResponse({ status: 404, description: 'Device not found' })
  findOne(@Param('id') id: string): Promise<DeviceEntity> {
    return this.devicesService.findOne(id);
  }

  // ─── POST /devices ────────────────────────────────────────────────────────
  @Post()
  @ApiOperation({ summary: 'Register a new device (virtual or real)' })
  @ApiResponse({ status: 201, type: DeviceEntity })
  create(@Body() dto: CreateDeviceDto): Promise<DeviceEntity> {
    return this.devicesService.create(dto);
  }

  // ─── PATCH /devices/:id/state ─────────────────────────────────────────────
  @Patch(':id/state')
  @ApiOperation({ summary: 'Update device state (partial merge)' })
  @ApiParam({ name: 'id', description: 'Device UUID' })
  @ApiResponse({ status: 200, type: DeviceEntity })
  @ApiResponse({ status: 404, description: 'Device not found' })
  updateState(
    @Param('id') id: string,
    @Body() dto: UpdateDeviceStateDto,
  ): Promise<DeviceEntity> {
    return this.devicesService.updateState(id, dto);
  }

  // ─── PATCH /devices/:id/toggle ────────────────────────────────────────────
  @Patch(':id/toggle')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Toggle device on/off' })
  @ApiParam({ name: 'id', description: 'Device UUID' })
  @ApiResponse({ status: 200, type: DeviceEntity })
  toggle(@Param('id') id: string): Promise<DeviceEntity> {
    return this.devicesService.toggle(id);
  }

  // ─── DELETE /devices/:id ──────────────────────────────────────────────────
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a device' })
  @ApiParam({ name: 'id', description: 'Device UUID' })
  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  remove(@Param('id') id: string): Promise<void> {
    return this.devicesService.remove(id);
  }
}
