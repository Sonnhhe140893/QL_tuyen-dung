import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateProfileDto {


	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string;


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
