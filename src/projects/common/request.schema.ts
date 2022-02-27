import { SchemaFactory } from "@nestjs/mongoose";
import { Request } from "./request.class";

export const RequestSchema = SchemaFactory.createForClass(Request) ; 