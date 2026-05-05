import {Query} from "@nestjs/cqrs";
import {IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {GetOneTagsResponse} from "@/features/common/tags/query/get-one-tags/get-one-tags.response";

export class GetOneTagsQuery extends Query<GetOneTagsResponse>{
  @IsNumber()
  @ApiProperty()
  id! : number
}