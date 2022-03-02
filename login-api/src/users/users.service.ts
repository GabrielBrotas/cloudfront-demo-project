import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthProvider } from 'src/services/auth.provider';

export type User = any;

@Injectable()
export class UsersService {
  constructor(private authProvider: AuthProvider) {}

  private readonly users = [
    {
      _id: 1,
      username: 'gbrotas',
      password: '123456',
    },
    {
      _id: 2,
      username: 'gbrotas',
      password: '123456',
    },
  ];

  async login(username: string, password: string): Promise<User | undefined> {
    try {
      const user = this.users.find((user) => user.username === username);

      if (!user) throw 'User not found';
      if (user.password != password) throw 'Invalid Password';

      return {
        user,
        access_token: await this.authProvider.generateAccessToken(
          String(user._id),
        ),
      };
    } catch (error) {
      throw new BadRequestException(error.message ? error.message : error);
    }
  }

  async register(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    try {
      const user = this.users.find((user) => user.username === username);

      if (user) throw 'username already in use';

      const newUser = {
        _id: this.users.length + 1,
        username,
        password,
      };

      this.users.push(newUser);

      return { user: newUser };
    } catch (error) {
      throw new BadRequestException(error.message ? error.message : error);
    }
  }

  async getAuthenticatedUser(_id: string) {
    return this.users.find((user) => user._id === Number(_id));
  }
}
