import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './auth.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'jwt_secret',
      signOptions: {
        expiresIn: '12h'
      }
    })
  ],
  providers: [JwtStrategy, AuthService],
  exports: [AuthService]
})
export class AuthModule { }
