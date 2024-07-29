import { Module, forwardRef } from '@nestjs/common';
import { CommonController } from './common.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from 'src/service/dashboard.service';
import { UserService } from 'src/service/user.service';
import { CompanyRepository, JobRepository, UserRepository } from 'src/repository';
import { UserValidatorService } from 'src/service/user-validator.service';
import { UserModule } from '../user/user.module';
import { Company, Jobs, User, UserJob } from 'src/entities';
import { UserJobRepository } from 'src/repository/user-job.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			User, Jobs, Company,
			UserJob
		])
	],
	providers: [
		UserRepository,
		DashboardService,
		JobRepository,
		CompanyRepository,
		UserJobRepository
	],
	controllers: [CommonController]
})
export class CommonApiModule { }
