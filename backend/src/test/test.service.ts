import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TestService {
    constructor(private readonly prisma: PrismaService) { }

    async generate(pid: string) {
        const project = await this.prisma.project.findUnique({
            where: { pid },
        });

        if (!project) {
            throw new NotFoundException(`Project with ID ${pid} not found`);
        }

        // Create 14 tasks
        const tasks = Array.from({ length: 14 }, (_, index) => ({
            name: `${index + 1}`,
            description: `description ${index + 1}`,
            status: 'testing',
            project_pid: pid,
            due: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            assignee_id: '3ee0cc4f-d990-4696-85b6-3c5483a2ace5',
        }));

        return this.prisma.task.createMany({
            data: tasks,
        });
    }
}
