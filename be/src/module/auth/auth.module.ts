import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MailModule } from '../mail/mail.module';
import { UserValidatorService } from 'src/service/user-validator.service';
import { UserService } from 'src/service/user.service';
import { UserModule } from '../fe/user/user.module';
import { UserRepository } from 'src/repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		ConfigModule,
		forwardRef(() => MailModule),
		forwardRef(() => UserModule),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (async (configService: ConfigService) => ({
				secret: configService.get('JWT_ACCESS_SECRET'),
				signOptions: {
					expiresIn: `${configService.get('JWT_EXPIRATION_TIME') || 144000}s`,
				},
			}))
		})
	],
	controllers: [AuthController],
	providers: [
		AuthService, 
		UserValidatorService, 
		UserRepository,
		JwtStrategy
	]
})
export class AuthModule { }
