import { Module, forwardRef } from '@nestjs/common';
import { ProvinceController } from './province.controller';
import { CompanyService } from 'src/service/company.service';
import { CompanyRepository } from 'src/repository/company.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Career, Company , Jobs, Province, User } from 'src/entities';
import { UserModule } from '../user/user.module';
import { CareerRepository } from 'src/repository/career.repository';
import { ProvinceService } from 'src/service/province.service';
import { ProvinceRepository } from 'src/repository/province.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([Province, Jobs]),
		forwardRef(() => UserModule),
	],
	controllers: [ProvinceController],
	providers: [ProvinceService, ProvinceRepository ],
	exports: [ProvinceService]
})
export class ProvinceModule { }
