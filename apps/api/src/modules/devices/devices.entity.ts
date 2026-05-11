import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { DeviceType, DeviceState } from '@ganesh-home-hub/shared-types';

@Entity('devices')
export class DeviceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 20 })
  type: DeviceType;

  @Column({ type: 'varchar', length: 100 })
  location: string;

  // Stored as JSON string in SQLite, parsed automatically
  @Column({
    type: 'simple-json',
    default: '{}',
  })
  state: DeviceState;

  @Column({ type: 'boolean', default: true })
  isSimulated: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
