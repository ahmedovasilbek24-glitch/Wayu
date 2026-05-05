import {Command} from "@nestjs/cqrs";
import {IsNumber, IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class DeleteNewsCommand extends Command<void> {
  @IsNumber()
  @ApiProperty()
  id!: number;

  @IsString()
  @ApiProperty()
  @MaxLength(256)
  title!: string;

  @IsString()
  @ApiProperty()
  @MaxLength(128)
  image!: string;

  @IsString()
  @ApiProperty()
  date!: string;

  @IsString()
  @ApiProperty()
  content!: string;
}