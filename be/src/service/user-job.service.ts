import { Injectable } from '@nestjs/common';
import { CompanyDto } from 'src/dtos/company.dto';
import { IPaging, Paging } from 'src/helpers/helper';
import { CareerRepository } from 'src/repository/career.repository';
import { UserJobRepository } from 'src/repository/user-job.repository';
import { CompanyRepository } from 'src/repository/company.repository';
import { In, Like } from 'typeorm';
import * as _ from 'lodash';
import { JobRepository } from 'src/repository';
@Injectable()
export class UserJobService {

	constructor(
		private repository: UserJobRepository,
		private jobRepo: JobRepository,
		private careerRepo: CareerRepository,
	) {

	}

	async buildCondition(filter: any) {
		let condition: any = {};
		if (filter?.name && filter?.name.trim() != '') condition.name = Like(`%${filter?.name.trim()}%`);
		if (filter?.phone && filter?.phone.trim() != '') condition.phone = Like(`%${filter?.phone.trim()}%`);
		if (filter?.email && filter?.email.trim() != '') condition.email = Like(`%${filter?.email.trim()}%`);
		if (filter?.status) condition.status = filter?.status;
		if (filter?.id) condition.id = filter?.id;
		if (filter?.company_id) condition.company_id = filter?.company_id;
		if (filter?.user_id) condition.user_id = filter?.user_id;
		if (filter?.job_id) condition.job_id = filter?.job_id;

		return condition;
	}

	async getLists(paging: IPaging, filters) {
		let condition: any = await this.buildCondition(filters);
		const [data, total]: any = await this.repository.findAndCount({
			where: condition,
			relations: {
				user: true,
				job: true,
				company: true
			},
			take: paging.page_size,
			skip: (paging.page - 1) * paging.page_size
		});


		return { result: data, meta: new Paging(paging.page, paging.page_size, total) };
	}


	async store(data: any) {
		data.created_at = new Date()
		const newData: any = await this.repository.create({ ...data });
		await this.repository.save(newData);
		await this.updateTotalJobByJob(newData.job_id)
		return newData;
	}

	async updateTotalJobByJob(job_id: any) {
		const job = await this.jobRepo.findById(job_id);
		if(job) {
			const career = await this.careerRepo.findById(job.career_id);
			if(career) {
				let total = career?.total_jobs || 0;
				await this.careerRepo.update(career.id, {total_jobs: total + 1})
			}

		}
	}

	async update(id: number, data: any) {
		await this.repository.update(id, {...data});
		return await this.findById(id)
	}

	async deleteById(id: number) {
		return await this.repository.delete(id);
	}

	async findById(id: number) {
		const data: any = await this.repository.findOne({
			where: {
				id: id
			},
			relations: {
				user: true,
				job: true,
				company: true
			},
		});

		return data;
	}

	async findOneByCondition(condition: any = {}) {

		const data: any = await this.repository.findOne({
			where: condition,
			relations: {
				user: true,
				job: true,
				company: true
			},
		});

		return data;
	}
}
