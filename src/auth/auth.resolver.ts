import { Req, UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  GraphQLExecutionContext,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './common/auth.guard';
import { SignUpInput, SignInInput } from './common/auth.input';
import { clearCookies, cookieNames } from './common/cookies';
import { CurrentUserId } from './common/current.user.decorator';
import { TypeEnum } from './common/types';
import { User } from './common/user.class';
import { UserTypes } from './common/userTypes.decorator';
import { Types } from 'mongoose';
import { uploadProfilePicture } from './common/upload.pictures';
import { GitProject } from './common/GitProject.class';
import { Type } from 'class-transformer';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query((_) => User)
  @UseGuards(JwtAuthGuard)
  @UserTypes(TypeEnum.developer)
  profile(@CurrentUserId() _id : Types.ObjectId) {
    return this.authService.findById(_id);
  }

  @Mutation((_) => User)
  async signUp(@Args('signUpInput') signUpInput: SignUpInput): Promise<User> {
    return await this.authService.SignUp(signUpInput);
  }

  @Mutation((_) => User)
  async signIn(
    @Args('signInInput') signInInput: SignInInput,
    @Context() context: GraphQLExecutionContext,
  ): Promise<User> {
    return await this.authService.signIn(signInInput, context);
  }

  @Query(_ => [User])
  async search(@Args('search')search:string){
    return this.authService.search(search) ; 
  }

  @UseGuards(JwtAuthGuard)
  @UserTypes(TypeEnum.entreprise)
  @Query((_) => [User])
  async protected(@Context() ctx) {
    return [];
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((_) => Boolean)
  async logout(@Context() context: GraphQLExecutionContext) {
    clearCookies([cookieNames.AUTHORIZATION], context);
    return true;
  }
  @UseGuards(JwtAuthGuard)
  @Mutation((_) => Boolean)
  async changeProfilePicture(@CurrentUserId() _id: Types.ObjectId,@Args('image', {type: () => GraphQLUpload}) image:FileUpload) {
   
    await this.authService.changeProfilePicture(_id,image) ; 
  }


  @ResolveField("gitProjects" , _ => [GitProject])
  async gitProjects(@Parent() user: User) {
    const { githubUsername } = user;
    if(!githubUsername){
      return [] ; 
    }
    return this.authService.findAllProjects(user);
  }
}
