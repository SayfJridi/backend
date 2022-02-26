import { SchemaFactory } from "@nestjs/mongoose";
import { User } from "./user.class";
import {Document} from 'mongoose'
export const UserSchema = SchemaFactory.createForClass(User) ; 
