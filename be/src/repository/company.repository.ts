import { Like, Not, Raw, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Paging } from "../helpers/response/Paging";
import { User } from "src/entities/user.entity";
import { IPaging } from "src/helpers/interface/common.interface";
import { Company } from "src/entities";

export class CompanyRepository extends Repository<Company>{


	constructor(
		@InjectRepository(Company)
		private repository: Repository<Company>,
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
		if (filter?.user_id) condition.user_id = filter?.user_id;
		if (filter?.working_time) condition.working_time = filter?.working_time;
		if (filter?.slug) condition.slug = filter?.slug;
		if (filter?.hash_slug) condition.hash_slug = filter?.hash_slug;
		if (filter?.career_id) condition.careers = Like(`%${filter?.career_id}%`);
		// if (filter?.start_date) condition.created_at = Raw(alias => `${alias} <= '${filter?.start_date}'`);
		// if (filter?.end_date) condition.created_at = Raw(alias => `${alias} >= '${filter?.end_date}'`);
		return condition;
	}
	async getLists(filters) {
		let condition: any = await this.buildCondition(filters);
		const [data, total]: any = await this.findAndCount({
			select: ['name', 'id', 'status', 'logo' ],
			where: condition,
			relations: {
				user: true
			},
			take: filters.page_size,
			skip: (filters.page - 1) * filters.page_size
		});

		return { result: data, meta: new Paging(filters.page, filters.page_size, total) };
	}

	
	async findById(id: number) {
		return await this.findOne({
			where: {
				id: id
			},
			relations: {
				user: true
			}
		});
	}
}
