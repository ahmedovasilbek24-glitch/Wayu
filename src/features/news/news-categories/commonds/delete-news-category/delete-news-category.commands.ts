import {Command} from "@nestjs/cqrs";
import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class DeleteNewsCategoryCommands extends Command<void>{
  @IsString()
  @ApiProperty()
  id!: number;
}