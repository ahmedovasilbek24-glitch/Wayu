import {Allow, IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Command} from "@nestjs/cqrs";
import {CreateSocialLinkResponse} from "@/features/common/socilaLinks/commands/create-social-links/create-social-link.response";

export class CreateSocialLinkCommand extends Command<CreateSocialLinkResponse> {
  @IsString()
  @ApiProperty()
  @MaxLength(64)
  title!: string;

  @Allow()
  @ApiProperty({type: "string", format: 'binary'})
  icon!: string;

  @IsString()
  @ApiProperty()
  @MaxLength(128)
  link!: string
}