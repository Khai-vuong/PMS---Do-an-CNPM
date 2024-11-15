import {
  HttpException,
  Injectable,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
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
  private rootFolder: string;

  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {
    this.rootFolder = this.configService.get<string>('ROOTFOLDER');
  }

  async uploadFile(
    project_id: string,
    task_id: string,
    userID: string,
    file: Express.Multer.File,
  ) {
    const createdFile = await this.prismaService.file.create({
      data: {
        name: file.originalname,
        extension: extname(file.originalname),
        status: project_id !== 'ni' ? 'Approved' : 'None',
        size: file.size + ' bytes',
        path: file.destination,
        project:
          project_id !== 'ni' ? { connect: { pid: project_id } } : undefined,
        task: { connect: { tid: task_id } },
        uploader: { connect: { uid: userID } },
      },
    });

    const newFileName = `${project_id !== 'ni' ? `p${createdFile.project_pid}_` : ``}${
      task_id !== 'ni' ? `t${createdFile.task_tid}_` : ``
    }f${createdFile.fid}${extname(file.originalname)}`;

    const uploadFile = await this.prismaService.file.update({
      where: { fid: createdFile.fid },
      data: {
        extended_name: newFileName,
        path: path.join(file.destination, newFileName),
      },
    });

    const newPath = path.join(file.destination, newFileName);
    const oldPath = path.join(file.destination, file.filename);
    fs.renameSync(oldPath, newPath);
    console.log('file uploaded', uploadFile);
    return { message: 'File uploaded successfully' };
  }

  async getFileInfo(fid: string) {
    const fileInfo = await this.prismaService.file.findUnique({
      where: { fid },
      include: { uploader: true, project: true, task: true },
    });

    if (!fileInfo) throw new HttpException('File not found', 404);
    return {
      name: fileInfo.name,
      ext: fileInfo.extension,
      size: fileInfo.size,
      path: fileInfo.path,
      uploader: fileInfo.uploader.username,
      project: fileInfo.project ? fileInfo.project.name : 'No project',
      task: fileInfo.task ? fileInfo.task.name : 'No task',
    };
  }

  async downloadFileByTid(tid: string, res: any) {
    const task = await this.prismaService.task.findUnique({
      where: { tid },
      include: { files: true },
    });
    if (!task) throw new HttpException('Task not found', 404);

    const filePaths = task.files.map(file => file.path);
    const tempDir = path.join(this.rootFolder, 'temp', `task_${tid}`);

    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    for (const filePath of filePaths) {
      const file = path.basename(filePath);
      fs.copyFileSync(filePath, path.join(tempDir, file));
    }

    const zipPath = path.join(this.rootFolder, 'temp', `task_${tid}.zip`);
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.directory(tempDir, false).pipe(output);
    await archive.finalize();

    output.on('close', () => {
      res.download(zipPath, (err: number) => {
        if (err) throw new HttpException('Download failed', err);
        fs.rmSync(tempDir, { recursive: true, force: true });
        fs.unlinkSync(zipPath);
      });
    });
  }

  async downloadFileByPid(pid: string, res: any) {
    const project = await this.prismaService.project.findUnique({
      where: { pid },
      include: { files: true },
    });
    if (!project) throw new HttpException('Project not found', 404);

    const filePaths = project.files.map(file => file.path);
    const tempDir = path.join(this.rootFolder, 'temp', `project_${pid}`);

    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    for (const filePath of filePaths) {
      const file = path.basename(filePath);
      fs.copyFileSync(filePath, path.join(tempDir, file));
    }

    const zipPath = path.join(this.rootFolder, 'temp', `project_${pid}.zip`);
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.directory(tempDir, false).pipe(output);
    await archive.finalize();

    output.on('close', () => {
      res.download(zipPath, (err: number) => {
        if (err) throw new HttpException('Download failed', err);
        fs.rmSync(tempDir, { recursive: true, force: true });
        fs.unlinkSync(zipPath);
      });
    });
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
  p;
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
