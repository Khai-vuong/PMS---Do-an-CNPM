import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { CreateProjectDto } from "./dtos/create-projects.dto";
import { GetUser } from "src/utils/get-user.decorator";
import { User } from "@prisma/client";
import { LocalGuard } from "src/utils/local.guard";

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @UseGuards(LocalGuard)
    @Post('create')
    async createProject(
        @GetUser() user: any,
        @Body() input: any
    ) {
        const { username, password, ...project } = input;
        const createProjectDto: CreateProjectDto = project;
        console.log(user);
        console.log(input);
        console.log(createProjectDto);
        return this.projectsService.createProject(user as User, createProjectDto);
    }
}