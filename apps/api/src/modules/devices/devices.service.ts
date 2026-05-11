import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeviceEntity } from './devices.entity';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceStateDto } from './dto/update-device-state.dto';
import { DeviceState } from '@ganesh-home-hub/shared-types';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(DeviceEntity)
    private readonly devicesRepository: Repository<DeviceEntity>,
  ) {}

  // ─── Get all devices ────────────────────────────────────────────────────────
  findAll(): Promise<DeviceEntity[]> {
    return this.devicesRepository.find({
      order: { createdAt: 'ASC' },
    });
  }

  // ─── Get one device ─────────────────────────────────────────────────────────
  async findOne(id: string): Promise<DeviceEntity> {
    const device = await this.devicesRepository.findOne({ where: { id } });
    if (!device) {
      throw new NotFoundException(`Device with id "${id}" not found`);
    }
    return device;
  }

  // ─── Create device ──────────────────────────────────────────────────────────
  async create(dto: CreateDeviceDto): Promise<DeviceEntity> {
    const defaultState = this.getDefaultState(dto.type);
    const device = this.devicesRepository.create({
      ...dto,
      state: defaultState,
      isSimulated: dto.isSimulated ?? true,
    });
    return this.devicesRepository.save(device);
  }

  // ─── Update device state (partial merge) ────────────────────────────────────
  async updateState(id: string, dto: UpdateDeviceStateDto): Promise<DeviceEntity> {
    const device = await this.findOne(id);

    if (dto.state) {
      // Merge: preserve existing state keys, override only what's provided
      device.state = { ...device.state, ...dto.state } as DeviceState;
    }

    return this.devicesRepository.save(device);
  }

  // ─── Toggle on/off shortcut ─────────────────────────────────────────────────
  async toggle(id: string): Promise<DeviceEntity> {
    const device = await this.findOne(id);
    const currentOn = device.state.on ?? device.state.active ?? false;

    if ('active' in device.state) {
      device.state = { ...device.state, active: !currentOn } as DeviceState;
    } else {
      device.state = { ...device.state, on: !currentOn } as DeviceState;
    }

    return this.devicesRepository.save(device);
  }

  // ─── Delete device ──────────────────────────────────────────────────────────
  async remove(id: string): Promise<void> {
    const device = await this.findOne(id);
    await this.devicesRepository.remove(device);
  }

  // ─── Private: default state per type ────────────────────────────────────────
  private getDefaultState(type: string): DeviceState {
    const defaults: Record<string, DeviceState> = {
      light:  { on: false, brightness: 80 },
      fan:    { on: false, speed: 2 },
      outlet: { on: false },
      scene:  { active: false },
    };
    return defaults[type] ?? { on: false };
  }
}
