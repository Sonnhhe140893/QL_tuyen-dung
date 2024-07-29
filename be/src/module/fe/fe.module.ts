import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { VoteModule } from './vote/vote.module';
import { CompanyModule } from './company/company.module';
import { JobModule } from './job/job.module';
import { CareersModule } from './careers/careers.module';
import { UserJobModule } from './user-job/user-job.module';
import { CommonApiModule } from './common/common.module';
import { ProvinceModule } from './province/province.module';

@Module({
	imports: [
		CategoryModule,
		UserModule,
		VoteModule,
		CompanyModule,
		JobModule,
		CareersModule,
		UserJobModule,
		CommonApiModule,
		ProvinceModule
	],
	controllers: []
})
export class FeModule { }
