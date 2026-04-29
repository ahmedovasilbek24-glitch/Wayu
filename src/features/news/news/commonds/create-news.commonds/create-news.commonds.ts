import {Command} from "@nestjs/cqrs";
import {CreateNewsResponse} from "@/features/news/news/commonds/create-news.commonds/create-news.response";
import {IsString, MaxLength} from "class-validator";

export class CreateNewsCommands extends Command<CreateNewsResponse> {
  @IsString()
  @MaxLength(256)
  title!: string;

  @IsString()
  @MaxLength(128)
  image!: string;

  @IsString()
  content!: string;

  @IsString()
  date!: string;
}