import { IsString } from 'class-validator';

export class CreateMergeRequestDto {
  @IsString()
  mrid: string;

  @IsString()
  comment: string;

  @IsString()
  status: string;

  @IsString()
  task_id: string;

  @IsString()
  sender_id: string;

  @IsString()
  approver_id: string;
}
