import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthGateway } from './common/auth.gateway';
import { JwtStrategy } from './common/jwt.strategy';
import { User } from './common/user.class';
import { UserSchema } from './common/user.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    schema: UserSchema , name:User.name
  }]), 
  PassportModule.register({defaultStrategy:"jwt"}),
  JwtModule.register({
    secret:"secret123",
    signOptions:{
      expiresIn: 3600
    }
  }
  )
],
  providers: [AuthResolver, AuthService,JwtStrategy,AuthGateway],
})
export class AuthModule {}
