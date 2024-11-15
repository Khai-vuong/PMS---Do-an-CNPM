import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MergeRequestService {
  constructor(private prismaService: PrismaService) {}

  async create(
    tid: string,
    approver_uid: string,
    comment: string,
    userID: string,
  ) {
    if (approver_uid === 'ni') {
      const task = await this.prismaService.task.findUnique({
        where: { tid },
        select: { project_pid: true },
      });
      if (!task) {
        throw new HttpException('Task not found', 404);
      }
      const project = await this.prismaService.project.findUnique({
        where: { pid: task.project_pid },
        select: { manager_ids: true },
      });
      if (!project) {
        throw new HttpException('Project not found', 404);
      }
      approver_uid = project.manager_ids[0].uid;
    }
    const files = await this.prismaService.file.findMany({
      where: { task_tid: tid },
    });

    if (files) {
      for (const file of files) {
        if (file.status !== 'None' || 'Rejected') break;
        await this.prismaService.file.update({
          where: { fid: file.fid },
          data: { status: 'pending' },
        });
      }
    }

    const mr = await this.prismaService.mergeRequest.create({
      data: {
        comment,
        task: { connect: { tid: tid } },
        sender: { connect: { uid: userID } },
        approver:
          approver_uid !== 'ni'
            ? { connect: { uid: approver_uid } }
            : undefined,
        files: { connect: files.map(file => ({ fid: file.fid })) },
      },
    });
    return { message: `Merge request ${mr.mrid} created` };
  }

  async getMergeRequestInfo(mrid: string) {
    const mr = await this.prismaService.mergeRequest.findUnique({
      where: { mrid },
      include: {
        task: true,
        sender: true,
        approver: true,
        files: true,
      },
    });
    if (!mr) {
      throw new HttpException('Merge request not found', 404);
    }
    return {
      comment: mr.comment,
      status: mr.status,
      task: mr.tid,
      sender: mr.sender_uid,
      approver: mr.approver_uid,
      files: mr.files,
    };
  }

  async approve(mrid: string, userID: string) {
    const mr = await this.prismaService.mergeRequest.findUnique({
      where: { mrid },
      include: { task: true, files: true },
    });
    if (!mr) {
      throw new HttpException('Merge request not found', 404);
    }
    if (mr.approver_uid !== userID) {
      throw new HttpException(
        'You are not the approver of this merge request',
        403,
      );
    }
    await Promise.all([
      this.prismaService.file.updateMany({
        where: { fid: { in: mr.files.map(file => file.fid) } },
        data: { status: 'Approved' },
      }),
      // change extended_name and path of files in here
      this.prismaService.mergeRequest.update({
        where: { mrid },
        data: { status: 'Approved' },
      }),
      this.prismaService.task.update({
        where: { tid: mr.tid },
        data: { status: 'Done' },
      }),
    ]);
    return { message: `Merge request ${mrid} approved` };
  }

  async reject(mrid: string, userID: string) {
    const mr = await this.prismaService.mergeRequest.findUnique({
      where: { mrid },
      include: { files: true },
    });
    if (!mr) {
      throw new HttpException('Merge request not found', 404);
    }
    if (mr.approver_uid !== userID) {
      throw new HttpException(
        'You are not the approver of this merge request',
        403,
      );
    }
    await Promise.all([
      this.prismaService.file.updateMany({
        where: { fid: { in: mr.files.map(file => file.fid) } },
        data: { status: 'Rejected' },
      }),
      // don't change extended_name and path of files in here
      this.prismaService.mergeRequest.update({
        where: { mrid },
        data: { status: 'Rejected' },
      }),
      this.prismaService.task.update({
        where: { tid: mr.tid },
        data: { status: 'Undone' },
      }),
    ]);
    return { message: `Merge request ${mrid} rejected` };
  }
}