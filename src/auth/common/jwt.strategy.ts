import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          return request?.cookies['Authorization'].replace('Bearer ', '');
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: "secret123",
      passReqToCallback: true,
    });
  }

  async validate(request: any, payload: any) {
    return this.authService.findById(payload._id);
  }
}
