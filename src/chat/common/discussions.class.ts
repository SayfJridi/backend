import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
@Schema({ timestamps: true })
@ObjectType()
export class discussion {
  @Field((_) => GraphQLISODateTime)
  createdAt: Date;
  @Field((_) => String)
  _id: Types.ObjectId;

  @Field(_ => String)

  projectId:Types.ObjectId ;

  participants:string[]
}
