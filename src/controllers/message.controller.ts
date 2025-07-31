import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MessageService } from '../services/cassandra/message.service';
import { MessageDto } from '../shared/dto/message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get(':conversationId')
  getMessages(@Param('conversationId') conversationId: string) {
    return this.messageService.getMessages(conversationId);
  }

  @Post()
  create(@Body() messageDto: MessageDto) {
    return this.messageService.create(messageDto);
  }
}
