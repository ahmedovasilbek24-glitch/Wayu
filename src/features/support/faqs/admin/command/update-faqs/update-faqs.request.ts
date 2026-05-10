import {IsOptional, IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateFaqsRequest {
  @IsString()
  @IsOptional()
  @ApiProperty({required: false})
  @MaxLength(256)
  question?: string

  @IsString()
  @IsOptional()
  @ApiProperty({required: false})
  @MaxLength(512)
  answer?: string
}