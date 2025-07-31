import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from '../services/postgres/user.service';
import { UserDto } from '../shared/dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() userDto: UserDto) {
    return this.userService.create(userDto);
  }
}
