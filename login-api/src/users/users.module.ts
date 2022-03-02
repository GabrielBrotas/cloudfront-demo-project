import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthProvider } from 'src/services/auth.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthProvider],
  imports: [],
  exports: [UsersService],
})
export class UsersModule {}
