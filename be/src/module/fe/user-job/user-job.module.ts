import { Module, forwardRef } from '@nestjs/common';
import { Company, Jobs, User, UserJob, Career } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { UserJobService } from 'src/service/user-job.service';
import { UserJobRepository } from 'src/repository/user-job.repository';
import { CareerRepository } from 'src/repository/career.repository';
import { CategoryRepository, CompanyRepository, JobRepository } from 'src/repository';

import { UserUserJobController } from './user-job.controller';
import { CompanyService } from 'src/service/company.service';


@Module({
	imports: [
		TypeOrmModule.forFeature([
			Company, 
			User, 
			Jobs, 
			UserJob, 
			Career
		]),
	],
	controllers: [UserUserJobController],
	providers: [UserJobService, 
		UserJobRepository, 
		CompanyService,
		CompanyRepository,
		CareerRepository,
		JobRepository
	 ],
	exports: [UserJobService]
})
export class UserJobModule { }
