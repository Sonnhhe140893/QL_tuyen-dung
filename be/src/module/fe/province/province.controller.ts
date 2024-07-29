import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompanyDto } from 'src/dtos/company.dto';
import { BadRequestException, BaseResponse, HTTP_STATUS, IPaging, toSlug } from 'src/helpers/helper';
import { JwtGuard } from 'src/module/auth/guards/jwt/jwt.guard';
import * as _ from 'lodash';
import { ProvinceService } from 'src/service/province.service';
import { ProvinceDto } from 'src/dtos/common.dto';

@Controller('province')
@ApiTags('fe/Province')
export class ProvinceController {

	constructor(
		private service: ProvinceService
	) { }


	@Get('/list')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async getList(@Request() req: any) {
		try {
			const paging: IPaging = {
				page: req.query.page || 1,
				page_size: req.query.page_size || 20
			};

			let data: any = await this.service.getLists(paging, req.query);

			return BaseResponse(HTTP_STATUS.success, data, '', 'Successful');
		} catch (e) {
			console.log('provinceController list-------------> ', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Get('show/:id')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async findById(@Param('id') id: number) {
		try {
			const res = await this.service.findById(id);
			if (!res) return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'Dữ liệu không tồn tại');
			else return BaseResponse('success', res, '', 'Successful');
		} catch (e) {
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	// @Post('store')
	// @HttpCode(HttpStatus.OK)
	// @ApiResponse({ status: 200, description: 'success' })
	// async store(@Body() createDto: ProvinceDto, @Request() req: any) {
	// 	try {
	// 		if (_.isEmpty(createDto)) throw new BadRequestException({ code: 'F0001' });
	// 		// if (!createDto?.user_id) createDto.user_id = req.user?.user_id || 0
	// 		createDto.slug = toSlug(createDto.name);
	// 		return BaseResponse(
	// 			HTTP_STATUS.success,
	// 			await this.service.store(createDto),
	// 			'',
	// 			'Created successfully!'
	// 		);
	// 	} catch (e) {
	// 		console.log('create company ---------> ', e.message);
	// 		return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
	// 	}
	// }

	// @Put('update/:id')
	// @HttpCode(HttpStatus.OK)
	// @ApiResponse({ status: 200, description: 'success' })
	// async update(@Param('id') id: number, @Body() updateDto: ProvinceDto) {
	// 	try {
	// 		const check = await this.service.findById(id);
	// 		if (!check) return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'Dữ liệu không tồn tại');
	// 		if (_.isEmpty(updateDto)) throw new BadRequestException({ code: 'F0001' });

	// 		updateDto.slug = toSlug(updateDto.name);
	// 		return BaseResponse(HTTP_STATUS.success,
	// 			await this.service.update(id, updateDto), '', 'Updated successfully!');
	// 	} catch (e) {
	// 		console.log('put company ---------->', e);
	// 		return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
	// 	}
	// }

	// @Delete('delete/:id')
	// @HttpCode(HttpStatus.OK)
	// @ApiResponse({ status: 200, description: 'success' })
	// async deletecompany(@Param('id') id: number) {
	// 	try {
	// 		let company = await this.service.findById(id);

	// 		if (!company) {
	// 			return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'Dữ liệu không tồn tại!');
	// 		} else {
	// 			await this.service.deleteById(id);
	// 			return BaseResponse(HTTP_STATUS.success, {}, '', 'Deleted successfully!');
	// 		}
	// 	} catch (e) {
	// 		return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
	// 	}
	// }

	async buildFilter(req: any) {
		const filters = {
			id: req.query.id || null,
			name: req.query.name || null,
			status: req.query.status || null,
			hot: req.query.hot || null,
			user_id: req.query.user_id || req.user?.id || null
		};

		return filters;
	}

	@Get('/seed')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async seed(@Body() createDto: any, @Request() req: any) {
		try {
			return BaseResponse(
				HTTP_STATUS.success,
				await this.service.seed(),
				'',
				'Created successfully!'
			);
		} catch (e) {
			console.log('create province ---------> ', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

}
