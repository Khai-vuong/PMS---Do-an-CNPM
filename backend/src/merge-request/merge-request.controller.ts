import { Controller, Post, Body } from '@nestjs/common';
import { MergeRequestService } from './merge-request.service';
import { CreateMergeRequestDto } from '../../DTOs/create-merge-request.dto';
import { GetUserID } from 'src/utils/get-user.decorator';

@Controller('mr')
export class MergeRequestController {
  constructor(private readonly mergeRequestService: MergeRequestService) {}

  @Post('create')
  create(@Body() createMergeRequestDto: CreateMergeRequestDto, @GetUserID() user: any) {
    return this.mergeRequestService.create(createMergeRequestDto, user.userID);
  }
}
