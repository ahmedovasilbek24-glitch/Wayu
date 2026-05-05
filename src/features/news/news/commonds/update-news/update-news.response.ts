import {IsNumber, IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class UpdateNewsResponse {
  @IsNumber()
  @ApiProperty()
  @Expose()
  id!: number

  @IsString()
  @Expose()
  @MaxLength(256)
  @ApiProperty()
  title!: string;

  @IsString()
  @Expose()
  @MaxLength(128)
  @ApiProperty()
  image!: string;

  @IsString()
  @Expose()
  @ApiProperty()
  date!: string;

  @IsString()
  @Expose()
  @ApiProperty()
  content!: string;
}