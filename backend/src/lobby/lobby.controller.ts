import { Body, Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import { LobbyService } from './lobby.service';

@Controller('lobby')
export class LobbyController {
    constructor(private readonly lobbyService: LobbyService) {};
    @Get()
    async getTasks(@Query('pid') pid: string, 
    @Query('page') page : string,
    @Query('pageSize') pageSize : string) {
        return this.lobbyService.getTasks(pid, page, pageSize);
    }
}
