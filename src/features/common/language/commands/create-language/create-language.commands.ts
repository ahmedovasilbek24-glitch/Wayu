import {IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Command} from "@nestjs/cqrs";
import {CreateLanguageResponse} from "@/features/common/language/commands/create-language/create-language-response";

export class CreateLanguageCommand extends Command<CreateLanguageResponse>{
  @IsString()
  @ApiProperty()
  @MaxLength(64)
  title!: string;
}