import { Module } from '@nestjs/common';
import { DatabaseProvider } from './postgres.provider';
import { UserService } from '../../services/postgres/user.service';
import { GroupService } from '../../services/postgres/group.service';

@Module({
  providers: [...DatabaseProvider, UserService, GroupService],
  exports: [...DatabaseProvider, UserService, GroupService],
})
export class PostgresModule {}
