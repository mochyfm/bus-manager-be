import { Body, Controller, Post } from '@nestjs/common';
import { LoginParams } from '../../types/AuthTypes';
import { AuthService } from '../services/auth.service';
import { User } from '../entities/user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() { email, password }: LoginParams): Promise<User> {
    const user = await this.authService.signUp(email, password);
    return user;
  }

  @Post('/signin')
  async signIn(@Body() { email, password }: LoginParams): Promise<User> {
    const user = await this.authService.signIn(email, password);
    return user;
  }
}
