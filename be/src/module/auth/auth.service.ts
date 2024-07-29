import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';
import { BadRequestException, getSecond, makeId } from 'src/helpers/helper';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { UserValidatorService } from 'src/service/user-validator.service';
import { UserService } from 'src/service/user.service';
import { LoginDto } from 'src/dtos/auth-dto/login.dto';
import { RefreshTokenDto } from 'src/dtos/auth-dto/refresh.dto';
import { UpdateProfileDto } from 'src/dtos/auth-dto/update-profile.dto';
import { RegisterAdminDto } from 'src/dtos/auth-dto/register-admin.dto';
import { RegisterDto } from 'src/dtos/auth-dto/register.dto';

@Injectable()
export class AuthService {

	constructor(
		@InjectRepository(User) private readonly userRepo: Repository<User>,
		private readonly jwtService: JwtService,
		private readonly userService: UserService,
		private readonly validateService: UserValidatorService,
		private mailService: MailService
	) {

	}

	async login(loginDto: LoginDto) {
		let user = await this.userService.findOneByCondition({
			email:  loginDto.username
		});
		if (!_.isEmpty(user)) {
			const isPasswordMatching = await bcrypt.compare(
				loginDto.password.trim(),
				user.password
			);
			if (!isPasswordMatching) {
				throw new BadRequestException({ code: 'LG0003', message: 'Mật khẩu không đúng' });
			}
			if (user.status !== 1) {
				throw new BadRequestException({ code: 'LG0004', message: 'Tài khoản chưa được kích hoạt' });
			}
			const token = await this.genTokenByUser(user);
			delete user.password;
			return {
				token_info: token, user
			}
		}
		throw new BadRequestException({ code: 'LG0002' });
	}

	async refreshToken(refreshDto: RefreshTokenDto) {

	}

	async genTokenByUser(user: any) {
		const payload: any = {
			username: user.username,
			id: user?.id || 0,
			roles: user?.roles,
			type: user?.type,
			email: user?.email
		};
		const expIn = Number(process.env.JWT_EXPIRATION_TIME) || 144000;
		payload.expires_at = getSecond() + expIn;
		const accessToken = await this.jwtService.signAsync(payload, { expiresIn: expIn });
		const expires_time = new Date().setSeconds(new Date().getSeconds() + expIn);

		return {
			access_token: accessToken,
			expires_in: expIn,
			expires_time: new Date(expires_time),
		};
	}

	async updateProfile(userId: number, data: UpdateProfileDto) {
		let user = await this.userRepo.findOneBy({ id: userId });
		if (_.isEmpty(user)) {
			throw new BadRequestException({ code: 'U0002' });
		}
		return await this.userService.update(userId, {...data});

	}
	
	async changePassword(userId: number, data: any) {
		let user = await this.userRepo.findOneBy({ id: userId });
		if (_.isEmpty(user)) {
			throw new BadRequestException({ code: 'U0002' });
		}
		
		let newPassword = await bcrypt.hash(data.password.trim(), 10);
		
		await this.userRepo.update(userId, {password: newPassword, updated_at: new Date()});
		return user;
	}

	async reset(data: any) {
		let user = await this.userRepo.findOneBy({ email: data.email });
		if (_.isEmpty(user)) {
			throw new BadRequestException({ code: 'U0002' });
		}
		const isPasswordMatching = await bcrypt.compare(
			data.old_password,
			user.password
		);
		if(!isPasswordMatching) {
			throw new BadRequestException({code: "U0002", message: "Mật khẩu cũ không đúng"})
		}
		let newPassword = await bcrypt.hash(data.password.trim(), 10);
		await this.userRepo.update(user?.id || 0, {password: newPassword});
		return user;
	}


	async resetPassword(data: any) {
		let user = await this.userRepo.findOneBy({ email: data.email});
		if (_.isEmpty(user)) {
			throw new BadRequestException({ code: 'U0002' });
		}
		const newPass = makeId( 6 ); 
		let newPassword = await bcrypt.hash(newPass, 10);
		await this.userRepo.update(user?.id || 0, {password: newPassword, updated_at: new Date()});
		this.mailService.resetPassword({...data, password: newPass});
		return user;
	}

	async findById(userId: number) {
		return await this.userService.findById(userId);
	}

	async registerAdmin(data: RegisterAdminDto) {
		data.status = 1;
		await this.validateService.validateUser(data, true);
		data.roles = [1];
		data.password = await bcrypt.hash(data.password.trim(), 10);
		const newData = await this.userRepo.create(data);
		await this.userRepo.save(newData);
		if(!_.isEmpty(data.roles)) {
			// await this.userService.syncRolesByUser(data.roles, newData.id);
		}
		return newData;
	}

	async register(data: RegisterDto) {
		data.status = 1;
		await this.validateService.validateUser(data, true);
		
		const newData = await this.userService.store(data);
		this.mailService.sendUserConfirmation(newData);
		return newData;
	}
}
