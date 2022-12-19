import { Notification } from '@application/entities/notification';
import { NotificationRepository } from '@application/repositories/notification-repository';

export class InMemoryNotificationRepository implements NotificationRepository {
  public notifications: Notification[] = [];

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );
  }
  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    ).length;
  }
  async findById(notificationId: string): Promise<Notification> {
    const notification = this.notifications.find((iten) => {
      return iten.id === notificationId;
    });

    if (!notification) {
      return null;
    }

    return notification;
  }
  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex((iten) => {
      return iten.id === notification.id;
    });

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
