import { IsUUID, IsString, IsNumber, IsBoolean, IsDate } from 'class-validator';

export class NotificationDto {
  @IsUUID()
  notification_id: string;

  @IsNumber()
  user_id: number;

  @IsString()
  type: string;

  @IsString()
  message: string;

  @IsBoolean()
  read: boolean;

  @IsDate()
  created_at: Date;
}
