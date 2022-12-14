import { Module } from '@nestjs/common';
import { NotificationRepository } from 'src/application/repositories/notification-repository';
import { PrismaService } from './prisma/prima.service';
import { PrismaNotificationRepository } from './prisma/respositories/prisma-notification-reposity';

@Module({
  providers: [
    PrismaService,
    { provide: NotificationRepository, useClass: PrismaNotificationRepository },
  ],
  exports: [NotificationRepository],
})
export class DatabaseModule {}
