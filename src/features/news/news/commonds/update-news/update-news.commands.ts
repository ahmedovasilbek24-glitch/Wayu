import {IsNumber, IsOptional, IsString, MaxLength} from "class-validator";
import {ApiHideProperty, ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";

export class UpdateNewsCommands {
  @IsNumber()
  @ApiHideProperty()
  @Type(() => Number)
  @IsOptional()
  id?: number

  @IsString()
  @MaxLength(256)
  @ApiProperty()
  @IsOptional()
  title?: string;

  @IsString()
  @MaxLength(128)
  @ApiProperty()
  @IsOptional()
  image?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  date?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  content?: string;
}