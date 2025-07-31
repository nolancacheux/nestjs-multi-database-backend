import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { NotificationService } from '../services/cassandra/notification.service';
import { NotificationDto } from '../shared/dto/notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get(':userId')
  getNotifications(@Param('userId') userId: string) {
    return this.notificationService.getNotifications(Number(userId));
  }

  @Post()
  create(@Body() notificationDto: NotificationDto) {
    return this.notificationService.create(notificationDto);
  }
}
