import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/common/user.class';
import { Project } from './common/project.class';
import { Model,Types } from 'mongoose';
import { CreateProjectInput } from './common/project.input';
import { CurrentUserId } from 'src/auth/common/current.user.decorator';
import { Type } from 'class-transformer';
import { TypeEnum } from 'src/auth/common/types';
import { GraphQLError } from 'graphql';
import {Request} from './common/request.class' ;
import { reqstatusEnum } from './common/statusEnum';
@Injectable()
export class ProjectsService {
    
    
    constructor(
      @InjectModel(User.name)  private readonly UserModel:Model<User>,
      @InjectModel(Project.name) private readonly ProjectModel:Model<Project>,
     @InjectModel(Request.name) private readonly RequestModel:Model<Request>,
    ){
    }
    findProjects(_id: Types.ObjectId) {
       return this.ProjectModel.aggregate([{
        $match: { $or: [{ owner: _id }, { developer: _id }] }
       }])
    }
    
    async createProject(createProjectInput:CreateProjectInput, _id:Types.ObjectId){
       const project = await this.ProjectModel.create({owner:_id , ...CreateProjectInput}) ;       
    }
    async makeRequest(projectId:Types.ObjectId ,  owner , developerId:Types.ObjectId){
        const developer = await this.UserModel.findById(developerId) ; 

        if(developer.type != TypeEnum.developer){
            throw new GraphQLError("U cant Make an offer to non Developer")
        }

        else {
          return  await this.RequestModel.create({developer:developerId,owner,projectId})
        }
    }
  
  
 
}
