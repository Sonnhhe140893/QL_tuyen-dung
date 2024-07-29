import { Like, Not, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Paging } from "../helpers/response/Paging";
import { User } from "src/entities/user.entity";
import { IPaging } from "src/helpers/interface/common.interface";
import { Jobs } from "src/entities";

export class JobRepository extends Repository<Jobs>{


	constructor(
		@InjectRepository(Jobs)
		private repository: Repository<Jobs>,
	) {
		super(
			repository.target,
			repository.manager,
			repository.queryRunner,
		);
	}

	async buildCondition(filter: any) {
		let condition: any = {};
		if (filter?.name && filter?.name.trim() != '') condition.name = Like(`%${filter?.name.trim()}%`);
		if (filter?.phone && filter?.phone.trim() != '') condition.phone = Like(`%${filter?.phone.trim()}%`);
		if (filter?.email && filter?.email.trim() != '') condition.email = Like(`%${filter?.email.trim()}%`);
		if (filter?.status) condition.status = filter?.status;
		if (filter?.id) condition.id = filter?.id;
		if (filter?.career_id) condition.career_id = filter?.career_id;
		if (filter?.form_of_work_id) condition.form_of_work_id = filter?.form_of_work_id;
		if (filter?.rank_id) condition.rank_id = filter?.rank_id;
		if (filter?.company_id) condition.company_id = filter?.company_id;
		if (filter?.user_id) condition.user_id = filter?.user_id;
		if (filter?.experience_id) condition.experience_id = filter?.experience_id;
		if (filter?.province_id) condition.province_id = filter?.province_id;
		return condition;
	}

	async getLists(paging: IPaging, filters) {
		let condition: any = await this.buildCondition(filters);
		const [data, total] = await this.findAndCount({
			relations: {
				company: true,
				user: true,
				career: true,
				province: true
			},
			where: condition,
			take: paging.page_size,
			skip: (paging.page - 1) * paging.page_size
		});

		return { result: data, meta: new Paging(paging.page, paging.page_size, total) };
	}

	async findById(id: number) {
		return await this.findOne({
			relations: {
				company: true,
				user: true,
				career: true,
				province: true
			},
			where: {
				id: id
			}
		});
	}
}
