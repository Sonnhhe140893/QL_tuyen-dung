import { Module } from '@nestjs/common';
import { CareersController } from './careers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Career, Company } from 'src/entities';
import { CareerService } from 'src/service/career.service';
import { CareerRepository } from 'src/repository/career.repository';
import { CompanyRepository } from 'src/repository';

@Module({
	controllers: [CareersController],
	imports: [
		TypeOrmModule.forFeature([Career, Company]),
	],
	providers: [CareerService, CareerRepository, CompanyRepository],
	exports: [CareerService]
})
export class CareersModule { }
