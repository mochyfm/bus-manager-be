import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('/new')
  async create(@Body() user: Partial<User>): Promise<User> {
    return this.userService.create(user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const userId = parseInt(id, 10);
    return this.userService.remove(userId);
  }
}
