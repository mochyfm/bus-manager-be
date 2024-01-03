import { Repository } from 'typeorm';
import { UserType } from '../../app/entities/userType';
import { User } from '../../app/entities/user';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { InnitUserData } from '../../types/InnitTypes';
import { CONSTANTS } from '../../constants/constants.config';

@Injectable()
export class InnitDatabase {
  constructor(
    @InjectRepository(UserType)
    private readonly userTypeRepository: Repository<UserType>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createData() {
    await this.createTypeIfNotExists('Guest');
    await this.createTypeIfNotExists('User');
    await this.createTypeIfNotExists('Tech');
    await this.createTypeIfNotExists('Student');
    await this.createTypeIfNotExists('Driver');
    await this.createTypeIfNotExists('Teacher');
    await this.createTypeIfNotExists('Admin');
    await this.createTypeIfNotExists('SuperAdmin');

    await this.createUserIfNotExists({
      email: `superadmin@${CONSTANTS.usersEmailDomain}`,
      password: 'superadmin1234',
      firstName: 'SuperAdmin',
      lastName: null,
      age: 0,
      isMinor: false,
      userType: 'SuperAdmin',
      accessToken: '',
    });

    await this.createUserIfNotExists({
      email: `admin@${CONSTANTS.usersEmailDomain}`,
      password: 'admin1234',
      firstName: 'Admin',
      lastName: null,
      age: 0,
      isMinor: false,
      userType: 'Admin',
      accessToken: '',
    });

    const techUsers = ['Tech1', 'Tech2', 'Tech3'];

    for (const techName of techUsers) {
      await this.createUserIfNotExists({
        firstName: techName,
        email: `${techName.toLowerCase()}@${CONSTANTS.usersEmailDomain}`,
        password: `${techName
          .toLowerCase()
          .substring(0, techName.indexOf('h') + 1)}1234`,
        userType: 'Tech',
        age: 0,
        isMinor: false,
        accessToken: '',
      });
    }
  }
  async createTypeIfNotExists(typeName: string): Promise<void> {
    const existingType = await this.userTypeRepository.findOne({
      where: { name: typeName },
    });

    if (!existingType) {
      const userType = this.userTypeRepository.create({ name: typeName });
      await this.userTypeRepository.save(userType);
    }
  }

  async createUserIfNotExists(userData: InnitUserData): Promise<void> {
    const existingUser = await this.userRepository.findOne({
      where: { email: userData.email },
    });

    if (!existingUser) {
      const userType = await this.userTypeRepository.findOne({
        where: { name: userData.userType },
      });

      if (userType) {
        const user = this.userRepository.create({
          email: userData.email,
          password: userData.password,
          firstName: userData.firstName,
          secondName: userData.lastName,
          age: userData.age,
          isMinor: userData.isMinor,
          typeOfUser: userType,
          accessToken: userData.accessToken,
        });

        await this.userRepository.save(user);
      }
    }
  }
}
