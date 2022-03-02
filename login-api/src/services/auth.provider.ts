import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export class AuthProvider {
  private readonly saltRounds = 10;

  async encrypt(password: string): Promise<string> {
    return await hash(password, this.saltRounds);
  }

  async compareEncrypt(value1: string, value2: string): Promise<boolean> {
    return await compare(value1, value2);
  }

  async generateAccessToken(userId: string): Promise<string> {
    return sign({ sub: userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: '10d',
    });
  }
}
