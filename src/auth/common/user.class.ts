import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { skillEnum, TypeEnum } from './types';

@ObjectType()
@Schema({timestamps:true})
export class User {
  @Field((_) => String)
  _id: Types.ObjectId;

  @Field((_) => String)
  @Prop()
  firstName: string;
  @Field()
  @Prop()
  lastName: string;
  @Field((_) => String)
  @Prop({
    match: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    unique: true,
  })
  email: string;
  @Field((_) => GraphQLISODateTime)
  @Prop()
  birthDate: Date;
  @Field((_) => [String])
  @Prop()
  skills: skillEnum[];

  @Prop()
  @Field()
  password: string;

  @Prop({ type: String })
  @Field((_) => String)
  type: TypeEnum;

  @Prop({ type: String, default: 'default.png' })
  @Field((_) => String)
  image: string;

  @Field((_) => String)
  createdAt: string;


}
