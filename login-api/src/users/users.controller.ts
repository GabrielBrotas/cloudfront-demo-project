import { RolesGuard } from './../services/ensure-auth.middleware';
import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
// import { EnsureAuth } from 'src/services/ensure-auth.middleware';
import { UsersService } from 'src/users/users.service';
import { AuthenticateUserDto, CreateUserDto } from './user.dto';

@Controller('auth')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/login')
  async login(@Body() { username, password }: AuthenticateUserDto) {
    return this.userService.login(username, password);
  }

  @Post('/register')
  async register(@Body() { username, password }: CreateUserDto) {
    return this.userService.register(username, password);
  }

  @UseGuards(RolesGuard)
  @Get('/profile')
  async getAuthenticatedUser(@Request() req) {
    return this.userService.getAuthenticatedUser(req.user._id);
  }
}
