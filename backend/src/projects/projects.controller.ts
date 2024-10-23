import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { CreateProjectDto } from "./dtos/create-projects.dto";
import { GetUserID } from "src/utils/get-user.decorator";
import { User } from "@prisma/client";
import { LocalGuard } from "src/utils/local.guard";
import { UpdateProjectDto } from "./dtos/update-projects.dto";

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @UseGuards(LocalGuard)
    @Post('create')
    async createProject(
        @GetUserID() user: any,
        @Body() input: any
    ) {
        // const { username, password, ...project } = input;
        const createProjectDto: CreateProjectDto = input;
        // console.log(user);
        // console.log(input);
        // console.log(createProjectDto);
        // console.log(user);
        //Code bị ảnh hưởng, nhờ ô sửa dùm tui
        return this.projectsService.createProject(user.userID, createProjectDto);
        // return true;
    }

    @UseGuards(LocalGuard)
    @Put(':pid')
    async updateProjectByPut(@Param('pid') pid: string, @Body() input: any) {
        // const { username, password, ...project } = input;
        const updateProject: UpdateProjectDto = input;

        return this.projectsService.updateProject(pid, updateProject);

    }

    @UseGuards(LocalGuard)
    @Patch(':pid')
    async updateProjectByPatch(@Param('pid') pid: string, @Body() input: any) {
        // const { username, password, ...project } = input;
        const updateProject: UpdateProjectDto = input;

        return this.projectsService.updateProject(pid, updateProject);

    }

    @UseGuards(LocalGuard)
    @Delete(':pid')
    async deleteProject(@Param('pid') pid: string) {
        return this.projectsService.deleteProject(pid);
    }

    @UseGuards(LocalGuard)
    @Get('list')
    async listProjects() {
        return this.projectsService.listProjects();
    }

    @UseGuards(LocalGuard)
    @Get(':pid')
    async getProject(@Param('pid') pid: string) {
        return this.projectsService.getProject(pid);
    }
}