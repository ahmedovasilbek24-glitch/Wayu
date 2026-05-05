import {IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Command} from "@nestjs/cqrs";

export class DeleteLanguageCommand extends Command<void> {
  @IsNumber()
  @ApiProperty()
  id!: number
}