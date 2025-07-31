import { Injectable, Inject } from '@nestjs/common';
import { Client } from 'cassandra-driver';
import { Notification } from '../../models/cassandra/notification.model';

@Injectable()
export class NotificationService {
  constructor(@Inject('CASSANDRA_CLIENT') private cassandraClient: Client) {}

  async getNotifications(userId: number): Promise<Notification[]> {
    const query = 'SELECT * FROM notifications WHERE user_id = ?';
    const result = await this.cassandraClient.execute(query, [userId], { prepare: true });
    return result.rows.map(row => ({
      notification_id: row['notification_id'],
      user_id: row['user_id'],
      type: row['type'],
      message: row['message'],
      read: row['read'],
      created_at: row['created_at'],
    }));
  }

  async create(notification: Notification): Promise<void> {
    const query = `
      INSERT INTO notifications (notification_id, user_id, type, message, read, created_at)
      VALUES (?, ?, ?, ?, ?, ?)`;
    await this.cassandraClient.execute(query, [
      notification.notification_id,
      notification.user_id,
      notification.type,
      notification.message,
      notification.read,
      notification.created_at,
    ], { prepare: true });
  }
}
