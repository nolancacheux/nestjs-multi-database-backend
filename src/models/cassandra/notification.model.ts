export interface Notification {
    notification_id: string;
    user_id: number;
    type: string;
    message: string;
    read: boolean;
    created_at: Date;
  }
  