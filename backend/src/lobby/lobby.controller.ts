import { Body, Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import { PageParamDTO } from './dtos/page.dto';
import { LobbyService } from './lobby.service';

@Controller('lobby')
export class LobbyController {
    constructor(private readonly lobbyService: LobbyService) { };
    @Get()
    async getTasks(@Query('pid') pid: string, @Body(ValidationPipe) PageParamDTO: PageParamDTO) {
        return this.lobbyService.getTasks(pid, PageParamDTO);
    }
}