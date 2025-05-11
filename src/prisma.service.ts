import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name); // Optional: for logging

  async onModuleInit() {
    try {
      // The eslint-disable comment might not be necessary if your Prisma client
      // and types are correctly generated and recognized by TypeScript.
      // If `this.$connect` is properly typed from `PrismaClient`, this rule shouldn't trigger.
      await this.$connect();
      this.logger.log('Successfully connected to the database.'); // Optional
    } catch (error) {
      this.logger.error('Failed to connect to the database.', error); // Optional
      // Depending on your application's needs, you might want to re-throw the error
      // or handle it in a way that prevents the application from starting if the DB is crucial.
      throw error;
    }
  }

  async onModuleDestroy() {
    // This method will be called when the application is shutting down.
    // It's important to disconnect Prisma Client to release database connections.
    try {
      await this.$disconnect();
      this.logger.log('Successfully disconnected from the database.'); // Optional
    } catch (error) {
      this.logger.error('Failed to disconnect from the database.', error); // Optional
      // Handle or log error as needed
    }
  }
}