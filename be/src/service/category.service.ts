import { Injectable } from "@nestjs/common";
import { CategoryRepository } from "../repository/category.repository";
import { IPaging, toSlug } from "src/helpers/helper";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryDto } from "src/dtos/category.dto";

@Injectable()
export class CategoryService {
    constructor(
		private readonly repository: CategoryRepository,
		
		) {}

    async getLists(paging: IPaging, filters: any)
    {
        return await this.repository.getLists(paging, filters);
    }

    async store(data: any)
    {
		data.created_at = new Date()

		const newData = await this.repository.create({...data});
        await this.repository.save(newData);
		return newData;
    }

	async update(id: number, data: any)
    {
        await this.repository.update(id, {...data});
		return await this.findById(id)
    }

	async deleteById(id: number)
    {
        return await this.repository.delete(id);
    }

	async findById(id: number)
    {
        return await this.repository.findById(id);
    }

	async findOneByCondition(condition: any = {})
    {
        return await this.repository.findOne(
			{
				where: condition
			}
		);
    }

	async seed()
    {
		let data: any = [
			// Kinh nghiệm làm việc
			{
				name: "Chưa có kinh nghiệm",
				type: 1
			},
			{
				name: "Dưới 1 năm",
				type: 1
			},
			{
				name: "1 năm",
				type: 1
			},
			{
				name: "2 năm",
				type: 1
			},
			{
				name: "3 năm",
				type: 1
			},
			{
				name: "4 năm",
				type: 1
			},
			{
				name: "5 năm",
				type: 1
			},
			{
				name: "Trên 5 năm",
				type: 1
			},
			// Chức vụ
			{
				name: "Mới tốt nghiệp /  thực tập",
				type: 2
			},
			{
				name: "Nhân viên",
				type: 2
			},
			{
				name: "Trưởng nhóm",
				type: 2
			},
			{
				name: "Trưởng phòng",
				type: 2
			},
			{
				name: "Phó giám đốc",
				type: 2
			},
			{
				name: "Giám đốc",
				type: 2
			},

			// Hình thức làm việc
			{
				name: "Toàn thời gian cố định",
				type:3
			},
			{
				name: "Bán thời gian cố định",
				type:3
			},
			{
				name: "Bán thời gian tạm thời",
				type: 3
			},
			{
				name: "Thực tập",
				type: 3
			},
			{
				name: "Theo hợp đồng tư vấn",
				type: 3
			},

			// Lương
			{
				type: 4,
				name: 'Thỏa thuận',
			},
			{
				type: 4,
				name: 'Dưới 5 triệu',
			},
			{
				type: 4,
				name: 'Từ 5-10 triệu',
			},
			{
				type: 4,
				name: 'Từ 10-20 triệu',
			},
			{
				type: 4,
				name: 'Từ 20-40 triệu',
			},
			{
				type: 4,
				name: 'Trên triệu',
			}

		];

		for(let item of data) {
			let newData: CategoryDto = {...item};

			newData.slug = toSlug(item.name);
			newData.status = 1;
			let check = await this.findOneByCondition({slug: newData.slug, type: newData.type});
			if(check) {
				await this.update(check.id, {...newData, updated_at: new Date()});
			} else {
				const newItem = await this.repository.create({...newData, created_at: new Date(), updated_at: new Date()});
				await this.repository.save(newItem);
			}
		}
    }
}
