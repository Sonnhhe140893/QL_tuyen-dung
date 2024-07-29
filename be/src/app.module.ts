import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from './database/database.module';
import * as Joi from 'joi';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsLoggerFilter } from './helpers/exceptions/exceptionLogger';
import { BeModule } from './module/be/be.module';
import { FeModule } from './module/fe/fe.module';
import { UploadModule } from './module/upload/upload.module';
import { AuthModule } from './module/auth/auth.module';
@Module({
    controllers: [AppController],
    imports: [
        HttpModule.registerAsync({
            useFactory: async () => ({
                timeout: 120000,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
		
        BeModule,
        FeModule,
		AuthModule,
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                MYSQL_HOST: Joi.string().required(),
                MYSQL_PORT: Joi.number().required(),
                MYSQL_USER: Joi.string().required(),
                // MYSQL_PASSWORD: Joi.string().required(),
                MYSQL_DB: Joi.string().required(),
                PORT: Joi.number(),
                UPLOADED_FILES_DESTINATION: Joi.string().required()
            }),
            isGlobal: true,
        }),
        UploadModule,
        DatabaseModule,
    ],
    providers: [
		AppService,
		{
			provide: APP_FILTER,
			useClass: ExceptionsLoggerFilter,
		},
	]
})
export class AppModule {}
