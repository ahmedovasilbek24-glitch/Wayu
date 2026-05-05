import {Allow, IsNumber, IsOptional, IsString, MaxLength} from "class-validator";
import {ApiHideProperty, ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {Command} from "@nestjs/cqrs";
import {UpdateSocialLinkResponse} from "@/features/common/socilaLinks/commands/update-social-links/update-social-link.response";

export class UpdateSocialLinkCommand extends Command<UpdateSocialLinkResponse> {
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
  icon?: string

  @IsString()
  @MaxLength(128)
  @ApiProperty()
  link!: string
}