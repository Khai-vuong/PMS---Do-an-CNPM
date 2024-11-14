import { Injectable, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { extname } from 'path';
import * as archiver from 'archiver';
import { PrismaService } from 'prisma/prisma.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Injectable()
export class FileService {
  constructor(private prismaService: PrismaService) {}

  async uploadFile(project_id: string, task_id: string, userID: string, file) {
    const createdFile = await this.prismaService.file.create({
      data: {
        name: file.fieldname,
        extension: extname(file.originalname),
        size: file.size + ' bytes',
        path: file.destination,
        project: project_id !== 'ni' ? { connect: { pid: project_id } } : {},
        task: { connect: { tid: task_id } },
        uploader: { connect: { uid: userID } },
      },
    });
    const { project_pid: pid, task_tid: tid, fid } = createdFile;
    const newFileName = `${pid ? `p${pid}_` : ``}t${tid}_f_${fid}${extname(file.originalname)}`;
    const newPath = path.join(file.destination, newFileName);
    const oldPath = path.join(file.destination, file.filename);
    fs.renameSync(oldPath, newPath);
    return { message: 'File uploaded successfully' };
  }

  // private ROOTFOLDER: string;

  // constructor(private configService: ConfigService) {
  //   this.ROOTFOLDER = this.configService.get<string>('ROOTFOLDER');
  // }

  // createMR(tid: string, uid: string, file: Express.Multer.File) {
  //   const mrFolder = path.join(this.ROOTFOLDER, 'pending', tid, uid);
  //   fs.mkdirSync(mrFolder, { recursive: true });
  //   const filePath = path.join(mrFolder, file.originalname);
  //   fs.writeFileSync(filePath, file.buffer);
  //   return { message: 'MR created and file saved to pending' };
  // }

  // async downloadFilesByTask(tid: string) {
  //   const taskFolder = path.join(this.ROOTFOLDER, 'tasks', tid);
  //   const zipPath = path.join(this.ROOTFOLDER, `task_${tid}.zip`);
  //   return this.zipFolder(taskFolder, zipPath);
  // }

  // async downloadFilesByProject(pid: string) {
  //   const projectFolder = path.join(this.ROOTFOLDER, 'projects', pid);
  //   const zipPath = path.join(this.ROOTFOLDER, `project_${pid}.zip`);
  //   return this.zipFolder(projectFolder, zipPath);
  // }

  // async approveMR(mrid: string) {
  //   const mrFolder = path.join(this.ROOTFOLDER, 'pending', mrid);
  //   const projectFolder = path.join(
  //     this.ROOTFOLDER,
  //     'projects',
  //     this.getProjectIdByMR(mrid),
  //   );
  //   fs.mkdirSync(projectFolder, { recursive: true });

  //   fs.readdirSync(mrFolder).forEach(file => {
  //     fs.renameSync(path.join(mrFolder, file), path.join(projectFolder, file));
  //   });

  //   return {
  //     message: `MR ${mrid} approved and files moved to project folder`,
  //   };
  // }

  // async denyMR(mrid: string) {
  //   return { message: `MR ${mrid} denied, files remain in pending` };
  // }

  // private async zipFolder(sourceFolder: string, zipPath: string) {
  //   const output = fs.createWriteStream(zipPath);
  //   const archive = archiver('zip', { zlib: { level: 9 } });

  //   return new Promise((resolve, reject) => {
  //     archive
  //       .directory(sourceFolder, false)
  //       .on('error', err => reject(err))
  //       .pipe(output);

  //     output.on('close', () =>
  //       resolve({ message: 'Files zipped', path: zipPath }),
  //     );
  //     archive.finalize();
  //   });
  // }

  // private getProjectIdByMR(mrid: string): string {
  //   // Placeholder for actual logic to fetch project ID from MR ID
  //   return 'example_project_id';
  // }
}
