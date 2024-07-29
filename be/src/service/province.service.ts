import { Injectable } from '@nestjs/common';
import { ProvinceDto } from 'src/dtos/common.dto';
import { IPaging, Paging, toSlug } from 'src/helpers/helper';
import { ProvinceRepository } from 'src/repository/province.repository';

@Injectable()
export class ProvinceService {

	constructor(
		private repository: ProvinceRepository,
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
		let data: ProvinceDto[] =  [
            {
                "name": "Hồ Chí Minh",
                "slug": "ho-chi-minh",
                "code": "SG",
                
            },
            {
                "name": "Hà Nội",
                "slug": "ha-noi",
                "code": "HN",
                
            },
            {
                "name": "Đà Nẵng",
                "slug": "da-nang",
                "code": "DDN",
                
            },
            {
                "name": "Bình Dương",
                "slug": "binh-duong",
                "code": "BD",
                
            },
            {
                "name": "Đồng Nai",
                "slug": "dong-nai",
                "code": "DNA",
                
            },
            {
                "name": "Khánh Hòa",
                "slug": "khanh-hoa",
                "code": "KH",
                
            },
            {
                "name": "Hải Phòng",
                "slug": "hai-phong",
                "code": "HP",
                
            },
            {
                "name": "Long An",
                "slug": "long-an",
                "code": "LA",
                
            },
            {
                "name": "Quảng Nam",
                "slug": "quang-nam",
                "code": "QNA",
                
            },
            {
                "name": "Bà Rịa Vũng Tàu",
                "slug": "ba-ria-vung-tau",
                "code": "VT",
                
            },
            {
                "name": "Đắk Lắk",
                "slug": "dak-lak",
                "code": "DDL",
                
            },
            {
                "name": "Cần Thơ",
                "slug": "can-tho",
                "code": "CT",
                
            },
            {
                "name": "Bình Thuận  ",
                "slug": "binh-thuan",
                "code": "BTH",
                
            },
            {
                "name": "Lâm Đồng",
                "slug": "lam-dong",
                "code": "LDD",
                
            },
            {
                "name": "Thừa Thiên Huế",
                "slug": "thua-thien-hue",
                "code": "TTH",
                
            },
            {
                "name": "Kiên Giang",
                "slug": "kien-giang",
                "code": "KG",
                
            },
            {
                "name": "Bắc Ninh",
                "slug": "bac-ninh",
                "code": "BN"
            },
            {
                "name": "Quảng Ninh",
                "slug": "quang-ninh",
                "code": "QNI"
            },
            {
                "name": "Thanh Hóa",
                "slug": "thanh-hoa",
                "code": "TH"
            },
            {
                "name": "Nghệ An",
                "slug": "nghe-an",
                "code": "NA"
            }
        ]

		for(let item of data) {
			let check = await this.findOneByCondition({slug: item.slug});
			console.log("check------> ", check);
			if(check) {
				await this.update(check.id, item);
			} else {
				const newData = await this.repository.create({...item, created_at: new Date(), updated_at: new Date()});
				await this.repository.save(newData);
				console.log("new data=-=======> ", newData);
			}
		}
    }

	async update(id: number, data: any)
    {
        await this.repository.update(id,{...data} );
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
