import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/auth/common/user.class';
import { Project } from './project.class';
import { reqstatusEnum } from './statusEnum';

@ObjectType()
@Schema({ timestamps: true })
export class Request {
  @Prop({
    ref: Project.name,
  })
  @Field()
  projectId: Types.ObjectId;
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

}
