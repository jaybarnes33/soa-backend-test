import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller('success')
export class SuccessController {
  @Get()
  getSuccessPage(@Res() res: Response) {
    return res.sendFile(join(process.cwd(), 'src', 'success.html'));
  }
}
