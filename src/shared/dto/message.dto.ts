import { IsUUID, IsString, IsNumber, IsDate } from 'class-validator';

export class MessageDto {
  @IsUUID()
  conversation_id: string;

  @IsUUID()
  message_id: string;

  @IsNumber()
  sender_id: number;

  @IsString()
  content: string;

  @IsDate()
  created_at: Date;
}
