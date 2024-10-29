import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
    constructor(private readonly testService: TestService) { }

    @Get()
    async generate(@Query('pid') pid: string) {
        if (!pid) {
            throw new BadRequestException('Project ID (pid) is required');
        }

        return this.testService.generate(pid);
    }
}
