import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateProjectDto } from "./dtos/create-projects.dto";
import { User } from "@prisma/client";

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
}