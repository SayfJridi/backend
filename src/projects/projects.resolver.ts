import { Args, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { CurrentUserId } from 'src/auth/common/current.user.decorator';
import { Project } from './common/project.class';
import { ProjectsService } from './projects.service';
import { Types } from 'mongoose';
import { CreateProjectInput } from './common/project.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/common/auth.guard';
import { UserTypes } from 'src/auth/common/userTypes.decorator';
import { TypeEnum } from 'src/auth/common/types';
import { Request } from './common/request.class';
import { reqstatusEnum } from './common/statusEnum';

@Resolver(_ => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}
  @UseGuards(JwtAuthGuard)
  @Query((_) => [Project])
  async projects(@CurrentUserId() _id: Types.ObjectId) {
    return this.projectsService.findProjects(_id);
  }

  @UseGuards(JwtAuthGuard)
  @Query((_) => [Project])
  async project(@Args('_id',{type: () => String}) _id: Types.ObjectId) {
    return this.projectsService.findProjects(_id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Project)
  createProject(
    @CurrentUserId() _id: Types.ObjectId,
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
  ) {
    return this.projectsService.createProject(createProjectInput, _id);
  }
}
