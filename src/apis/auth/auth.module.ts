import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: "jwt-secret-key",
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
