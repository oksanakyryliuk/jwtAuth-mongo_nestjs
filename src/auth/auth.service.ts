import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/intarfaces/users.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(login: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findUserByLogin(login);
      if (user) {
        const isPasswordValid = await bcrypt.compare(pass, user.password);
        if (isPasswordValid) {
          const { password, ...result } = user;
          return result;
        }
      }
      return null;
    } catch (error) {
      throw new Error(`Error validating user: ${error.message}`);
    }
  }

  login(user: Partial<User>) {
    const payload = {
      login: user.login,
    };
    return {
      access_token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }

  

  
}
