import { Module } from '@nestjs/common';
import { Neo4jProvider } from './neo4j.provider';
import { RelationshipService } from '../../services/neo4j/relationship.service';

@Module({
  providers: [
    ...Neo4jProvider,
    RelationshipService,
  ],
  exports: [
    ...Neo4jProvider,
    RelationshipService,
  ],
})
export class Neo4jModule {}
