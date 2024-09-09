import { AppService } from '@application/services/app.service';
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { AppController } from '@presenters/app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
