import { Field, ObjectType } from "@nestjs/graphql";
@ObjectType()
export class GitProject {
    @Field(_ => String )
    title:string ; 
    @Field(_ => String )
    httpsClone:string; 
    @Field(_ => String )
    link:string
    @Field(_ => String )
    language:string


}