import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { CATEGORY_TYPE } from "src/helpers/helper";
const LIST_TYPE = () => {
	return CATEGORY_TYPE.map((item: any) => item.id)
}
export class CategoryDto {

	@ApiProperty()
	@IsOptional()
	@IsString()
	name?: string;

	@ApiProperty()
	@IsOptional()
	@IsIn(LIST_TYPE())
	type?: number;

	@ApiProperty()
	@IsOptional()
	slug?: string;

	@ApiProperty()
	@IsIn([1, -1]) 
	@IsOptional()
	status?: number;

	@ApiProperty()
	@IsOptional()
	avatar?: string;

	@ApiProperty()
	@IsOptional()
	description?: string;

	// @ApiProperty()
	// @IsOptional()
	// total_jobs?: number = 0;


	updated_at = new Date();
}