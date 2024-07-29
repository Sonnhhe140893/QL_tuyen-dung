import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Put, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import * as _ from 'lodash';
import { JwtGuard } from './guards/jwt/jwt.guard';
import { BadRequestException, BaseResponse, HTTP_STATUS } from 'src/helpers/helper';
import { LoginDto } from 'src/dtos/auth-dto/login.dto';
import { RefreshTokenDto } from 'src/dtos/auth-dto/refresh.dto';
import { UpdateProfileDto } from 'src/dtos/auth-dto/update-profile.dto';
import { RegisterAdminDto } from 'src/dtos/auth-dto/register-admin.dto';
import { RegisterDto } from 'src/dtos/auth-dto/register.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

	constructor(private readonly authService: AuthService) { }

	@Post('login')
	@ApiResponse({ status: 200, description: 'success' })
	async login(
		@Body() formDto: LoginDto
	) {
		try {
			if (_.isEmpty(formDto)) {
				throw new BadRequestException({ code: 'F0001' });
			}
			const result = await this.authService.login(formDto);

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@LoginDto----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}

	@Post('reset-password')
	@ApiResponse({ status: 200, description: 'success' })
	async resetPassword(
		@Body() formDto: any
	) {
		try {
			if (_.isEmpty(formDto)) {
				throw new BadRequestException({ code: 'F0001' });
			}
			const result = await this.authService.resetPassword(formDto);

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@resetpass----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}


	// @Post('refresh')
	// @ApiResponse({ status: 200, description: 'success' })
	// async refreshToken(
	// 	@Body() formDto: RefreshTokenDto
	// ) {
	// 	try {
	// 		if (_.isEmpty(formDto)) {
	// 			throw new BadRequestException({ code: 'F0001' });
	// 		}
	// 		const result = await this.authService.refreshToken(formDto);

	// 		return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
	// 	} catch (error) {
	// 		console.log('e@LoginDto----> ', error);
	// 		return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
	// 	}
	// }

	@Put('/profile')
	@UseGuards(JwtGuard)
	@ApiResponse({ status: 200, description: 'success' })
	async updateProfile(
		@Request() req: any,
		@Body() formDto: UpdateProfileDto
	) {
		try {
			const user_id = req?.user?.id || null;
			if (!user_id) {
				throw new BadRequestException({ code: 'LG0401' });
			}
			if (_.isEmpty(formDto)) {
				throw new BadRequestException({ code: 'F0001' });
			}
			const result = await this.authService.updateProfile(user_id, formDto);

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@UpdateProfile----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}

	@Put('/change-password')
	@UseGuards(JwtGuard)
	@ApiResponse({ status: 200, description: 'success' })
	async changePassword(
		@Request() req: any,
		@Body() formDto: any
	) {
		try {
			const user_id = req?.user?.id || null;
			if (!user_id) {
				throw new BadRequestException({ code: 'LG0401' });
			}
			if (_.isEmpty(formDto)) {
				throw new BadRequestException({ code: 'F0001' });
			}
			const result = await this.authService.updateProfile(user_id, formDto);

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@UpdateProfile----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}


	@Put('/password/reset')
	@ApiResponse({ status: 200, description: 'success' })
	async reset(
		@Request() req: any,
		@Body() formDto: any
	) {
		try {

			if (_.isEmpty(formDto)) {
				throw new BadRequestException({ code: 'F0001' });
			}

			const result = await this.authService.reset(formDto);

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@UpdateProfile----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}

	@Get('/profile')
	@UseGuards(JwtGuard)
	@ApiResponse({ status: 200, description: 'success' })
	async profile(
		@Request() req: any,
	) {
		try {
			const user_id = req?.user?.id || null;
			if (!user_id) {
				throw new BadRequestException({ code: 'LG0001' });
			}
			const result = await this.authService.findById(user_id);

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@UpdateProfile----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}

	// @Post('register/admin')
	// @ApiResponse({ status: 200, description: 'success' })
	// async registerAdmin(
	// 	@Body() formDto: RegisterAdminDto
	// ) {
	// 	try {
	// 		if (_.isEmpty(formDto)) {
	// 			throw new BadRequestException({ code: 'F0001' });
	// 		}
	// 		formDto.username = formDto.email;
	// 		const result = await this.authService.registerAdmin(formDto);

	// 		return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
	// 	} catch (error) {
	// 		console.log('e@LoginDto----> ', error);
	// 		return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
	// 	}
	// }

	@Post('register')
	@ApiResponse({ status: 200, description: 'success' })
	async register(
		@Body() formDto: RegisterDto
	) {
		try {
			if (_.isEmpty(formDto)) {
				throw new BadRequestException({ code: 'F0001' });
			}
			// formDto.username = formDto.email;
			const result = await this.authService.register(formDto);

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@register----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}
}
