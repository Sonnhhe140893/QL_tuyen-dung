import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { BadRequestException, newArrayError, regexPass, regexPhone } from 'src/helpers/helper';
import { UserRepository } from 'src/repository';
import { Like, Repository } from 'typeorm';
import * as _ from 'lodash';

@Injectable()
export class UserValidatorService {

	constructor(
		private readonly userRepository: UserRepository
	) { }

	async validateUser(userDto: any, isCreated = false, user_id = 0) {
		if (_.isEmpty(userDto)) {
			throw new BadRequestException({ code: 'F0001' });
		}
		let errorData: any = {};

		let message = null;

		if (isCreated) {
			// if (!userDto.username || userDto.username?.trim() == '') {
			// 	errorData.username = newArrayError(errorData.email, 'User name is required');
			// } else if (!regexUserName.test(userDto.username)) {
			// 	errorData.username = newArrayError(errorData.username, 'User name is invalid');
			// } else {
			// 	let user = await this.userRepository.findOne({
			// 		where: {
			// 			username: userDto.username.trim()
			// 		}
			// 	});
			// 	if (!_.isEmpty(user)) {
			// 		errorData.username = newArrayError(errorData.username, 'User name is existed');
			// 	}
			// }
			if (!userDto.password.match(regexPass)) {
				errorData.password = newArrayError(errorData.password, 'Password không đúng định dạng!');
				message = 'Password không đúng định dạng!';
			}
			// if(userDto.password_cf && userDto.password_cf.trim() != '') {
			// 	if(userDto.password.trim() !== userDto.password_cf.trim()) {
			// 		errorData.password_cf = newArrayError(errorData.password_cf, 'Password does not match!');
			// 		message = 'Password không khớp!';
			// 	}
			// }
		}

		if (userDto.email) {
			// if (!regexEmail.test(userDto.email)) {
			// 	errorData.email = newArrayError(errorData.email, 'Email is invalid');
			// } else {
			let userEmail: any = await this.userRepository.findOne({ where: { email: userDto.email } });
			if (!_.isEmpty(userEmail)) {
				if (isCreated) {
					errorData.email = newArrayError(errorData.email, 'Email is existed');
					message = 'Email đã được sử dụng!';
				}
				else if (userEmail.id === user_id) {
					errorData.email = newArrayError(errorData.email, 'Email is existed');
					message = 'Email đã được sử dụng!';
				}
			}
			// }
		}

		if (userDto.phone) {
			if (!userDto.phone.match(regexPhone)) {
				errorData.phone = newArrayError(errorData.phone, 'Phone is invalid');
				message = 'Số điện thoại không đúng định dạng!';
			} else if (isCreated || user_id) {
				let user: any = this.userRepository.findOne({
					where: {
						phone: Like(`%${userDto.phone}%`),
					}
				});
				if (!_.isEmpty(user)) {
					if (isCreated) {
						errorData.phone = newArrayError(errorData.phone, 'Phone is existed');
						message = 'Số điện thoại đã được sử dụng!';
					}
					else if (user?.id || 0 === user_id) {
						errorData.phone = newArrayError(errorData.phone, 'Phone is existed');
						message = 'Số điện thoại đã được sử dụng!';
					}
				}
			}
		}

		if (!_.isEmpty(errorData)) {
			throw new BadRequestException({ code: 'F0002', message: message, data: errorData });
		}
	}
}
