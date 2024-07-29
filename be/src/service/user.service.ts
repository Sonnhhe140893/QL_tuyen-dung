import { Injectable } from '@nestjs/common';
import { IPaging } from 'src/helpers/helper';
import { UserRepository } from 'src/repository';
import { Like, Not } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {

	constructor(
		private repository: UserRepository
	) {

	}

	async getLists(paging: IPaging, filters: any)
    {
        return await this.repository.getLists(paging, filters);
    }

    async store(data: any)
    {
		data.created_at = new Date();
		data.password = await bcrypt.hash(data.password.trim(), 10);
		const newData = await this.repository.create({...data});
        await this.repository.save(newData);
		return newData;
    }

	async update(id: number, data: any)
    {
        await this.repository.update(id, {...data});
		return await this.findById(id);
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
	
}
