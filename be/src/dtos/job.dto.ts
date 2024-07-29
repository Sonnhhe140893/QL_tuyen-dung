import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class JobDto {
	
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsOptional()
	description: string;

	@ApiProperty()
	@IsOptional()
	slug: string;

	@ApiProperty()
	@IsOptional()
	avatar: string;

	@ApiProperty()
	@Transform(({value}) => Number(value || 1))

	@IsIn([1,-1, 2])
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
	number: number;

	@ApiProperty()
	@IsOptional()
	deadline: Date;

	@ApiProperty()
	@IsOptional()
	type: number;

	@ApiProperty()
	@IsOptional()
	province_id: number;

	@ApiProperty()
	@IsOptional()
	user_id: number;

	@ApiProperty()
	@IsOptional()
	form_of_work_id: number;

	@ApiProperty()
	@IsOptional()
	experience_id: number;

	@ApiProperty()
	@IsOptional()
	rank_id: number;

	@ApiProperty()
	@IsOptional()
	tags: string;

	@ApiProperty()
	@Transform(({value}) => Number(value || null))

	@IsOptional()
	company_id: number;

	@ApiProperty()
	@IsOptional()
	@Transform(({value}) => Number(value || null))

	@IsNumber()
	career_id: number;

	@ApiProperty()
	@IsOptional()
	salary: number;

	@ApiProperty()

	@IsOptional()
	salary_id: number;

	updated_at = new Date();
}