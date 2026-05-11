import { Module } from '@nestjs/common';

// ─── Auth Module (STUBBED — Phase 1: Local Network Only) ──────────────────────
//
// Phase 1: This module is intentionally empty.
// The app relies on local network trust for Phase 1.
//
// To activate JWT auth (Phase 2+):
// 1. npm install @nestjs/jwt @nestjs/passport passport passport-jwt
// 2. Implement JwtStrategy, JwtAuthGuard here
// 3. Uncomment @UseGuards(JwtAuthGuard) in each controller
// 4. Update main.ts CORS to restrict origin to trusted domains
//
@Module({})
export class AuthModule {}
