import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notification';
import { NotificationRepository } from '../repositories/notification-repository';

interface GetNotificationRequest {
  recipientId: string;
}

interface GetNotificationResponse {
  notifications: Notification[];
}

@Injectable()
export class GetNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: GetNotificationRequest,
  ): Promise<GetNotificationResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificationRepository.findManyByRecipientId(recipientId);

    return { notifications };
  }
}
