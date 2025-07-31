import { Injectable, Inject } from '@nestjs/common';
import { Client } from 'cassandra-driver';
import { Message } from '../../models/cassandra/message.model';

@Injectable()
export class MessageService {
  constructor(@Inject('CASSANDRA_CLIENT') private cassandraClient: Client) {}

  async getMessages(conversationId: string): Promise<Message[]> {
    const query = 'SELECT * FROM messages WHERE conversation_id = ?';
    const result = await this.cassandraClient.execute(query, [conversationId], { prepare: true });
    return result.rows.map(row => ({
      conversation_id: row['conversation_id'],
      message_id: row['message_id'],
      sender_id: row['sender_id'],
      content: row['content'],
      created_at: row['created_at'],
    }));
  }

  async create(message: Message): Promise<void> {
    const query = `
      INSERT INTO messages (conversation_id, message_id, sender_id, content, created_at)
      VALUES (?, ?, ?, ?, ?)`;
    await this.cassandraClient.execute(query, [
      message.conversation_id,
      message.message_id,
      message.sender_id,
      message.content,
      message.created_at,
    ], { prepare: true });
  }
}
