import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(email: string, pass: string): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOne(email);

    if (!user || user.password !== pass) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate a JWT token
    const accessToken = this.generateToken(user);

    return { accessToken };
  }

  private generateToken(user: any): string {
    const payload = { username: user.username, sub: user.userId };
    const options = { expiresIn: '1h' }; // You can adjust the expiration time as needed
    const secretKey = 'your_secret_key'; // Replace with your secret key

    return jwt.sign(payload, secretKey, options);
  }
}
