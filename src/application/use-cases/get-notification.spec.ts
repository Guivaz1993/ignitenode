import { GetNotification } from '@application/use-cases/get-notification';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';

describe('Get recipient notifications', () => {
  it('should be able to recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const getNotifications = new GetNotification(notificationsRepository);

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-1',
      }),
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-1',
      }),
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-2',
      }),
    );

    const { notifications } = await getNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});
