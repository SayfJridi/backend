import { cookieNames } from './cookies';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

export const CurrentUserId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const cookies = ctx.getContext().req.cookies;
    const decoded: any = jwt.decode(
      cookies[cookieNames.AUTHORIZATION].replace('Bearer ', ''),
    );

    return decoded._id;
  },
);
