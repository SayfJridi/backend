import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/common/jwt.strategy';
import { AuthGateway } from './auth/common/auth.gateway';

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://sayf:sayf12@cluster0.lnrhp.mongodb.net/gomyjob"),
  GraphQLModule.forRoot({
    autoSchemaFile:true ,
    context: ({ req, res }) => ({ req, res }),
  }),
  AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
