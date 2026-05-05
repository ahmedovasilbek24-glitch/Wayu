import {IsNumber, IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class DeleteNewsResponse {
  @IsNumber()
  @ApiProperty()
  @Expose()
  id!: number;

  @Expose()
  @IsString()
  @MaxLength(256)
  @ApiProperty()
  title!: string;

  @Expose()
  @IsString()
  @MaxLength(128)
  @ApiProperty()
  image!: string;

  @Expose()
  @IsString()
  @ApiProperty()
  date!: string;

  @Expose()
  @IsString()
  @ApiProperty()
  content!: string
}