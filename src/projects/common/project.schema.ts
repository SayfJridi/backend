import { SchemaFactory } from "@nestjs/mongoose";
import { Project } from "./project.class";

export const ProjectSchema = SchemaFactory.createForClass(Project) ; 