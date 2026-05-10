import {Query} from "@nestjs/cqrs";
import {IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {GetOneAuthorResponse} from "@/features/library/author/query/get-one-author/get-one-author.response";

export class GetOneAuthorQuery extends Query<GetOneAuthorResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number
}