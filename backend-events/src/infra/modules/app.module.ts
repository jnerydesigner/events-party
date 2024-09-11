import { AppService } from '@application/services/app.service';
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { AppController } from '@presenters/app.controller';
import { UsersModule } from './users.module';
import { DatabaseModule } from './database.module';
import { PersonalModule } from './personal.module';
import { MinioClientModule } from './minio-client.module';
import { FileUploadModule } from './file-upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,
    DatabaseModule,
    PersonalModule,
    MinioClientModule,
    FileUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
