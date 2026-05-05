import {IsNumber, IsOptional, IsString, MaxLength} from "class-validator";
import {ApiHideProperty, ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {Command} from "@nestjs/cqrs";
import {UpdateLanguageResponse} from "@/features/common/language/commands/update-language/update-language.response";

export class UpdateLanguageCommand extends Command<UpdateLanguageResponse>{
  @IsNumber()
  @ApiHideProperty()
  @Type(() => Number)
  @IsOptional()
  id?: number

  @IsString()
  @MaxLength(64)
  @ApiProperty()
  title?: string
}