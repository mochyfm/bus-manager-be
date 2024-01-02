import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user';
import { AuthService } from '../services/auth.service';
import { LoginParams } from '../../types/AuthTypes';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

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

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const userId = parseInt(id, 10);
    return this.userService.remove(userId);
  }
}
