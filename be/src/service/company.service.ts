import { Injectable } from '@nestjs/common';
import { CompanyDto } from 'src/dtos/company.dto';
import { IPaging, Paging } from 'src/helpers/helper';
import { CareerRepository } from 'src/repository/career.repository';
import { CompanyRepository } from 'src/repository/company.repository';
import { In, Like } from 'typeorm';
import * as _ from 'lodash';
@Injectable()
export class CompanyService {

	constructor(
		private repository: CompanyRepository,
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
		if (filter?.employer_id) condition.employer_id = filter?.employer_id;
		if (filter?.working_time) condition.working_time = filter?.working_time;
		if (filter?.slug) condition.slug = filter?.slug;
		if (filter?.hash_slug) condition.hash_slug = filter?.hash_slug;
		if (filter?.career_id) condition.careers = Like(`%${filter?.career_id}%`);
		
		return condition;
	}

	async getLists(paging: IPaging, filters) {
		let condition: any = await this.buildCondition(filters);
		const [data, total]: any = await this.repository.findAndCount({
			where: condition,
			relations: {
				user: true
			},
			take: paging.page_size,
			skip: (paging.page - 1) * paging.page_size
		});
		if(data?.length > 0) {
			for(let item of data) {
				if(item.careers) {
					item.careers = await this.careerRepo.find({
						select: ["id", "name", "status", "slug"],
						where: {
							id: In(item.careers.split(','))
						}
					})
				}
				
			}
		}

		return { result: data, meta: new Paging(paging.page, paging.page_size, total) };
	}


	async store(data: any) {
		data.created_at = new Date()
		const newData: any = await this.repository.create({ ...data });
		await this.repository.save(newData);
		return newData;
	}
	async update(id: number, data: any) {
		await this.repository.update(id, data);
		return await this.findById(id)
	}

	async deleteById(id: number) {
		return await this.repository.delete(id);
	}

	async findById(id: number) {
		const data: any = await this.repository.findById(id);
		if(data.careers) {
			data.careers = await this.careerRepo.find({
				select: ["id", "name", "status", "slug"],
				where: {
					id: In(data.careers.split(','))
				}
			})
		}
		return data;
	}

	async findOneByCondition(condition: any = {}) {
		
		const data: any = await this.repository.findOne({
			where: condition,
		});
		if(data?.careers) {
			data.careers = await this.careerRepo.find({
				select: ["id", "name", "status", "slug"],
				where: {
					id: In(data.careers.split(','))
				}
			})
		}
		return data;
	}
}
