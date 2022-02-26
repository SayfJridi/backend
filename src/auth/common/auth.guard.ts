import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import { Strategy,ExtractJwt } from 'passport-jwt';
import { getCookie, cookieNames } from './cookies';
import { TokenExpiredError } from 'jsonwebtoken';
import { Reflector } from '@nestjs/core';
import { TypeEnum } from './types';


@Injectable()
export class JwtAuthGuard extends AuthGuard(['jwt']) {
  public constructor(private readonly reflector: Reflector) {
   super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = this.getRequest(context);
    const authorization: string = getCookie(cookieNames.AUTHORIZATION, req);

    if (!authorization || !authorization.length)
      throw new AuthenticationError(
        "Not Logged In"
      );

    return (await super.canActivate(context)) as boolean;
  }

  handleRequest(err: any, user: any, info: Error, context: ExecutionContext) {
    if (info && info[0] instanceof TokenExpiredError) {
      throw new AuthenticationError("Token Expired");
    }

    if (!user)
      throw new AuthenticationError(
        "Not Logged In"
      );

    // control by user type

    const userTypes = this.reflector.get<TypeEnum>(
      'userTypes',
      context.getHandler(),
    );

    if (userTypes && userTypes.length && !userTypes?.includes(user.type)) {
      throw new ForbiddenError("Cant Access");
    }

    return user;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
