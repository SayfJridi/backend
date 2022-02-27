import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/auth/common/user.class';
import { UserSchema } from 'src/auth/common/user.schema';
import { Project } from './common/project.class';
import { ProjectSchema } from './common/project.schema';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';

@Module({
  providers: [ProjectsResolver, ProjectsService],
  imports:[
    MongooseModule.forFeature([
      {name:User.name , schema:UserSchema} , 
      {name:Project.name , schema:ProjectSchema}
    ])
  ]
})
export class ProjectsModule {}
