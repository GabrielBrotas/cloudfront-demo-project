import { Module } from '@nestjs/common';
// import { AuthModule } from './providers/auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

// export const IS_PUBLIC_KEY = 'isPublic';
// export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Module({
  imports: [UsersModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
