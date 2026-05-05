import {IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUseFullLinksRequest {
  @IsNumber()
  @ApiProperty()
  id!: number

  @IsString()
  @ApiProperty()
  title!: string;

  @IsString()
  @ApiProperty()
  link!: string;
}