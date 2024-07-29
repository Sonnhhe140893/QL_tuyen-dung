import { Repository } from "typeorm";
import { Category } from "../entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Paging } from "../helpers/response/Paging";
import { IPaging } from "src/helpers/helper";

export class CategoryRepository extends Repository<Category>{
    constructor(
        @InjectRepository(Category)
        private repository: Repository<Category>,
    ) {
        super(
            repository.target,
            repository.manager,
            repository.queryRunner,
        );
    }

    async getLists(paging: IPaging, filters: any){
        let condition: any = {};
        if (filters.hot) condition.hot = filters.hot;
        if (filters.status) condition.status = filters.status;

        const [categories, total] =  await this.findAndCount({
            where: condition,
            take: paging.page_size,
            skip: (paging.page - 1) * paging.page_size
        });

        return { result: categories, meta: new Paging(paging.page, paging.page_size, total) };
    }

    async findById(id: number)
    {
        return await this.findOne({
            where: {
                id: id
            }
        });
    }
}
