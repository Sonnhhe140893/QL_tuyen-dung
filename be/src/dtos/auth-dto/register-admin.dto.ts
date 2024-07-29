import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { USER_CONST } from "src/helpers/helper";

export class RegisterAdminDto {


	name = 'Admin';
	username: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	password: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	email: string;

	@ApiProperty()
	@IsOptional()
	
	status?: number;

	@ApiProperty()
	@IsOptional()
	@IsArray()
	roles?: any[];

	created_at = new Date();
	updated_at = new Date();
	type = USER_CONST.USER_ADM;
	gender = 'male';
}
