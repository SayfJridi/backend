import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { TypeSystemDefinitionNode } from 'graphql';
import { Types } from 'mongoose';
import { User } from 'src/auth/common/user.class';
import { projectstatusEnum } from './statusEnum';
@ObjectType()
@Schema()
export class Project {
  @Prop()
  @Field()
  title: string;
  @Prop()
  @Field()
  description: string;
  @Prop({
    ref: User.name,
  })
  @Field((_) => String)
  developer: Types.ObjectId;
  @Prop({
    ref: User.name,
  })
  @Field((_) => String)
  owner: Types.ObjectId;
  @Prop({
    default: projectstatusEnum.open
  })
  @Field((_) => String)
  status: projectstatusEnum;
}
