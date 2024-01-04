import { Controller, Get, Delete, Param } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const userId = parseInt(id, 10);
    return this.userService.remove(userId);
  }
}
