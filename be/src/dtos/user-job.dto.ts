import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UserJobDto {
	
	@ApiProperty()
	@IsOptional()
	user_id: number;

	@ApiProperty()
	@IsOptional()
	job_id: number;

	@ApiProperty()
	@IsOptional()
	name?: string;

	@ApiProperty()
	@IsOptional()
	phone: string;

	@ApiProperty()
	@IsOptional()
	email: string;

	@ApiProperty()
	@IsOptional()
	company_id: number;

	@ApiProperty()
	@IsOptional()
	address: string;

	@ApiProperty()
	@IsOptional()
	file: string;

	@ApiProperty()
	@IsIn([1,-1, 2])
	@IsOptional()
	status?: number;

	@ApiProperty()
	@IsOptional()
	message?: string;

	updated_at = new Date();
}