import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoutineEntity } from './routines.entity';
import { DevicesService } from '../devices/devices.service';
import type { RoutineAction } from '@ganesh-home-hub/shared-types';

@Injectable()
export class RoutinesService {
  constructor(
    @InjectRepository(RoutineEntity)
    private readonly routinesRepository: Repository<RoutineEntity>,
    private readonly devicesService: DevicesService,
  ) {}

  findAll(): Promise<RoutineEntity[]> {
    return this.routinesRepository.find({
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: string): Promise<RoutineEntity> {
    const routine = await this.routinesRepository.findOne({ where: { id } });
    if (!routine) {
      throw new NotFoundException(`Routine with id "${id}" not found`);
    }
    return routine;
  }

  /**
   * Orchestrates the execution of a routine by iterating through its actions
   * and delegating the state changes to the DevicesService.
   * This is the foundation of the orchestration layer!
   */
  async execute(id: string): Promise<{ success: boolean; executedCount: number }> {
    const routine = await this.findOne(id);

    if (!routine.isActive) {
      throw new Error(`Routine "${routine.name}" is currently disabled.`);
    }

    const actions = routine.actions as RoutineAction[] || [];
    let executedCount = 0;

    for (const action of actions) {
      try {
        // Wait for optional delay before executing this specific action
        if (action.delayMs) {
          await new Promise(res => setTimeout(res, action.delayMs));
        }

        // Delegate to DevicesService. This automatically handles merging JSON state
        // and in Phase 3, DevicesService will automatically publish to MQTT here!
        await this.devicesService.updateState(action.deviceId, { state: action.stateChange });
        executedCount++;
      } catch (err) {
        console.error(`[Routine Execution] Failed to update device ${action.deviceId}:`, err);
        // Continue executing remaining actions even if one device fails
      }
    }

    return { success: true, executedCount };
  }
}
