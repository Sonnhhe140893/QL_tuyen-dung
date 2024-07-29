import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { USER_CONST } from "src/helpers/helper";

export class RegisterDto {

	@ApiProperty()
	@IsOptional()
	@IsString()
	username: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(20, {message: 'Password max length is 20 characters'})
	@MinLength(6, {message: 'Password min length is 6 characters'})
	password: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	email: string;

	@ApiProperty()
	@Transform(({value}) => Number(value || 1))

	@IsIn([1,-1])
	@IsOptional()
	status?: number;

	@ApiProperty()
	@IsOptional()
	@IsString()
	avatar?: string;

	@ApiProperty()
	
	@IsOptional()
	@IsString()
	@Transform(({ value }) => value?.toString().toUpperCase())
	@IsIn(['MALE', 'FEMALE', 'OTHER'])
	gender: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	address: string;

	@ApiProperty()
	@IsOptional()
	dob: Date;

	@ApiProperty()
	@IsOptional()
	phone: string;
	
	updated_at = new Date();
	
	@ApiProperty()
	@IsOptional()
	@IsString()
	@Transform(({ value }) => value?.toString().toUpperCase())
	@IsIn(['ADMIN', 'EMPLOYER', 'USER'])
	type: string;
}