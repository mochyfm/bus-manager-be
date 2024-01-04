import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CONSTANTS } from '../../constants/constants.config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(email: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const user = new User(email, password);
    const newUser = await this.userRepository.create(user);

    const accessToken = this.generateToken(newUser);

    newUser.password = await bcrypt.hash(password, 10);

    newUser.accessToken = accessToken;
    await this.userRepository.save(newUser);

    return newUser;
  }

  async signIn(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user || !(await this.verifyPassword(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generar un token JWT
    const accessToken = this.generateToken(user);
    user.accessToken = accessToken;

    return user;
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  private generateToken(user: any): string {
    const payload = { username: user.username, sub: user.userId };
    const options = { expiresIn: CONSTANTS.expirationTokens };
    const secretKey = process.env.JWT_SECRET;

    return jwt.sign(payload, secretKey, options);
  }
}
