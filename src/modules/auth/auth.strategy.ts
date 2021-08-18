import { ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IJwtUserData } from 'src/interfaces';

export const IS_PUBLIC_KEY = 'isPublic';
export const PublicEndpoint = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor (private reflector: Reflector) {
    super();
  }

  canActivate (context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor () {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET_KEY || 'jwt_secret'
    });
  }

  async validate (payload: {data: IJwtUserData}) {
    // do something with payload, if any.
    return payload.data;
  }
}
