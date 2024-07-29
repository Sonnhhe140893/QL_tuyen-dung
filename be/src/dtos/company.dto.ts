import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CompanyDto {

	
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	email: string;

	@ApiProperty()
	@IsOptional()
	slug: string;

	@ApiProperty()
	@Transform(({value}) => Number(value || 1))
	@IsIn([1,-1])
	@IsOptional()
	status?: number;

	@ApiProperty()
	@IsOptional()
	address?: string;

	@ApiProperty()
	@IsOptional()
	content: string;

	

	@ApiProperty()
	@IsOptional()
	scale: number;

	@ApiProperty()
	@IsOptional()
	user_id: number;

	@ApiProperty()
	@IsOptional()
	logo: string;

	@ApiProperty()
	@IsOptional()
	website: string;

	@ApiProperty()
	@IsOptional()
	working_time: string;

	updated_at = new Date();
}