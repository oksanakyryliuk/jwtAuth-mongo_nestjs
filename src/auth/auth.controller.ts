import {
  Controller,
  Request,
  Post,
  UseGuards,
  Res,
  Body,
  HttpStatus, Put, Param, BadRequestException, NotFoundException, UnauthorizedException
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { User } from "../users/intarfaces/users.interface";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {
  }

  @Post('/signup')
  async register(@Body() createUser: User) {
    const checkIfExistUser = await this.userService.findUserByLogin(createUser.login);

    if (checkIfExistUser) return 'user exist'
    else {
      const user = await this.userService.createUser(createUser);
      return { message: 'User created successfully', user };
    }
  }

  @Post('/login')
  async login(@Request() req, @Body() credentials) {
    const user = await this.userService.findUserByLogin(credentials.login);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await this.authService.validateUser(credentials.login, credentials.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.authService.login({
      login: credentials.login,
    });
    return { login: credentials.login, token: token }

  }
}
