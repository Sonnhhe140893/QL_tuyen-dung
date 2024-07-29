import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";


export class CareerDto {

	@ApiProperty()
	@IsOptional()
	@IsString()
	name?: string;

	@ApiProperty()
	@IsOptional()
	slug?: string;

	@ApiProperty()
	@IsOptional()
	@IsIn([1,-1])
	status?: number;

	@ApiProperty()
	@IsOptional()
	hot?: number;

	@ApiProperty()
	@IsOptional()
	avatar?: string;

	@ApiProperty()
	@IsOptional()
	total_jobs?: number;


	updated_at = new Date();
}

export class ProvinceDto {

	@ApiProperty()
	@IsOptional()
	@IsString()
	name?: string;

	@ApiProperty()
	@IsOptional()
	code?: string;

	@ApiProperty()
	@IsOptional()
	slug?: string;

	@IsOptional()
	updated_at? = new Date();
}