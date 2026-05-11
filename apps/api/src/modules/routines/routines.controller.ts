import { Controller, Get, Post, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RoutinesService } from './routines.service';

@ApiTags('routines')
@Controller('routines')
export class RoutinesController {
  constructor(private readonly routinesService: RoutinesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all routines' })
  findAll() {
    return this.routinesService.findAll();
  }

  @Post(':id/execute')
  @ApiOperation({ summary: 'Execute a routine manually' })
  @ApiResponse({ status: 200, description: 'Routine executed successfully' })
  execute(@Param('id') id: string) {
    return this.routinesService.execute(id);
  }
}
