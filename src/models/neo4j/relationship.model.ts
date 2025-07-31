export interface Relationship {
    fromUserId: number;
    toUserId: number;
    relationshipType: 'FRIEND' | 'FOLLOW' | 'BLOCKED';
    createdAt: Date;
  }
  