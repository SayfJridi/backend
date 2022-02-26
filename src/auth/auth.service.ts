import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './common/user.class';
import { Model } from 'mongoose';
import { SignInInput, SignUpInput } from './common/auth.input';
import { GraphQLError, TypeSystemDefinitionNode } from 'graphql';
import { hash ,compare} from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Context, GraphQLExecutionContext } from '@nestjs/graphql';
import { setCookie } from './common/cookies';
import {Types} from 'mongoose'
@Injectable()
export class AuthService {
 async findById(_id: Types.ObjectId) {
    return await this.UserModel.findById(_id)
  }
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async SignUp(signUpInput: SignUpInput): Promise<User> {
    const {
      lastName,
      firstName,
      birthDate,
      password,
      email,
      type,
      confirmPassword,
    } = signUpInput;

    if (password != confirmPassword) {
      throw new GraphQLError('Passwords does Not match');
    }

    const Hashedpassword = await hash(password, 10);

    const user = new this.UserModel({
      firstName,
      lastName,
      birthDate,
      password: Hashedpassword,
      email,
      type,
    });
    await user.save();
    return user;
  }

  async signIn(signInInput: SignInInput,context) {
    const { email, password } = signInInput;

    const user = await this.UserModel.findOne({ email: email });
    if(!user) {
        throw new GraphQLError("User Not Found") ; 
    }
    
    if(
       !(await compare(password,user.password))
    )
    {
        throw new GraphQLError("Incorrect Password")
    }

  await  this.authenticateUser(user,context)
    return "success"

  }

  async authenticateUser(
    user: User,
    context: GraphQLExecutionContext,
  ): Promise<User> {
    const token = this.jwtService.sign({_id : user._id});
    setCookie("Authorization", token, context);
    return user;
  }



}
