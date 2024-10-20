import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { User } from "@prisma/client";
import { UpdateProjectDto } from "./dtos/update-projects.dto";
import { CreateProjectDto } from "./dtos/create-projects.dto";

@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaService) { }

    async createProject(user: User, createProjectDto: CreateProjectDto) {
        return await this.prisma.project.create({
            data: {
                ...createProjectDto,
                manager_ids: {
                    connect: { uid: user.uid },
                },
                members: {
                    connect: createProjectDto.members?.map(memberId => ({ uid: memberId })) || [],
                },
            },
        });
    }

    async updateProject(pid: string, updateProjectDto: UpdateProjectDto) {
        const existingProject = await this.prisma.project.findUnique({
            where: { pid },
        });

        if (!existingProject) {
            throw new Error(`Project with pid ${pid} not found`);
        }

        return await this.prisma.project.update({
            where: { pid },
            data: {
                ...updateProjectDto,
                manager_ids: {
                    connect: updateProjectDto.manager_ids?.map(managerId => ({ uid: managerId })) || [],
                },
                members: {
                    connect: updateProjectDto.members?.map(memberId => ({ uid: memberId })) || [],
                },
            },
        });
    }

    async deleteProject(pid: string) {
        const existingProject = await this.prisma.project.findUnique({
            where: { pid },
        });

        if (!existingProject) {
            throw new Error(`Project with pid ${pid} not exist`);
            return;
        }

        return await this.prisma.project.delete({
            where: { pid },
        })
    }

    async listProjects() {
        return await this.prisma.project.findMany();
    }

    async getProject(pid: string) {
        const existingProject = await this.prisma.project.findUnique({
            where: { pid },
        });

        if (!existingProject) {
            throw new Error(`Project with pid ${pid} not exist`);
            return;
        }

        return existingProject;
    }
}