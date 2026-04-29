import {IsNumber, IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class DeleteNewsCategoryResponse {
  @IsNumber()
  @ApiProperty()
  @Expose()
  id!: number;

  @Expose()
  @IsString()
  @MaxLength(64)
  @ApiProperty()
  title!: string;
}