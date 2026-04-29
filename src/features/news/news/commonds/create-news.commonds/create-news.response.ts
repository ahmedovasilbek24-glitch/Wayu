import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString, MaxLength} from "class-validator";

export class CreateNewsResponse {
  @Expose()
  @ApiProperty()
  @IsNumber()
  id!: number;

  @Expose()
  @ApiProperty()
  @IsString()
  @MaxLength(128)
  image!: string;

  @Expose()
  @IsString()
  @ApiProperty()
  @MaxLength(256)
  title!: string;

  @IsString()
  @ApiProperty()
  @Expose()
  date!: string;

  @IsString()
  @ApiProperty()
  @Expose()
  content!: string;
}