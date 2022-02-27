import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/auth/common/user.class';
import { UserSchema } from 'src/auth/common/user.schema';
import { Project } from './common/project.class';
import { ProjectSchema } from './common/project.schema';
import { RequestSchema } from './common/request.schema';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';
import { Request } from './common/request.class';
@Module({
  providers: [ProjectsResolver, ProjectsService],
  imports:[
    MongooseModule.forFeature([
      {name:User.name , schema:UserSchema} , 
      {name:Project.name , schema:ProjectSchema},
      {name:Request.name, schema:RequestSchema}
    ])
  ]
})
export class ProjectsModule {}
