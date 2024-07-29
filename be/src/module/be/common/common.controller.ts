import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestException, BaseResponse, CATEGORY_TYPE, HTTP_STATUS, IPaging, USER_CONST, USER_TYPE} from 'src/helpers/helper';
import { JwtGuard } from 'src/module/auth/guards/jwt/jwt.guard';
import * as _ from 'lodash';
import { DashboardService } from 'src/service/dashboard.service';

@Controller('cms')
@ApiTags('cms/Common')
@UseGuards(JwtGuard)
export class CommonController {
	constructor(
		private service: DashboardService
	) { }


	@Get('/config')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async findAndCount(@Request() req: any) {
		try {
			
			const config: any = {
				CATEGORY_TYPE: CATEGORY_TYPE,
				USER_TYPE: USER_TYPE
			}

			return BaseResponse(HTTP_STATUS.success, config, '', 'Successful');
		} catch (e) {
			console.log('JobController list-------------> ', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Get('dashboard')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async dashboard(@Request() req: any) {
		try {
			
			return BaseResponse('success', await this.service.statistic(req?.query), '', 'Successful');
		} catch (e) {
			console.log('dashboard list-------------> ', e);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}
}
