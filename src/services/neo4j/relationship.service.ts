import { Injectable, Inject } from '@nestjs/common';
import { Driver } from 'neo4j-driver';
import { Relationship } from '../../models/neo4j/relationship.model';

@Injectable()
export class RelationshipService {
  constructor(@Inject('NEO4J_DRIVER') private neo4jDriver: Driver) {}

  async createRelationship(rel: Relationship): Promise<void> {
    const session = this.neo4jDriver.session();
    await session.run(
      `MERGE (a:User {id: $fromUserId})
       MERGE (b:User {id: $toUserId})
       CREATE (a)-[r:${rel.relationshipType} {createdAt: datetime($createdAt)}]->(b)`,
      {
        fromUserId: rel.fromUserId,
        toUserId: rel.toUserId,
        createdAt: rel.createdAt.toISOString(),
      }
    );
    await session.close();
  }
}
