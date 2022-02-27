import { Field, InputType } from "@nestjs/graphql";
import { IsString, MaxLength, MinLength } from "class-validator";
import { TypeSystemDefinitionNode } from "graphql";

@InputType()
export class CreateProjectInput{
    @Field()
    title:string ; 
    @Field()
    @IsString()
    @MinLength(20)
    @MaxLength(100)
    description:string; 

    @IsString()
    @Field()
    language:string ; 
    
}


