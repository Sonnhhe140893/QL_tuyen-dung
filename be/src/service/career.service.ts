import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaging, Paging, toSlug } from 'src/helpers/helper';
import { CareerRepository } from 'src/repository/career.repository';

@Injectable()
export class CareerService {

	constructor(
		private repository: CareerRepository,
	) {

	}

	async getLists(paging: IPaging, filters: any)
    {
		let condition: any = {};
       

        const [data, total] =  await this.repository.findAndCount({
            where: condition,
            take: paging.page_size,
            skip: (paging.page - 1) * paging.page_size
        });

        return { result: data, meta: new Paging(paging.page, paging.page_size, total) };
        // return await this.repository.getLists(paging, filters);
    }

    async store(data: any)
    {
		const newData = await this.repository.create({...data});
        await this.repository.save(newData);
		return newData;
    }

	async seed()
    {
		let data: any = [
			{
				name: "Bán hàng",
			},
			{
				name: "IT phần mềm",
			},
			{
				name: "Marketing",
			},
			{
				name: "Kế toán- Kiểm toán",
			},
			{
				name: "Khách sạn - Nhà hàng",
			},
			{
				name: "Phiên dịch - ngoại ngữ",
			},
			{
				name: "Kỹ sư",
			},
			{
				name: "Hành chính văn phòng",
			},
			{
				name: "Kỹ thuật",
			},
			{
				name: "Marketing - PR",
			},

		];

		for(let item of data) {
			item.slug = toSlug(item.name);
			let check = await this.findOneByCondition({slug: item.slug});
			if(check) {
				await this.update(check.id, {...item, updated_at: new Date()});
			} else {
				const newData = await this.repository.create({...item, created_at: new Date(), updated_at: new Date()});
				await this.repository.save(newData);
			}
		}
    }

	async update(id: number, data: any)
    {
        await this.repository.update(id, data);
		return await this.findById(id)
    }

	async deleteById(id: number)
    {
        return await this.repository.delete(id);
    }

	async findById(id: number)
    {
        return await this.repository.findOne({
			where: {id: id}
		});
    }

	async findOneByCondition(condition: any = {})
    {
        return await this.repository.findOne(
			{
				where: condition
			}
		);
    }
}
