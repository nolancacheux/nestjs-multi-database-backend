import { Injectable, Inject } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Group } from '../../models/postgres/group.entity';

@Injectable()
export class GroupService {
  constructor(
    @Inject('POSTGRES_DATA_SOURCE') private readonly dataSource: DataSource,
  ) {}

  private groupRepository(): Repository<Group> {
    return this.dataSource.getRepository(Group);
  }

  async findAll(): Promise<Group[]> {
    return await this.groupRepository().find({ relations: ['users'] });
  }

  async findOne(id: number): Promise<Group> {
    const group = await this.groupRepository().findOne({
      where: { id },
      relations: ['users'],
    });
    if (!group) {
      throw new Error(`Group with id ${id} not found`);
    }
    return group;
  }

  async create(groupData: Partial<Group>): Promise<Group> {
    const group = this.groupRepository().create(groupData);
    return await this.groupRepository().save(group);
  }
}
