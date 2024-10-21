import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PageParamDTO } from './dtos/page.dto';

@Injectable()
export class LobbyService {
    constructor(private prisma : PrismaService) {}
    async getTasks(pid: string, PageParamDTO: PageParamDTO){
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
        return this.Pagination(project.tasks, PageParamDTO);
    }
    async Pagination(tasks: any[], PageParamDTO: PageParamDTO){
        const page = PageParamDTO.currentPage;
        const perPage = PageParamDTO.pageSize;
        const start = (page - 1) * perPage;
        const end = start + perPage - 1;
        let data = [];
        if (start > tasks.length - 1) {
            throw new NotFoundException("Invalid page number");
        }
        if (end > tasks.length) {
            data = tasks.slice(start, tasks.length - 1);
        }
        else {
            data = tasks.slice(start, end);
        }
        if (data.length === 0) {
            throw new NotFoundException("No task found in this page");
        }
        return data;
    }
}
