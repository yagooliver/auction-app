import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signin.dto';
import { AuthGuard } from './guard/auth.guard';
import { Public } from './guard/auth.metadata';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(200)
  @Post('login')
  signin(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
