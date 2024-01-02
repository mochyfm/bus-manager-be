import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user';
import { UsersService } from './services/users.service';
import { UserController } from './controller/user.controller';
import { UserType } from './entities/userType';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'bus_manager',
      entities: [User, UserType],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, UserType]),
  ],
  controllers: [UserController],
  providers: [UsersService, AuthService],
})
export class AppModule {}
