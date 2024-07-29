import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from 'src/service/job.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Career, Category, Jobs } from 'src/entities';
import { JobRepository } from 'src/repository/job.repository';
import { CategoryRepository } from 'src/repository';
import { CareerRepository } from 'src/repository/career.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([Jobs, Category, Career])
	],
	controllers: [JobController],
	providers: [JobService, JobRepository, CategoryRepository, CareerRepository],
	exports: [JobService]
})
export class JobModule { }
