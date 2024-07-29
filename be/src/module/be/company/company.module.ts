import { Module, forwardRef } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from 'src/service/company.service';
import { CompanyRepository } from 'src/repository/company.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Career, Company , User } from 'src/entities';
import { UserModule } from '../user/user.module';
import { CareerRepository } from 'src/repository/career.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([Company, User, Career]),
		forwardRef(() => UserModule),
	],
	controllers: [CompanyController],
	providers: [CompanyService, CompanyRepository, CareerRepository ],
	exports: [CompanyService]
})
export class CompanyModule { }
