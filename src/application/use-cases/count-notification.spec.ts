import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-notification';

describe('Cancel Notification', () => {
  it('Should be able to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const countRecipientNotification = new CountRecipientNotification(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({
        recipientId: 'example-id-recipient',
      }),
    );

    await notificationRepository.create(
      makeNotification({
        recipientId: 'example-id-recipient',
      }),
    );

    await notificationRepository.create(
      makeNotification({
        recipientId: 'example-id-recipient2',
      }),
    );

    const count = await countRecipientNotification.execute({
      recipientId: 'example-id-recipient',
    });

    expect(count.count).toEqual(2);
  });
});
