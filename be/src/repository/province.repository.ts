import { Like, Not, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Paging } from "../helpers/response/Paging";
import { User } from "src/entities/user.entity";
import { IPaging } from "src/helpers/interface/common.interface";
import { Province} from "src/entities";

export class ProvinceRepository extends Repository<Province>{


	constructor(
		@InjectRepository(Province)
		private repository: Repository<Province>,
	) {
		super(
			repository.target,
			repository.manager,
			repository.queryRunner,
		);
	}

	async buildCondition(filter: any) {
		let condition: any = {};
		
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
