import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './common/user.class';
import { Model } from 'mongoose';
import { SignInInput, SignUpInput } from './common/auth.input';
import { GraphQLError, TypeSystemDefinitionNode } from 'graphql';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Context, GraphQLExecutionContext } from '@nestjs/graphql';
import { setCookie } from './common/cookies';
import { Types } from 'mongoose';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { userInfo } from 'os';
import { uploadProfilePicture } from './common/upload.pictures';
import axios from 'axios';
import { title } from 'process';
import { GitProject } from './common/GitProject.class';
@Injectable()
export class AuthService {
  async findById(_id: Types.ObjectId) {
    return await this.UserModel.findById(_id);
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
      githubUsername,
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
      githubUsername,
    });
    await user.save();
    return user;
  }

  async signIn(signInInput: SignInInput, context) {
    const { email, password } = signInInput;

    const user = await this.UserModel.findOne({ email: email });
    if (!user) {
      throw new GraphQLError('User Not Found');
    }

    if (!(await compare(password, user.password))) {
      throw new GraphQLError('Incorrect Password');
    }

    await this.authenticateUser(user, context);
    return user;
  }

  async authenticateUser(
    user: User,
    context: GraphQLExecutionContext,
  ): Promise<User> {
    const token = this.jwtService.sign({ _id: user._id });
    setCookie('Authorization', token, context);
    return user;
  }

  async changeProfilePicture(
    _id: Types.ObjectId,
    { createReadStream }: GraphQLUpload,
  ) {
    const user = await this.UserModel.findById(_id);
    if (user.image == 'default.jpg') {
      user.image = await uploadProfilePicture(null, createReadStream);
    } else {
      user.image = await uploadProfilePicture(user.image, createReadStream);
    }

    await user.save();
    return true;
  }
  async search(name: string) {
    const list = await this.UserModel.aggregate([
      {
        $addFields: { fullName:{$concat:['$firstName',' ','$lastName']} },
      }
    ]);

    return list.filter(item => { if(item.fullName.toLowerCase().indexOf(name.toLocaleLowerCase())!= -1) {return item}}) ; 
  
    
  }
  async findAllProjects(user: User) {
    const respone = await axios.get(
      `https://api.github.com/users/${user.githubUsername}/repos`,
    );
    const list = respone.data;
    return list.map((item) => {
      return {
        title: item.name,
        link: item.html_url,
        httpsClone: item.clone_url,
        language: item.language,
      };
    });
  }
}
