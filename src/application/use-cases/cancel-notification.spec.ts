import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-notFound';

describe('Cancel Notification', () => {
  it('Should be able to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = new Notification(makeNotification());

    await notificationRepository.create(notification);

    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('Should not be able to cancel a notification when doesnt exists', async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const cancelNotification = new CancelNotification(notificationRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrowError(NotificationNotFound);
  });
});
