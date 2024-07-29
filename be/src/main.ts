import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ExceptionsLoggerFilter } from "./helpers/exceptions/exceptionLogger";

// async function bootstrap() {
//     const app = await NestFactory.create(AppModule);
//     const configService = app.get(ConfigService);

//     const port = configService.get('PORT') ?? 3000;
//     await app.listen(port);

//     app.setGlobalPrefix('api/');
//     app.enableCors();

//     const { httpAdapter } = app.get(HttpAdapterHost);
//     app.useGlobalPipes(new ValidationPipe());

//     console.log(`RUN PORT ${port}`);
//     console.log(`http://localhost:${port}`);
// }
// bootstrap();

const PORT = process.env.PORT || 3001;

async function bootstrap() {
	const app = await NestFactory.create(AppModule,
		{
			logger: ['error', 'warn', 'log']
		}
	);

	const config = new DocumentBuilder()
		.setTitle('API')
		.setVersion('1.0')
		.addServer('/api/v1')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api/v1', app, document);

	app.useGlobalPipes(new ValidationPipe({
		transform: true,
	}));
	const { httpAdapter } = app.get(HttpAdapterHost);
	app.useGlobalFilters(new ExceptionsLoggerFilter(httpAdapter));
	app.enableCors();
	app.setGlobalPrefix('api/v1');
	await app.listen(PORT);
}
bootstrap().then(() => console.log('Service listening 👍: ', PORT));
