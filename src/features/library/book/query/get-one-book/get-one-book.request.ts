import {Query} from "@nestjs/cqrs";
import {IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {GetOneBookResponse} from "@/features/library/book/query/get-one-book/get-one-book.response";

export class GetOneBookQuery extends Query<GetOneBookResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number
}