import {Query} from "@nestjs/cqrs";
import {IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {GetOneBookCategoryResponse} from "@/features/library/book-category/query/get-one-book-category/get-one-book-category.response";

export class GetOneBookCategoryQuery extends Query<GetOneBookCategoryResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number
}