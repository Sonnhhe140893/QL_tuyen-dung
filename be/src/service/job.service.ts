import { Injectable } from '@nestjs/common';
import { IPaging } from 'src/helpers/helper';
import { CategoryRepository } from 'src/repository';
import { CareerRepository } from 'src/repository/career.repository';
import { JobRepository } from 'src/repository/job.repository';

@Injectable()
export class JobService {

	constructor(
		private repository: JobRepository,
		private categoryRepo: CategoryRepository,
		private careerRepo: CareerRepository,
	) {

	}

	async getLists(paging: IPaging, filters: any) {
		let data: any = await this.repository.getLists(paging, filters);
		if (data?.result?.length > 0) {
			for (let item of data.result) {
				item.form_of_work = await this.categoryRepo.findOne({
					where: {
						type: 3,
						id: item.form_of_work_id
					}
				});
				item.experience = await this.categoryRepo.findOne({
					where: {
						type: 1,
						id: item.experience_id
					}
				});
				item.rank = await this.categoryRepo.findOne({
					where: {
						type: 2,
						id: item.rank_id
					}
				});
				item.salary_type = await this.categoryRepo.findOne({
					where: {
						type: 4,
						id: item.salary_id
					}
				});
			}
		}
		return data;
	}

	async store(data: any) {
		data.created_at = new Date();
		if (data?.career_id) {
			const career = await this.careerRepo.findOne({ where: { id: data?.career_id } });
			if (career) {
				let totalJob = career?.total_jobs || 0;
				await this.careerRepo.update(data?.career_id, { total_jobs: totalJob + 1, updated_at: new Date() });
			}
		}
		const newData = await this.repository.create({ ...data });
		await this.repository.save(newData);
		return newData;
	}

	async update(id: number, data: any) {
		const check = await this.findById(id);
		if (data?.career_id && check?.career_id != data?.career_id) {
			let oldCare = await this.careerRepo.findOne({ where: { id: check?.career_id } });
			if (oldCare) {
				let totalJoboldCare = oldCare?.total_jobs && oldCare?.total_jobs - 1 || 0;
				await this.careerRepo.update(check?.career_id, { total_jobs: totalJoboldCare, updated_at: new Date() });
			}
			const career = await this.careerRepo.findOne({ where: { id: data?.career_id } });
			if (career) {
				let totalJob = career?.total_jobs || 0;
				await this.careerRepo.update(data?.career_id, { total_jobs: totalJob + 1, updated_at: new Date() });
			}
		}
		const newData: any = await this.repository.create({ ...data });
		await this.repository.update(id, newData);
		return await this.findById(id);
	}

	async deleteById(id: number) {
		return await this.repository.delete(id);
	}

	async findById(id: number) {
		const data: any = await this.repository.findById(id);
		if (data) {
			data.form_of_work = await this.categoryRepo.findOne({
				where: {
					type: 3,
					id: data.form_of_work_id
				}
			});
			data.experience = await this.categoryRepo.findOne({
				where: {
					type: 1,
					id: data.experience_id
				}
			});
			data.rank = await this.categoryRepo.findOne({
				where: {
					type: 2,
					id: data.rank_id
				}
			});
			data.salary_type = await this.categoryRepo.findOne({
				where: {
					type: 4,
					id: data.salary_id
				}
			});
		}
		return data
	}

	async findOneByCondition(condition: any = {}) {
		return await this.repository.findOne(
			{
				where: condition,
				relations: {
					company: true,
					user: true,
					career: true,
					province: true,
				},
			}
		);
	}
}
