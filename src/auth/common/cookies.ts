import { GraphQLExecutionContext } from '@nestjs/graphql';
import { authenticate } from 'passport';

export const cookieNames = {
  AUTHORIZATION: 'Authorization',
  REFRESH: 'refresh',
  USERID: 'userId',
  REMEMBERME: 'rememberMe',
};

export function setCookie(
  name: string,
  content: string,
  context: GraphQLExecutionContext,
) {
  context['res'].cookie(name, content, {
    httpOnly: true,
  });
  context['res'].header('Access-Control-Allow-Credentials', 'true');
}

export function getCookie(name: string, req: any) {
  return req.cookies[name];
}

export function clearCookies(cookiesList: string[], context) {
  cookiesList.forEach((cookie) => {
    context['res'].clearCookie(cookie);
  });
}
