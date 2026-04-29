import {IsString, MaxLength} from "class-validator";
import {Command} from "@nestjs/cqrs";
import {CreateNewsCategoryResponse} from "@/features/news/news-categories/commonds/create-news-category.commonds/create-news-category.response";

export class CreateNewsCategoryCommands extends Command<CreateNewsCategoryResponse> {
  @IsString()
  @MaxLength(64)
  title!: string;
}