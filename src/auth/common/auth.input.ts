import {
  Field,
  GraphQLISODateTime,
  InputType,
  ObjectType,
} from '@nestjs/graphql';
import {
  IsAlpha,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TypeEnum } from './types';

@InputType()
export class SignUpInput {
  @IsAlpha()
  @IsNotEmpty()
  @Field((_) => String)
  firstName: string;
  @IsAlpha()
  @IsNotEmpty()
  @Field((_) => String)
  lastName: string;

  @Field((_) => String)
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(8)
  password: string;

  @Field((_) => String)
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(8)
  confirmPassword: string;
  @Field((_) => GraphQLISODateTime)
  birthDate: Date;

  @Matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
  @Field((_) => String)
  email: string;

  @Field()
  @IsEnum(TypeEnum)
  type: TypeEnum;
}

@InputType()
export class SignInInput {
  @Matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
  @Field((_) => String)
  email: string;
  @Field((_) => String)
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(8)
  password: string;
}
