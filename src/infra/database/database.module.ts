import { Module } from '@nestjs/common';
import { NotificationRepository } from '@application/repositories/notification-repository';
import { PrismaNotificationRepository } from '@infra/database/prisma/respositories/prisma-notification-reposity';

import { PrismaService } from './prisma/prima.service';

@Module({
  providers: [
    PrismaService,
    { provide: NotificationRepository, useClass: PrismaNotificationRepository },
  ],
  exports: [NotificationRepository],
})
export class DatabaseModule {}
