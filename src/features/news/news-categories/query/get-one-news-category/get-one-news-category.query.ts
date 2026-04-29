import {Query} from "@nestjs/cqrs";
import {GetOneNewsCategoryResponse} from "@/features/news/news-categories/query/get-one-news-category/get-one-news-category.response";
import {IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class GetOneNewsCategoryQuery extends Query<GetOneNewsCategoryResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number;
}