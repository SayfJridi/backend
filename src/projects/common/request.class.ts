
import { Field } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/auth/common/user.class';
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
  @Prop({
    ref: User.name,
  })
  @Field((_) => String)
  owner: Types.ObjectId;
}
