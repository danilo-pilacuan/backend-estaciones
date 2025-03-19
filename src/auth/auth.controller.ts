import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard, Public } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthDTO, AuthJWTDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: AuthDTO) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }




  @UseGuards(AuthGuard)
  @Post('validate-session')
  @HttpCode(200)
  validateToken() {
    return { result: true };
  }
}