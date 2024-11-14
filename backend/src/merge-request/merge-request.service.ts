import { Injectable } from '@nestjs/common';
import { CreateMergeRequestDto } from '../../DTOs/create-merge-request.dto';

@Injectable()
export class MergeRequestService {
  create(createMergeRequestDto: CreateMergeRequestDto, userID: string) {
    return 'This action adds a new mergeRequest';
  }
}
