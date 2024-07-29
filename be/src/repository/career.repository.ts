import { Like, Not, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Paging } from "../helpers/response/Paging";
import { User } from "src/entities/user.entity";
import { IPaging } from "src/helpers/interface/common.interface";
import { Career} from "src/entities";

export class CareerRepository extends Repository<Career>{


	constructor(
		@InjectRepository(Career)
		private repository: Repository<Career>,
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
		if (filter?.employer_id) condition.employer_id = filter?.employer_id;
		if (filter?.working_time) condition.working_time = filter?.working_time;
		if (filter?.slug) condition.slug = filter?.slug;
		if (filter?.hash_slug) condition.hash_slug = filter?.hash_slug;
		return condition;
	}

	async getLists(paging: IPaging, filters) {
		let condition: any = await this.buildCondition(filters);
		const [data, total] = await this.findAndCount({
			where: condition,
			take: paging.page_size,
			skip: (paging.page - 1) * paging.page_size
		});

		return { result: data, meta: new Paging(paging.page, paging.page_size, total) };
	}

	async findById(id: number) {
		return await this.findOne({
			where: {
				id: id
			}
		});
	}
}
