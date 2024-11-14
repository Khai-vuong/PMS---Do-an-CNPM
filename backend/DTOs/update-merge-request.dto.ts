import { PartialType } from '@nestjs/mapped-types';
import { CreateMergeRequestDto } from './create-merge-request.dto';

export class UpdateMergeRequestDto extends PartialType(CreateMergeRequestDto) {}
