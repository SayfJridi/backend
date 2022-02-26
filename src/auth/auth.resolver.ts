import { Req, UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  GraphQLExecutionContext,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './common/auth.guard';
import { SignUpInput, SignInInput } from './common/auth.input';
import { clearCookies, cookieNames } from './common/cookies';
import { CurrentUserId } from './common/current.user.decorator';
import { TypeEnum } from './common/types';
import { User } from './common/user.class';
import { UserTypes } from './common/userTypes.decorator';
import {Types} from "mongoose"

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query((_) => String)
  hello() {
    return 'hello';
  }

  @Mutation((_) => User)
  async signUp(@Args('signUpInput') signUpInput: SignUpInput): Promise<User> {
    return await this.authService.SignUp(signUpInput);
  }

  @Mutation((_) => String)
  async signIn(
    @Args('signInInput') signInInput: SignInInput,
    @Context() context: GraphQLExecutionContext,
  ): Promise<string> {
    return await this.authService.signIn(signInInput, context);
  }

  @UseGuards(JwtAuthGuard)
  @UserTypes(TypeEnum.entreprise)
  @Query((_) => [User])
  async protected(@Context() ctx) {
    return [];
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(_ => Boolean)
  async logout(@Context() context: GraphQLExecutionContext) {
    clearCookies([cookieNames.AUTHORIZATION], context);
    return true;
  }
  @UseGuards(JwtAuthGuard)
  @Mutation(_ => Boolean)
  async changeProfilePicture(@CurrentUserId() _id:Types.ObjectId, picture:
  ){
      return _id ; 
  }
  
}
