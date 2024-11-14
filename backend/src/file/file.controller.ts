import {
  Controller,
  HttpException,
  Post,
  Get,
  Query,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { diskStorage } from 'multer';
import { LocalGuard } from 'src/utils/local.guard';
import { GetUserID } from 'src/utils/get-user.decorator';
import { extname } from 'path';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseGuards(LocalGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() input: { task_id: string; project_id: string },
    @GetUserID() user: any,
  ) {
    if (!file) {
      throw new HttpException('File not found', 404);
    }
    const { task_id, project_id } = input;
    this.fileService.uploadFile(project_id ? project_id : 'ni' /* ni : no information */, task_id, user.userID, file);
  }

  // @Post('create-mr')
  // @UseInterceptors(FileInterceptor('file'))
  // createMR(
  //   @Query('tid') tid: string,
  //   @Query('uid') uid: string,
  //   @UploadedFile() file,
  // ) {
  //   if (!file) {
  //     throw new HttpException('File not found', 404);
  //   }
  //   return this.fileService.createMR(tid, uid, file);
  // }

  // @Get('fromTask')
  // async downloadTaskFiles(@Query('tid') tid: string) {
  //   return this.fileService.downloadFilesByTask(tid);
  // }

  // @Get('fromProject')
  // async downloadProjectFiles(@Query('pid') pid: string) {
  //   return this.fileService.downloadFilesByProject(pid);
  // }
}
