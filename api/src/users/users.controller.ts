import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateBuyer } from './dtos/create-user.dto';
import { Response } from 'express';
import { Public } from 'src/auth/guard/auth.metadata';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('buyer')
  async CreateBuyer(@Body() request: CreateBuyer, @Res() res: Response) {
    const user = await this.userService.createBuyer(request);
    return res.status(200).json({ id: user.id });
  }

  @Public()
  @Get('hello')
  Get(@Res() res: Response) {
    console.log('Test');

    return res.status(200).json({ message: 'test' });
  }
}
