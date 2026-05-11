/**
 * Seed script — populates the database with 5 simulated devices.
 * Run: npx ts-node src/database/seed.ts
 *
 * Safe to run multiple times — checks for existing devices before inserting.
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DevicesService } from '../modules/devices/devices.service';

const SIMULATED_DEVICES = [
  {
    name: 'Room Light',
    type: 'light' as const,
    location: 'Bedroom',
    isSimulated: true,
  },
  {
    name: 'Ceiling Fan',
    type: 'fan' as const,
    location: 'Bedroom',
    isSimulated: true,
  },
  {
    name: 'Study Mode',
    type: 'scene' as const,
    location: 'Study Room',
    isSimulated: true,
  },
  {
    name: 'Sleep Mode',
    type: 'scene' as const,
    location: 'Bedroom',
    isSimulated: true,
  },
  {
    name: 'Desk Lamp',
    type: 'light' as const,
    location: 'Study Room',
    isSimulated: true,
  },
];

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error'], // quiet during seed
  });

  const devicesService = app.get(DevicesService);

  try {
    const existing = await devicesService.findAll();

    if (existing.length > 0) {
      console.log(`✓ Database already has ${existing.length} device(s) — skipping seed.`);
      return;
    }

    console.log('🌱 Seeding simulated devices...');
    for (const device of SIMULATED_DEVICES) {
      const created = await devicesService.create(device);
      console.log(`  ✓ Created: ${created.name} (${created.type}) — ID: ${created.id}`);
    }
    console.log('✅ Seed complete!');
  } finally {
    await app.close();
  }
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
