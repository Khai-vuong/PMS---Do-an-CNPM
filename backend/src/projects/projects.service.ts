import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateProjectDto } from "DTOs/create-projects.dto";
import { UpdateProjectDto } from "DTOs/update-projects-dto";
import { ProjectsListDto } from "DTOs/projects-list.dto";

@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaService) { }

    async createProject(userID: string, createProjectDto: CreateProjectDto) {
        return await this.prisma.project.create({
            data: {
                ...createProjectDto,
                manager_ids: {
                    connect: { uid: userID },
                },
                members: {
                    connect: createProjectDto.members?.map(memberId => ({ uid: memberId })) || [],
                },
            },
        });
    }

    async updateProject(userID: string, pid: string, updateProjectDto: UpdateProjectDto) {
        const existingProject = await this.prisma.project.findUnique({
            include: { manager_ids: true },
            where: { pid },
        });

        if (!existingProject) {
            throw new HttpException(`Project with pid ${pid} not found`, HttpStatus.NOT_FOUND);
        }

        if (!existingProject.manager_ids.some(manager => manager.uid === userID)) {
            throw new HttpException(`You are not the manager of this project.`, HttpStatus.FORBIDDEN);
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

    async deleteProject(userID: string, pid: string) {
        const existingProject = await this.prisma.project.findUnique({
            include: { manager_ids: true },
            where: { pid },
        });

        if (!existingProject) {
            throw new HttpException(`Project with pid ${pid} not found`, HttpStatus.NOT_FOUND);
        }

        if (!existingProject.manager_ids.some(manager => manager.uid === userID)) {
            throw new HttpException(`You are not the manager of this project.`, HttpStatus.FORBIDDEN);
        }

        return await this.prisma.project.delete({
            where: { pid },
        })
    }

    async listProjects(userID: string) {
        const listProjects = await this.prisma.project.findMany({
            include: {
                manager_ids: true,
                members: true,
            },
        });

        const projectsInfo: ProjectsListDto[] = listProjects.map(project => {
            const { name, model, phase, manager_ids, pid } = project;
            const role = manager_ids.some(manager => manager.uid === userID) ? 'Project manager' : (manager_ids.some(members => members.uid === userID) ? 'Member' : null);

            return role ? { name, model, phase, role, pid } as ProjectsListDto : null;
        }).filter((project): project is ProjectsListDto => project !== null);

        return projectsInfo;
    }

    async getProject(userID: string, pid: string) {
        const existingProject = await this.prisma.project.findUnique({
            include: { manager_ids: true },
            where: { pid },
        });

        if (!existingProject) {
            throw new HttpException(`Project with pid ${pid} not found`, HttpStatus.NOT_FOUND);
        }

        const projectInfo: ProjectsListDto = {
            name: existingProject.name,
            model: existingProject.model,
            phase: existingProject.phase,
            role: existingProject.manager_ids.some(manager => manager.uid === userID) ? 'Project manager' : 'Member',
            pid: existingProject.pid,
        };

        return projectInfo;
    }
    async toggleMemberRole(userID: string, memberId: string, projectId: string) {
        const project = await this.prisma.project.findUnique({
            where: { pid: projectId },
            include: { members: true, manager_ids: true },
        });

        if (!project) {
            throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
        }

        const isMember = project.members.some(member => member.uid === memberId);
        const isManager = project.manager_ids.some(manager => manager.uid === userID);
        if (isMember){
            await this.prisma.project.update({
                where: { pid: projectId },
                data: {
                    members: {
                        disconnect: { uid: memberId },
                    },
                },
            });
            await this.prisma.project.update({
                where: { pid: projectId },
                data: {
                    members: {
                        connect: { uid: memberId },
                    },
                },
            });
        }
        else if (isManager){
            await this.prisma.project.update({
                where: { pid: projectId },
                data: {
                    manager_ids: {
                        disconnect: { uid: memberId },
                    },
                },
            });
            await this.prisma.project.update({
                where: { pid: projectId },
                data: {
                    members: {
                        connect: { uid: memberId },
                    },
                },
            });
        }
        else {
            throw new HttpException('You are not authorized to update roles', HttpStatus.FORBIDDEN);
        }
        return 'Role updated';
    }
    async switchProjectPhase(userID: string, projectId: string) {
        const project = await this.prisma.project.findUnique({
            where: { pid: projectId },
            include: { manager_ids: true },
        });

        if (!project) {
            throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
        }

        const isManager = project.manager_ids.some(manager => manager.uid === userID);
        if (!isManager) {
            throw new HttpException('You are not authorized to switch phases', HttpStatus.FORBIDDEN);
        }
        const waterfallPhases = ['Initiation', 'Planning', 'Execution', 'Monitoring', 'Closing'];
        const scrumPhases = ['Starting', 'Sprint Planning', 'Sprint Execution', 'Sprint Review', 'Sprint Retrospective', 'Closing'];

        let nextPhase = '';
        if (project.model === 'waterfall') {
            const currentPhaseIndex = waterfallPhases.indexOf(project.phase);
            if (currentPhaseIndex === -1 || currentPhaseIndex === waterfallPhases.length - 1) {
                return { message: 'Cannot switch phase. Project is in the Closing phase.' };
            }
            nextPhase = waterfallPhases[currentPhaseIndex + 1];
        } 
        else if (project.model === 'scrum') {
           const currentPhaseIndex = scrumPhases.indexOf(project.phase)
           if (currentPhaseIndex === -1){
            nextPhase = scrumPhases[0];
           }
           nextPhase = scrumPhases[currentPhaseIndex + 1];
        } else {
            throw new Error('Unknown project model.');
        }

        await this.prisma.project.update({
            where: { pid: projectId },
            data: {
                phase: nextPhase,
            },
        });

        return 'Phase switched';
    }
}