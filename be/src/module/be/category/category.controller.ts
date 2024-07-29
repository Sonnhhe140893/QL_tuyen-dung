import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, Request, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CategoryDto } from "src/dtos/category.dto";
import { BaseResponse, HTTP_STATUS, IPaging, toSlug } from "src/helpers/helper";
import { CategoryService } from "src/service/category.service";
import * as _ from 'lodash';
import { JwtGuard } from "src/module/auth/guards/jwt/jwt.guard";

@Controller('cms/category')
@ApiTags('cms/category')
@UseGuards(JwtGuard)
export class CategoryController {
    constructor(private readonly service: CategoryService) {}

    @Get('/list')
    async getListsCategory(@Request() request: any) {
        try{
            let paging: any = {
                page: request.query.page || 1,
                page_size: request.query.page_size || 10,
            }

            const filters = {
                hot : request.query.hot || null,
                status : request.query.status || null,
            }

            const response = await this.service.getLists(paging, filters);
            return BaseResponse('success', response, '', 'Successful');
        }catch (e ){
            console.log('CategoryController@getListsCategory -------------> ', e.message);
            return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
        }
    }

    @Get('show/:id')
    async findById(@Req() request: Request, @Param('id') id: number,) {
        try{
            const response = await this.service.findById(id);
            return BaseResponse('success', response, '', 'Successful');
        }catch (e ){
            console.log('CategoryController@findById -------------> ', e.message);
            return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
        }
    }

	@Post('store')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async store(@Body() createDto: CategoryDto, @Request() req: any) {
		try {
			if (_.isEmpty(createDto)) throw new BadRequestException({ code: 'F0001' });
			// if (!createDto?.user_id) createDto.user_id = req.user?.user_id || 0
			createDto.slug = toSlug(createDto.name);
			return BaseResponse(
				HTTP_STATUS.success,
				await this.service.store(createDto),
				'',
				'Created successfully!'
			);
		} catch (e) {
			console.log('create company ---------> ', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Put('update/:id')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async update(@Param('id') id: number, @Body() updateDto: CategoryDto) {
		try {
			const check = await this.service.findById(id);
			if (!check) return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'Dữ liệu không tồn tại');
			if (_.isEmpty(updateDto)) throw new BadRequestException({ code: 'F0001' });

			updateDto.slug = toSlug(updateDto.name);
			return BaseResponse(HTTP_STATUS.success,
				await this.service.update(id, updateDto), '', 'Updated successfully!');
		} catch (e) {
			console.log('put company ---------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Delete('delete/:id')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async deletecompany(@Param('id') id: number) {
		try {
			let company = await this.service.findById(id);

			if (!company) {
				return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'Dữ liệu không tồn tại!');
			} else {
				await this.service.deleteById(id);
				return BaseResponse(HTTP_STATUS.success, {}, '', 'Deleted successfully!');
			}
		} catch (e) {
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Get('seed')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async seed() {
		try {
			return BaseResponse('success', await this.service.seed(), '', 'Successful');
		} catch (e) {
			console.log(e);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}
}
