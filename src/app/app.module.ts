import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user';
import { UsersService } from './services/users.service';
import { UserController } from './controller/user.controller';
import { UserType } from './entities/userType';
import { AuthService } from './services/auth.service';
import { TerminusModule } from '@nestjs/terminus';
import { StatusCheckController } from './controller/status.controller';
import { InnitDatabase } from '../config/database/innitDatabase';

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
    TerminusModule,
  ],
  controllers: [UserController, StatusCheckController],
  providers: [UsersService, AuthService, InnitDatabase],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly innitDatabase: InnitDatabase) {}

  async onModuleInit() {
    await this.innitDatabase.createData();
  }
}
