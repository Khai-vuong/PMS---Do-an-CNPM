import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { TaskReturnDTO } from './dtos/page.dto';


@Injectable()
export class LobbyService {
    constructor(private prisma : PrismaService) {}
    async getUserName(uid: string): Promise<string>{
        const user = await this.prisma.user.findUnique({
            where: { uid: uid }
        });
        if (!user) {
            throw new NotFoundException("User not found");
        }
        return user.username;
    }
    async getTasks(pid: string, page: string, pageSize: string) {
        const project = await this.prisma.project.findUnique({
            where: { pid: pid },
            include: { tasks: true }
        });
        if (!project) {
            throw new NotFoundException("Project not found");
        }
        if (!project.tasks.length) {
            throw new NotFoundException("No task found");
        }
        return this.Pagination(project.tasks, page, pageSize);
    }
    async Pagination(tasks: any[], page: string, pageSize: string) {
        const perPage = parseInt(pageSize);
        const pagenum = parseInt(page);
        const start = (pagenum - 1) * perPage;
        const end = start + perPage;
        let data = [];
        if (start > tasks.length - 1) {
            throw new NotFoundException("Invalid page number");
        }
        if (end > tasks.length) {
            data = tasks.slice(start, tasks.length);
        }
        else {
            data = tasks.slice(start, end);
        }
        if (data.length === 0) {
            throw new NotFoundException("No task found in this page");
        }
        const taskReturnData = await Promise.all(data.map(async (task) => {
            const assigneeUsername = await this.getUserName(task.assignee_id);
            return new TaskReturnDTO(task.name, task.description, assigneeUsername);
          }));
        return taskReturnData;
    }
}
