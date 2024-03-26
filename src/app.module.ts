import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      validationSchema: Joi.object({
        DISCORD_CLIENT_ID: Joi.string().required(),
        DISCORD_CLIENT_SECRET: Joi.string().required(),
        DISCORD_CALLBACK_URL: Joi.string().required(),
      }),
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
