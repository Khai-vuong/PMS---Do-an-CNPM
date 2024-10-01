import { Controller, Post } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
    constructor(private testService: TestService) { }

    @Post("test")
    async uploadNigga() {
        await this.testService.uploadNigga();
        return "Uploaded";
    }

}
