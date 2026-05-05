import {Allow, IsNumber, IsOptional, IsString, MaxLength} from "class-validator";
import {ApiHideProperty, ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {Command} from "@nestjs/cqrs";
import {UpdateCountryResponse} from "@/features/common/counties/commands/update-country/update-country.response";

export class UpdateCountryCommand extends Command<UpdateCountryResponse> {
  @IsNumber()
  @ApiHideProperty()
  @Type(() => Number)
  @IsOptional()
  id?: number

  @IsString()
  @MaxLength(64)
  @ApiProperty()
  title?: string

  @Allow()
  @ApiProperty({type: "string", format: "binary"})
  flag?: string
}