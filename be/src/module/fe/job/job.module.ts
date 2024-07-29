import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from 'src/service/job.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Career, Category, Company, Jobs } from 'src/entities';
import { JobRepository } from 'src/repository/job.repository';
import { CategoryRepository, CompanyRepository } from 'src/repository';
import { CareerRepository } from 'src/repository/career.repository';
import { CompanyService } from 'src/service/company.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Jobs,
			Category,
			Company,
			Career])
	],
	controllers: [JobController],
	providers: [JobService,
		JobRepository,
		CategoryRepository,
		CompanyService,
		CompanyRepository,
		CareerRepository
	],
	exports: [JobService]
})
export class JobModule { }
