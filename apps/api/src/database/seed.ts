/**
 * Seed script — populates the database with simulated devices and default routines.
 * Run: npm run seed  (from apps/api)
 *
 * Safe to run multiple times — idempotent checks before inserting.
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DevicesService } from '../modules/devices/devices.service';
import { RoutinesService } from '../modules/routines/routines.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RoutineEntity } from '../modules/routines/routines.entity';
import { Repository } from 'typeorm';

const SIMULATED_DEVICES = [
  { name: 'Room Light',  type: 'light' as const, location: 'Bedroom',    isSimulated: true },
  { name: 'Ceiling Fan', type: 'fan'   as const, location: 'Bedroom',    isSimulated: true },
  { name: 'Desk Lamp',   type: 'light' as const, location: 'Study Room', isSimulated: true },
  { name: 'Study Mode',  type: 'scene' as const, location: 'Study Room', isSimulated: true },
  { name: 'Sleep Mode',  type: 'scene' as const, location: 'Bedroom',    isSimulated: true },
];

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error'],
  });

  const devicesService = app.get(DevicesService);
  const routineRepo = app.get<Repository<RoutineEntity>>(getRepositoryToken(RoutineEntity));

  try {
    // ── Seed Devices ────────────────────────────────────────────────────────────
    const existingDevices = await devicesService.findAll();
    if (existingDevices.length > 0) {
      console.log(`✓ Devices already seeded (${existingDevices.length}) — skipping.`);
    } else {
      console.log('🌱 Seeding simulated devices...');
      for (const d of SIMULATED_DEVICES) {
        const created = await devicesService.create(d);
        console.log(`  ✓ ${created.name} (${created.type}) — ${created.id}`);
      }
      console.log('✅ Devices seeded!');
    }

    // ── Re-fetch to get IDs for routines ────────────────────────────────────────
    const devices = await devicesService.findAll();
    const byName = (name: string) => devices.find(d => d.name === name)?.id ?? 'UNKNOWN';

    // ── Seed Routines ───────────────────────────────────────────────────────────
    const existingRoutines = await routineRepo.count();
    if (existingRoutines > 0) {
      console.log(`✓ Routines already seeded (${existingRoutines}) — skipping.`);
    } else {
      console.log('🌱 Seeding default routines...');

      const ROUTINES = [
        {
          name: 'Study Mode',
          description: 'Turn on Desk Lamp, turn off distractions',
          icon: 'BookOpen',
          isActive: true,
          trigger: { type: 'manual' },
          actions: [
            { deviceId: byName('Desk Lamp'),   stateChange: { on: true,  brightness: 100 } },
            { deviceId: byName('Room Light'),   stateChange: { on: false } },
            { deviceId: byName('Ceiling Fan'),  stateChange: { on: true,  speed: 2 } },
          ],
        },
        {
          name: 'Sleep Mode',
          description: 'Turn off all lights and fan for bedtime',
          icon: 'Moon',
          isActive: true,
          trigger: { type: 'manual' },
          actions: [
            { deviceId: byName('Room Light'),  stateChange: { on: false } },
            { deviceId: byName('Desk Lamp'),   stateChange: { on: false } },
            { deviceId: byName('Ceiling Fan'), stateChange: { on: false } },
          ],
        },
        {
          name: 'Morning Mode',
          description: 'Bright lights and fan on to start the day',
          icon: 'Sun',
          isActive: true,
          trigger: { type: 'manual' },
          actions: [
            { deviceId: byName('Room Light'),  stateChange: { on: true, brightness: 90 } },
            { deviceId: byName('Desk Lamp'),   stateChange: { on: true, brightness: 80 } },
            { deviceId: byName('Ceiling Fan'), stateChange: { on: true, speed: 3 } },
          ],
        },
      ];

      for (const r of ROUTINES) {
        const routine = routineRepo.create(r);
        await routineRepo.save(routine);
        console.log(`  ✓ Routine: ${r.name}`);
      }
      console.log('✅ Routines seeded!');
    }
  } finally {
    await app.close();
  }
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
