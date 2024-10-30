import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
    constructor(private readonly testService: TestService) { }

    @Get('tasks')
    async generateTasks(@Query('pid') pid: string, @Query('uid') uid: string) {
        if (!pid) {
            throw new BadRequestException('Project ID (pid) is required');
        }

        if (!uid) {
            throw new BadRequestException('Project ID (pid) is required');
        }

        return this.testService.generateTask(pid, uid);
    }

    @Get('users')
    async generateUsers() {
        return this.testService.generateUsers();
    }

    @Get('projects')
    async generateProjects(@Query('uid') uid: string) {
        return this.testService.generateProjects(uid);
    }
}
