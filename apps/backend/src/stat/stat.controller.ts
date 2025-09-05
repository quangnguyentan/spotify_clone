import { Controller, Get, Post, Response } from '@nestjs/common';
import { StatService } from './stat.service';

@Controller('stats')
export class StatController {
  constructor(private readonly statService: StatService) {}

  @Get()
  async findAll(@Response() res: any) {
    const stats = await this.statService.getStats();
    return res.status(200).json(stats);
  }
}
