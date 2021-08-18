import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';
import { IJwtUserData } from 'src/interfaces';

@Injectable()
export class AuthService {
  constructor (private readonly jwtService: JwtService) { }

  getHash (password: string): string {
    return createHash('sha1').update(JSON.stringify(password)).digest('hex');
  }

  compareHash (password: string, hash: string): boolean {
    return Boolean(password) && (this.getHash(password) === hash);
  }

  createToken (user: IJwtUserData): string {
    const expiresIn = 60 * 60;
    return this.jwtService.sign({ data: user }, { secret: process.env.JWT_SECRET_KEY, expiresIn: expiresIn });
  }
}
