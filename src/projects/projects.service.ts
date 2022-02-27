import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/common/user.class';
import { Project } from './common/project.class';
import { Model,Types } from 'mongoose';
import { CreateProjectInput } from './common/project.input';
import { CurrentUserId } from 'src/auth/common/current.user.decorator';
import { Type } from 'class-transformer';
import { TypeEnum } from 'src/auth/common/types';
import { GraphQLError } from 'graphql';
@Injectable()
export class ProjectsService {
    constructor(
      @InjectModel(User.name)  private readonly UserModel:Model<User>,
      @InjectModel(Project.name) private readonly ProjectModel:Model<Project>

    ){}

    
    async createProject(createProjectInput:CreateProjectInput,@CurrentUserId() _id:Types.ObjectId){
       const project = await this.ProjectModel.create({owner:_id , ...CreateProjectInput}) ;       
    }
    async makeRequest(projectId:Types.ObjectId , @CurrentUserId() owner , developerId:Types.ObjectId){
        const developer = await this.UserModel.findById(developerId) ; 

        if(developer.type != TypeEnum.developer){
            throw new GraphQLError("U cant Make an offer to non Developer")
        }

        else
    }
}
