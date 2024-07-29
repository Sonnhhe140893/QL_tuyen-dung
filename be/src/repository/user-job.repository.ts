import { Like, Not, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserJob } from "src/entities";

export class UserJobRepository extends Repository<UserJob>{


	constructor(
		@InjectRepository(UserJob)
		private repository: Repository<UserJob>,
	) {
		super(
			repository.target,
			repository.manager,
			repository.queryRunner,
		);
	}

	
}
