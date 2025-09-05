import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { SeedService } from './seed.service';

async function seed() {
  const app = await NestFactory.create(AppModule);
  const seedService = app.get(SeedService);
  try {
    console.log('Starting seeding process...');
    await seedService.run();
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    await app.close();
  }
}

seed();
